import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    @ViewChild('signInOtpNgForm') signInOtpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    signInOtpForm: FormGroup;
    countryCode:number =  91;
    signInOtpValues: any;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                name      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                password  : ['', Validators.required],
                company   : [''],
                agreements: ['', Validators.requiredTrue]
            }
        );
        this.signInOtpForm = this._formBuilder.group({
            dialCode: ['91', [Validators.required]],
            number:  ['', [Validators.required]],
            otp: ['', [Validators.required]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(

                (response) => {

                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
    onCountryChange(event: any) {
        console.log('dial', event.dialCode);
        this.countryCode = event.dialCode;
   }

    getOtp() {
        const userValues = {
            type: "phone",
            countryPhoneCode: '+'+ this.countryCode,
            phone: this.signInOtpForm.value.number,
        }
        console.log(userValues);
        this._authService.getOtp(userValues).subscribe(
            (results: any) => {
                console.log(results)
            },
            errors => {
                console.log(errors);
            }
        )
    }
    /**
     * Sign in
     */
   

    signInOtp() {
        if(this.signInOtpForm.invalid) {
            return;
        } 

        this.signInOtpForm.disable();
        this.showAlert = false;

        this.signInOtpValues = {
            // email: "user@mail.com",
            // password: "user@123",
            type: "phone",
            // notificationToken: "", 
            // referalCode: "ref",
            countryPhoneCode: '+'+ this.countryCode,
            phone: this.signInOtpForm.value.number,
            otp: this.signInOtpForm.value.otp,
            // token: null
         }

         this._authService.signInOtp(this.signInOtpValues).subscribe(
                () => {

                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);

                },
                (response) => {

                    // Re-enable the form
                    this.signInOtpForm.enable();
                    
                    // Reset the form
                   // this.signInOtpNgForm.resetForm(); 
                   this.signInOtpForm.patchValue({otp: ''})
                   var message: any;
                   if(typeof response.error.errors[0] !== "string") {
                       //console.log('im object')
                        message = response.error.message + ': ' + response.error.errors[0].msg;   
                   } else {
                        message = response.error.message + ': ' + response.error.errors[0]; // ah v ta object aa   
                   }
                   console.log(response);
                    
                   // set the alert
                   this.alert = {
                       type   : 'error',
                       message: message
                   };

                   // Show the alert
                   this.showAlert = true;
                }
            );
    }
}

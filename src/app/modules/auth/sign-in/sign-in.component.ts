import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    @ViewChild('signInOtpNgForm') signInOtpNgForm: NgForm;
    //@ViewChild('otpField')  otpFieldVariable: ElementRef; 

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    signInOtpForm: FormGroup;
    showAlert: boolean = false;
    countryCode:number =  91;
    signInOtpValues: any;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
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
        this.signInForm = this._formBuilder.group({
            email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
            password  : ['admin', Validators.required],
            rememberMe: ['']
        });

        this.signInOtpForm = this._formBuilder.group({
            dialCode: ['91', [Validators.required]],
            number:  ['', [Validators.required]],
            otp: ['', [Validators.required]]
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
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
        //
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
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
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
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Wrong email or password'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    signInOtp() {
        console.log('signInOtp click')
        this.signInOtpValues = {
            // email: "user@mail.com",
            // password: "user@123",
            type: "phone",
            // notificationToken: "", 
            referalCode: "ref",
            countryPhoneCode: '+'+ this.countryCode,
            phone: this.signInOtpForm.value.number,
            otp: this.signInOtpForm.value.otp,
            // token: null
         }
         
        if(this.signInOtpForm.invalid) {
            console.log('form', this.signInOtpForm.value)
            return;
        } 

        this.signInOtpForm.disable();
        this.showAlert = false;

        
         this._authService.signInOtp(this.signInOtpValues)
             .subscribe(
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
                    //this.otpFieldVariable.nativeElement.value = "";
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

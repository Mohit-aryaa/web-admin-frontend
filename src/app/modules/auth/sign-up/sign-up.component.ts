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
    @ViewChild('vendorSignUpNgForm') vendorSignUpNgForm :NgForm;
    @ViewChild('signInOtpNgForm') signInOtpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    vendorSignUpForm: FormGroup;
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
        this.vendorSignUpForm = this._formBuilder.group({
            name      : ['', Validators.required],
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            company   : ['',Validators.required],
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
                    this.signUpForm.reset();

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
    vendorSignUp(): void
    {
        console.log(this.vendorSignUpForm.value)
        // Do nothing if the form is invalid
        if ( this.vendorSignUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.vendorSignUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.vendorSignUp(this.vendorSignUpForm.value)
            .subscribe(

                (response:any) => {
                    console.log(response);
                    this.alert = {
                        type   : 'success',
                        message: response.message
                    };
                    this.showAlert = true;
                    this.vendorSignUpForm.reset();
                    this.vendorSignUpForm.enable();

                    setTimeout(() => {
                        this._router.navigateByUrl('/sign-in')
                    }, 1000);

                    // Navigate to the confirmation required page
                    //this._router.navigateByUrl('/confirmation-required');
                },
                (errors: any) => {

                    // Re-enable the form
                    this.vendorSignUpForm.enable();

                    // Reset the form
                    //this.vendorSignUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: errors.error.message
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


    /**
     * Sign in
     */


}

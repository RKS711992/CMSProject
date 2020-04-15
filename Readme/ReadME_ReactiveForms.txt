**************************************************************************************************************************************************************************
Reactive Forms:
	Much of the code and the logic resides in the component class.
	There is no 2 way binding in here,instead as the name suggests we need to react to user inputs to update the values.
	Angular also provides methods to update the form control values from the component class.
	Reactive forms are well suited for complex scenarios.Scenarios like we might want the form fields to be dynamic.We may also want
	custom validation with certain fields like password and confirm password. We migh want the Validation to be dynamic like if we want
	to sbscribe to updates we want the email Field to be mandatory if not then optional.
	Reactive form alsomakes it possible for Unit Testing because the logic is in the ts file.

**************************************************************************************************************************************************************************
Creating the Form Model:
	To work with reactive forms, we need the reactive forms module. So we open app.module.ts and import ReactiveFormsModule
	from @angular/forms and also add it in the imports array.
	The ReactiveFormsModule gives us access to a bunch of different classes and directives that are necessary to build reactive forms.
	Out of those, 2 classes make up the building blocks of ReactiveForms. These are formGroup and formControl classes.
	Each of the fieds created are defined as an instance of the FormControl class and the overall form itself which comprises the thse
	form fields is an instance of FormGroup class.
	So basically an entire form is represented as a FormGroup and each of the form field is represented as a FormControl in the
	component class.
	
	Now we go to the component class and we create a new FormGroup instance that represents the user Registration form ie:
		userRegistration = new FormGroup();
	Now we initialize this FormGroup with object of controls that are present in the HTML.ie:
		userResgistration = new FormGroup({
		userName: new FormControl("Rishabh"),//Default value can be provided or just empty value
		password: new FormControl(""),
		confirmPassword: new FormControl("")
	  });
	Now we need to associate this model with the view ie with our HTML Form. For this, the ReactiveFormsModule provides us with certain directives.
	In the form tag(<form>) we bind the userResgistration using formGroup directive, ie:
		<form [formGroup]="userResgistration">
	To bind each of teh form controls we use the formControlName directives. ie:
		<input formControlName="password" type="password" name="password" id="" class="form-control" />
		
	The FormGroup class can be used to group together different formControls. Ex : City, state and Postal code can be represented as one formGroup.
		in HTML Code:
			<div formGroupName="address">
			  <div class="form-group">
				<label for="state">State</label>
				<input type="text" formControlName="state" name="state" id="" class="form-control"/>
			  </div>
			  <div class="form-group">
				<label for="city">City</label>
				<input type="text" formControlName="city" name="city" id="" class="form-control"/>
			  </div>
			  <div class="form-group">
				<label for="postalCode">PostalCode</label>
				<input type="text" formControlName="postalCode" name="postalCode" id="" class="form-control"/>
			  </div>
		   </div>
	   In component class:
			userResgistration = new FormGroup({
			userName: new FormControl("Rishabh"),
			password: new FormControl(""),
			confirmPassword: new FormControl(""),
			address: new FormGroup({
			  city: new FormControl(""),
			  state: new FormControl(""),
			  postalCode: new FormControl("")
			})
		  });
**************************************************************************************************************************************************************************
   
Managing Control Values:
		To set form Control values without any user interaction ie setting values programatically,
		like if we want to retrieve the formData from a Backend API or service and update the view with the new values , 
		we can do that by using the "setValue()" method provided by reactive forms.
		The setValue() method can be called on the formGroup class or the formElements class.
		It acceps an Object that matches the structure of the formGroup with the controlNames as keys.
		But with setValue()method we must provide all the elements into it. If we leave out any element it throws error and 
		it doesn't work.
		For that reactive form provides a method "patchValues()" which can use as less as elements needed. ie we can leave out
		values of few elements.
			loadAPIWithSetValue() {
				this.userResgistration.setValue({
				  userName: "Rishabh",
				  password: "test",
				  confirmPassword: "test",
				  address: {
					city: "City1",
					state: "State",
					postalCode: 123456
				  }
				});
			  }

			loadAPIWithPatchValue() {
				this.userResgistration.patchValue({
				  userName: "Rishabh",
				  password: "test",
				  confirmPassword: "test"
				  // address: {
				  //   city: "City1",
				  //   state: "State",
				  //   postalCode: "Postal Code"
				  // }
				});
			  }
**************************************************************************************************************************************************************************
	
FormBuilder Service :
		Creating multiple formControl instances manually becomes very repetative. To avoid this ,angular provides FormBuilder service
		which in turn provides methods to handle generating formControls.
		We still create instance of formControls just like we did but with much lesser code.
		The formBuilder's group() method takes the formElements as an object . Each formElement holds an array ie 
			userName: []
		The 1st element in the array is the default vaue and the 2nd element is where we specify validation rules for that formControl.
			userName: ["Rishabh Kumar Sinha",Validators.required],
		To specify more than 1 validation rule in the 2nd element, we conver the second element into a list of values.
			userName: ["Rishabh Kumar Sinha",[Validators.required, Validators.minLength(3)]],
			
		import { FormBuilder } from "@angular/forms";
		export class AppComponent {
			constructor(private fb: FormBuilder) {}
			
			userResgistration = this.fb.group({
				userName: ["Rishabh Kumar Sinha"],
				password: ["test"],
				confirmPassword: ["test"],
				address: this.fb.group({
				  city: ["City1"],
				  state: ["State"],
				  postalCode: [123456]
				})
			  });
		  }
**************************************************************************************************************************************************************************
		  
Validations in Reactive Form :
	ReactiveForms contains a set of validator functions out of the box for common use cases. Unlike TDFs validation rules are specified
	in component class rather than the HTML Code. 
	
	Step1 : Apply Validation Rule to a FormControl.
	Step2 : Provide Visual FeedBack for the validation.
	Step3 :	Display Appropriate ErrorMessage for the validations.
	
	To be able to use builtIn validations we need to make use of Validators class.
	
	Simple Validations:
		The formBuilder's group() method takes the formElements as an object . Each formElement holds an array ie 
			userName: []
		The 1st element in the array is the default vaue and the 2nd element is where we specify validation rules for that formControl.
			userName: ["Rishabh Kumar Sinha",Validators.required],
		To specify more than 1 validation rule in the 2nd element, we conver the second element into a list of values.
			userName: ["Rishabh Kumar Sinha",[Validators.required, Validators.minLength(3)]],
		In the template we write code to display error messages on the basis of conditions:
			    <div class="form-group">
		  <label for="userName">Username</label>
		  <input formControlName="userName" [class.is-invalid]="userResgistration.get('userName').inValid && userResgistration.get('userName').touched" type="text" name="userName" id="" class="form-control"/>
		  <div *ngIf="userResgistration.get('userName').invalid && userResgistration.get('userName').touched">
			<small *ngIf="userResgistration.get('userName').errors?.required" class="text-danger">Username is required!!!</small>
			<small *ngIf="userResgistration.get('userName').errors?.minlength" class="text-danger">Username must be at least 3 characters long!!!</small>
		  </div>
		  <!-- <small
			[class.d-none]="
			  userResgistration.get('userName').valid ||
			  userResgistration.get('userName').untouched
			"
			class="text-danger"
			>Username is required!!!</small
		  > -->
		</div>
		
		
	Custom Validations:
		The builtIn validators won't always match the exact use case of the application.For such scenarios we can create our own custom validators.
		Suppose if we enter a userName as admin we should display an error saying admin username is not allowed.
		
		A custom validator is nothing but a function. A function can be written right in the component class. A validator function is
		usually resused in several places in our application its better to create it in a seperate file and export them.
		So we create a new folder inside app folder called shared and within that folder a new file called "user-name.validator.ts".
		
		Now we create the function here.It takes one parameter and that is the control that is being validated. The type of the Control is 
		AbstractControl. We also import the AbstractControl from @angular/forms.
		The validator function returns either of the two values. When the validation fails it returns an object where the key is of type string and
		the value is of type any. And if the validation passes it return null. 
		In the function body we first test that the formControl value matches the pattern of spam keyword(ie admin and superuser here).
		So we create a flag forbidden and on the RHS we use the test operator on the admin pattern. Basically what we are doing is if the
		username contains the string admin, we set the forbidden flag to true else we set it to false. So based on the forbidden flag,
		we can return either object or null. SO if forbidden, we return the error as "forbiddenName"(ie the key) and the value as the formControl
		Value.Else if the forbidden is false we simply return null.
		
			import { AbstractControl } from "@angular/forms";

				export function forbiddenNameValidator(
				  control: AbstractControl
				): { [key: string]: any } | null {
				  const forbidden1 = /admin/.test(control.value);
				  const forbidden2 = /superuser/.test(control.value);

				  return forbidden1 || forbidden2
					? { forbiddenName: { value: control.value } }
					: null;
				}
				
		To use the function outside we export it. Now we go to the component.ts file and to the list of validations,we add this method too.
			userResgistration = this.fb.group({
			userName: ["",[Validators.required, Validators.minLength(3), forbiddenNameValidator]],
			
		Now in the HTML template we add an errro message similar as the others. The error in our custom validation is forbiddenName,
		So we add:
		
			<small *ngIf="userResgistration.get('userName').errors?.forbiddenName" class="text-danger">
			Username {{userResgistration.get("userName").errors?.forbiddenName.value}}can't be used !!!</small>
		
		Its also possible to pass parameters to our custom validators. For ex. there can be a string that forbids password. So we should be
		able to pass in the string to forbud as a parameter to our custome validator function.
		Now the drawback of a validator function is that it cana ccept only 1 parameter that is AbstractControl . So we can't simply pass in 
		a second parameter. So instead what we need to do is create a factory function that accepts a string as a parameter and returns a
		validator function itself.
			
			import { AbstractControl, ValidatorFn } from "@angular/forms";
			
			export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn{
			  return (control: AbstractControl): { [key: string]: any } | null => {
				const forbidden1 = forbiddenName.test(control.value);  
				return forbidden1 ? { forbiddenName: { value: control.value } }: null;
			  }
			}
		Now in the component class we can specify the pattern as an argument.And it will work as before.
		
	Cross Field validations:
		Sometimes we need to comapare values between two different formControls to perform the necessary validations. Here we want to perform
		cross field validations with the password and confirm password fields. We need to confirm that both have the same values.
		
		For Cross field Validations we again have to create custom validator. Hence in the shared folder, just like the username validator , 
		we create another file for password validations.
		
		Now we create the function here.It takes one parameter and that is the control that is being validated. The type of the Control is 
		AbstractControl. We also import the AbstractControl from @angular/forms.
		The validator function returns either of the two values. When the validation fails it returns an object where the key is of type string and
		the value is of type any. And if the validation passes it return null. 
		
		With cross field validation what we have to make note is that the control parameter doesnot refer to an individual formControl.
		Instead it referes to formGroup encompassing the different fields being validated. So the control parameter refers to the
		registrationForm formgroup(in the component class). Hence we can access the formElements
		(password and confirmPassword easily by get() method)
		
			import { AbstractControl, ValidatorFn } from "@angular/forms";

			export function passwordValidator(
			  control: AbstractControl
			): { [key: string]: any } | null {
			  const password = control.get("password");
			  const confirmPassword = control.get("confirmPassword");
			  if (password.pristine || confirmPassword.pristine) {
				return null;
			  }

			  return password && confirmPassword && password.value != confirmPassword.value
				? { mismatch: true }
				: null;
			}

		
		Now we can add this passwordValidator in the component class to the formGroup. The validator is on the formGroup and not the formControl.
		So the 2nd argument to the formGroup method is the validator.
		
			userResgistration = this.fb.group(
			{
			  userName: [
				"",
				[
				  Validators.required,
				  Validators.minLength(3),
				  forbiddenNameValidator(/password/)
				]
			  ],
			  password: ["test"],
			  confirmPassword: ["test"],
			  address: this.fb.group({
				city: ["City1"],
				state: ["State"],
				postalCode: [123456]
			  })
			},
			{ validator: passwordValidator }
		  );
		
		Now we go to the HTML template and add the validations here to the confirmPassword element . 
		
		<div class="form-group">
		  <label for="confirmPassword">Confirm Password</label>
		  <input type="password" formControlName="confirmPassword" [class.is-invalid]="userResgistration.errors?.mismatch"
			name="confirmPassword" id="" class="form-control"/>
		  <small *ngIf="userResgistration.errors?.mismatch" class="text-danger">Passwords Do Not Match!!!</small>
		</div>
		
	Conditional Validations:
		At times , we want dynamic validations. ie a particular validation is to be applied only under certain conditions.
		We can easily do that in Reactive forms.
		Suppose we have an email field and it should be mandatory if the subscribe to offer checkbox is checked else non mandatory.
		To track the value of Suscribe check box we can make use of "valueChanges" property. This property returns an observable.
		We have to subscribe to the observable and conditionally apply the validation based on the formControl value.
		Once we have subscribed when the value changes, we get the checkedValue as a parameter. In the arrowfunction body what we do is 
		if the value is checked, we need to set the Required validator. For that we make use of setVaLidators method on the form control.
		else if the value is not checked we clear the validators using the method clearValidators() on the formControl.
		Finally we need to call the "updateValueAndValidity()" method to ensure correct status is reflected.
			this.userResgistration.get("subscribe").valueChanges.subscribe(checkedValue => {
				const email = this.userResgistration.get("email");
				if (checkedValue) {
				  email.setValidators(Validators.required);
				} else {
				  email.clearValidators();
				}
				email.updateValueAndValidity();
		  });
		Now that we are conditionally applying the validation we also add the visual feedback.
			 <div class="form-group">
			  <label for="email">Email</label>
			  <input formControlName="email" [class.is-invalid]="email.invalid && email.touched" type="text" name="userName" id="" class="form-control" />
			  <small [class.d-none]="email.valid || email.untouched" class="text-danger">Email is required!!!</small>
			</div>
**************************************************************************************************************************************************************************

Dynamic Form Controls:
	Many a times we may have to add multiple fields based on a button click.For ex: We may want to provide alternate address/ phonenumbers or email address.
	We strt off with a single input field and leave it up to the user to decide whether  they want to add more form fields and fill them out.
	This way we can keep the form concise and expand it only when necessary.
	
	
**************************************************************************************************************************************************************************	
Buttons:

<!--################START HERE################-->

        <!-- BUTTONS -->
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-info">Info</button>
        <button type="button" class="btn btn-warning">Warning</button>
        <button type="button" class="btn btn-danger">Danger</button>
        <button type="button" class="btn btn-light">Light</button>
        <button type="button" class="btn btn-dark">Dark</button>
        <button type="button" class="btn btn-link">Link</button>

        <br>
        <br>

        <!-- BUTTON TAGS/TYPES -->
        <a href="#" role="button" class="btn btn-primary">Link</a>
        <button type="submit" class="btn">Button</button>
        <input type="button" value="Input" class="btn btn-secondary">
        <input type="submit" value="Submit" class="btn btn-warning">
        <input type="reset" value="Reset" class="btn btn-info">

        <br>
        <br>

        <!-- OUTLINE BUTTONS -->
        <button type="button" class="btn btn-outline-primary">Primary Outline</button>
        <button type="button" class="btn btn-outline-secondary">Secondary Outline</button>
        <button type="button" class="btn btn-outline-success">Success Outline</button>
        <button type="button" class="btn btn-outline-info">Info Outline</button>
        <button type="button" class="btn btn-outline-warning">Warning Outline</button>
        <button type="button" class="btn btn-outline-danger">Danger Outline</button>
        <button type="button" class="btn btn-outline-light">Light Outline</button>
        <button type="button" class="btn btn-outline-dark">Dark Outline</button>

        <br>
        <br>

        <!-- BUTTON SIZES -->
        <button type="button" class="btn btn-lg btn-primary ">
            <i class="fa fa-user"></i> Large button</button>
        <button type="button" class="btn btn-sm btn-warning "><i class="fa fa-user"></i>Small button</button>
        <br>
        <br>
        <button type="button" class="btn btn-block btn-dark">Block level button</button>

        <br>
        <br>

        <!-- STATES -->
        <button type="button" class="btn btn-primary ">Regular Button</button>
        <button type="button" class="btn btn-primary active">Active Button</button>
        <button type="button" class="btn btn-primary disabled">Disabled Button</button>

        <button type="button" class="btn btn-warning" data-toggle="button">
            Toggle State
        </button>

        <br>
        <br>

        <!-- BUTTON GROUPS -->
        <div class="btn-group">
            <button class="btn btn-warning" type="button">Left</button>
            <button class="btn btn-primary" type="button">Middle</button>
            <button class="btn btn-success" type="button">Right</button>
        </div>

        <br></br>

        <!-- BUTTON TOOLBAR -->
        <div class="btn-toolbar">
            <div class="btn-group mr-2">
                <button class="btn btn-success" type="button">1</button>
                <button class="btn btn-success" type="button">2</button>
                <button class="btn btn-success" type="button">3</button>
                <button class="btn btn-success" type="button">4</button>
            </div>
            <div  class="btn-group mr-2">
                <button class="btn btn-warning" type="button">5</button>
                <button class="btn btn-warning" type="button">6</button>
                <button class="btn btn-warning" type="button">7</button>
            </div>
            <div class="btn-group">
                <button class="btn btn-primary" type="button">8</button>
            </div>
        </div>

        <br>
        <br>

        <!-- VERTICAL GROUP -->
        <div class="btn-group-vertical">
            <button class="btn btn-warning" type="button">Left</button>
            <button class="btn btn-success" type="button">Middle</button>
            <button class="btn btn-primary" type="button">Bottom</button>
        </div>

        <br>
        <br>

        <!-- BUTTON DROPDOWNS -->
        <div class="dropdown">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                My Dropdown
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Link One</a>
                <a class="dropdown-item" href="#">Link Two</a>
                <a class="dropdown-item" href="#">Link Three</a>
            </div>
        </div>

        <br>
        <br>

        <!-- SPLIT DROPDOWNS -->
        <div class="btn btn-group">
            <button class ="btn btn-primary" type="button">My Button</button>
            <button class=" btn btn-warning dropdown-toggle" data-toggle="dropdown" type="button">
                <span>Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Link One</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Link Two</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Link Three</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Link Four</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Link Four</a>
            </div>
        </div>
		
**************************************************************************************************************************************************************************
		
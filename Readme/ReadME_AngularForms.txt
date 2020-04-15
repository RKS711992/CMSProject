******************************************************************************************************************************************************************************
Forms:
  Vital to business applications
  Creates an experience that guides the user efficiantly and effectively through the workflow.
  As develepors we need to handle:
    DataBinding
    Change Tracking
    Validation
    Visual Feedback
    Error Messages
    Form Submission


******************************************************************************************************************************************************************************
Angular Forms:
  Two Appraches are there:
    1)  Template Driven Forms
    2)  Reactive Forms

******************************************************************************************************************************************************************************
Template Driven Forms(TDF):

  Easy to use and similar to AngularJS forms(ie angular1 forms)
  We heavily rely on 2 way data binding.We dont need to keep track of the input field value and react to change to the input field value.
  Angular takes care of that with ngModel Directives.
  As a result we'll have Bulky HTML Code and minimal Component code.
  In this approach angular provides ngForm Directive which alongwith the ngModel directive automatically tracks the form and form elements sate and
  validity.
  Drawback of TDF approach is when it comes to Unit Testing.The form validation logic cannot be unit tested . 
  The only way to test teh logic is to run an E2E Test with a browser.
  Second drawback is when it comes to handle complex forms.As we add more and more validations to a field or when we start adding complex cross field
  validations, the readability of the form decreases to a great extent.
  So when should we go with the TDF Approach? When we have to create a simple form , for which Unit Testing can be handled with the browser,go with the
  TDF apprach.
  For more complex forms with complex validations and where unit testing is absolutely necessary, go with Reactive forms.
  
Adding Form HTML:
  (form-group , form-control , form-check , form-check-input , form-check-label are Bootstrap Classes)
  
  First thing to work with Angular Forms is to Import FormsModule. In app.module.ts we import FormsModule in the imports[] array and import it too.
	import { FormsModule } from "@angular/forms";
	
	imports: [BrowserModule, AppRoutingModule, FormsModule],
	
  Now if we go to our app.component.html we still have the same basic HTML form but now behind the scenes , ANgular magic is already happenning.
  Anytime we use a <form> tag, angular attaches an ng-form directive to the form tag which provides us valueable informations about that particular form.
  It tells what the values of different form controls are and whether the values are valid or invalid? 
  So how do we get hold of this ng-form directive is by using a Template referance variable.
  
Binding data with ngForm:
  So to the <form> tag we add a template referance variable and to this variable we asign the string ngForm. 
	<form #userform="ngForm">
  So the ngForm directive exports itself as the string ngForm and by assigning it to a referance variable we have a referance to the directive itself.
  Now the referance gives access to the values of the form control. It does so by using the "value" property.
  So to let angular know which of the form controls to manage we have to add "ngModel" directive to the required form controls. ie:
	<input type="email" class="form-control" ngModel />
  Also alongwith the ngModel directive the name property is very much neccessary else we get an error like:
	If ngModel is used within a form tag, either the name attribute must be set or the form control must be defined as 'standalone' in ngModelOptions.
  So we set name attribute in each of the form controls ie:
	<input type="text" class="form-control" name="username" ngModel />
  Now it works without any errors.
  
  In addition to ngModel , angular also provides the ngModelGroup directive. We use the ngModel directive if we would like to group together or
  create a subgroup within a form.
  For example an Address. It can have a street , city, pin code.We can group all those using ngModelGroup directive.
  
  So in TDF , when it comes to data bindings,we have three directives ngForm, ngModel and ngModelGroup directive
  
Binding Data to a model:
   Now we need to bind formData to a model.As user enters the data we capture the changes amd update an instance of the model that can later be sent to the server.
   First step is to generate a model Class : ng generate class User
   we add the different properties of the user class.
   Now that we have the model we craete an instance of this class. So we create a new property in app.component.ts ie:
	userModel = new User("Rob", "rob@gmail.com", 9483208449, "", "morning", true);
   Now by having this instance of the model, its now possible to bind the userModel data to our enrollment form.
   Now binding the userModel to the form is really simple. We bind the properties of the model to the ngModel Directive an for property binding
   we make use of square brackets. hence we replace ngModel in the elements by [ngModel]="userModel.name"
   Now this will display the values in the text box and the values will be the same as what we provide in the instance we created.
   If we change the values in the textBox the values in the property wont change because what we did with [ngModel] is one way binding. We bind data from class to view but the reverse is not achieved by this.
   To achieve both we make use of 2-Way data binding (Banana in a box structure) ie we use [(ngModel)]. 
	<input type="text" class="form-control" name="username" [(ngModel)]="userModel.name"/>
   
Tracking state and validity:
	
	State									Class if true   		Class if false
  ------------------------------------------------------------------------------------
   The control has been visited				ng-touched				ng-untouched
   The control's value has been changed 	ng-dirty				ng-pristine
   The control's value is valid				ng-valid				ng-invalid
   
   Angular helps us with form validation by applying appropriate form controls to the form. 
   If we add a template referance variable to the name input element and print the classes being applied to that text box by interpolation,
   we see the different classes that are in action by angular to that field.
	<div class="form-group">
      <label>Name </label>
      <input type="text" #name class="form-control" name="username" [(ngModel)]="userModel.name"/>
    </div>
    {{ name.className }}
   Output on Screen Load: form-control ng-untouched ng-pristine ng-valid
   if we change the value in textbox then:
   Output on Screen : form-control ng-valid ng-dirty ng-touched
   
   Although these classes can be used to provide visual feedbacks, angular also provides an alternative. 
   For each of the classes angular provides an associated property on the ngModel directive. 
   The property is basically the same as the class with the ng- removed. ie:
		Class			  Property
    ------------------------------------
	  ng-touched			touched
	  ng-untouched			untouched
	  ng-pristine			pristine
	  ng-dirty				dirty
	  ng-valid  			valid
	  ng-invalid			invalid
	  
	 Now to access the ngModel properties , we simply need to create a reference to ngModel directive. Now by the template reference variable ie #name 
	 points to the input element in the DOM. By assigning it a value of "ngModel" , the referenceVariable now points to the ngModel of this particular form contol
	 Now that we have a reference to ngModel, we can easily bind to the different properties.
	 ie like : 
			<input type="text" #name="ngModel" class="form-control" name="username" [(ngModel)]="userModel.name" required/>
		</div>
		{{ name.valid }}
	 
	 So validation of the elements can be done like below:
		<div class="form-group">
		  <label>Email </label>
		  <input type="email" class="form-control" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" [(ngModel)]="userModel.email"
		  #email="ngModel" [class.is-invalid]="email.invalid && email.touched" required/>
		  <div *ngIf="email.errors && (email.invalid || email.touched)">
			<small class="text-danger" *ngIf="email.errors.required">Email is required!!!</small>
			<small class="text-danger" *ngIf="email.errors.pattern">Email format is incorrect!!!</small>
		  </div>
		</div>
	What we basically do is we create a templateReferanceVariable for email element ie #email, then bind it to ngModel Directive ie #email=ngModel.
	Now we use this templateReferanceVariable(ie email) to check if its inValid or touched (by: email.invalid and email.touched). 
	Also to check and show custom messages we use the ngIf directive of angular and check if there are any errors in the fiels and what kind of errors.
		*ngIf="email.errors && (email.invalid || email.touched)
		class="text-danger" *ngIf="email.errors.required"
		class="text-danger" *ngIf="email.errors.pattern"
	Now for the select tag we are not providing any default value in the value property ie:  <option value="">I am interested in</option>
	And when there is no default value passed from api or from the value property, the below error works:
		<div class="form-group">
		  <select class="custom-select" name="topic" [(ngModel)]="userModel.topic" required #topic="ngModel"
		  [class.is-invalid]="topic.invalid && topic.touched">
			<option value="">I am interested in</option>
			<option *ngFor="let topic of topics">{{ topic }}</option>
		  </select>
		  <small class="text-danger" [class.d-none]="topic.valid || topic.untouched">Please choose a topic!!!</small>
		</div>
	But if a default value is provide then it will create a problem.The validation will fail.This validation works only for an empty value. 
	To overcome that what we need is custom validation for select control.We do the following:
	We will listen to the blur and change event on select controls.In the event handler we are going to check if the value is a default value. 
	If its true we set an errorFlag to true. We use that error class to conditionally apply classes and display the error message.
		<div class="form-group">
		  <select class="custom-select" name="topic" [(ngModel)]="userModel.topic" #topic="ngModel"
		  [class.is-invalid]="topicHasError && topic.touched" (blur)="validateTopic(topic.value)" (change)="validateTopic(topic.value)">
			<option value="default">I am interested in</option>
			<option *ngFor="let topic of topics">{{ topic }}</option>
		  </select>
		  <small class="text-danger" [class.d-none]="!topicHasError || topic.untouched">Please choose a topic!!!</small>
		</div>
	in component.ts we create the below property and method:
		topicHasError = true;
		validateTopic(value) {
		if (value === "default") {
		  this.topicHasError = true;
		} else {
		  this.topicHasError = false;
		}
	  }
	  
	  Now we can also do a form level validation similarly as above and we can use it to enable/disable the Submit button.
		<button [disabled]="userform.form.invalid" type="submit" class="btn btn-primary">Submit Form</button>
	  Now this works perfectly fine if there is no custom validation that the Form is not validating. In our case it is the select tag valuidation that
	  is not being tracked by form, For that in our case we do this:
		<button [disabled]="userform.form.invalid || topicHasError" type="submit" class="btn btn-primary">Submit Form</button>
	
	

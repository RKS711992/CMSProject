******************************************************************************************************************************************************************************
Component: 
  Metadata is attached to this class AppComponent in the form of a decorator.
    import { Component } from "@angular/core";

    @Component({
      selector: "app-root",
      templateUrl: "./app.component.html",
      styleUrls: ["./app.component.css"]
    })
    export class AppComponent {
      title = "cmsProject1";
    }

  To be specific a Component decorator.A component decorator is basically a function that attaches to the class right below it.
  So here its attached to the AppComponet class. Its this decorator that tells angular that its not a plain class, its a component. The Component decorator contains both the metadata and the template that contains the view.

  Whenever we create a new component the application must be made aware of this new component. Hence the app.module.ts file gets updated with the import stament of the newComponent and in the Declarations array also this newComponent gets added.

  Changes that can be done on the components:
  Now there are 3 ways to specify a selector.                                                                                           
    1:selector: "app-test" and use it as a tag in the HTML ie <app-test></app-test>                                                   
    2:Using it as a class :selector: ".app-test" and in the HTML we can use a div tag with class name as app-test like this: <div class="app-test"></div>                        3:To enclose the selector in square brackets like selector: ["app-test"], and use it in the HTML as an attribute to div tag like :<div app-test></div>

  The next thing we can change is the template property. wht we have is a templateUrl that points to the HTML file for the component.
  But in any component it is also possible to specify the template inline ie in the same .ts file and for that we use the template property
  Change templateUrl to template and then within singleQuotes we write what we want to display. like this:
  templateUrl: '<div>Inline Template</div>',
  Sometimes our inline HTML may expand a couple of lines. For that we use backTicks (`). So we use backTicks instead of singleQuotes and our inlineHTML can expand to multiple lines.

  The next thing we can change is the styles property. Same as template property we can include inline styles too. 
  Change styleUrls to styles and then within backTicks we write what the css.
  styles: [`
  div{ color:red;}
  `]


******************************************************************************************************************************************************************************
Interpolation:
  Its the simplest way to bind data from a class to the template.Some of the things we can do through Interpolation are:
  Addition({{2+2}} shows 4), Concatenation({{"Welcome "+ title}} shows Welcome cmsProject1) , Javascript methods like {{title.length}} ,{{title.toUpperCase()}} and also builtIn functions works.
  What we cant do are:
   Assigning the expression to a variable like {{a= 2+2}}
   Access to global variable {{window.location.href}} ( we can show it by creating variable in the class and use it in here.)

******************************************************************************************************************************************************************************

Property Binding:
  Attribute vs Property:
    Attributes and properties are not the same.
    Attributes are defined in HTML but Properties are defined by DOM(Document Object Model)
    Attributes initialize DOM properties and then they are done.Attribute values cannot change once they are initialized.
    Property values can however change.
    Ex:
      Consider an input element <input type="text" value="Rishabh"> so in the browser we have an Input element(Text Box here) filled with the String Rishabh. If i inspect this element and in the console type $0(which represents the current element, the input element) $0.getAttribute('value') we can see Rishabh 
      Similarly if I type $0.value we can see Rishabh. Now if i change the text in the textbox from Rishabh To Sinha and print the same as above we get that 
      $0.getAttribute('value') still returns Rishabh but $0.value returns Sinha(the new value in the textbox). So the Attribute didn't change but the value property did change.
    So to use property binding , we have the syntax as : <input [id] ="myId" type="text" value="Rishabh"> (where we decare public myId ="testId"). SO in the browser inspect we see the above has changed to <input id ="testId" type="text" value="Rishabh"> So we are binding to the id Property of this input element, hence Property Binding. 
    We can also use interpolation for this property binding like: <input id ={{myId}} type="text" value="Rishabh">. So why do we need property binding is that interpolation has some limitation. It can only work with string values and there are HTML Properties that are boolean properties that we may need to sometimes bind to.
    Example is the disabled property. Its presence alone makes the input element disabled and even if we bind it through interpolation , it wont work.
    So we use Property binding here to enable and disable it. <input [disabled] ="false" [id] ="myId" type="text" value="Rishabh"> 
    So we can create a property in th class and bind it to the input elemet: public isDisabled = true;
      <input [disabled] ="isDisabled" [id] ="myId" type="text" value="Rishabh"> 
    We can also write the property binding in a different syntax like below:
      <input bind-disabled ="isDisabled" [id] ="myId" type="text" value="Rishabh">

******************************************************************************************************************************************************************************

Class Binding and ngClass Directive:
  It allows us to dynamically add or remove classes to HTML elements based on certain user interactions or state of the application .
  If we create a property public successClass = "text-success" and in the html we use this:
   <h2 [class]="successClass">Rishabh</h2>
  It will work accordingly but if we add the regular class attriibute also in the element like below:
   <h2 class="text-danger" [class]="successClass">Rishabh</h2> 
  We see there is no change in the text(its same as before we saw with [class]).
  The regular class attribute becomes a dummy attribute when we have a classBinding present. So we have to use one or the other but not both.
  There is another syntaxt for class binding which we use to apply classes conditionally (on the basis of expression). We create a property public hasError = true;
  Now we create the HTML element as below:
    <h2 [class.CLASS_WE_WANT_TO_APPLY]="ConditionExpression">Rishabh</h2> that is : <h2 [class.text-danger]="hasError">Rishabh</h2>   
  Now this works fine if we want to conditionally apply a single class. But what if we need to apply different classes conditionally. 
  For thatAngular provides "ngClass Directive". A directive is nothing but a custom HTML attribute that angular provides. The syntax is like below:
  We declare the below class properties: 
    public isSpecial =true;
    public messageClasses = {
      "text-success": !this.hasError,
      "text-danger": this.hasError,
      "text-special": this.isSpecial,
    }
In the template we write:
  <h2 [ngCLass] ="WE_BIND_THE_REQUIRED_OBJECT">Rishabh</h2> that is: <h2 [ngCLass] ="messageClasses">Rishabh</h2>
So what happens is that angular identifies that "messageClasses" has to be applied to this element and in the Object it checks which classes are set to true.All such classes are applied.

******************************************************************************************************************************************************************************

Style Binding and ngStyle Directive:
  In angular style binding is used to apply inline styles to HTML elements and style binding is very similar to class binding.
  We do it as below:
    <h2 [style.THE_CSS_PROPERTY_WE_WANT_TO_BIND_TO]="'TYPE'">StyleBinding</h2>  that is : <h2 [style.color]="'orange'">StyleBinding</h2> 
  So in style Binding its possible to use conditional operator to assign a value to css property.
    <h2 [style.THE_CSS_PROPERTY_WE_WANT_TO_BIND_TO]="condition?'TYPE1':'TYPE2'">StyleBinding</h2>  that is: <h2 [style.color]="hasError?'red':'green'">StyleBinding</h2> 
  So on the basis of the class Property hasError the html elemts's color will change.
  Now we can also apply component class property during binding like below:
    public textColor ="orange";
    <h2 [style.THE_CSS_PROPERTY_WE_WANT_TO_BIND_TO]="COMPONENT_CLASS_PROPERTY">StyleBinding</h2>  that is: <h2 [style.color]="textColor">StyleBinding</h2> 
  Now we can also apply multiple Styles by using ngStyle directive.Its the same as ngClass directive.   
    public titleStyles = {
      color: "blue",
      fontStyle: "italic" // We cannot use hyphen in font-style so we use camelCase with S capitals      
    }
  In the template we write:
    <h2 [ngStyle] ="WE_BIND_THE_REQUIRED_OBJECT">Rishabh</h2> that is: <h2 [ngStyle] ="titleStyles">Rishabh</h2>

******************************************************************************************************************************************************************************

Event Binding:
  Sometimes to respond to user events(such as MouseClick or KeyboarEvents) we need the data flow from the template to the class as well. So to capture events we use EventsBindings.
  ** DATA BINDING IS CLASS TO TEMPLATE INTERACTION AND EVENT BINDING IS THE REVERSE.
  Suppose we have a Button in our template and when the user clicks the button it will display a message: "Welcome User". So we need to listen to the click event on this button. The syntax is as:
    <button (DOM_EVENT_WE_WANT_TO_LISTEN)="EVENT_HANDLER_METHOD">Greet</button> that is: <button (click)="onClick()">Greet</button>
  We cretae the onClick() method in the COmponent class:
    onclick(){
      console.log("Welcome User")
    }
Sometimes we may wnt the information about the Event itself.For that we simply send in a parameter in the event handler. The variable is " $event ".
$event is a special variable for angular. It gives us all the information about the DOM event that was raised. So we add it in the EVENT_HANDLER_METHOD as a parameter and use it in the method in the class.EX:
  <button (DOM_EVENT_WE_WANT_TO_LISTEN)="EVENT_HANDLER_METHOD_WITH_$event_VARIABLE_AS_PARAMETER">Greet</button> that is: 
  <button (click)="onClick($event)">Greet</button>
  {{greeting}}
  We cretae the onClick() method in the COmponent class:
    public greeting;
    onclick(event){
      console.log(event)
      this.greeting = event.type   
    }
Sometimes when we work with eventBinding, a aeperate event handler may not be necessary. For instance, in our example, the method body is very small . SO we can have it as a template statement right in the HTML itself. Ex:
  <button (click)="greeting='Welcome User'">Greet</button>


******************************************************************************************************************************************************************************

Template Referance Variables:
  When there is a user interaction, sometimes we want some data to flow from VIEW to the CLASS to perform an opertion.We may require the value in the input field to perform some validations.
  So to easily access DOM elements and there properties, Angular provides TemplateReferanceVariables.
  So suppose we have an input element and a button in the Template. What we want is to show what we enter in the text box on the button Click. To do that first we need to bind to the click Event on the button and when the click event is captured we call the log() method. To this method we need to pass in the value of the input element as an argument. The way we do that is using TEMPLATE REFERANCE VARIABLES.
  The syntax is simpe.In the opening tag of the the input element we want a referance. We do it by adding # symbol followed by a name of the variable.Like #myInput. And now in the method defination pass the variable(without #symbol) as a parameter. And in the method declaration we can use this for our purpose.

  <input #TEMPLATE_REFERANCE_VARIABLE type="text">
  <button (DOM_EVENT_WE_WANT_TO_LISTEN)="EVENT_HANDLER_METHOD_WITH_TEMPLATE_REFERANCE_VARIABLE_AS_PARAMETER">LOG</button> 
  that is:  
  <input #myInput type="text">
  <button (click)="logInfo(myInput)">LOG</button>
  in the component class:
    logInfo(value){
      console.log(value.value)      
    }

******************************************************************************************************************************************************************************

Two Way Binding:
  When we work with form inputs Its essential that our model and view are in sync, otherwise the data might not be consistent.
  Consider a login form: This has a username and password and the corressponding Component Class has properties username and Password too.
  Whenever a user updates these input controls, the Model properties should automatically receive these changed values.And when there is an update in the Model Property Vlaues then the View must automatically reflect the updated values.
  Angular provides a feature called : 2 Way binding   
  It allows us to update a property and at the same time display the value of the property.For this, angular provides another directive callled ngModel Directive.
  Its in a seperate module called FormsModule. We must import it in the app.module.ts to use ngModel Directive.
  (import { FormsModule } from '@angular/forms'
  imports:[
    FormsModule
  ])
  2 way binding is done like this:
  In Component class :
    public name =""
  In Template:
    <input [(ngModel)] ="name" type="text">
    {{name}}


******************************************************************************************************************************************************************************

Structural Directives:
  It enables to add or remove HTML elements from the DOM.
  3 Common Built in Structural Directives: ngIf; ngSwitch; ngFor

  ngIf:   Conditionally render HTML elements.
          *ngIf="COMPONENT_CLASS_PROPERTY" ex: 
            public displyName =true;
            <h2 *ngIf="displayName"> Rishabh </h2>
          
          
  ngIfElse: <h2 *ngIf="COMPONENT_CLASS_PROPERTY;else NGTEMPLATE_REFERANCE_VARIABLE"> Rishabh </h2>
            <ng-template #NGTEMPLATE_REFERANCE_VARIABLE> <h2> Sameer </h2></ng-template>

              <h2 *ngIf="displayName; else elseBlock"> Rishabh </h2>
              <ng-template #elseBlock>
                <h2> Sameer </h2>
              </ng-template>

  ngIfThenElse: <div *ngIf="COMPONENT_CLASS_PROPERTY;then #NGTEMPLATE_REFERANCE_VARIABLE_FOR_THEN_BLOCK ; else NGTEMPLATE_REFERANCE_VARIABLE_FOR_ELSE_BLOCK"> </div>
                <ng-template #NGTEMPLATE_REFERANCE_VARIABLE_FOR_THEN_BLOCK> 
                  <h2> Rishabh </h2>
                </ng-template>
                <ng-template #NGTEMPLATE_REFERANCE_VARIABLE_FOR_ELSE_BLOCK>
                  <h2> Sameer </h2>
                </ng-template>


ngSwitch : Its the same as Switch statement in any programming language except that instead of executing some logic we render HTML here.
           We basically use ngSwitch when we have to compare multiple values.
           <div [ngSwitch] ="COMPONENT_CLASS_PROPERTY">
              <div *ngSwitchCase="'COMPONENT_CLASS_PROPERTY_VALUE1'">OUTPUT1</div>
              <div *ngSwitchCase="'COMPONENT_CLASS_PROPERTY_VALUE2'">OUTPUT2</div>
              <div *ngSwitchCase="'COMPONENT_CLASS_PROPERTY_VALUE3'">OUTPUT3</div>
              <div *ngSwitchDefault>DEFAULT_OUTPUT</div>
           </div>


ngFor : Its the same as for loop statement in any programming language except that instead of executing some logic we render HTML here.
        public COMPONENT_CLASS_PROPERTY = ["VALUE1","VALUE2","VALUE3"];

        <div *ngFor= "let VARIABLE_NAME of COMPONENT_CLASS_PROPERTY">
          <h2>{{VARIABLE_NAME}}</h2>
        </div>

        <div *ngFor= "let VARIABLE_NAME of COMPONENT_CLASS_PROPERTY; index as i">
          <h2>{{i}} {{VARIABLE_NAME}}</h2>
        </div>

        Similar to index we can have other keywords as well. like : first as f (SHOWS TRUE FOR FIRST ELEMENT OF ARRAY) ; last as l (SHOWS TRUE FOR LAST ELEMENT OF ARRAY);
        odd as o (SHOWS TRUE FOR ELEMENTS OF ARRAY HAVING ODD INDEX);  even as e (SHOWS TRUE FOR ELEMENTS OF ARRAY HAVING EVEN INDEX)

******************************************************************************************************************************************************************************

Component Interaction:
  Using @Input Decorator the child can accept inputs from parent
	Using @Output Decorator the child will send out events to parent to indicate something.

  SO we create a COMPONENT_CLASS_PROPERTY in the parent component(app.component.ts) like: public name  ="Rishabh" 
  To send this property in the child component we go to app.component.html and in the child Component tag we bind the property.
    <app-child [parentData]="COMPONENT_CLASS_PROPERTY"></app-child> that is : <app-child [parentData]="name"></app-child>
  Now we are sending the data to the child component. Now we go to child component and receive this data:
  We declare the same property the app.component is sending ie: public parentData; 
  We now need a way to inform the child component that this is not a normal Class property. Its an Input property and we are receiving it from the parent.The way we do that is by using and Input Decorator(@Input()) ie : @Input() public parentData and we import Input decorator from '@angular/core'
  Now we can bind this property into the Chicld Component Template.

  Sometimes we need to have a different name of the property and not the same as what the Parent component is sending. To do that we follow the below way:
    @Input('parentData') public name;

  Now we want to send dta the other way round. From the child component to the parent Component. In Parent component HTML we have the child Component selector where we bind the data but , in the child component HTML we dont have the parent component selector. So we cant do the same here.
  What we do is send the data to parent components using EVENTS. 
  So 1st we create an instance of EventEmitter class. ie : public childEvent = new EventEmitter();
  Now to send the childEvent to parent , we use the @Output() decorator. ie : @Output() public childEvent = new EventEmitter();
  Now we emit the event using a click method like this: 
    <button (click)="fireEvent()">FIRE EVENT</button>
    fireEvent(){
      this.childEvent.emit('Hey Parent Componet.Hello from Child COmponent!!!')
    }
  Now in app.component.html(Parent template) we capture the event being sent from the Child Component. Same as we bind to a click event, we can also bind to a custom event as well. so within the selector <app-child> we can capture childEvent like : 
    <app-child (childEvent)="childMessage=$event" [parentData]="name"></app-child>
  We declare the property childMessage in parent component ie like this: 
    public childMessage=""; and use it in the Parent Template with interpolation : {{childMessage}}


******************************************************************************************************************************************************************************

Pipes:
  It allows us to transform data before displaying it in the view.
  public name = "Rishabh"
  public message = "Welcome to the future"
  public person = {"firstName": "Rishabh, "lastName" : "Sinha"}
  public date = new Date();

  Pipes for String Properties:
    <h2>{{name}}</h2>
    <h2>{{name | lowercase}}</h2>
    <h2>{{name | uppercase}}</h2>
    <h2>{{message | titlecase}}</h2>
    <h2>{{message | slice:3:5}}</h2>
    <h2>{{person | json}}</h2>

  Pipes for Number Properties:
    <h2>{{5.678 | number: '1.2-3'}}</h2> // Output  5.678
    <h2>{{5.678 | number: '3.4-5'}}</h2> // Output  005.6780
    <h2>{{5.678 | number: '3.1-2'}}</h2> // Output  005.68
    
    <h2>{{0.25 | percent}}</h2> // Output  25%
    
    <h2>{{0.25 | currency}}</h2> // Output  0.25$
    <h2>{{0.25 | currency: 'INR': code}}</h2> // Output  INR0.25
    <h2>{{0.25 | currency: 'GBP'}}</h2> // Output  in pounds0.25

    <h2>{{date}}</h2> // Output is super long the complete date
    <h2>{{date | date: 'short'}}</h2> // 01/16/20, 9:49PM
    <h2>{{date | date: 'shortDate'}}</h2> // 01/16/20
    <h2>{{date | date: 'shortTime'}}</h2> //  9:49PM
    <h2>{{date | date: 'short'}}</h2> // 01/16/20
    Similarly we have mediumDate,mediumTime, longDate,longTime


******************************************************************************************************************************************************************************

Services:
  A class with a specific purpose.  Naming convention:  employee.service.ts
  We need Services because:
    1) To share data accross multiple components.
    2) To implement application logic
    3) To use for external interactions(like connect to a DB etc)


Dependency Injection:
  DI is a coding pattern in which a class receives its dependencies from external sources rather than creating them itself.

  DI as a framework:
    1) Define the service class
    2) Register with Injector
    3) Declare as Dependency in the required classes.


 1) Define the service class : 
        ng g s employee and then include the code required to be provided by the service.
 
 2) Register with Injector :
        There can be multiple places where we can register the service but the place where we register our service is important because Angular has a heirarchial Dependency Injection system. 
        For Ex: AppModule has AppComponent and AppComponent has two Child Components say EmployeeList and EmployeeDetails 
        Now here is how the Angular DI System will work: If We register in the EmployeeList Component, the service will be availaible in the EmployeeList Component and its Childrens.
        No other components(Not even the EmployeeDetails component) can use it. So this is not a good choice.
        Now if we register the service with the AppComponent then the service will be avialible to both EmployeeDetails Component and the EmployeeList component and their Child Components. This works fine , but each module is usually a feature area in our application and might grow.
        So its better to register the service in the Module Level so that Components under the AppModule cn use it.
        And to register a service , we use Providers metadata.
        So in app.module.ts include The serivce in providers array i providers:[EmployeeService]

3) Declare as Dependency in the required classes.:
        Now in the required component class's Constructor, we provide the service as an Argument. This is theDependency Injection of the Service to the class.
        Post this the Service will be availaible to be used in that component. ie:

        import { EmployeeService} from '../services/EmployeeService';

        export class EmployeeList{
          constructor(private _employeeService EmployeeService){}
          ngOnInit(){
            this._employeeService.getEmployeeList();
          }
        }


Now in the Service we create we hav @Injectable() decorator added to it. This makes the class a Service. It means that this Service might itself has injected dependencies.
So if we want to inject a service into another service, @Injectable decorator is a must.
Right now the EMployeeService doesn't have a dependency, so the @Injectable() decorator is not necessary now, but as soon as we want to include a dependency to it we need the @Injectable() decorator.
So its recommended to have the @Injectable() decorator in a service and since Angular CLI follows the best practice so whenever we create a service we get the @Injectable() decorator in it automatically.
But the other Component Classes doesn't have the @Injectable() decorator and they are still using services as DI, this is because the COmponentClasses have the @Component decorator that lets angular know that this class might have dependencies and might make use of the DI system.


******************************************************************************************************************************************************************************

HTTP,Observables and RxJS:
  In real world we need data from a server and provide it to our application.We need an HTTP Call to a server and fetch data from it.

  Http Machanism:
    the EmployeeList and EmployeeDetails Componet gets data from EmployeeService Class. We need to send a HTTP Get request which will hit a WebAPI or a WebService which will fetch the data from a DB and Send it back as an HTTP Response . The response we get back from the HTTP Call is known as an Observable. The EMployeeService needs to cast this observable into the required format and then return the same to both th component classes.

    So the HTTP Mechanism is just two steps: Send the HTTP Request and Receive the HTTP Response

Observables:
  Its a sequence of items that arrive asynchronously over time. So in the language of HTTP mechanism, its the HTTP Response we recieve Asynchrounsly.
  So what we do is : 
  We make a GET_REQUEST from the SERVICE to the DATABASE and we recieve an HTTP_RESPONSE as an OBSERVABLE.
  The OBSERVABLE is not in a format that we can use readily in our application.
  So once we recieve the OBSERVABLE we need to convert it in application understandable format. After the conversion the data is ready to be provided to our COMPONENTS in the application.
  We only provide data from the OBSERVABLE to the components which have SUBSCRIBED the service.
  After SUBSCRIBING its upto the COMPONENTS to do whatever they want to do with the subscribed data.

STEPS:
  1) HTTP GET request from the sevice.
  2) Receive the Observable and cast it accordingly.
  3) Subscribe to the Observable from the Components.
  4) Assign the casted data into a variable.

  RxJS:  Reactive extension for Javascript.
         External Library to work with Observables.

  Till Angular 4 we were using HTTPModule, but from Angular version 5 we started using HTTPClientModule.
  The HTTPClientModule provides a simplified API for HTTP Functionalities for use with Angular applications.
  So in app.module.ts we add HTTPClientModule in the imports array so that it can be accessible to theAppModule. By importing it we are also registering the HTTPService with angular injectors.We dont need to explicitly do it, the HTTPClientModule does it automatically.
  
  Now in our service class we declare the HTTPClient as a dependency in the constructor. 
    ie constructor(private http: HTTPClient)
  So now we have a local variable in the service from DI to refer to an instance of HTTPClient. Now we make a GET request to fetch data using HTTP. Now the get() method takes a URL as its argument.So we provide the relevant URL to fetch data.

  Suppose for now we create a json file having data in the assets/data folder and assign it to a variable and use it in the URL location in the get() method.
    private _url : String =  "/assets/data/employee.json";

    getEmployees(){
      return this.http.get(this._url);
    }
  Now the get() method returns an Observable. And we want to suppose recieve the Observable as an array of employees . SO we provide the type in the method( as generics from JAVA) ie :
    getEmployees(): Observable<IEmployee[]>{
        return this.http.get<IEmployee[]>(this._url);// Where IEmployee is an interface created to handele the return type here.
    }
  So we have cast the observable into the desired type(here an array)

  Now we go to component which uses these services and here we subscribe to the Observable we are getting from Service .
  ie :
        private employees = [];
        constructor(private _employeeService: EmployeeService )
        ngOnInit(){
            this._employeeService.getEmployeeList().subscribe(
              data=> this.employees = data// Here the LHS(ie data) is the argument to the fatArrowFunction and the RHS(ie  this.employees = data) is the body of the function
            );
          }
    
  Now we know an Observable is returned from an HTTP Call. So to handle an exception on an Observable , we use a catch operator. So 1st we have to import the catch Operator like: 
    import 'rxjs/add/operator/catch'
  now we add the catch opertor on our Observable.The catch() operator takes in a method name as an argument ie .catch(this.errorHandler) and this is the method that gets called whenever there is an exception.
    getEmployees(): Observable<IEmployee[]>{
        return this.http.get<IEmployee[]>(this._url)
                        .catch(this.errorHandler);
        // Where IEmployee is an interface created to handele the return type here.
    }
  Now we declare the errorHandler() method which has a parameter of type HttpErrorResponse. Now we know that the service class doesn't have a view of its own , but its important to inform our users if there is an error/exception because if not they will be staring at a blank screen which is poor User Experience. So in this method we throw the error message so that any Component which has subscribed to the observable can make use of it and show the message. 
  like: 
    import 'rxjs/add/observable/throw'

    errorHandler(error: HttpErrorResponse){
      return Observable.throw(error.message || "Server Error");// we im
    }

 Now we have to display the thrown error to the UI. So in the component, just like we get the data while suscribing we can also get an error. The second argument to the subscribe() method is a fatArrow function too, but this function deals with the error scenario. Like:
        private employees = [];
        public  errorMsg ="";
        constructor(private _employeeService: EmployeeService )
        ngOnInit(){
            this._employeeService.getEmployeeList().subscribe(
              data=> this.employees = data,
              error=> this.errorMsg = error// Here the LHS(ie data) is the argument to the fatArrowFunction and the RHS(ie  this.employees = data) is the body of the function
            );
          }
      And in the view we display the errorMsg by interpolation ({{errorMsg}}).


******************************************************************************************************************************************************************************

Routing and Navigation In Angular:
  WildCard Routes and Redirecting Routes  
  Route Parameters 
  paramMap Observable
  Optional Route Parameters
  Relative Navigation
  Child Routes
  
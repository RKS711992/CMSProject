import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { LoginComponent } from "./components/login/login.component";
import { SelectApplicationComponent } from "./components/select-application/select-application.component";
import { CreateProductComponent } from "./components/create-product/create-product.component";
import { ViewProductsComponent } from "./components/view-products/view-products.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ErrorComponent } from "./components/error/error.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { HttpIntercepterBasicAuthService } from "./services/http/http-intercepter-basic-auth.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SelectApplicationComponent,
    CreateProductComponent,
    ViewProductsComponent,
    EditProductComponent,
    NotFoundComponent,
    ErrorComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    SidebarComponent,
    SettingsComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // Specify the library as an import
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterBasicAuthService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

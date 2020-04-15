import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SelectApplicationComponent } from "./components/select-application/select-application.component";
import { CreateProductComponent } from "./components/create-product/create-product.component";
import { ViewProductsComponent } from "./components/view-products/view-products.component";
import { ErrorComponent } from "./components/error/error.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { RouteGuardService } from "./services/route-guard.service";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  { path: "cms", component: LoginComponent },
  {
    path: "cms/select-app/:name",
    component: SelectApplicationComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "cms/create-product",
    component: CreateProductComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "cms/create-product/:id",
    component: CreateProductComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "cms/view-products",
    component: ViewProductsComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "cms/logout",
    component: LogoutComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "cms/settings",
    component: SettingsComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "cms/register",
    component: RegisterUserComponent,
    canActivate: [RouteGuardService]
  },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

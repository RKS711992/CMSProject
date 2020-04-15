import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductInfo } from "../components/view-products/view-products.component";
import { JPA_API_URL, API_URL } from "../app.constants";
import { BasicAuthService } from "./basic-auth.service";

@Injectable({
  providedIn: "root"
})
export class ProductDataService {
  constructor(
    private http: HttpClient,
    private basicAuthService: BasicAuthService
  ) {}

  retrieveAllProducts(username) {
    /* let httpHeader = new HttpHeaders({ Authorization: this.basicAuthService.createBasicHttpHeaders() });
    return this.http.get<ProductInfo[]>(`${JPA_API_URL}/users/${username}/products`, { headers: httpHeader })*/
    return this.http.get<ProductInfo[]>(
      `${JPA_API_URL}/users/${username}/products`
    ); // Using HTTPINTERCEPTOR
    // return this.http.get<ProductInfo[]>(`${API_URL}/users/${username}/products`) // Using HTTPINTERCEPTOR
  }
  retrieveProductById(username, id) {
    /*let httpHeader = new HttpHeaders({ Authorization: this.basicAuthService.createBasicHttpHeaders() });
    return this.http.get<ProductInfo>(`${JPA_API_URL}/users/${username}/products/${id}`, { headers: httpHeader })*/
    return this.http.get<ProductInfo>(
      `${JPA_API_URL}/users/${username}/products/${id}`
    ); // Using HTTPINTERCEPTOR
    // return this.http.get<ProductInfo>(`${API_URL}/users/${username}/products/${id}`) // Using HTTPINTERCEPTOR
  }
  deleteProductById(username, id) {
    /*let httpHeader = new HttpHeaders({ Authorization: this.basicAuthService.createBasicHttpHeaders() });
    return this.http.delete<ProductInfo>(`${JPA_API_URL}/users/${username}/products/${id}`, { headers: httpHeader })*/
    // return this.http.delete<ProductInfo>(`${API_URL}/users/${username}/products/${id}`) // Using HTTPINTERCEPTOR
    return this.http.delete<ProductInfo>(
      `${JPA_API_URL}/users/${username}/products/${id}`
    ); // Using HTTPINTERCEPTOR
  }
  createProduct(username, product) {
    /*let httpHeader = new HttpHeaders({ Authorization: this.basicAuthService.createBasicHttpHeaders() });
    return this.http.post(`${JPA_API_URL}/users/${username}/products`,product, { headers: httpHeader })*/
    return this.http.post(`${JPA_API_URL}/users/${username}/products`, product); // Using HTTPINTERCEPTOR
    // return this.http.post(`${API_URL}/users/${username}/products`, product) // Using HTTPINTERCEPTOR
  }
  updateProduct(username, id, product) {
    /*let httpHeader = new HttpHeaders({ Authorization: this.basicAuthService.createBasicHttpHeaders() });
    return this.http.put(`${JPA_API_URL}/users/${username}/products/${id}`,product, { headers: httpHeader })*/
    return this.http.put(
      `${JPA_API_URL}/users/${username}/products/${id}`,
      product
    ); // Using HTTPINTERCEPTOR
    // return this.http.put(`${API_URL}/users/${username}/products/${id}`, product) // Using HTTPINTERCEPTOR
  }
}

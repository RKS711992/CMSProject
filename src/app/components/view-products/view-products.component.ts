import { Component, OnInit } from "@angular/core";
import { ProductDataService } from "src/app/services/product-data.service";
import { Router } from "@angular/router";

export class ProductInfo {
  constructor(
    public msid: number,
    public productType: String,
    public productName: String,
    public status: boolean
  ) {}
}

@Component({
  selector: "app-view-products",
  templateUrl: "./view-products.component.html",
  styleUrls: ["./view-products.component.css"]
})
export class ViewProductsComponent implements OnInit {
  public msid: number;
  public productType: String;
  public productName: String;
  public status: boolean;
  message: string;

  constructor(
    private productDataService: ProductDataService,
    private router: Router
  ) {}

  username = sessionStorage.getItem("authenticatedUser");
  productInfo: ProductInfo[];

  ngOnInit() {
    this.refreshProducts();
    // console.log(this.infos)
  }
  refreshProducts() {
    this.productDataService
      .retrieveAllProducts(this.username)
      .subscribe(response => {
        console.log(response);
        this.productInfo = response;
      });
    // throw new Error("Method not implemented.");
  }

  deleteProduct(id) {
    //console.log(`Delete called ${id}`)
    this.productDataService
      .deleteProductById(this.username, id)
      .subscribe(response => {
        console.log(response);
        this.refreshProducts();
        this.message = `Delete Success for Product with id : ${id}`;
        //this.productInfo = response
      });
  }

  updateProduct(id) {
    console.log(`Update for Product : ${id}`);
    this.router.navigate(["cms/create-product", id]);
  }
  infos = [
    // new ProductInfo(201,'ebuBTL','ebuBTL Case1.1',true),
    // new ProductInfo(202,'BTL','BTL Case1.2',true),
    // new ProductInfo(203,'ATL','ATL Case1.3',true),
    // new ProductInfo(204,'RefillBTL','RefillBTL Case1.4',true),
    // { msid: 101, productType: 'ebuBTL', productName: 'ebuBTL Case1.1', status: true },
    // { msid: 102, productType: 'BTL', productName: 'BTL Case1.2', status: true },
    // { msid: 103, productType: 'ATL', productName: 'ATL Case1.3', status: true },
    // { msid: 104, productType: 'RefillBTL', productName: 'RefillBTL Case1.4', status: true }
  ];
}

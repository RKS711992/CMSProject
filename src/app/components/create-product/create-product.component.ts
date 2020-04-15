import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProductInfo } from '../view-products/view-products.component';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  username = sessionStorage.getItem('authenticatedUser')
  id: number = 0;
  product: ProductInfo
  productInfo: ProductInfo[]
  creatingProduct: boolean = false;
  message: string;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private productDataService: ProductDataService, ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.product = new ProductInfo(this.id, 'ProductType', 'ProductName', true)
    if (this.id > 0) {
      this.productDataService.retrieveProductById(this.username, this.id).subscribe(
        data => this.product = data
      )
    }

  }
  handleCancel() {
    console.log(sessionStorage.getItem('authenticatedUser'))
    // this.router.navigate(['cms/select-app', this.username])
    this.router.navigate(['/cms/view-products'])

  }
  handleSubmit() {
    console.log("SUBMIT CALLED FOR CREATE PRODUCT!!!")
    if (this.id > 0) {
      console.log("Update Called Id ", this.id, "and this.creatingProduct = ", this.creatingProduct)
      this.productDataService.updateProduct(this.username, this.id, this.product).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/cms/view-products'])
        }
      )
    } else {
      this.creatingProduct = true;
      console.log("Create Called Id ", this.id, "and this.creatingProduct = ", this.creatingProduct, this.username, this.product)
      this.productDataService.createProduct(this.username, this.product).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/cms/view-products'])
        }
      )
    }

  }
  deleteProduct(id) {
    console.log(`Delete called ${id}`)
    this.productDataService.deleteProductById(this.username, id).subscribe(
      response => {
        console.log(response)
        this.router.navigate(['/cms/view-products'])
        this.refreshProducts()
        this.message = `Delete Success for Product with id : ${id}`
        //this.productInfo = response

      }
    )
  }
  refreshProducts() {
    this.productDataService.retrieveAllProducts(this.username).subscribe(
      response => {
        console.log(response)
        this.productInfo = response
      }
    )
    // throw new Error("Method not implemented.");
  }

}

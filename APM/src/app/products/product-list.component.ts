import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ProductService } from './product.service';


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{

  constructor(productService: ProductService){
    this._productService = productService;
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err

    });
    
  }
    private _productService;
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    //listFilter: string = 'cart';

    _listFilter: string;
    get listFilter(): string{
      return this._listFilter
    }

    set listFilter(value:string){
      this._listFilter = value;
      this.filteredProducts = this.listFilter? this.performFilter(this.listFilter): this.products;
    }

    // this will have filtered list of products
    filteredProducts: IProduct[];

    products: IProduct[] = []

      toggleImage(): void
      {
        this.showImage = !this.showImage;
      }

      performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      onRatingClicked(message: string): void{
        this.pageTitle = 'Product List' + message;

      }
}
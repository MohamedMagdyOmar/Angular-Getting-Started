import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ProductService } from './product.service';


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{

  ngOnInit(): void {
    this.products = this._productService.getProducts();
    this.filteredProducts = this.products;
  }
    private _productService;
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
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

      constructor(productService: ProductService){
        this._productService = productService;
      }

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
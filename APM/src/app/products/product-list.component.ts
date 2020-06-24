import { Component, OnInit } from '@angular/core';
import { IProductCategories } from '../Model/productCategories';
import { IUser } from '../Model/users';
import { ProductService } from './product.service';
import { MatTableDataSource } from '@angular/material/table';
import { IMatTable } from '../Model/matTable';


@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  
  pageTitle: string = 'Carbonite Product List';
  filterValues = {};
  dataSource = new MatTableDataSource();
  private _productService;
  errorMessage: string;
  filteredProducts: IProductCategories[];
  users: IUser[];
  filterSelectObj = [];
  products: any;
  finalResult: IMatTable[];
  originalResult: IMatTable[];
  resetButtonClicked: boolean = true;
  filteredResult: IMatTable[];

  constructor(productService: ProductService) {
    this._productService = productService;    
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products['productCategories'];
        this.users = this.products['users'];
        this.products = this.filteredProducts;
        
        this.finalResult = this._productService.createMatTableObj(products);
        this.originalResult = JSON.parse(JSON.stringify(this.finalResult));
        this.filteredResult = JSON.parse(JSON.stringify(this.finalResult));
        this.createFilterSelectObj(this.finalResult);

        this.dataSource.data = JSON.parse(JSON.stringify(this.finalResult));

      },
      error: (err) => (this.errorMessage = err),
    });
  }

  tableColumns: string[] = ['CategoryDisplayName', 'CategoryType', 'ProductDisplayName'
  ,'FirstName', 'LastName', 'UserEmail', 'SubscribtionMonth', 'SubscribtionPrice'];

  filterChange(filter, event) {

    var propertyName = filter.columnProp;
    if(this.resetButtonClicked){
      this.filteredResult = this.finalResult.filter(obj => obj[propertyName] === event.target.value.trim());
    }
    
    else{
      this.filteredResult = this.filteredResult.filter(obj => obj[propertyName] === event.target.value.trim());
    }
    
    this.resetButtonClicked = false;
    this.dataSource = new MatTableDataSource(this.filteredResult);
  }

  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    });
    this.finalResult = JSON.parse(JSON.stringify(this.originalResult));
    this.dataSource.data = JSON.parse(JSON.stringify(this.originalResult));
    this.resetButtonClicked = true;
  }

  getProductNames(inputData: any): string[] {
    var arrayOfProductsName = [];
    var arrayOfProductsObject = inputData.map((a) => a.products);

    for (let i = 0; i < arrayOfProductsObject.length; i++) {
      arrayOfProductsName.push.apply(
        arrayOfProductsName,
        arrayOfProductsObject[i].map((a) => a.name)
      );
    }
    return arrayOfProductsName;
  }

  createFilterSelectObj(matTableArray: IMatTable[]):void{

    this.filterSelectObj = [
      {
        name: 'Category Name',
        columnProp: 'productCategoryDisplayName',
        options: matTableArray.map(item => item.productCategoryDisplayName)
        .filter((value, index, self) => self.indexOf(value) === index),
      },
      {
        name: 'Category Type',
        columnProp: 'productCategoryType',
        options: matTableArray.map(item => item.productCategoryType)
        .filter((value, index, self) => self.indexOf(value) === index),
      },
      {
        name: 'Product Name',
        columnProp: 'productDisplayName',
        options: matTableArray.map(item => item.productDisplayName)
        .filter((value, index, self) => self.indexOf(value) === index),
      },

      {
        name: 'First Name',
        columnProp: 'productUserFirstName',
        options: matTableArray.map(item => item.productUserFirstName)
        .filter((value, index, self) => self.indexOf(value) === index),
      },

      {
        name: 'Last Name',
        columnProp: 'productUserLastName',
        options: matTableArray.map(item => item.productUserLastName)
        .filter((value, index, self) => self.indexOf(value) === index),
      },

      {
        name: 'Email Address',
        columnProp: 'productUserEmailId',
        options: matTableArray.map(item => item.productUserEmailId)
        .filter((value, index, self) => self.indexOf(value) === index),
      }
    ];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

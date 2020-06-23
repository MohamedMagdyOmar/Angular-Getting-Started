import { Component, OnInit } from '@angular/core';
import { IProductCategories } from './productCategories';
import { IUser } from './users';
import { ProductService } from './product.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IProductSubscription } from './productSubscription';
import { IMatTable } from './matTable';


@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  filterValues = {};
  dataSource = new MatTableDataSource();

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
         
        this.finalResult =  this.createMatTableObj(products);
        this.originalResult = JSON.parse(JSON.stringify(this.finalResult));
        this.filteredResult = JSON.parse(JSON.stringify(this.finalResult));
        this.createFilterSelectObj(this.finalResult);

        //this.dataSource = new MatTableDataSource(this.finalResult);
        this.dataSource.data = JSON.parse(JSON.stringify(this.finalResult));

        //this.dataSource.filterPredicate = this.createFilter();
        console.log(this.dataSource);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  tableColumns: string[] = ['CategoryDisplayName', 'CategoryType', 'ProductDisplayName'
  ,'FirstName', 'LastName', 'UserEmail', 'SubscribtionMonth', 'SubscribtionPrice'];

  private _productService;
  pageTitle: string = 'Product List';
  showImage: boolean = false;
  errorMessage: string;
  _listFilter: string;
  filteredProducts: IProductCategories[];
  users: IUser[];
  filterSelectObj = [];
  products: any;
  finalResult: IMatTable[];
  originalResult: IMatTable[];
  resetButtonClicked: boolean = true;
  filteredResult: IMatTable[];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  performFilter(filterBy: string): IProductCategories[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProductCategories) =>
        product.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

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

  // Reset table filters
  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    });
    // to be deleted
    this.finalResult = JSON.parse(JSON.stringify(this.originalResult));
    this.dataSource.data = JSON.parse(JSON.stringify(this.originalResult));
    this.resetButtonClicked = true;
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            console.log("hello");
            console.log(searchTerms);
            console.log(col);
            console.log(searchTerms[col]);
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(' ')
              .forEach((word) => {
                if (
                  data[col].toString().toLowerCase().indexOf(word) != -1 &&
                  isFilterSet
                ) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }

  createMatTableObj(products: any): IMatTable[] {
    var productsCategories = products['productCategories'];
    var users = products['users'];

    const productSubscriptions = {} as IProductSubscription;
    const arrayOfProductSubscriptions: IProductSubscription[] = [];

    const MatTableObject = {} as IMatTable;
    const arrayOfMatTableObject: IMatTable[] = [];

    var flatenningProductsObject = productsCategories
      .map((a) => a.products)
      .reduce((accumulator, value) => accumulator.concat(value), []);

    for (let i = 0; i < flatenningProductsObject.length; i++) {
      productSubscriptions.productName = flatenningProductsObject[i].name;
      productSubscriptions.subscriptions = flatenningProductsObject[i].subscriptions.map((a) => a.id);
      productSubscriptions.months = flatenningProductsObject[i].subscriptions.map((a) => a.months);
      productSubscriptions.price = flatenningProductsObject[i].subscriptions.map((a) => a.price);
      arrayOfProductSubscriptions.push(JSON.parse(JSON.stringify(productSubscriptions)));
    }

    for (let i = 0; i < arrayOfProductSubscriptions.length; i++) {
      MatTableObject.productName = arrayOfProductSubscriptions[i].productName;
      for (let j = 0;j < arrayOfProductSubscriptions[i].subscriptions.length;j++) {
        
          MatTableObject.productSubscribtionId =arrayOfProductSubscriptions[i].subscriptions[j];
          MatTableObject.productSubscribtionMonth =arrayOfProductSubscriptions[i].months[j];
          MatTableObject.productSubscribtionPrice =arrayOfProductSubscriptions[i].price[j];
          MatTableObject.productDisplayName = flatenningProductsObject.find((i) => i.name === MatTableObject.productName).displayName;
          MatTableObject.productSku = flatenningProductsObject.find((i) => i.name === MatTableObject.productName).sku;

            var result;
            productsCategories.some(function(el) {
              return (el.products || []).some(function(course) {
              if (course.name === MatTableObject.productName) {
              result = el;
              return true;
          }
          return false;
          });
        });
          MatTableObject.productCategoryName = result.name;
          MatTableObject.productCategoryDisplayName = result.displayName;
          MatTableObject.productCategoryType = result.type;

          var result;
          users.some(function(el) {
            return (el.subscriptionIds || []).some(function(subscriptionId) {
            if (subscriptionId === MatTableObject.productSubscribtionId) {
            result = el;
            return true;
        }
        return false;
        });
      });

          MatTableObject.productUserFirstName = result.firstName;
          MatTableObject.productUserLastName = result.lastName;
          MatTableObject.productUserEmailId = result.email;

          var result;
            productsCategories.some(function(el) {
              return (el.products.subscribtions || []).some(function(subscribtion) {
              if (subscribtion.id === MatTableObject.productSubscribtionId) {
              result = el;
              return true;
          }
          return false;
          });
        });
        arrayOfMatTableObject.push(JSON.parse(JSON.stringify(MatTableObject)));
      }
    }

    return arrayOfMatTableObject;
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
      },

      {
        name: 'month',
        columnProp: 'productSubscribtionMonth',
        options: matTableArray.map(item => item.productSubscribtionMonth)
        .filter((value, index, self) => self.indexOf(value) === index),
      },

      {
        name: 'price',
        columnProp: 'productSubscribtionPrice',
        options: matTableArray.map(item => item.productSubscribtionPrice)
        .filter((value, index, self) => self.indexOf(value) === index),
      },
    ];
  }

}

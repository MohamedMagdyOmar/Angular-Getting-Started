import { Injectable } from '@angular/core';
import { IInputData } from '../Model/inputData';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IMatTable } from '../Model/matTable';
import { IProductSubscription } from '../Model/productSubscription';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'api/products/products.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IInputData> {
    return this.http.get<IInputData>(this.productUrl).pipe(
      tap((data) => console.log('All: ')),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // a client-side or network error occured. handle it accordingly
      errorMessage = `An Error occured: ${err.error.message}`;
    } else {
      // the backend returned an unsuccessful response code.
      // the response body may contain clues as to what went wrong
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  createMatTableObj(products: any): IMatTable[] {
    var productsCategories = products['productCategories'];
    var users = products['users'];

    var flatenningProductsObject = this.flattingObject(productsCategories);
    var arrayOfProductSubscriptions = this.createProductSubscribtionObject(flatenningProductsObject);
    return this.createMatTableObject(arrayOfProductSubscriptions, flatenningProductsObject, productsCategories, users);
  }

  flattingObject(productsCategories: any):any{
    return productsCategories
      .map((a) => a.products)
      .reduce((accumulator, value) => accumulator.concat(value), []);
  }

  createProductSubscribtionObject(flatenningProductsObject: any): IProductSubscription[]{
    const productSubscriptions = {} as IProductSubscription;
    const arrayOfProductSubscriptions: IProductSubscription[] = [];

    for (let i = 0; i < flatenningProductsObject.length; i++) {
      productSubscriptions.productName = flatenningProductsObject[i].name;
      productSubscriptions.subscriptions = flatenningProductsObject[i].subscriptions.map((a) => a.id);
      productSubscriptions.months = flatenningProductsObject[i].subscriptions.map((a) => a.months);
      productSubscriptions.price = flatenningProductsObject[i].subscriptions.map((a) => a.price);
      arrayOfProductSubscriptions.push(JSON.parse(JSON.stringify(productSubscriptions)));
    }
    return arrayOfProductSubscriptions;
  }

  // this method need refactor
  createMatTableObject(arrayOfProductSubscriptions: any, flatenningProductsObject: any, productsCategories: any, users: any):IMatTable[]{
    const MatTableObject = {} as IMatTable;
    const arrayOfMatTableObject: IMatTable[] = [];

    for (let i = 0; i < arrayOfProductSubscriptions.length; i++) {
      MatTableObject.productName = arrayOfProductSubscriptions[i].productName;
      for (let j = 0;j < arrayOfProductSubscriptions[i].subscriptions.length;j++) {
        
          MatTableObject.productSubscribtionId =arrayOfProductSubscriptions[i].subscriptions[j];
          MatTableObject.productSubscribtionMonth =arrayOfProductSubscriptions[i].months[j];
          MatTableObject.productSubscribtionPrice =arrayOfProductSubscriptions[i].price[j];
          MatTableObject.productDisplayName = flatenningProductsObject.find((i) => i.name === MatTableObject.productName).displayName;
          MatTableObject.productSku = flatenningProductsObject.find((i) => i.name === MatTableObject.productName).sku;

            var result;
            productsCategories.some(function(el) {return (el.products || []).some(function(course) {
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
}

import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-space.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    // we do not need to register a service more than once, so when we use forRoot to pass in our 
    // configured routes, the RouterModule knows to register the router service provider
    // when we use forChild the RouterModule knows not to re-register the router service
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id',
      canActivate: [ProductDetailGuard],
      component: ProductDetailComponent},
    ]),
    SharedModule
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-space.pipe';
import { starComponent } from '../shared/star.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    starComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // we do not need to register a service more than once, so when we use forRoot to pass in our 
    // configured routes, the RouterModule knows to register the router service provider
    // when we use forChild the RouterModule knows not to re-register the router service
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id',
      canActivate: [ProductDetailGuard],
      component: ProductDetailComponent},
    ])
  ]
})
export class ProductModule { }

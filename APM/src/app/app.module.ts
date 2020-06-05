import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConvertToSpacesPipe } from './shared/convert-to-space.pipe';
import { starComponent } from './shared/star.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router'


@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot([
    {path: 'products', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: '', redirectTo:'welcome', pathMatch: 'full'},
    {path: '**', redirectTo:'welcome', pathMatch: 'full'},
  ])],
  declarations: [AppComponent, ProductListComponent, ConvertToSpacesPipe, starComponent, ProductDetailComponent, WelcomeComponent],
  bootstrap: [AppComponent]
})

export class AppModule{

}

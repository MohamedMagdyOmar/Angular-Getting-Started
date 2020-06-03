import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, ProductListComponent],
  bootstrap: [AppComponent]
})

export class AppModule{

}

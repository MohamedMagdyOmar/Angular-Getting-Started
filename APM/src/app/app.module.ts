import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConvertToSpacesPipe } from './shared/convert-to-space.pipe';
import { starComponent } from './shared/star.component';


@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, ProductListComponent, ConvertToSpacesPipe, starComponent],
  bootstrap: [AppComponent]
})

export class AppModule{

}

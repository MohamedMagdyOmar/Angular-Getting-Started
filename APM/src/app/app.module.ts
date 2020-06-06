import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router'

import { ProductModule } from './products/product.module';


@NgModule({
  // RouterModule.forRoot:
  //  - registers Router service
  //  - declares router directives
  //  - exposes configured routes
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot([
    
    {path: 'welcome', component: WelcomeComponent},
    {path: '', redirectTo:'welcome', pathMatch: 'full'},
    {path: '**', redirectTo:'welcome', pathMatch: 'full'},
  ]), ProductModule],
  declarations: [AppComponent, WelcomeComponent],
  bootstrap: [AppComponent]
})

export class AppModule{

}

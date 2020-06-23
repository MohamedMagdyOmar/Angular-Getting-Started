import { Component, OnInit } from '@angular/core';
import { IProductCategories } from './productCategories';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  productCategory: IProductCategories;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // + -> to convert string to numeric id
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    // we hardcoded the product here
    this.productCategory = {
      name: 'test',
      type: 'Saw',
      displayName: 'TBX-0022',
      products: [],
    };
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}

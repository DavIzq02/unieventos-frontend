import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from '../../models/breadcrumb-item.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
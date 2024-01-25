import { Component, OnInit } from '@angular/core';
import { Breadcrumbs } from '../interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  breadcrumb: Breadcrumbs[] = [
    {
      icon: 'fa-solid fa-square-poll-vertical',
      label: 'Panel',
    },
  ];
  ngOnInit(): void {}
}

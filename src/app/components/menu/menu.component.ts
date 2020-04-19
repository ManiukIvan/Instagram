import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  searchControl: FormControl;
  options: string[];
  constructor() {
    this.searchControl = new FormControl('');
    this.options = ['sas', 'asas' ];
  }

  ngOnInit(): void {
  }
  show(): void {
    console.log(this.searchControl);
  }

}

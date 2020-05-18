import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {logging} from 'selenium-webdriver';
import removeConsoleHandler = logging.removeConsoleHandler;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  searchControl: FormControl;
  options: string[];
  name: string
  constructor(private route: Router,
              private localeStorageService: LocalStorageService) {
    this.searchControl = new FormControl('');
    this.options = ['sas', 'asas' ];
    this.name = '12345678';
  }

  ngOnInit(): void {
  }
  show(): void {
    console.log(this.searchControl);
  }
  public logOut() {
    this.localeStorageService.removeUser();
  }
  public isLogged(): boolean {
    return this.localeStorageService.isLogged();
  }


  public getLoggedUserName() {
    return this.localeStorageService.getUserName();
  }
}

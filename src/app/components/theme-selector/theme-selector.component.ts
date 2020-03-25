import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ThemeService } from '../../services';
import { Theme } from '../../services/types';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css']
})
/*
  Form component used to load a theme from Theme service
  Uses options given in Theme service for selector
  Subscribes to errors from theme service in case of error with Http requests
*/
export class ThemeSelectorComponent implements OnInit {

  public selectedTheme: string;
	public availableThemes: string[] = [];
	public error$: Observable<string>;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  	this.error$ = this.themeService.error$;
    this.availableThemes = this.themeService.availableThemesNames;
    this.selectedTheme = this.availableThemes[0];
  }

  public onSelectionChange($event): void {
    this.selectedTheme = $event.value;
    this.themeService.fetchThemeData(this.selectedTheme);
  }

}

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
export class ThemeSelectorComponent implements OnInit {

	public themeControl = new FormControl("1", [Validators.required]);
	public loading$: Observable<boolean>;
	public error$: Observable<string>;


  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  	this.error$ = this.themeService.error$;
  	this.changeThemeOnInput();
  }

  private changeThemeOnInput(): void {
  	this.themeControl.valueChanges.subscribe( (value: string) => {
  		if (value) {
  			this.themeService.fetchThemeData(value);
  		}
  	});
  }

}

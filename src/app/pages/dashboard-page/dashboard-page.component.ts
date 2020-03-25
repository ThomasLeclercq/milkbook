import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services';
import { Theme, Section } from '../../services/types';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})

/**
*  Main page of the test
*  Load data on bootstrap before child components initialise by injecting Theme service
*  Subscribe to loading status with async pipe on component
*  On real time scenario, a loading component would have been created for the occasion and 
*  would have merged several loading status from different services 
*  to provide info througout the app
*/
export class DashboardPageComponent implements OnInit {

	public section$: Observable<Section>;
	public loading$: Observable<boolean>;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  	this.section$ = this.themeService.section$;
  	this.loading$ = this.themeService.loading$;
  }

}

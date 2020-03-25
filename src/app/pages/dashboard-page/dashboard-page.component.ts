import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ThemeService, LayoutsService } from '../../services';
import { Theme, Section } from '../../services/types';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

	public section$: Observable<Section>;
	public loading$: Observable<boolean>;

  constructor(private themeService: ThemeService, private layoutService: LayoutsService) { }

  ngOnInit() {
  	this.section$ = this.themeService.section$;
  	this.loading$ = this.themeService.loading$;
  }

}

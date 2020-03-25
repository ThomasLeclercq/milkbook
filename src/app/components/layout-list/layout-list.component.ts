import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Section, Layout } from '../../services/types';
import { LayoutsService } from '../../services';

@Component({
  selector: 'app-layout-list',
  templateUrl: './layout-list.component.html',
  styleUrls: ['./layout-list.component.css']
})
/*
*  Component providing a list of layouts
*  Subscribes to layouts to provide a collection of layouts
*  Access Parent section data to detect changes to get new layouts
*/
export class LayoutListComponent implements OnInit {

	@Input('section') public section: Section;
	public layouts$: Observable<Layout[]>;

  constructor(private layoutsService: LayoutsService) { }

  ngOnInit() {
  	this.layouts$ = this.layoutsService.layouts$;
  }

  // If section changes, request new layouts
  ngOnChanges() {
  	this.layoutsService.getLayouts();
  }

  // Load more layouts when lazy loading directives detects intersection
  public loadMore(): void {
  	this.layoutsService.loadMore();
  }

}

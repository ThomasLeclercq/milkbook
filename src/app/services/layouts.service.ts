import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Theme, Section, Layout } from './types';
import { ThemeService } from './themes.service';

@Injectable({
  providedIn: 'root'
})

/**
*  Service responsible to manage layouts data
*  Depends on Theme service to get layouts from loaded themes
*/
export class LayoutsService {

  // Readonly types for filtration and respecting wording through the app
	public readonly SPREAD_TYPE: string = "Spread"; 
	public readonly FIRST_SPREAD_TYPE: string = "FirstSpread"; 
	public readonly LAST_SPREAD_TYPE: string = "LastSpread"; 
  // Filters
  public layoutTypesOptions: string[] = [];
 	public selectedType: string = this.FIRST_SPREAD_TYPE;
	// Pagination
  private page: number = 0;
	private maxItems: number = 6;
  
  // Data as stream for better delivery in components
  // Used Behavior Subject to initiate the data with empty array and keep data in stream
  // for other new subscribers, if needed
	public layouts$ = new BehaviorSubject<Layout[]>([]);	
  // Data stack to faster filtering and manipulation on data set
  private layouts: Layout[] = [];

  constructor(private themeService: ThemeService) { 
  	// Provides an array of options for components for type filtering on construction 
    this.layoutTypesOptions = [this.FIRST_SPREAD_TYPE, this.SPREAD_TYPE, this.LAST_SPREAD_TYPE];
  }

  // Get layouts from a loaded theme and send filtered data to subscribers via filterlayouts()
  // The section is selected manually for the purpose of the test, but usually another 
  // service would have been necessary to select the section containing the layout data
  public getLayouts(): void {
  	const section: Section = this.themeService.getSection('pages');
  	if (section) {
  		this.layouts = section.Layouts;
  		this.filterLayouts();
  	}
  }

  // Used for pagination in a component
  public loadMore(): void {
    if ( (this.page + 1) * this.maxItems < this.layouts.length) {
  	  this.page = this.page + 1;
  	  this.filterLayouts(); 
    }
  }

  // Used for filtration, change the default selected type and reset the pagination
  public changeSelectedType(type: string): void {
  	this.selectedType = type;
    this.page = 0;
  	this.filterLayouts();
  }

  /* 
    Apply type filtration and pagination to stacked layouts before providing subscribers
    The loaded stack is used for reference and is always untouched
    By non altering the data in the stack but changing a copy, 
    we can apply several filters at the same time and change the displayed data faster
  */
  private filterLayouts(): void {
  	let layouts = this.layouts.slice();
  	layouts = this.filterLayoutsByType(layouts);
  	layouts = this.applyPagination(layouts);
  	this.layouts$.next(layouts);
  }

  // Returns a sliced array to limit the displayed data to user and ease loading
  // Can be increased in component via loadMore()
  private applyPagination(layouts: Layout[]): Layout[] {
  	const start = 0;
  	const end = (this.page + 1) * this.maxItems;
  	return layouts.slice(start, end);
  }

  // Returns an array of filtered layouts based of seletected type
  // Selected type can be changed by components via changeSelectedType()
  private filterLayoutsByType(layouts: Layout[]): Layout[] {
  	return layouts.filter( (layout: Layout) => layout.LayoutType === this.selectedType);
  }

}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Theme, Section, Layout } from './types';
import { ThemeService } from './themes.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutsService {

	public readonly SPREAD_TYPE: string = "Spread"; 
	public readonly FIRST_SPREAD_TYPE: string = "FirstSpread"; 
	public readonly LAST_SPREAD_TYPE: string = "LastSpread"; 

	public layoutTypesOptions: string[] = [];
	public selectedType: string = this.FIRST_SPREAD_TYPE;
	
	public layouts$ = new BehaviorSubject<Layout[]>([]);	
	
  private layouts: Layout[] = [];
	private maxItems: number = 6;
	private page: number = 0;

  constructor(private themeService: ThemeService) { 
  	this.layoutTypesOptions = [this.FIRST_SPREAD_TYPE, this.SPREAD_TYPE, this.LAST_SPREAD_TYPE];
  }

  public getLayouts(): void {
  	const section: Section = this.themeService.getSection('pages');
  	if (section) {
  		this.layouts = section.Layouts;
  		this.filterLayouts();
  	}
  }

  public loadMore(): void {
    if ( (this.page + 1) * this.maxItems < this.layouts.length) {
  	  this.page = this.page + 1;
  	  this.filterLayouts(); 
    }
  }

  public changeSelectedType(type: string): void {
  	this.selectedType = type;
    this.page = 0;
  	this.filterLayouts();
  }

  private filterLayouts(): void {
  	let layouts = this.layouts.slice();
  	layouts = this.filterLayoutsByType(layouts);
  	layouts = this.applyPagination(layouts);
  	this.layouts$.next(layouts);
  }

  private applyPagination(layouts: Layout[]): Layout[] {
  	const start = 0;
  	const end = (this.page + 1) * this.maxItems;
  	return layouts.slice(start, end);
  }

  private filterLayoutsByType(layouts: Layout[]): Layout[] {
  	return layouts.filter( (layout: Layout) => layout.LayoutType === this.selectedType);
  }

}

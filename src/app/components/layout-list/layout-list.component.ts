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
export class LayoutListComponent implements OnInit {

	@Input('section') public section: Section;
	@Input('width') public width: number;
	@Input('height') public height: number;
	public layouts$: Observable<Layout[]>;

  constructor(private layoutsService: LayoutsService) { }

  ngOnInit() {
  	this.layouts$ = this.layoutsService.layouts$;
  }

  ngOnChanges() {
  	this.layoutsService.getLayouts();
  }

  public loadMore(): void {
  	this.layoutsService.loadMore();
  }

}

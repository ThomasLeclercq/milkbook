import { Component, OnInit } from '@angular/core';
import { LayoutsService } from '../../services';
import { Layout } from '../../services/types';

@Component({
  selector: 'app-layouts-type-selector',
  templateUrl: './layouts-type-selector.component.html',
  styleUrls: ['./layouts-type-selector.component.css']
})
export class LayoutsTypeSelectorComponent implements OnInit {

	public selectedType: string = this.layoutsService.selectedType;
	public layoutTypesOptions: string[] = [];

  constructor(private layoutsService: LayoutsService) { }

  ngOnInit() {
  	this.layoutTypesOptions = this.layoutsService.layoutTypesOptions;
  }

  public onSelectionChange($event): void {
  	this.layoutsService.changeSelectedType($event.value);
  }

}

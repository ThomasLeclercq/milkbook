import { Component, OnChanges, ViewChild, ElementRef, Input, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services';
import { Layout, ImagePlaceholder, TextPlaceholder } from '../../services/types';
import * as converter from '../../utils/SizeConverter.utils';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
/*
*  Component that draws a layout view based on layout components
*  Injects theme service for section sizes in millimeters
*  Detects canvas HTML element sizes to apply section proportions to layout responsively
*/
export class LayoutComponent  {
  // Used to draw on canvas
	@ViewChild('canvas', { static: true }) public canvas: ElementRef<HTMLCanvasElement>;  
	// layout data
  @Input('layout') private layout: Layout;

	private ctx: CanvasRenderingContext2D;
  
  // Defines the sizes of the canvas to respect proportions of 
  // drawings based on screen size or design, can also be used to change dimension by user
  private width: number;
  private height: number;

  constructor(private themeService: ThemeService) { }

  ngOnChanges() {
  	this.ctx = this.canvas.nativeElement.getContext('2d');
    // Used to avoid blur images on resize
    this.ctx.imageSmoothingEnabled = false;

  	this.width = this.canvas.nativeElement.width;
  	this.height = this.canvas.nativeElement.height;
    // Draw layout on changes
    this.drawLayout();
  }

  private drawLayout(): void {
    // Fetch spread dimension to apply to proportions of canvas size
    const spreadWidth = (this.themeService.productWidthMM * 2);
    const spreadHeight = this.themeService.productHeightMM;

  	this.layout.TextPlaceholders.map( (textPlaceholder: TextPlaceholder) => {
      // Layout dimensions are applied to canvas size based on spread size
      const top = (textPlaceholder.Top / spreadHeight) * this.height;
      const left = (textPlaceholder.Left / spreadWidth) * this.width;
      const width = (textPlaceholder.Width / spreadWidth) * this.width;
      const height = (textPlaceholder.Height / spreadHeight) * this.height;
  		this.drawTextPlaceholder(top, left, width, height);
  	});
    
  	this.layout.ImagePlaceholders.map( (imagePlaceholder: ImagePlaceholder) => {
      // Layout dimensions are applied to canvas size based on spread size
      const top = (imagePlaceholder.Top / spreadHeight) * this.height;
      const left = (imagePlaceholder.Left / spreadWidth) * this.width;
      const width = (imagePlaceholder.Width / spreadWidth) * this.width;
      const height = (imagePlaceholder.Height / spreadHeight) * this.height;
  		this.drawImagePlaceholder(top, left, width, height);
  	});
    
  }

  private drawImagePlaceholder(top, left, width, height): void {
    this.ctx.fillRect(left, top, width, height);
     
    // Draw an image based on filled rectangle proportions
    const image = new Image();
    image.src = `${environment.themeURLs}/placeholder-image.png`;
    image.onload = () => {
      
      // Apply dimensions in millimeters
      const imgWidthMM = converter.convertPixelsToMM(image.width); 
      const imgHeightMM = converter.convertPixelsToMM(image.height); 
      // Optional, apply a border for visibility when image proportions are equals to container
      const border = 2;

      // In case of rectangle images, apply smallest container scale to image
      let scale = Math.min( width/imgWidthMM, height/imgHeightMM );

      // Apply container proportions and border to image size 
      const imgLeft = left + (width - (imgWidthMM*scale))/2 + border;
      const imgTop = top + (height - (imgHeightMM*scale))/2 + border;
      const imgWidth = imgWidthMM * scale - border * 2;
      const imgHeight = imgHeightMM * scale - border * 2;

      this.ctx.drawImage(image, imgLeft, imgTop, imgWidth, imgHeight);
    }
    
  }

  private drawTextPlaceholder(top, left, width, height): void {
    this.ctx.beginPath();
  	this.ctx.rect(left, top, width, height);
  	this.ctx.stroke();
  }

}

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
export class LayoutComponent  {

	@ViewChild('canvas', { static: true }) public canvas: ElementRef<HTMLCanvasElement>;  
	@Input('layout') private layout: Layout;

	private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(private themeService: ThemeService) { }

  ngOnChanges() {
  	this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
  	this.width = this.canvas.nativeElement.width;
  	this.height = this.canvas.nativeElement.height;
    this.drawLayout();
  }

  private drawLayout(): void {

    const spreadWidth = (this.themeService.productWidthMM * 2);
    const spreadHeight = this.themeService.productHeightMM;

  	this.layout.TextPlaceholders.map( (textPlaceholder: TextPlaceholder) => {
      const top = (textPlaceholder.Top / spreadHeight) * this.height;
      const left = (textPlaceholder.Left / spreadWidth) * this.width;
      const width = (textPlaceholder.Width / spreadWidth) * this.width;
      const height = (textPlaceholder.Height / spreadHeight) * this.height;
  		this.drawTextPlaceholder(top, left, width, height);
  	});
    
  	this.layout.ImagePlaceholders.map( (imagePlaceholder: ImagePlaceholder) => {
      const top = (imagePlaceholder.Top / spreadHeight) * this.height;
      const left = (imagePlaceholder.Left / spreadWidth) * this.width;
      const width = (imagePlaceholder.Width / spreadWidth) * this.width;
      const height = (imagePlaceholder.Height / spreadHeight) * this.height;
  		this.drawImagePlaceholder(top, left, width, height);
  	});
    
  }

  private drawImagePlaceholder(top, left, width, height): void {
    this.ctx.fillRect(left, top, width, height);
    
    const image = new Image();
    image.src = `${environment.themeURLs}/placeholder-image.png`;
    image.onload = () => {
     
      const imgWidthMM = converter.convertPixelsToMM(image.width); 
      const imgHeightMM = converter.convertPixelsToMM(image.height); 
      const border = 2;

      let scale = Math.min( width/imgWidthMM, height/imgHeightMM );

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

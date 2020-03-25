import { Directive, AfterViewInit, Inject, Output, EventEmitter, ElementRef, HostListener, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
	selector:'[lazy-loading-directive]'
})

/*
*		Lazy Loading directive 
*		Used to detect if the bottom of screen is untersecting with an attached component 	
*		Emits an event on intersection
*/

export class LazyLoadingDirective {	
	
	// Event emitter used to inform component of intersection
	@Output('onIntersection') public isIntersecting = new EventEmitter<string>();

	constructor(
	  @Inject(PLATFORM_ID) private platformId: any, 
	  private elRef: ElementRef, 
	  private zone: NgZone
	){ }
	
	onScroll() {
		// As we access Window element, 
		// we need to check if we are not using Server side rendering
		if(isPlatformBrowser(this.platformId)){
			let elementTopPosition = this.elRef.nativeElement.offsetTop;	
			let windowBottom = window.pageYOffset + window.innerHeight;
			let windowDistanceFromElement = (windowBottom/elementTopPosition) * 100;
			// Distance is set to 75 to let time to load so user doesn't see loading times
			if(windowDistanceFromElement >= 75){
				this.zone.run( () => this.isIntersecting.emit('isIntersecting'));
			}
		}
	}

	// Wait for component to initialise and run scroll event detection
	// We use streams from scroll event outside of zone *
	// to avoid to increase impact on CPU for user experience
	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			fromEvent(window, 'scroll')
			.pipe(debounceTime(5))
			.subscribe(res => {
				this.onScroll();
			});
		});
	}

} 
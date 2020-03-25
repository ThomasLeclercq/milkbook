import { Directive, AfterViewInit, Inject, Output, EventEmitter, ElementRef, HostListener, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
	selector:'[lazy-loading-directive]'
})

export class LazyLoadingDirective {	
	
	@Output('onIntersection') public isIntersecting = new EventEmitter<string>();

	constructor(
	  @Inject(PLATFORM_ID) private platformId: any, 
	  private elRef: ElementRef, 
	  private zone: NgZone
	){ }

	//@HostListener("window:scroll", [])
	
	onScroll() {
		if(isPlatformBrowser(this.platformId)){
			let elementTopPosition = this.elRef.nativeElement.offsetTop;	
			let windowBottom = window.pageYOffset + window.innerHeight;
			let windowDistanceFromElement = (windowBottom/elementTopPosition) * 100;
			if(windowDistanceFromElement >= 75){
				this.zone.run( () => this.isIntersecting.emit('isIntersecting'));
			}
		}
	}

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
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Theme, Section, Layout } from "./types";
import { environment } from "../../environments/environment";
 
@Injectable({
	'providedIn': 'root'
})
/**
*		Class used to manage Theme data set
*		For the purpose of the exercice, we fetch and manipulate the data in the same service
*		But usually, we would use a parent class to fetch the data and an interface to apply
*		data delivery stream conventions with loading, error and data streams.
*/
export class ThemeService {
	// Store theme section sizes 
	// In a real app, would sit in a Section service to provide this info to components 
	public productWidthMM: number;
	public productHeightMM: number;

	// Data streams
	// Provide latest section fetched based on theme selected
	public section$ = new BehaviorSubject<Section>(undefined);
	// Provides a loading status of fetched data to components
	public loading$ = new BehaviorSubject<boolean>(true);
	// Provides an error message to subscribed components if fetch is unsuccessful
	public error$ = new BehaviorSubject<string>(undefined);
	
	// Provides a set of theme names available to user
	public readonly availableThemesNames: string[] = ['1','2','3'];
	// Cached data to provide information about the loaded theme without fetching server again
	private theme: Theme;

	// Fetch a theme by default if at least one component is using theme service
	// Allows the user to not wait for data too long	
	constructor(private http: HttpClient) { 
		if (!this.theme) {
			// Fetch first theme by default
			this.fetchThemeData(this.availableThemesNames[0]);
		}
	}

	// Connect to server and fetch data
	// Provides different info within streams depending of the fetch status
	public fetchThemeData(theme: string): void {
		// Informs all subscribers that data is fetch from server again
		this.loading$.next(true);
		this.http.get(`${environment.themeURLs}/${theme}.json`).subscribe({
			next: (json: Theme) => {
				if (json) {
					// Reset errors if exists
					this.error$.next("");
					// Store value in the service for later use
					this.theme = json;
				}
			},
			error: (err: Error) => {
				// Informs subscribers about error from request
				// Can be handled by different services or specific notification components
				this.error$.next(err.message);
			},
			complete: () => {
				// Select a section by default on success
				// Should be handled by a different service in usual cases
				this.selectSection("pages");
				// Informs notifications components that data is ready
				this.loading$.next(false);
			}
		});
	}

	// Provide a section based on Name and send selection in streams
	// In a regular scenario, this function would be in a Section Service and 
	// would go throught fltering functions before being send in streams to components
	public selectSection(sectionName: string): void {
		const selected = this.getSection(sectionName);
		this.productHeightMM = selected.ProductHeightMm;
		this.productWidthMM = selected.ProductWidthMm;
		this.section$.next(selected);
	}

	// Provide section based on name from loaded in service theme
	public getSection(sectionName: string): Section {
		if (this.theme) {
			return this.theme.ThemeSections.filter( (section: Section) => {
				return section.Name.toLowerCase().includes(sectionName.toLowerCase());
			})[0]
		}
		return undefined;
	}

}
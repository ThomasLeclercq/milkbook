import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Theme, Section, Layout } from "./types";
import { environment } from "../../environments/environment";
 
@Injectable({
	'providedIn': 'root'
})

export class ThemeService {

	public productWidthMM: number;
	public productHeightMM: number;

	public section$ = new BehaviorSubject<Section>(undefined);
	public loading$ = new BehaviorSubject<boolean>(true);
	public error$ = new BehaviorSubject<string>(undefined);
	
	private theme: Theme;

	constructor(private http: HttpClient) { 
		if (!this.theme) {
			this.fetchThemeData("1");
		}
	}

	public fetchThemeData(theme: string): void {
		this.loading$.next(true);
		this.http.get(`${environment.themeURLs}/${theme}.json`).subscribe({
			next: (json: Theme) => {
				if (json) {
					this.error$.next("");
					this.theme = json;
				}
			},
			error: (err: Error) => {
				this.error$.next(err.message);
			},
			complete: () => {
				this.selectSection("pages");
				this.loading$.next(false);
			}
		});
	}

	public selectSection(sectionName: string): void {
		const selected = this.getSection(sectionName);
		this.productHeightMM = selected.ProductHeightMm;
		this.productWidthMM = selected.ProductWidthMm;
		this.section$.next(selected);
	}

	public getSection(sectionName: string): Section {
		if (this.theme) {
			return this.theme.ThemeSections.filter( (section: Section) => {
				return section.Name.toLowerCase().includes(sectionName.toLowerCase());
			})[0]
		}
		return undefined;
	}

}
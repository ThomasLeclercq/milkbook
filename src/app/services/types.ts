// Provides types to components to respect typings and ease developer experience

export interface Theme {
	Id: string;
	Name: string;
	ThemeSections: Section[];
}

export interface Section {
	Name: string;
	ProductWidthMm: number;
	ProductHeightMm: number;
	ShadowImageUrl: string;	
	Layouts: Layout[];
}

export interface Layout {
	Name: string;
	LayoutType: string;
	ImagePlaceholders: ImagePlaceholder[];
	TextPlaceholders: TextPlaceholder[];
}

interface Placeholder {
	Top: number;
	Left: number;
	Width: number;
	Height: number;
}

export interface ImagePlaceholder extends Placeholder {
	Circle: boolean;
	Bleed: string;
}

export interface TextPlaceholder extends Placeholder {
	HorizontalAlignment: string;
	MirrorHorizontalAlignment: boolean;
	VerticalAlignment: string;
	FontSize: number;
	LineHeight: number;
	Kerning: number;
	FontStyles: string[];
	FontSizes: number[];
}
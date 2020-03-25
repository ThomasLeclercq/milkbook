// Small utilities function that can be used throughout the app
// These two functions helps to convert pixels to millimeter or inverse

export function convertPixelsToMM(pixels: number): number {
	return (pixels*0.2645833333);
}

export function convertMMtoPixels(mm: number): number {
	return (mm*3.7795275591);
}

export function convertPixelsToMM(pixels: number): number {
	return (pixels*0.2645833333);
}

export function convertMMtoPixels(mm: number): number {
	return (mm*3.7795275591);
}

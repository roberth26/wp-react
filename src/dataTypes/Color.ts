import * as ColorUtils from 'color';

// TODO: does this class need to exist? can i just use ^
export default class Color {
	private red: number; // 8 bit 0-255
	private green: number; // 8 bit 0-255
	private blue: number; // 8 bit 0-255

	constructor(
		red: number,
		green: number,
		blue: number
	) {
		this.red = red;
		this.green = green;
		this.blue = blue;
	}

	toArray( hsl?: boolean ): number[] {
		if ( hsl ) {
			return ColorUtils.rgb( this.toArray() ).hsl().array();
		}

		return new Array<number>(
			this.red,
			this.green,
			this.blue
		);
	}

	luminosity(): number {
		return ColorUtils.rgb( this.toArray() ).luminosity();
	}

	toCss( hsl?: boolean ): string {
		const color = ColorUtils.rgb( this.toArray() );

		return hsl ? color.hsl().string() :	color.string();
	}

	static fromArray( arr: number[] ): Color {
		return new Color( arr[ 0 ], arr[ 1 ], arr[ 2] );
	}

	static fromHex( hex: string ): Color {
		if ( hex.charAt( 0 ) !== '#' ) {
			hex = '#' + hex;
		}
		const c = new ColorUtils( hex ).rgb().array();

		return new Color( c[ 0 ], c[ 1 ], c[ 2 ] );
	}

	static fromHsl( hsl: number[] ) {
		const color = ColorUtils.hsl( hsl );

		return Color.fromArray( color.rgb().array() );
	}

	static lighten( src: Color, percent: number ): Color {
		let color = ColorUtils.rgb( src.toArray() );
		color = color.lighten( percent / 100 );

		return Color.fromArray( color.rgb().array() );
	}

	static darken( src: Color, percent: number ): Color {
		let color = ColorUtils.rgb( src.toArray() );
		color = color.darken( percent / 100 );

		return Color.fromArray( color.rgb().array() );
	}

	static saturate( src: Color, percent: number ): Color {
		let color = ColorUtils.rgb( src.toArray() );
		color = color.saturate( percent / 100 );

		return Color.fromArray( color.rgb().array() );
	}

	static findMostContrastingColor( fgColors: Color[], bgColor: Color ): Color {
		if ( !fgColors || !fgColors.length || !bgColor ) {
			return null;
		}

		const color = fgColors.reduce(( currColor, mostContrasting ) => {
			const oldDelta = Math.abs( mostContrasting.luminosity() - bgColor.luminosity() );
			const newDelta = Math.abs( currColor.luminosity() - bgColor.luminosity() );
			if ( newDelta > oldDelta ) {
				return currColor;
			}

			return mostContrasting;
		}, fgColors[ 0 ] );

		return color;
	}
}
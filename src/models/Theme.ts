import Color from '../dataTypes/Color';
import ITheme from '../contracts/ITheme';

export default class Theme implements ITheme {
    customColors: Map<string, Color>;
    footerColor: Color;
    primaryFontColor: Color;
    secondaryFontColor: Color;
    fontSizeUnit: number;
    spacingUnit: number;

    defaultColors(): Color[] {
        return [
            this.footerColor,
            this.primaryFontColor,
            this.secondaryFontColor
        ];
    }

    getColorByName( name: string ): Color {
        const color = this.customColors.get( name );
        if ( color ) {
            return color;
        }

        const index = Object.keys( this ).indexOf( name );
        if ( index > -1 ) {
            return this[ name ];
        }

        return null;
    }
}
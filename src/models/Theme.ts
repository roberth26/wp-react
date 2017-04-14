import Color from '../dataTypes/Color';
import IThemeColorJson from '../contracts/IThemeColorJson';
import IThemeJson from '../contracts/IThemeJson';
import ITheme from '../contracts/ITheme';

export default class Theme implements ITheme {
    customColors: Map<string, Color>;
    footerColor: Color;

    constructor( theme?: IThemeJson ) {
        if ( !theme ) {
            return;
        }
        this.customColors = new Map<string, Color>(
            theme.colors.custom_colors.map(( themeColorJson: IThemeColorJson ) => {
                const color = Color.fromHex( themeColorJson.value );

                return [ themeColorJson.name, color ] as [ string, Color ];
            })
        );
        this.footerColor = Color.fromHex( theme.colors.footer_color.value );
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
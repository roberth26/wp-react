import Color from '../dataTypes/Color';

interface ITheme {
    customColors: Map<string, Color>;
    footerColor: Color;
    primaryFontColor: Color;
    secondaryFontColor: Color;
    fontSizeUnit: number;
    spacingUnit: number;

    defaultColors(): Color[];
    getColorByName( name: string ): Color;
}

export default ITheme;
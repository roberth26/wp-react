import Color from '../dataTypes/Color';

interface ITheme {
    customColors: Map<string, Color>;
    footerColor: Color;

    getColorByName( name: string ): Color;
}

export default ITheme;
import IThemeColorJson from './IThemeColorJson';
import IThemeUnitJson from './IThemeUnitJson';

interface IThemeJson {
    colors: {
        footer_color: IThemeColorJson,
        primary_font_color: IThemeColorJson,
        secondary_font_color: IThemeColorJson,
        custom_colors: IThemeColorJson[]
    };
    units: IThemeUnitJson[];
}

export default IThemeJson;
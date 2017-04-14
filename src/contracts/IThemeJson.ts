import IThemeColorJson from './IThemeColorJson';

interface IThemeJson {
    colors: {
        footer_color: IThemeColorJson,
        custom_colors: IThemeColorJson[]
    };
}

export default IThemeJson;
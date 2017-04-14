import IProjectCategoryJson from '../contracts/IProjectCategoryJson';
import Image from './Image';

function formatUrl( url: string ): string {
    if ( url.charAt( 0 ) === '/' ) {
        url = url.substring( 1 );
    }
    if ( url.charAt( url.length - 1 ) !== '/' ) {
        url = url + '/';
    }

    return url;
}

export default class ProjectCategory {
    id: number;
    name: string;
    url: string;
    description: string;
    image: Image;

    constructor( projectCategory?: IProjectCategoryJson ) {
        if ( !projectCategory ) {
            return;
        }
        this.id = projectCategory.term_id;
        this.name = projectCategory.name;
        this.description = projectCategory.description;
        this.url = formatUrl( projectCategory.custom_fields.project_category_url );
    }
}
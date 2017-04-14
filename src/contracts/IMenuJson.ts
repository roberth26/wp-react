import IMenuItemJson from '../contracts/IMenuItemJson';

interface IMenuJson {
    term_id: number;
    name: string;
    items: IMenuItemJson[];
    location_id: number;
}

export default IMenuJson;
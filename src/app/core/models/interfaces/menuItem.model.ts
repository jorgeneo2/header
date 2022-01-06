export interface IMenuItem {
    menuId: string;
    label: string;
    path?: string;
    width?: number;
    subItems?: {
        title: string;
        items: {
            label: string;
            path: string;
        }[];
    }[];
}

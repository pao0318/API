export interface ISetData {
    key: string;
    value: string | Object;
    toJson?: boolean;
    expiresIn?: number;
}

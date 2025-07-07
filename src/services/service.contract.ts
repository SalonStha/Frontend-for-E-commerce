export interface IConfigParams {
    headers? : {
        "Authorization"?: string | null;
        "Content-Type"?:  string | null;
        "Accept"?: string | null;
    }
    params?: {
        [key:string] : string | number | undefined | boolean | null;
    }
}
export interface DetaLib {
    lib: {
        cron: (event: any) => any;
        run: (event: any) => any;
    };
}
export declare type DetaLibApp = <T>(app: any) => T & DetaLib;

export interface IModuleResponse {
    data: {
        modules: IModule[]
    };
}

export interface IModule {
    process_code: string;
    application_code: string;
}

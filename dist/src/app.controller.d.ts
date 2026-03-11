import { AppService } from './app.service';
interface RootAPIResponse {
    message: string;
    time?: string;
    [key: string]: any;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): RootAPIResponse;
}
export {};

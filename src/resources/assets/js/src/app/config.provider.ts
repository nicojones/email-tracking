import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Config } from './config';

import { environment, environment as env } from './../environments/environment';

@Injectable()
export class ConfigProvider {

    private config: Config;

    constructor(private http: HttpClient) {

    }

    public getConfig(): Config {
        return this.config;
    }

    load() {
        return new Promise((resolve, reject) => {
            this.http
                .get<Config>(`${ environment.API_BASE_URL }/api/load-config`)
                .subscribe(config => {
                    for (let key in config.url) {
                        config.url[key] = env.API_BASE_URL + config.url[key];
                    }

                    this.config = config;
                    console.info("... loaded")
                    resolve(true);
                })
        })
    }
}

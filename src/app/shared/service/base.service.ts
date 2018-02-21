import { Injectable } from '@angular/core';
import {
    Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/http';
import { SpinService } from '../spin/spin.service';
import { Observable } from 'rxjs/Observable';
import { Const } from '../common/const';
import { BaseModel } from '../model/base.model';
import { Utils } from '../common/utils';


/**
 * httpサービスのベースクラス
 */
@Injectable()
export class BaseService {

    constructor(private http: Http, private spinService: SpinService) { }

    /**
     * HTTPのGETリクエスト
     * @param {string} url URL
     * @param {string} [version=Const.DEFAULT_SVC_VERSION] APIバージョン
     * @param {RequestOptionsArgs} [options] リクエストパラメータ
     * @memberof HttpService
     */
    public get(
        url: string,
        version: string = Const.DEFAULT_SVC_VERSION,
        options?: RequestOptionsArgs
    ): Observable<any> {
        url = this.getApiURI(url, version);
        console.log(`get => url: ${url}`);

        return this.handleResponse(
            this.http.get(url, options)
        );
    }

    /**
     * HTTPのPOSTリクエスト
     * @param {string} url URL
     * @param {BaseModel} [model={}] データ
     * @param {string} [version=Const.DEFAULT_SVC_VERSION] APIバージョン
     * @param {RequestOptionsArgs} [options] リクエストパラメータ
     * @memberof HttpService
     */
    public post(
        url: string,
        model: BaseModel = {},
        version: string = Const.DEFAULT_SVC_VERSION,
        options?: RequestOptionsArgs
    ): Observable<any> {
        url = this.getApiURI(url, version);
        console.log(`get => url: ${url}`);

        const data = Utils.toJson(model);

        return this.handleResponse(
            this.http.post(url, data, options)
        );
    }

    /**
     * HTTPのPUTリクエスト
     * @param {string} url URL
     * @param {BaseModel} [model={}] データ
     * @param {string} [version=Const.DEFAULT_SVC_VERSION] APIバージョン
     * @param {RequestOptionsArgs} [options] リクエストパラメータ
     * @memberof HttpService
     */
    public put(
        url: string,
        model: BaseModel = {},
        version: string = Const.DEFAULT_SVC_VERSION,
        options?: RequestOptionsArgs
    ): Observable<any> {
        url = this.getApiURI(url, version);
        console.log(`get => url: ${url}`);

        const data = Utils.toJson(model);

        return this.handleResponse(
            this.http.put(url, data, options)
        );
    }

    /**
     * HTTPのDELETEリクエスト
     * @param {string} url URL
     * @param {string} [version=Const.DEFAULT_SVC_VERSION] APIバージョン
     * @param {RequestOptionsArgs} [options] リクエストパラメータ
     * @memberof HttpService
     */
    public delete(
        url: string,
        version: string = Const.DEFAULT_SVC_VERSION,
        options?: RequestOptionsArgs
    ): Observable<any> {
        url = this.getApiURI(url, version);
        console.log(`get => url: ${url}`);

        return this.handleResponse(
            this.http.delete(url, options)
        );
    }

    /**
   * API接頭文字列を付けてURIを構成する。
   * @param uri URI
   * @param version APIバージョン
   */
    private getApiURI(uri: string, version: string): string {
        return `${version}${uri}`;
    }

    /**
   * レスポンス情報を処理する。
   * @param o レスポンス情報
   */
    private handleResponse(o: Observable<Response>): Observable<Object> {
        return o
            .map((res: Response) => {
                let ret: any = {};
                if (res.status >= 200 && res.status < 300) {
                    try {
                        ret = res.json();
                        if (ret !== 0 && ret !== '0') {
                            ret = ret || {};
                        }
                    } catch (e) {
                        try {
                            ret = res.text();
                        } catch (e) {
                            console.log('no return values');
                        }
                    }
                }

                console.log(`${res.url} => ${JSON.stringify(ret, null, '\t')}`);
                return ret;
            })
            .catch((error: any) => {
                console.error(error);
                throw error;
            });
    }
}

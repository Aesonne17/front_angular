import * as Promise from 'bluebird';
import {ProxyActionEnum} from "../enums/ProxyActionEnum";
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Inject} from "@angular/core";

export abstract class AbstractProxy {

    constructor(@Inject(HttpClient) private http: HttpClient) {
    }

    public post<TRequest, TResponse>(path: string, request?: TRequest, returnHttpResponse?: boolean): Promise<TResponse> {
        return this.makeRequest(ProxyActionEnum.POST, path, request, returnHttpResponse);
    }

    public put<TRequest, TResponse>(path: string, request?: TRequest, returnHttpResponse?: boolean): Promise<TResponse> {
        return this.makeRequest(ProxyActionEnum.PUT, path, request, returnHttpResponse);
    }

    public get<TRequest, TResponse>(path: string, request?: TRequest, returnHttpResponse?: boolean): Promise<TResponse> {
        return this.makeRequest(ProxyActionEnum.GET, path, request, returnHttpResponse);
    }

    public delete<TRequest, TResponse>(path: string, request?: TRequest, returnHttpResponse?: boolean): Promise<TResponse> {
        return this.makeRequest(ProxyActionEnum.DELETE, path, request, returnHttpResponse);
    }

    private makeRequest<TRequest, TResponse>(action: ProxyActionEnum, path: string, request?: TRequest, returnHttpResponse?: boolean): Promise<TResponse> {
        let observable: Observable<Object>;
        const headers: HttpHeaders = this.getHeaders();

        switch (action) {
            case ProxyActionEnum.POST:
                observable = this.http.post(path, JSON.stringify(request || {}), {headers: headers});
                break;
            case ProxyActionEnum.PUT:
                observable = this.http.put(path, JSON.stringify(request || {}), {headers: headers});
                break;
            case ProxyActionEnum.GET:
                observable = this.http.get(path, {headers: headers});
                break;
            case ProxyActionEnum.DELETE:
                observable = this.http.delete(path, {headers: headers});
                break;
        }

        return new Promise<TResponse>((resolve: (value?: TResponse) => void, reject: (reason?: any) => void) => {
            observable.subscribe(
                (response: TResponse) => {
                    let result: TResponse;

                    if (returnHttpResponse) {
                        result = response;
                    } else {
                        result = this.toResult<TResponse>(response, reject);
                    }

                    if (result === undefined) {
                        return;
                    }

                    resolve(result);
                },
                (error?: HttpErrorResponse) => {
                    const result: HttpErrorResponse | TResponse = returnHttpResponse ? error : this.toError(error);

                    reject(result);
                }
            );
        });
    }

    protected getHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    private toResult<TResponse>(response: TResponse, reject: (reason?: any) => void): TResponse {
        try {
            // return response.text() ? <TResponse>response.json() : null;
            return response;
        } catch (e) {
            reject(e);
        }
        return undefined;
    }

    private toError(error: HttpErrorResponse) {
        return error;
    }

}

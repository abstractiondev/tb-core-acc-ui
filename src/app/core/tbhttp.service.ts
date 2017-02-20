import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs} from "@angular/http";
import "rxjs/add/operator/toPromise"
import {environment} from "../../environments/environment";

@Injectable()
export class TBHttpService {
  dataUrlPrefix:string;
  postbackUrlPrefix:string;

  constructor(private http:Http) {
    this.dataUrlPrefix = environment.dataUrlPrefix;
    this.postbackUrlPrefix = environment.postbackUrlPrefix;
  }

  async getData<T>(url:string) : Promise<T> {
    let fullUrl = this.dataUrlPrefix + url;
    let response = await this.http.get(fullUrl).toPromise();
    let jsonData = response.json();
    return jsonData;
  }

  async getDataWithResponse(url:string) : Promise<any> {
    let fullUrl = this.dataUrlPrefix + url;
    let response = await this.http.get(fullUrl).toPromise();
    let data = response.json();
    return {
      response: response,
      data: data
    };
  }

  async postJSONData<T>(url:string, data?:any) : Promise<T> {
    let fullUrl = this.postbackUrlPrefix + url;
    let body = JSON.stringify(data);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options:RequestOptionsArgs= { headers: headers};
    let response = await this.http.post(fullUrl, body, options).toPromise();
    let jsonData = response.json();
    return jsonData;
  }

}

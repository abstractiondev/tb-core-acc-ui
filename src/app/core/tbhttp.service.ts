import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs} from "@angular/http";
import "rxjs/add/operator/toPromise"
import {environment} from "../../environments/environment";

@Injectable()
export class TBHttpService {
  isLive:boolean;
  dataPrefixPath:string;


  constructor(private http:Http) {
    this.isLive = environment.production;
    if(this.isLive) {
      this.dataPrefixPath = "../../";
    } else {
      this.dataPrefixPath = "/data/TBRoot/";
    }
  }

  async getData<T>(url:string) : Promise<T> {
    let fullUrl = this.dataPrefixPath + url;
    let response = await this.http.get(fullUrl).toPromise();
    let jsonData = response.json();
    return jsonData;
  }

  async getDataWithResponse(url:string) : Promise<any> {
    let fullUrl = this.dataPrefixPath + url;
    let response = await this.http.get(fullUrl).toPromise();
    let data = response.json();
    return {
      response: response,
      data: data
    };
  }

  async postJSONData<T>(url:string, data?:any) : Promise<T> {
    let body = JSON.stringify(data);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options:RequestOptionsArgs= { headers: headers};
    let response = await this.http.post(url, body, options).toPromise();
    let jsonData = response.json();
    return jsonData;
  }

}

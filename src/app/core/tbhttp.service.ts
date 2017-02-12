import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
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

  async getData(url:string) : Promise<any> {
    let fullUrl = this.dataPrefixPath + url;
    let response = await this.http.get(fullUrl).toPromise();
    let jsonData = response.json();
    return jsonData;
  }


}

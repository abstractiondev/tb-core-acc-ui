import {Injectable} from "@angular/core";
import {TBHttpService} from "../core/tbhttp.service";
import {environment} from "../../environments/environment";

@Injectable()
export class TheBallService {
  private accept404AsOk: boolean;
  constructor(private httpService:TBHttpService) {
    this.accept404AsOk = !environment.production;
  }

  async ExecuteOperation(operationFullName:string, operationParameters?:any) {
    let postDataUrl = "?operation=" + operationFullName;
    let data = operationParameters;
    let operationData:any = await this.httpService.postJSONData(postDataUrl, data);
    let operationID = operationData.OperationID;
    let opPollUrl = "TheBall.Interface/InterfaceOperation/" + operationID + ".json";
    let pollResolve:any;
    let pollReject:any;
    let pollPromise = new Promise((resolve, reject) => {
      pollResolve = resolve;
      pollReject = reject;
    });
    let totalSecs = 0;
    let pollFunc = (retryFunc, resolver, rejecter) =>  {
      this.httpService.getDataWithResponse(opPollUrl)
        .then(dataWithResponse => {
          let data = dataWithResponse.data;
          let response = dataWithResponse.response;
          let statusCode = response.status;
          if(data && data.ErrorMessage) {
            console.log("Operation Error: " + data.ErrorMessage);
            var errorObject = {
              ErrorCode: data.ErrorCode,
              ErrorMessage: data.ErrorMessage
            };
            rejecter(errorObject);
          } else if(statusCode == 204) {
            console.log("Operation Finished OK");
            resolver();
          } else {
            console.log("Operation Retrying in 1 sec... total count: " + totalSecs);
            totalSecs++;
            setTimeout(() => {
              retryFunc(retryFunc, resolver, rejecter)
            }, 1000);
          }
        })
        .catch(errData => {
          console.log(JSON.stringify(errData));
          if(this.accept404AsOk && errData.status == 404) {
            resolver();
            console.warn("Development mode accepted 404 as OK");
          }
          else
            rejecter(errData);
        });
    };
    pollFunc(pollFunc, pollResolve, pollReject);
    return pollPromise;
  }

  async ExecuteOperationImmediate() {

  }
}

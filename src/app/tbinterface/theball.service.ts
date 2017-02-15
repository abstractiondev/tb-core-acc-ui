import {Injectable} from "@angular/core";
import {TBHttpService} from "../core/tbhttp.service";

@Injectable()
export class TheBallService {
  constructor(private httpService:TBHttpService) {
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
          rejecter(errData);
        });
    };
    pollFunc(pollFunc, pollResolve, pollReject);
    return pollPromise;
  }

  async ExecuteOperationImmediate() {

  }
}

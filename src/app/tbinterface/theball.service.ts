import {Injectable} from "@angular/core";
import {TBHttpService} from "../core/tbhttp.service";

@Injectable()
export class TheBallService {
  constructor(private httpService:TBHttpService) {
  }

  async ExecuteOperation(operationFullName:string, operationParameters?:any) {

  }
}

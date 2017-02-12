import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise"
import {TBHttpService} from "../../core/tbhttp.service";


@Injectable()
export class AccountService
{
  MembershipDataUrl = "TheBall.Interface/AccountMembershipData/AccountMembershipData.json";
  constructor(private tbservice:TBHttpService) {

  }

  private headers = new Headers({ "Content-Type": "application/json"});
  async getMembershipData() : Promise<any> {
    var result = await this.tbservice.getData(this.MembershipDataUrl);
    return result;
  }
}

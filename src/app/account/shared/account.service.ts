import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise"
import {TBHttpService} from "../../core/tbhttp.service";
import {AccountMembershipData} from "../../tbinterface/TheBallInterface.nggen";


@Injectable()
export class AccountService
{
  MembershipDataUrl = "TheBall.Interface/AccountMembershipData/AccountMembershipData.json";
  constructor(private tbservice:TBHttpService) {

  }

  private headers = new Headers({ "Content-Type": "application/json"});
  async getMembershipData() : Promise<AccountMembershipData> {
    var result = await this.tbservice.getData<AccountMembershipData>(this.MembershipDataUrl);
    return result;
  }
}

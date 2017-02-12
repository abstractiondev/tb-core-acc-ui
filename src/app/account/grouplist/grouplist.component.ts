import {Component, OnInit} from "@angular/core";
import {AccountService} from "../shared/account.service";

@Component({
  moduleId: module.id,
  selector: "my-grouplist",
  templateUrl: "./grouplist.component.html",
  styleUrls: [ "./grouplist.component.css"]
})
export class GrouplistComponent implements OnInit {
  async ngOnInit(): Promise<number> {
    let anyData = await this.accountService.getMembershipData();
    this.membershipData = anyData.Memberships;
    return 0;
  }

  membershipData:any;

  constructor(private accountService:AccountService)
  {

  }




}

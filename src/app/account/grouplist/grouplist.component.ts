import {Component, OnInit} from "@angular/core";
import {AccountService} from "../shared/account.service";
import {
  AccountMembershipItem, TheBallInterfaceService,
  InterfaceJSONData, GroupDetails
} from "../../tbinterface/TheBallInterface.nggen";

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

  membershipData:AccountMembershipItem[];

  constructor(private accountService:AccountService, private tbService:TheBallInterfaceService)
  {

  }

  async TestOperations() : Promise<any> {
    console.log("Doing thing");
    let firstStore = this.tbService.SaveInterfaceJSON(new InterfaceJSONData({
      Name: "MyData",
      Data: {"Some": "Stuff"}
    }));
    firstStore.then(() => {
      console.log("Done then");
    });
    console.log("Waiting for then");
  }

    async TestOperations2() : Promise<any> {
    console.log("Doing thing");
    let firstStore = this.tbService.SaveInterfaceJSON(new InterfaceJSONData({
      Name: "MyData",
      Data: { "Some": "Stuff"}
    }));
    let secondStore = this.tbService.SaveInterfaceJSON(new InterfaceJSONData({
      Name: "MyData2",
      Data: { "Some": "Stuff"}
    }));
    let thirdFail = this.tbService.SaveGroupDetails(new GroupDetails({
      GroupName: "Errors..."
    })).catch(data => {
      console.log("Precatch: " + JSON.stringify(data));
    });
    let results = await Promise.all([ firstStore, secondStore, thirdFail ])
      .catch(data => {
        console.log("Catching: " + JSON.stringify(data));
      });
    console.log("Done thing: " + JSON.stringify(results));
  }
}

import {Component, ViewEncapsulation} from "@angular/core";
@Component({
  moduleId: module.id,
  selector: "sidenav-component",
  templateUrl: "./sidenav.component.html",
  styleUrls: [ "./sidenav.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {
  side = "start";
}

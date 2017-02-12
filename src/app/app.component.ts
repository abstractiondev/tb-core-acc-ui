import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {

  }
  async ngOnInit(): Promise<number> {
    return null;
  }

  toggleSideMenu() : void {
  }
  title = 'app works!';

  async testingCompiler() {
    await this.callee();
  }

  async callee() {

  }
}

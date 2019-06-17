import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  active2 = true;

  constructor() { }

  ngOnInit() {
  }

  alert(txt: number, active: boolean) {
    console.log('Alert!', txt, active);
  }
}

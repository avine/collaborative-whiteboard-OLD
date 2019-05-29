import { Component, OnInit } from '@angular/core';

import { CollaborativeWhiteboardService } from '../collaborative-whiteboard.service';

@Component({
  selector: 'cw-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss'],
  providers: [CollaborativeWhiteboardService]
})
export class WhiteboardComponent implements OnInit {

  constructor(public service: CollaborativeWhiteboardService) { }

  ngOnInit() {
    console.log('cw-whiteboard', this.service);
  }

}

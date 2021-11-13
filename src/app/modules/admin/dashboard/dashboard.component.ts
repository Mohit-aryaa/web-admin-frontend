import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasnboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards = [];
  constructor() { 
    this.cards = [ 
      {
        title: 'Summary',
        total: 21,
        reports: 'Due Tasks',
        status: 'Completed',
        cardstatus: '',
        tasks: 13
      },
      {
        title: 'Overdue',
        total: 17,
        reports: 'Tasks',
        status: 'From yesterday',
        cardstatus: '',
        tasks: 9
      },
      {
        title: 'Issues',
        total: 24,
        reports: 'Open',
        status: 'Closed today',
        cardstatus: '',
        tasks: 19
      },
      {
        title: 'Features',
        total: 38,
        reports: 'Proposals',
        status: 'Completed',
        cardstatus: '',
        tasks: 16
      }
    ]
  }

  ngOnInit(): void {
    this.getcardStatus()
    
  }

  getcardStatus() {
    for (let i = 0; i < this.cards.length; i++) {
      console.log(this.cards[i].total)
      if(this.cards[i].title == 'Summary' ) {
        this.cards[i].cardstatus = 'text-primary';
      } 
      else if (this.cards[i].title == 'Overdue' ) {
        this.cards[i].cardstatus = 'text-danger';
      } 
      else if (this.cards[i].title == 'Issues') {
        this.cards[i].cardstatus = 'text-success';
      } 
       if (this.cards[i].title == 'Features') {
        this.cards[i].cardstatus = 'text-warning';
      }
    }
    
  //console.log(this.cardstatus)
  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'cta-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})

export class SidenavListComponent {
  @Input() sidenav;
  links = [
    {
      name: 'Scenarios',
      path: '/scenarios',
      infoText: 'scenarios information related',
      icon: 'folder',
    },
    {
      name: 'Executions',
      path: '/executions',
      infoText: 'execution information related',
      icon: 'list',
    },
    {
      name: 'Instances',
      path: '/instances',
      infoText: 'Instance information related',
      icon: 'computer',
    }
  ];
  arrowLeft = 'keyboard_arrow_left';
  arrowRight = 'keyboard_arrow_right';


  constructor() { }
}

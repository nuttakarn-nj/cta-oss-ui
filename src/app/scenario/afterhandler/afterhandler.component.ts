import { Component, OnInit } from '@angular/core';

// Services
import { AfterhandlerService } from '../shared/afterhandler.service';

//
import { AfterhandlerItem } from '../shared/afterhandler-item';

@Component({
  selector: 'cta-afterhandler',
  templateUrl: './afterhandler.component.html',
  styleUrls: ['./afterhandler.component.css']
})

export class AfterhandlerComponent implements OnInit {

  LoadedComponents: AfterhandlerItem[];

  // ads: AdItem[];
  constructor(private afterhandlerService: AfterhandlerService ) {
  }

  ngOnInit() {
    // this.ads = this.adService.getAds();
  }
}

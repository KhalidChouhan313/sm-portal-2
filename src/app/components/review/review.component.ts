import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BotService, AdminService } from '../../../services';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  constructor(
    private BS: BotService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.params['value'].id
    this.BS.getPassenger(id).subscribe(res => {
      // console.log(res);
      window.location.replace(res.url)
    })
  }

}

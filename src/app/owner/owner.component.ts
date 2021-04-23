import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent{

  owner: any = {};
  sub: Subscription;
  //ownerSelected: Owner;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
            ) {
  }

  async ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ownerService.get(id).subscribe((owner: any) => {
          if (owner) {
            this.owner = owner;
            this.owner.href = owner._links.self.href;
          } else {
            console.log(`Owner with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owners-list']);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    console.log(href);
    this.ownerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  /* eventSelection(event){
    this.ownerSelected = event.name;
   } */

  /* mapOnwerInView(id) {
    if (id) {
      console.log(id);
      this.ownerService.get(id).subscribe((owner: any) => {
        console.log(owner)
        if (owner) {
          this.owner = owner;
          this.owner.href = owner._links.self.href;
          // this.showCarOwnerInSelect();
        } else {
          console.log(`owner with id '${id}' not found, returning to list`);
          this.gotoList();
        }
      });
    }
  } */



  

  /* ngOnDestroy1() {
    this.sub.unsubscribe();
  }

  gotoList1() {
    this.router.navigate(['/owners-list']);
  }

  save1(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove1(href) {
    this.ownerService.remove(href).subscribe(result => {
      console.log(result);
      this.gotoList();
    }, error => console.error(error));
  } */

}

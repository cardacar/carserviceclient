import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/owner/owner.service'
import { GiphyService } from '../shared/giphy/giphy.service';

import {Owner} from '../owner/owner.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owners: Array<Owner>;
  sub: Subscription;
  ownerSelected: Owner;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private giphyService: GiphyService,
              private ownerService: OwnerService
              ) {
  }

  async ngOnInit() {

    this.findOwners();

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            this.gotoList();
          }
        });
      }
    });
  }


  getOwnerList()
  {
    return this.ownerService.getAll();
  }

  mapResultToArray(result: any) {
    const ownerList: Array<Owner> = [];
    for (const owner of result._embedded.owners) {
      const indexOfSlash = owner._links.self.href.lastIndexOf("/");
      const id = owner._links.self.href.substring(indexOfSlash+1, 100);
      if(owner.dni){
      let currentOwner: Owner = {
        dni: owner.dni,
        name: owner.name,
        profession: owner.profession,
        href: owner._links.self.href,
        id: id
        };
        ownerList.push(currentOwner);
        
      }
    }
    return ownerList;
  }

  findOwners() {
    this.getOwnerList().subscribe((data: any)=> {
      this.owners = this.mapResultToArray(data);
     } );
  }


  eventSelection(event){

    this.ownerSelected = event.name;
   }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  save(form: any) {
    console.log(form);
    form.ownerDni = this.ownerSelected;
    this.carService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}


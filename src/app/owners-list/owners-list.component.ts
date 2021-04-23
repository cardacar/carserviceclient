
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Owner } from '../owner/owner.model';
import { OwnerService } from '../shared/owner/owner.service';
import { Subscription } from 'rxjs';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent {
  owners: Array<any>;
  toDelete: Array<Owner>;
  sub: Subscription;

  constructor(
              private router: Router,
              private ownerService: OwnerService,
              private carService: CarService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data=>{
      this.owners = data._embedded.owners;
      this.owners.map(owner=>{
        owner.id =  owner._links.self.href.split("/")[4]
        owner.href = owner._links.self.href;
      })
      
    })
  }

  selectToDelete(event: any){
    this.toDelete = this.owners.filter(owner => owner.selected);
  }
  gotoMain() {
    this.router.navigate(['/']);
  }

  deleteOwners(event: any){
    this.toDelete.forEach((owner)=> {
      this.owners.forEach(car => {
        if(car.ownerDni === owner.dni){
          car.ownerDni = null;
          this.carService.save(car).subscribe(res => {
          });
        }
      });
      const res = this.ownerService.remove(owner.href).subscribe(res => {
        this.owners = this.owners.filter(owner => !owner.selected)
      });
    })
  }



}

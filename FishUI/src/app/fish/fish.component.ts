import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.css']
})
export class FishComponent implements OnInit {

  fishList:any = [];

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.refreshFishList();
  }

  refreshFishList(){
    this.service.getFish().subscribe(data=>{
      this.fishList=data;
      console.log(data[0]);
    });
  }

}

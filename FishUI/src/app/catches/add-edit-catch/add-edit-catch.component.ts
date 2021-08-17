import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-catch',
  templateUrl: './add-edit-catch.component.html',
  styleUrls: ['./add-edit-catch.component.css']
})
export class AddEditCatchComponent implements OnInit {

  @Input() catch:any;
  FishLength!:string;
  Species!:string;
  CatchId!:string;
  AggGroup!:string;

  catches:any = [];
  aggs:any = [];

  minLength!:number;
  maxLength!:number;
  bagLimit!:number;
  aggLimit!:number;
  aggGroup!:string;
  trophy!:number;
  aggResult!:string;

  lengthLegal:boolean = false;
  bagLegal:boolean = false;
  aggLegal:boolean = false;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.CatchId = this.catch.CatchId;
    this.FishLength = this.catch.FishLength;
    this.Species = this.catch.Species;
  }

  getCatches(){
    this.service.getCatches().subscribe(data=>{
      var res = JSON.parse(JSON.stringify(data));
      this.catches = res;
    })
  }

  setValues(val:any){
    this.service.getFishById(val).subscribe(data=>{
      var res = JSON.parse(JSON.stringify(data));
      this.minLength = parseInt(res[0].MinimumLength);
      this.maxLength = parseInt(res[0].MaximumLength);
      this.bagLimit = parseInt(res[0].BagLimit);
      this.aggLimit = parseInt(res[0].Agg);
      this.aggGroup = res[0].AggGroup;
      this.trophy = parseInt(res[0].Trophy);
    });
  }
  
  checkLength(size:number, min:number, max:number){
    if(min == undefined || max == undefined){
      this.setValues(this.Species);
    }
    else {
      if(isNaN(min)){
        min = 0;
      }
      if(isNaN(max)){
        max = 9999;
      }
      if(size >= min && size <= max){
        this.lengthLegal = true;
      }
      if(size <= min){
        alert("Too small");
        this.lengthLegal = false;
      }
      if(size >= max){
        var trophyStatus = this.checkTrophy();
        if(trophyStatus){
          this.lengthLegal = true;      
        }
        else{
          alert("Too big");
          this.lengthLegal = false;
        }
      }
      this.checkAgg();
      if(this.aggLegal){
        this.checkBag();
      }
    }
    /*
    this.checkAggList();
    console.log(this.aggs);
    if (this.aggLegal == true){
      this.checkAgg();
    }
    */
  }

  checkLengthForEdit(size:number, min:number, max:number){
    if(min == undefined || max == undefined){
      this.setValues(this.Species);
    }
    else {
      if(isNaN(min)){
        min = 0;
      }
      if(isNaN(max)){
        max = 9999;
      }
      if(size >= min && size <= max){
        this.lengthLegal = true;
      }
      if(size <= min){
        alert("Too small");
        this.lengthLegal = false;
      }
      if(size >= max){
        var trophyStatus = this.checkTrophy();
        if(trophyStatus){
          this.lengthLegal = true;      
        }
        else{
          alert("Too big");
          this.lengthLegal = false;
        }
      }
    }
    /*
    this.checkAggList();
    console.log(this.aggs);
    if (this.aggLegal == true){
      this.checkAgg();
    }
    */
  }

  checkTrophy():boolean{
    var tCounter = 0;
    if(!isNaN(this.trophy)){
      for(var i = 0; i < this.catches.length; i++){
        if(this.catches[i].Species == this.Species && this.catches[i].FishLength > this.maxLength){
          tCounter++;
        }
      }
      if(tCounter < this.trophy-1){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }

  checkBag(){
    if(this.bagLimit == undefined){
      this.setValues(this.Species);
    } else if(isNaN(this.bagLimit)){
      this.bagLegal = true;
    }
    else {
      var bCounter = 0;
      for(var i = 0; i < this.catches.length; i++){
        if(this.catches[i].Species == this.Species){
          bCounter++;
        }
      }
      if(bCounter <= this.bagLimit - 1){
        this.bagLegal = true;
      }
      else{
        this.bagLegal = false;
        alert("Bag limit reached");
      }
    }

  }

  checkAgg(){
    if(this.aggLimit == undefined){
      this.setValues(this.Species);
    } else if(isNaN(this.aggLimit)){
      this.aggLegal = true;
    }
    else {
      var aCounter = 0;
      for(var i = 0; i < this.catches.length; i++){
        if(this.catches[i].AggGroup == this.aggGroup){
          aCounter++;
        }
      }
      if(aCounter <= this.aggLimit - 1){
        this.aggLegal = true;
      }
      else{
        this.aggLegal = false;
        alert("Aggregate limit reached");
      }
    }
  }

  getAgg(spec:any):any{
    this.service.getFishById(spec).subscribe(data=>{
      var res = JSON.parse(JSON.stringify(data));
      var aggRes = res[0].AggGroup;
      //console.log(aggRes);
      return aggRes;
    });
  }
/*
  checkAgg(){
    if(this.aggLimit == undefined){
      this.setValues(this.Species);
    }
    else {
      var aCounter = 0;
      if(!isNaN(this.aggLimit)){
        for(var i = 0; i < this.catches.length; i++){
          if(this.aggResult == undefined || this.aggResult == null){
            this.getAgg(this.Species);
          }
          else {
            if(this.aggResult == this.aggGroup ){
              aCounter++;
            }
          }
        }
        if(aCounter <= this.aggLimit -1){
          this.aggLegal = true;
          this.aggs.push(this.aggResult);
        }
        else{
          this.aggLegal = false;
          alert("Aggregate limit reached");
        }
      }
      if(isNaN(this.aggLimit)){
        this.aggLegal = true;    
      }
    }
  }

  checkAggList(){
    if(this.aggGroup == undefined){
      this.setValues(this.Species);
    }
    else {
      if(this.aggs.includes(this.aggGroup)){
        this.aggLegal = false;
      }
      else{
        this.aggLegal = true;
      }
    }
  }
*/

  addCatch(){
    //var cAgg = this.getAgg(this.Species);
    var c = {
      CatchId: this.CatchId,
      Species: this.Species,
      FishLength:this.FishLength,
      AggGroup: ''
    }
    //console.log(c.AggGroup);
    this.getCatches();
    this.setValues(c.Species);
    c.AggGroup = this.aggGroup;
    this.checkLength(parseInt(c.FishLength), this.minLength, this.maxLength);
    if(this.lengthLegal && this.bagLegal && this.aggLegal){
      this.service.addCatch(c).subscribe(data=>{
        alert("Catch Added");
      });
      //this.lengthLegal, this.bagLegal, this.aggLegal = false;
      //console.log(this.aggLegal);
      window.location.reload();
    }
  }

  editCatch(){
        //var cAgg = this.getAgg(this.Species);
        var c = {
          CatchId: this.CatchId,
          Species: this.Species,
          FishLength:this.FishLength,
          AggGroup: ''
        }
        //console.log(c.AggGroup);
        this.getCatches();
        this.setValues(c.Species);
        c.AggGroup = this.aggGroup;
        this.checkLength(parseInt(c.FishLength), this.minLength, this.maxLength);
        if(this.lengthLegal){
          this.service.editCatch(c).subscribe(data=>{
            alert("Catch Added");
          });
          window.location.reload();
          //this.lengthLegal, this.bagLegal, this.aggLegal = false;
          //console.log(this.aggLegal);
        }
    
  }
}

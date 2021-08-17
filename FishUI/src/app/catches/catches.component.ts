import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { AddEditCatchComponent } from './add-edit-catch/add-edit-catch.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catches',
  templateUrl: './catches.component.html',
  styleUrls: ['./catches.component.css']
})
export class CatchesComponent implements OnInit {
  closeResult = '';
  catchList:any = [];
  ModalTitle!:string;

  catch:any;
  AddOrEdit:boolean = false;

  constructor(private modalService: NgbModal, private service:SharedService) { }

  ngOnInit(): void {
    this.refreshCatchList();
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addClick(){
    this.catch = {
      CatchId: 0,
      Species: "",
      FishLength: "",
      AggGroup: ""
    }
    this.ModalTitle = "Add Catch";
    this.AddOrEdit = true;
  }

  closeClick(){
    this.AddOrEdit = false;
    this.refreshCatchList();
    window.location.reload();
  }

  editClick(item:any){
    this.catch = item;
    this.ModalTitle = "Edit Catch";
    this.AddOrEdit = true;
    this.refreshCatchList();
  }

  refreshCatchList(){
    this.service.getCatches().subscribe(data=>{
      this.catchList = data;
    });
  }

  deleteCatch(item:any){
    this.catch = item;
    var toDelete = this.catch.CatchId;
    if(confirm("Are you sure?")){
      this.service.deleteCatch(toDelete).subscribe(data=>{
        alert("Catch deleted");
    });
  }
  window.location.reload();
}
}

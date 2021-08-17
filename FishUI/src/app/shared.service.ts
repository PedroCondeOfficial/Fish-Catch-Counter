import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:41187/api";

  constructor(private http:HttpClient) { }

  getFish():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/fish');
  }

  getFishById(val:any){
    return this.http.get(this.APIUrl + '/fish/' + val);
  }

  getCatches():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/catches');
  }

  addCatch(val:any){
    return this.http.post(this.APIUrl + '/catches', val);
  }

  editCatch(val:any){
    return this.http.put(this.APIUrl + '/catches', val);
  }

  deleteCatch(val:any){
    return this.http.delete(this.APIUrl + '/catches/' + val);
  }
}

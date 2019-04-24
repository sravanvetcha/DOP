import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AskLevelEntity } from '../model/asklevel';
import { HistoricalData } from '../model/HistoricalData';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseurl="http://localhost:9000/api/v1";
  private getTime="/askLevel/getTimeRange";
  private formInput="/formInput";
  
  constructor(private http: HttpClient) { }

  
  getTimeRange()
  {
    
     console.log('getTimeRange');
     return  this.http.get<AskLevelEntity[]>(this.baseurl+this.getTime);
  
  }

  postTimeInterval(event)
  {
    
     console.log('getTimeRange');
     return  this.http.post<HistoricalData>(this.baseurl+this.formInput,event);
  
  }
}

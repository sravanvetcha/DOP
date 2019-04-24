import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs-compat/Rx";
import { WebsocketService } from '../websocket.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
export interface Message {
  author: string;
  message: string;
}
//const CHAT_URL = "ws://echo.websocket.org/";
const CHAT_URL ="ws://3.93.103.201:8085/xchange/711/p3nk1hu1/websocket"
@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  public messages: Subject<string>;
  private baseurl="http://localhost:9000/api/v1/event";
  constructor(private wsService: WebsocketService,private http: HttpClient) {
    
  }
  connect(socketUrl)
  {
    this.messages = <Subject<string>>this.wsService.connect(socketUrl).map(
      (response: MessageEvent): string => {
        let data = response.data//JSON.parse(response.data);
        return data;
      }
    );
    return this.messages
  }
  postEventToSpring(event)
  {
    
     console.log('event to save is ',event);
     return  this.http.post(this.baseurl,event);
  
  }
}

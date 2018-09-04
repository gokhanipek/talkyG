import { ChatMessage } from './../models/chat-message.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  user: any; 

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if( auth !== undefined && auth !== null){
        this.user = auth;
      }
    })
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email
    })
  }
  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + ( now.getMonth() + 1 )+ '/' + now.getDate();
    const time = now.getUTCHours() + '/' + now.getUTCMinutes() + '/' + now.getUTCSeconds();
  }

  getMessages(){
    
  }
}

import { ToastrService } from 'ngx-toastr';
import { inject, Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubsUrl;
  private hubConnection?: HubConnection;
  private toaster = inject(ToastrService);
  onlineUsers = signal<string[]>([]);
  
  
  createHubConnection(user: User){
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl + 'presence', {
      accessTokenFactory: () => user.token
    })
    .withAutomaticReconnect()
    .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.toaster.info(username + ' has connected');
    });

    this.hubConnection.on('UserIsOnline', username => {
      this.toaster.warning(username + ' has disconnected');
    });

    this.hubConnection.on('GetOnlineusers', usernames => {
      this.onlineUsers.set(usernames);
    })
  }

  stopHubConnection(){
    if(this.hubConnection?.state == HubConnectionState.Connected){
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }
}

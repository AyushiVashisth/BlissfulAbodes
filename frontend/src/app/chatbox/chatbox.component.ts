import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  newMessage: string = '';
  isOpen: boolean = false;
  socket: Socket | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.socket = io('https://blissful-abodes-api.onrender.com');

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.connected);
    });

    this.socket.on('message', (message: string) => {
      console.log('Received message from server:', message);
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  async handleSendMessage() {
    if (this.newMessage.trim() !== '') {
      console.log('Sending message:', this.newMessage);
      this.messages.push(`You: ${this.newMessage}`);

      try {
        const response = await this.http.post<any>('https://blissful-abodes-api.onrender.com/conversation', {
          message: this.newMessage
        }).toPromise();

        const aiResponse = response.message;
        this.messages.push(`${aiResponse}`);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      this.newMessage = '';
    }
  }

  toggleChatBox() {
    this.isOpen = !this.isOpen;
    if (!this.socket || !this.socket.connected) {
      this.socket = io('https://blissful-abodes-api.onrender.com');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { PureClient } from 'pure-client'
import { Observable } from 'rxjs';

interface PureUser {
	username: string
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  	title = 'pure-dash';
	users: any = [];
	constructor() {
		console.log('hitting here');
		
	}

	async ngOnInit() {
		await this.getPureUsers();
	  }
  async getPureUsers() {
		const url = "";
		const apiKey = "";
		const p = new PureClient(url, apiKey);
		const users = await p.get("users/");
		console.log("ng onit...");
		console.log(users);
		this.users = users;
  }
  	

}

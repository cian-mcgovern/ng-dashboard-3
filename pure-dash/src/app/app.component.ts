import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PureClientService } from './pure-client.service';
import { PeopleXdClientService } from './peoplexd-client.service';
import { SimpleHttpService } from './simple.http.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  	title = 'pure-dash';
	users: any = [];
	appointments: any = [];
	
	constructor(private pureClientService: PureClientService, private peoplexdClientService: PeopleXdClientService, private simpleHttpService: SimpleHttpService) {
		console.log('hitting here');
	}

	ngOnInit() {

		this.pureClientService.getUsers().subscribe(
			{
				next: (v) => {
					console.log(v.items);
					this.users = v.items;
				},
				error: (e) => console.error(e),
				complete: () => console.info('complete') 
			}
		);

		// issue with access
		// this.peoplexdClientService.getAppointments().subscribe(
		// 	{
		// 		next: (v) => {
		// 			console.log(v.data.items);
		// 			this.appointments = v.data.items;
		// 		},
		// 		error: (e) => console.error(e),
		// 		complete: () => console.info('complete') 
		// 	}
		// )

		// authorisation issues (simple http service attempts to get data from people xd without using client)
		this.simpleHttpService.getData().subscribe(
			{
				next: (v) => {
					console.log(v);
					console.log(v.items);
					this.appointments = v.items;
				},
				error: (e) => console.error(e),
				complete: () => console.info('complete') 
			}
		)
		
	}

	

}

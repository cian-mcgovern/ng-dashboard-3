import { Injectable } from '@angular/core';
import { PeopleXdClient } from 'peoplexd-client';
import * as envJson from '../assets/env.json';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleXdClientService {

    constructor() { }

    getAppointments(): Observable<any> {
        return from(PeopleXdClient.new(envJson.PEOPLEXD_URL, envJson.PEOPLEXD_ID, envJson.PEOPLEXD_SECRET).then((client) => {
            client.appointments("453609").then((appointments) => {
                console.log(appointments)
                return appointments;
            })
        }));
    }
}

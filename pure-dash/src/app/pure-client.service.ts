import { Injectable } from '@angular/core';
import { PureClient } from 'pure-client';
import * as envJson from '../assets/env.json';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PureClientService {

    constructor() { }

    getUsers(): Observable<any> {
        const p = new PureClient(envJson.PURE_API_URL, envJson.PURE_API_KEY);
        return from(p.get("users/").then(response => response))
    }
}

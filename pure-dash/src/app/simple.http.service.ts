import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as envJson from '../assets/env.json';

@Injectable({
    providedIn: 'root'
})
export class SimpleHttpService {

    url = envJson.PEOPLEXD_URL;
    clientId = envJson.PEOPLEXD_ID;
    clientSecret = envJson.PEOPLEXD_SECRET;

    constructor(private http: HttpClient) { }

    getData(): Observable<any> {

        const staffNumber = '453609';
        const token = ''; // hardcoding token does work (issue currently with retrieving token)

        try {
                const uri = `${this.url}oauth/token`
                const params = new HttpParams()
                                    .set('grant_type', 'client_credentials')
                // Set the headers
                const headers1 = new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded' // Required for OAuth
                });
                // const params = new HttpParams()
                //                     .set('grant_type', 'client_credentials')
                //                     .set('username', this.clientId)
                //                     .set('password', this.clientSecret);

                const response = this.http.post<any>(`${this.clientId}:${this.clientSecret}@api.corehr.com/ws/tudp/corehr/oauth/token`, null, { params: params } );

                console.log("response");
                response.subscribe(
                    {
                        next: (v) => {
                            console.log(v);
                            console.log(v);
                        },
                        error: (e) => console.error("ERROR here", e),
                        complete: () => console.info('complete') 
                    }
                )
                console.log(response);

                // similiar will be needed after a token is returned
                // const keys = response.data
                // this.pxdToken = {
                //     access_token: keys.access_token,
                //     expires_at: this.tokenExpires(keys.expires_in)
                // }

                // below works when an access token is received
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                });
        
                return this.http.get<any>(`https://api.corehr.com/ws/tudp/corehr/v1/person/appointment/${staffNumber}`, { headers });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Error fetching token:', error.message)
                } else {
                    console.error('Unknown error fetching token:', error)
                }
                throw error
            }
        }

}
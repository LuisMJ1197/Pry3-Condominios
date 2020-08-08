import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Architect } from '../logic/architect/architect';
import { throwError } from 'rxjs';
import { Ground } from '../logic/modeling/ground';
import { jsonIgnoreReplacer } from 'json-ignore';
import { CondoProject } from '../logic/condo/condo-project';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})


export class ServerService {
  
  URL: string = "http://localhost:5000/";
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }

  constructor(private http: HttpClient) {
    this.getDirections();
  }

  getDirections() {
    return this.http.get(this.URL.concat("directions"));
  }

  loadArchitects() {
    return this.http.get(this.URL.concat("architects"));
  }

  loadDesigns() {
    return this.http.get(this.URL.concat("designs"));
  }

  saveArchitect(data: Architect) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.post(this.URL.concat("addarchitect"), data, options).pipe(
        
    );
  }

  saveDesign(editingGround: Ground) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.post(this.URL.concat("adddesign"), JSON.stringify(editingGround, jsonIgnoreReplacer), options).pipe(
        
    );
  }

  updateDesign(editingGround: Ground) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.put(this.URL.concat("updatedesign"), JSON.stringify(editingGround, jsonIgnoreReplacer), options).pipe(
        
    );
  }

  deleteDesign(design: Ground) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.post(this.URL.concat("deletedesign"), {_id: design._id}, options).pipe(
        
    );
  }

  saveCondoProject(condoProject: CondoProject) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.post(this.URL.concat("addcondoproject"), JSON.stringify(condoProject, jsonIgnoreReplacer), options).pipe(
        
    );
  }

  
  updateCondoProject(condoProject: CondoProject) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.put(this.URL.concat("updatecondoproject"), JSON.stringify(condoProject, jsonIgnoreReplacer), options).pipe(
        
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  loadProjects() {
    return this.http.get(this.URL.concat("condoprojects"));
  }
}

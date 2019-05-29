import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Response} from '@angular/http';
import {AuthService} from '../../auth/auth.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as appReducers from '../../store/app.reducers';
import * as authActions from '../../auth/store/auth.actions';
import * as authReducers from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<authReducers.State>;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<appReducers.AppState>
  ) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  // httpclient request events
  // onSaveData() {
  //   this.dataStorageService.storeRecipes().subscribe(
  //     (response: HttpEvent<Object>) => {
  //       if (response.type === HttpEventType.Sent) {
  //         console.log('Save Req Sent: ', response);
  //       } else if (response.type === HttpEventType.Response) {
  //         console.log('Save Response Received: ', response);
  //       }
  //     }
  //   );
  // }

  onFetchData() {
    this.dataStorageService.getStoredRecipes();
  }

  onSignOut() {
    this.authService.signoutUser();
  }
}

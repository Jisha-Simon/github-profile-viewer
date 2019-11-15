import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
@Component({
  selector: 'app-git-profile',
  templateUrl: './git-profile.component.html',
  styleUrls: ['./git-profile.component.scss']
})
export class GitProfileComponent implements OnInit {
  username: any;
  data: any;
  local: any;
  error = false;
  loader = false;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  ngOnInit() {
  }
  getData() {
    this.loader = true;
    this.local = localStorage.getItem(this.username);
    if (this.local) {
      this.data = JSON.parse(this.local);
      this.loader = false;
      this.error = false;
    } else {
    this.getName().subscribe(response => {
      console.log(response);
      this.data = response;
      this.loader = false;
      this.error = false;
      localStorage.setItem(this.username, JSON.stringify(this.data));
    }, err => {

      this.loader = false;
      this.error = true;
      this.data = false;
      if (this.username) {
        this.snackBar.open('Bad Credentials', 'undo', {
          duration: 3000
        });
      } else {
      this.snackBar.open('User Name Field Empty', 'undo', {
        duration: 3000
      });
    }
    });
  }
}
  getName() {
    return this.http.get(' https://api.github.com/users/' + this.username);
  }

}

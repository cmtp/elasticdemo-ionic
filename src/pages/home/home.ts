import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { SearchService } from '../../providers/search-service/search-service';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  students: any[] = [];
  studentForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public searchService: SearchService
  ) {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
  }

  ionViewDidLoad() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.searchService.getStudents().subscribe(
      (data) => {
        this.students = data['students'];
      },
      (error) => {
        console.log(error);
      }
    )
  }

  search(event) {
    if(event.target.value !== undefined &&
      event.target.value !== null &&
      event.target.value !== ''
    ) {
      this.searchService.searchStudent(event.target.value)
      .subscribe(
        (data) => {
          this.students = data['students'];
        },
        (error) => {
          console.log(error);
        }
      )
    }
    else {
      this.loadInitialData();
    }
  }

  saveData() {
    console.log(this.studentForm.value);
    this.searchService.createStudent({name: this.studentForm.value.name, age: this.studentForm.value.age})
      .subscribe((student) => {
        console.log(student);
        this.studentForm.reset();
      });
  }
}

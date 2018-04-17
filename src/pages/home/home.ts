import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public searchService: SearchService
  ) {
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
}

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

  students: string[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public searchService: SearchService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.searchService.getStudents().subscribe(
      (data) => {
        this.students = data['results'];
      }
    )
  }

}

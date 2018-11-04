import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  constructor(public navCtrl: NavController, private alertController: AlertController) {

  }
  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add Todo",
      message: "Enter Your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"//text field with name as id in android
        }],
      buttons: [{
        text: "Cancel"
      },
      {
        text: "Add Todo",
        handler: (inputData) => {
          let todoText;
          todoText = inputData.addTodoInput;//yeha pe data lake de diya hai textfield se
          this.todos.push(todoText);
        }
      }]
    });
    addTodoAlert.present();
  }

}

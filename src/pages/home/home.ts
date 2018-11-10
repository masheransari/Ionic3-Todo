import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray } from 'ionic-angular';
import { ArchivedTodosPage } from "../archived-todos/archived-todos";
import { TodoService } from '../../providers/todo-service/todo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnable = false;
  public archivedTodosPage = ArchivedTodosPage;
  constructor(private todoService: TodoService, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoService.archievedTodo(todoIndex);
  }
  goToArchivePage() {
    // console.log(this.archivedTodosPage);
    this.navCtrl.push(ArchivedTodosPage);
  }
  itemReordered($event) {
    reorderArray(this.todos, $event);
  }
  toggleReorder() {
    this.reorderIsEnable = !this.reorderIsEnable;
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
          this.todoService.addTodo(todoText);

        }
      }]
    });
    addTodoAlert.present();
  }

}

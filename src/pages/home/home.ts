import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
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
  constructor(private toast: ToastController, private todoService: TodoService, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex) {
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
  editTodoValue(index) {
    let editTodoAlert = this.alertController.create({
      title: "Edit Todo",
      message: "Edit Your Todo",
      inputs: [
        {
          type: "text",
          name: "editInput",
          value: this.todos[index]
        }
      ],
      buttons: [{
        text: "Cancel"
      },
      {
        text: "Edit Todo",
        handler: (inputData) => {
          let todoText;
          todoText = inputData.editInput;//yeha pe data lake de diya hai textfield se
          console.log(todoText);
          this.todoService.editTodo(todoText, index);
          editTodoAlert.onDidDismiss(() => {
            let editTodoToast = this.toast.create({
              message: "Todo is Updated",
              duration: 2000
            });
            editTodoToast.present();

          });
        }
      }]
    });
    editTodoAlert.present();
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
          addTodoAlert.onDidDismiss(() => {
            let addTodoToast = this.toast.create({
              message: "Todo is Added",
              duration: 2000
            });
            addTodoToast.present();
          });
        }
      }]
    });
    addTodoAlert.present();
  }


}

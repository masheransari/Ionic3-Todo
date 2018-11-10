import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoService {

  private todo = [];
  private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoServiceProvider Provider');
  }

  archievedTodo(todoIndex) {
    let todoToBeArchived = this.todo[todoIndex];
    this.todo.splice(todoIndex, 1);
    this.archivedTodos.push(todoToBeArchived);
  }
  getArchivedTodos(){
    return this.archivedTodos;
  }

  getTodos() {
    return this.todo;
  }

  addTodo(todoText) {
    this.todo.push(todoText);
  }

}

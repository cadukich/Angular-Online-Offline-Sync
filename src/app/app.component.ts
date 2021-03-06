import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo';
import { OnlineOfflineService } from './services/online-offline.service';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Online-Offline-Sync';
  form: FormGroup;

  todos: Todo[] = [];

  constructor(
    private readonly todoService: TodoService,
    public readonly onlineOfflineService: OnlineOfflineService
  ) {
    this.form = new FormGroup({
      value: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.todos = this.todoService.getAllTodos();
  }

  addTodo() {
    this.todoService.addTodo(this.form.value);

    this.form.reset();
  }

  markAsDone(todo: Todo) {
    todo.done = !todo.done;
  }
}

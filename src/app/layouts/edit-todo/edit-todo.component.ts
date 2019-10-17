import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TodoState } from 'src/app/store/states/todo.state';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { AddTodo, UpdateTodo } from 'src/app/store/actions/todo.action';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  @Select(TodoState.getSelectedTodo) todo$: Observable<Todo>;
  todo: Todo;
  task = '';
  completed = false;
  constructor(private store: Store) {

    this.todo$.subscribe((todo) => {
      this.todo = todo;
      this.task = todo ? todo.task : '';
      this.completed = todo ? todo.completed : false;

    });

   }

  ngOnInit() {
  }

  saveTodo() {
    if (!this.todo) {
      // tutorial sake
      const id = parseInt((Math.random() * 100).toString(), 10);
      this.store
            .dispatch(new AddTodo({id, task: this.task, completed: this.completed}))
            .subscribe(() => {
              this.clearForm();
            });
    } else {
      this.store
            .dispatch(new UpdateTodo(this.todo.id, {task: this.task, completed: this.completed}))
            .subscribe(() => {
              this.clearForm();
            });
    }
  }
  clearForm() {
    this.task = '';
    this.completed = false;
  }

}

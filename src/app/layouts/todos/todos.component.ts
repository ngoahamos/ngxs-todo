import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TodoState } from 'src/app/store/states/todo.state';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoSelected, RemoveTodo, MarkCompletion } from 'src/app/store/actions/todo.action';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @Select(TodoState.getTodos) todos$: Observable<Todo>;
  constructor(private store: Store) { }

  ngOnInit() {
  }
  onTodoSelected(todo: Todo) {
    this.store.dispatch(new TodoSelected(todo));
  }
  removeTodo(id: number) {
    this.store.dispatch(new RemoveTodo(id));
  }
  markStatus(id: number, completed: boolean) {
    this.store.dispatch(new MarkCompletion(id, completed));
  }

}

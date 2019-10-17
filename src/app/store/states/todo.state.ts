import { State, Selector, Action, StateContext } from '@ngxs/store';
import { patch, updateItem, insertItem, iif, removeItem } from '@ngxs/store/operators';
import { Todo } from 'src/app/models/todo.model';
import { AddTodo, RemoveTodo, UpdateTodo, TodoSelected, MarkCompletion } from '../actions/todo.action';

export class TodoStateModel {
    selectedTodoId: number;
    selectedTodo: Todo;
    todos: Todo[];
}
@State<TodoStateModel>({
    name: 'todos',
    defaults: {
        selectedTodoId: null,
        selectedTodo: null,
        todos: []
    }
})
export class TodoState {
    @Selector()
    static getSelectedTodoId({selectedTodoId}: TodoStateModel) {
        return selectedTodoId;
    }
    @Selector()
    static getSelectedTodo({selectedTodo}: TodoStateModel) {
        return selectedTodo;
    }
    @Selector()
    static getTodos({todos}: TodoStateModel) {
        return todos;
    }
    @Action(TodoSelected)
    TodoSelected({patchState}: StateContext<TodoStateModel>, {todo}: TodoSelected) {
        patchState({
            selectedTodo: todo,
            selectedTodoId: todo.id
        });
    }
    @Action(AddTodo)
    addTodo({setState}: StateContext<TodoStateModel>, {payload}: AddTodo) {
      setState(
          patch({
              todos: insertItem(payload, 0)
          })
      );
    }
    @Action(RemoveTodo)
    removeTodo({getState, setState}: StateContext<TodoStateModel>, {id}: RemoveTodo) {

        const state = getState();
        if (state.selectedTodoId === id) {
            setState(
                patch({
                    selectedTodo: null,
                    selectedTodoId: null,
                    todos: removeItem<Todo>((todo) => todo.id === id)
                })
            );
        } else {
            setState(
                patch({
                todos: removeItem<Todo>((todo) => todo.id === id)
                })
            );
        }
        // iif(state.selectedTodoId === id,
        //     patch({
        //         selectedTodo: null,
        //         selectedTodoId: null,
        //         todos: removeItem<Todo>((todo) => todo.id === id)
        //     }),
        //     patch({
        //         todos: removeItem<Todo>((todo) => todo.id === id)
        //     })
        //     );

    }
    @Action(UpdateTodo)
    UpdateTodo({setState, getState}: StateContext<TodoStateModel>, {id, payload}: UpdateTodo) {
        setState(
            patch({
                selectedTodo: null,
                selectedTodoId: null,
                todos: updateItem<Todo>((todo) => todo.id === id, {id, ...payload})
            })
        );
    }
    @Action(MarkCompletion)
    MarkCompletion({setState, getState}: StateContext<TodoStateModel>, {id, complete}: MarkCompletion) {
        const todo = getState().todos.find(to => to.id === id);
        setState(
            patch({
                todos: updateItem<Todo>((tod) => tod.id === id, {...todo, completed: !complete})
            })
        );
    }
}

import { Todo } from 'src/app/models/todo.model';
export class TodoSelected {
    static readonly type = '[Todo] selected';
    constructor(public todo: Todo) { }
}
export class AddTodo {
    static readonly type = '[Todo] Add';
    constructor(public payload: Todo) { }
}

export class RemoveTodo {
    static readonly type = '[Todo] remove';
    constructor(public id: number) { }
}

export class UpdateTodo {
    static readonly type = '[Todo] update';
    constructor(public id: number, public payload: Todo) { }
}

export class MarkCompletion {
    static readonly type = '[Todo] markCompletion';
    constructor(public id: number, public complete: boolean) { }
}

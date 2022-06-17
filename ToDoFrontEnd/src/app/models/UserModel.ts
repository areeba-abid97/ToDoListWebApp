import { Todo } from "./ToDoModel";

export class User {
    _id: any;
    username?: string;
    password?: string;
    todos?: Todo[];
}
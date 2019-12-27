import { Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { filter, map } from 'lodash';
import axios from 'axios';
import { ITodo } from '~/types';

@Module({
  name: 'todos',
  stateFactory: true,
  namespaced: true,
})
export default class Todos extends VuexModule {
  tasks: ITodo[] = [];

  get completed(): ITodo[] {
    return filter(this.tasks, ['completed', true]);
  }

  get todos(): ITodo[] {
    return filter(this.tasks, ['completed', false]);
  }

  @MutationAction({ mutate: ['tasks'] })
  async loadTodos(): Promise<{ tasks: ITodo[] }> {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const request = axios.get(url);
    const onResponse = (resp: { data: ITodo[] }): ITodo[] => resp.data;
    const tasks: ITodo[] = await request.then(onResponse);
    const getTasksRange = (from = 0, to = 9): ITodo[] => tasks.slice(from, to);
    return { tasks: getTasksRange() };
  }

  @Mutation
  deleteTodo(todo: ITodo): void {
    this.tasks = filter(this.tasks, ({ id }) => id !== todo.id);
  }

  @Mutation
  completeTodo(todo: ITodo): void {
    this.tasks = map(this.tasks, (todoItem: ITodo) => {
      if (todoItem.id !== todo.id) return todoItem;

      return {
        ...todoItem,
        completed: !todoItem.completed,
      };
    });
  }

  @Mutation
  add(todo: ITodo): void {
    this.tasks = [...this.tasks, todo];
  }
}

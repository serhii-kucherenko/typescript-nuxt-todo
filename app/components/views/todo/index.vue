<template>
  <div class="wrapper">
    <h4 v-if="loading">Loading...</h4>
    <div v-else class="todo">
      <h4 v-if="isTodoListEmpty">This list is empty</h4>
      <todo-list v-else :todos="todoList" />
    </div>
    <div class="links">
      <nuxt-link to="/" class="button--green">Go home</nuxt-link>
      <a class="button--grey" @click="showCompleted = !showCompleted">{{ toggleTodoListBtnLabel }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { namespace } from 'vuex-class';
import { isEmpty } from 'lodash';
import TodoList from '~/components/todo/TodoList.vue';
import { ITodo } from '~/types';

const todosModule = namespace('todos');

@Component({
  components: {
    TodoList,
  },
})
export default class TodoView extends Vue {
  loading = true;
  showCompleted = false;

  @todosModule.Getter('todos') todos!: ITodo[];
  @todosModule.Getter('completed') completed!: ITodo[];
  @todosModule.Action('loadTodos') loadTodos!: () => Promise<ITodo[]>;

  mounted(): void {
    this.loadTodos().then(this.stopLoading);
  }

  get isTodoListEmpty(): boolean {
    return isEmpty(this.todoList);
  }

  get todoList(): ITodo[] {
    return this.showCompleted ? this.completed : this.todos;
  }

  get toggleTodoListBtnLabel(): string {
    return this.showCompleted ? 'Show todos' : 'Check completed';
  }

  stopLoading(): void {
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  & h4 {
    margin-top: 12px;
  }

  .links {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 24px;

    & > * {
      width: 200px;
    }
  }
}
</style>

<template>
  <div class="todo__list">
    <todo-item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @on-delete="deleteTodo"
      @on-complete="completeTodo"
    ></todo-item>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { namespace } from 'vuex-class';
import TodoItem from './TodoItem.vue';
import { ITodo } from '~/types';

const todosModule = namespace('todos');

@Component({
  components: {
    TodoItem,
  },
})
export default class Todo extends Vue {
  @Prop({ required: true, default: [] }) todos!: ITodo[];

  loading = true;
  showCompleted = false;

  @todosModule.Mutation('deleteTodo') deleteTodo!: void;
  @todosModule.Mutation('completeTodo') completeTodo!: void;

  get toggleTodoListBtnLabel(): string {
    return this.showCompleted ? 'Show todos' : 'Check completed';
  }
}
</script>

<style lang="scss" scoped>
.todo__list {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 6px;
  width: 320px;
  padding: 12px;
  border: 1px solid #f7f8fb;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  &__item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 8px 14px;
    color: #f5f5f5;
    background-color: #3b8070;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    &:hover {
      background-color: #3b9999;
    }

    &__action {
      &__edit {
        color: #fff;
        background-color: orange;
        border: none;
      }

      &__delete {
        color: #fff;
        background-color: orangered;
        border: none;
      }
    }
  }
}
</style>

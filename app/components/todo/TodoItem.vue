<template>
  <div class="todo-item">
    <div class="todo-item__label">
      {{ todo.id + '. ' + todo.title }}
    </div>
    <div class="todo-item__action">
      <button :class="completeBtnClass" @click="onComplete">{{ completeBtnLabel }}</button>
      <button class="todo-item__action-delete" @click="onDelete">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'nuxt-property-decorator';
import { ITodo } from '~/types';

@Component
export default class TodoItem extends Vue {
  @Prop({ required: true }) todo!: ITodo;

  get completeBtnLabel(): string {
    return this.todo.completed ? 'Undo' : 'Done';
  }

  get completeBtnClass(): string {
    return this.todo.completed ? 'todo-item__action-undo' : 'todo-item__action-complete';
  }

  @Emit()
  onDelete(): ITodo {
    return this.todo;
  }

  @Emit()
  onComplete(): ITodo {
    return this.todo;
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  width: 292px;
  padding: 8px 14px;
  color: #f5f5f5;
  background-color: #3b8070;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    background-color: #3b9999;
  }

  &__label {
    width: 65%;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__action {
    display: flex;

    &-complete {
      margin-right: 8px;
      color: #fff;
      background-color: #3f95be;
      border: none;
    }

    &-undo {
      margin-right: 8px;
      color: #fff;
      background-color: orange;
      border: none;
    }

    &-delete {
      color: #fff;
      background-color: orangered;
      border: none;
    }
  }
}
</style>

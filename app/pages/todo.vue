<template>
  <div class="container">
    <h2 class="title">
      ToDo List
    </h2>
    <todo />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Todo from '~/components/views/todo/index.vue';

@Component({
  components: {
    Todo,
  },
})
export default class TodoPage extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 4% 0;
}

.title {
  width: 100%;
  padding-bottom: 15px;
  font-size: 42px;
  font-weight: 300;
  color: #526488;
  text-align: center;
  word-spacing: 5px;
}
</style>

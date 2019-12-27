import ExampleWorker from '@/assets/Example.worker.js'; // worker files has to end in ".worker.js" - see nuxt.config.js

// eslint-disable-next-line
export default (context, inject) => {
  inject('worker', {
    createWorker() {
      return new ExampleWorker();
    },
  });
};

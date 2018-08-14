<template>
  <main class="wrapper" id="app">
      <welcome class="container" :bidule="'hello'"></welcome>
  </main>
</template>

<script>
import Welcome from './assets/pages/Welcome.md'

export default {
    name: 'app',
    components: {
        Welcome
    }
};
</script>

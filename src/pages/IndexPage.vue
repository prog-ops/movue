<!-- src/pages/Index.vue -->
<template>
  <q-page class="flex flex-center">
    <movie-list />
  </q-page>
</template>

<script>
import MovieList from 'components/MovieList.vue';

export default {
  name: 'PageIndex',
  components: {
    MovieList,
  },
};
</script>

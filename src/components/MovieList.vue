<!-- src/components/MovieList.vue -->
<template>
  <div>
    <!-- Search field -->
    <q-input v-model="search" label="Search" @input="updateMovies"/>

    <!-- Movie list -->
    <q-list bordered>
      <q-item
        v-for="movie in filteredMovies"
        :key="movie.id"
        clickable
        @click="goToDetailScreen(movie)"
      >
        <q-item-section>
          <q-item-label>{{ movie.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Floating button -->
    <q-btn
      fab
      color="primary"
      icon="mdi-plus"
      class="q-ma-md"
      style="position: fixed; bottom: 16px; right: 16px;"
      @click="addNewMovie"
    />
  </div>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import {getMovies} from '../services/movieService';
import {Movie} from '../models/Movie';
import { useRouter } from 'vue-router';

export default {
  name: 'MovieList',
  setup() {
    const search = ref('');
    const movies = ref<Movie[]>([]);
    const filteredMovies = ref<Movie[]>([]);
    const router = useRouter();

    const updateMovies = async () => {
      const allMovies = await getMovies();
      movies.value = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(search.value.toLowerCase())
      );
    };

    const goToDetailScreen = (selectedMovie: Movie | null) => {
      router.push({ name: 'MovieDetail', params: { id: selectedMovie?.id } });
    };

    const addNewMovie = () => {
      router.push({ name: 'MovieDetailAdd' });
    };

    onMounted(() => {
      updateMovies();
    });

    return {
      search,
      movies,
      filteredMovies,
      updateMovies,
      goToDetailScreen,
      addNewMovie
    };
  },
};
</script>

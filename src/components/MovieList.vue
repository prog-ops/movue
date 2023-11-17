<template>
  <div class="movie-list">
    <!-- Search field -->
    <q-input v-model="search" label="Search movie name" />

    <!-- Movie list -->
    <q-list bordered>
      <q-item
        v-for="movie in filteredMovies"
        :key="movie.id"
        clickable
        @click="goToDetailScreen(movie)"
      >
        <q-item-section>
          <q-item-label class="movie-title">{{ movie.title }}</q-item-label>
          <q-item-label>{{ movie.director }}</q-item-label>
          <q-item-label>{{ movie.summary }}</q-item-label>
          <q-item-label class="q-mr-md">
            <template v-if="movie.genres.length > 0">
              <span
                v-for="(genre, index) in movie.genres"
                :key="index"
                class="genre-container"
              >
                {{ genre }}
              </span>
            </template>
            <template v-else>
              Unknown genre
            </template>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Floating button Add -->
    <q-btn
      fab
      color="primary"
      icon="mdi-plus"
      class="q-ma-md"
      style="position: fixed; bottom: 16px; right: 16px;"
      @click="addNewMovie"
    />

    <!-- Delete all movies button -->
    <q-btn
      class="delete-btn"
      color="negative"
      label="Delete all movies"
      @click="deleteMovies" />
  </div>
</template>

<script lang="ts">
import {ref, onMounted, onBeforeUpdate, computed} from 'vue';
import {Movie} from '../models/Movie';
import {useRouter} from 'vue-router';
import {store} from 'stores/store'

export default {
  name: 'MovieList',
  setup() {
    const search = ref('');
    const movies = ref<Movie[]>([]);
    const router = useRouter();

    const filteredMovies = computed(() => {
      if (!search.value) {
        return store.movies;
      }
      return store.movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const goToDetailScreen = (selectedMovie: Movie | null) => {
      router.push({name: 'MovieDetail', params: {id: selectedMovie?.id}});
    };

    const addNewMovie = () => {
      router.push({name: 'MovieDetailAdd'});
    };

    const deleteMovies = () => {
      store.deleteMovies();
    };

    onMounted(() => {
      movies.value = store.getMovies();
    });

    onBeforeUpdate(() => {
      movies.value = store.getMovies();
    });

    return {
      search,
      movies,
      filteredMovies,
      goToDetailScreen,
      addNewMovie,
      deleteMovies
    };
  },
};
</script>

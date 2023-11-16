<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-form @submit="saveMovie">
          <q-btn label="Save" color="primary" type="submit"/>
          <q-btn color="negative" label="Delete" @click="deleteMovie" />
          <q-input v-model="movie.title" label="Title"/>
          <q-input v-model="movie.director" label="Director"/>
          <q-input v-model="movie.summary" label="Summary" type="textarea"/>
          <q-select
            v-model="movie.genres"
            label="Genres"
            multiple
            :options="genreOptions"
            value=""
          />
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {Movie} from '../models/Movie';
import {store} from 'stores/store'

export default {
  name: 'MovieDetail',
  setup() {
    const router = useRouter();
    const movie = ref<Movie>({
      id: 0,
      title: '',
      director: '',
      summary: '',
      genres: [],
    });

    const genreOptions = ['Drama', 'Action', 'Animation', 'Sci-Fi', 'Horror'];

    const saveMovie = async () => {
      console.log('MovieDetail saved movie:', movie.value);
      if (movie.value.id === 0) {
        // Add movie
        store.addMovie({ ...movie.value, id: 0 });
      } else {
        // Update the movie
        store.updateMovie(movie.value);
      }
      router.push({ name: 'MovieList' });
    };

    const deleteMovie = () => {
      store.deleteMovie(movie.value.id);
      router.push({ name: 'MovieList' });
    };

    onMounted(() => {
      const route = useRoute();
      const movieId = Number(route.params.id);
      if (!isNaN(movieId) && movieId > 0) {
        // Get the clicked movie data
        const existingMovie = store.movies.find((m) => m.id === movieId);
        if (existingMovie) {
          movie.value = { ...existingMovie };
        } else {
          router.push({ name: 'MovieList' });
        }
      } else {
      }
    });

    return {
      movie,
      genreOptions,
      saveMovie,
      deleteMovie
    };
  },
};
</script>

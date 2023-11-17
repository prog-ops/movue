<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-form @submit="saveMovie" class="q-input">
          <div class="button-container">
            <q-btn color="negative" label="Delete" @click="deleteMovie"/>
            <q-btn label="Save" color="primary" type="submit" />
          </div>
          <q-input v-model="movie.title" label="Title"/>
          <q-input v-model="movie.director" label="Director"/>
          <q-input
            v-model="movie.summary"
            label="Summary"
            type="textarea"
            :maxlength="100"
            counter
            @input="truncateSummary"/>
          <q-select
            use-chips
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

<style scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
}
button {
  margin: 8px;
}
.q-input {
  margin-bottom: 15px;
}
</style>

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

    const truncateSummary = () => {
      if (movie.value.summary.length > 100) {
        movie.value.summary = movie.value.summary.slice(0, 100);
      }
    };

    const saveMovie = async () => {
      console.log('MovieDetail saved movie:', movie.value);
      if (movie.value.id === 0) {
        // Add movie
        store.addMovie({...movie.value, id: 0});
      } else {
        // Update the movie
        store.updateMovie(movie.value);
      }
      router.push({name: 'MovieList'});
    };

    const deleteMovie = () => {
      store.deleteMovie(movie.value.id);
      router.push({name: 'MovieList'});
    };

    onMounted(() => {
      const route = useRoute();
      const movieId = Number(route.params.id);
      if (!isNaN(movieId) && movieId > 0) {
        // Get the clicked movie data
        const existingMovie = store.movies.find((m) => m.id === movieId);
        if (existingMovie) {
          movie.value = {...existingMovie};
        } else {
          router.push({name: 'MovieList'});
        }
      } else {
      }
    });

    return {
      movie,
      genreOptions,
      saveMovie,
      deleteMovie,
      truncateSummary,
    };
  },
};
</script>

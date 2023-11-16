import { reactive } from 'vue';
import { Movie } from '../models/Movie';

interface Store {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  updateMovie: (movie: Movie) => void;
  deleteMovie: (movieId: number) => void;
  deleteMovies: () => void;
  getMovies: () => Movie[];
}

export const store: Store = reactive({
  movies: [] as Movie[],
  addMovie(movie: Movie) {
    const newId = this.movies.length + 1;
    this.movies.push({ ...movie, id: newId });
  },
  getMovies() {
    return this.movies;
  },
  updateMovie(updatedMovie: Movie) {
    const index = this.movies.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      this.movies[index] = updatedMovie;
    }
  },
  deleteMovie(movieId: number) {
    const index = this.movies.findIndex(movie => movie.id === movieId);
    if (index !== -1) {
      this.movies.splice(index, 1);
    }
  },
  deleteMovies() {
    this.movies = [];
  },
});

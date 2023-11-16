import {Movie} from '../models/Movie';

const movies: Movie[] = [
  {
    id: 1,
    title: 'Movie 1',
    director: 'Director 1',
    summary: 'Summary 1',
    genres: ['Drama', 'Action']
  },
];

export const getMovies = (): Promise<Movie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies);
    }, 500);
  });
};

export const getMovieById = (id: number): Promise<Movie | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies.find((movie) => movie.id === id));
    }, 500);
  });
};

export const saveMovie = (movie: Movie): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (movie.id) {
        // Update movie
        const index = movies.findIndex((m) => m.id === movie.id);
        if (index !== -1) {
          movies[index] = { ...movie };
        }
      } else {
        // Add new movie
        const newId = movies.length + 1;
        movies.push({ ...movie, id: newId });
      }
      resolve();
    }, 500);
  });
};

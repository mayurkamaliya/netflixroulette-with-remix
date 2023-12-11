import type { MetaFunction } from "@remix-run/node";
import App from "../App";
import axios from 'axios';

import type { LoaderFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export let loader: LoaderFunction = async ({ request }) => {
  const queryParams = new URL(request.url).searchParams;
  const query = queryParams.get('query');
  const sortBy = queryParams.get('sortBy');
  const offset = queryParams.get('offset');
  const genre = queryParams.get('genre');

  try {
    const queryParamsForAPI = {
      search: query,
      searchBy: query ? 'title' : 'genres',
      offset: offset,
      limit: 10,
      sortBy: sortBy,
      sortOrder: 'desc',
      filter: query ? null : (genre === 'All' ? null : genre),
    };

    const response = await axios.get('http://localhost:4000/movies', { params: queryParamsForAPI });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      movies: [],
      totalAmount: 0,
    };
  }
};


export default function Index() {
  return (
    <div>
      <App />;
    </div>
  );
}

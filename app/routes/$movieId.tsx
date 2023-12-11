import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import App from "../App";
import axios from 'axios';

export let loader: LoaderFunction = async ({ params }) => {
    const { movieId } = params;
    console.log('path param value ' + movieId);
    try {
        if (movieId) {
            const fetchedData = await axios.get(`http://localhost:4000/movies/${movieId}`); // Fetch data based on the movieId
            console.log('fetchedData for path param: ', fetchedData.data);
            return fetchedData.data
        } else {
            const fetchedData = await axios.get('http://localhost:4000/movies'); // Fetch all movies if no movieId is provided
            console.log('fetchedData: ', fetchedData.data);
            return fetchedData.data
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

export default function Index() {
    return <App />;
}
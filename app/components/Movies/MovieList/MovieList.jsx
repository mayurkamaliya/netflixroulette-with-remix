import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./movieList.css";
import { MOVIES_BASE_URL } from "../../constants";
import MovieDetails from "../MovieDetails/MovieDetails";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useLoaderData, useNavigate } from '@remix-run/react';


const MoviesList = (props) => {
  const loaderData = useLoaderData();
  const [moviesResponse, setMoviesResponse] = useState(loaderData.data ? loaderData.data : []);
  const [limit] = useState(8);
  const [offset, setOffset] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [movieInfo, setMovieInfo] = useState(loaderData.data ? null : loaderData);
  const [showModal, setShowModal] = useState(movieInfo ? true : false);
  const { movieIdParam } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      setShowModal(false);
    }
  };

  const removePathParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newPath = '/';
    const newUrl = `${newPath}?${urlParams.toString()}`;
    window.history.pushState({}, '', newUrl);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      removePathParam();
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  const fetchMoviesData = async (searchString, selectedGenre) => {
    try {
      const url = new URL(MOVIES_BASE_URL);
      url.searchParams.append("sortBy", props.currentSort);
      url.searchParams.append("limit", limit);
      url.searchParams.append("offset", offset);
      url.searchParams.append("sortOrder", "desc");
      if (searchString) {
        url.searchParams.append("search", searchString);
        url.searchParams.append("searchBy", "title");
      }
      if (selectedGenre && selectedGenre != "All" && !searchString) {
        url.searchParams.append("search", selectedGenre);
        url.searchParams.append("searchBy", "genres");
      }
      const response = await fetch(url.toString());
      const moviesResponse = await response.json();
      const data = moviesResponse.data;
      setTotalMovies(moviesResponse.totalAmount);
      setMoviesResponse([...data]);
    } catch (error) {
      console.error("Error while fetching data: ", error);
    }
  };

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalMovies / limit);

  const fetchMovieInfo = async () => {
    if (movieIdParam) {
      try {
        const response = await axios.get(`http://localhost:4000/movies/${movieIdParam}`);
        setMovieInfo(response.data);
        setShowModal(true);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setMovieInfo(null);
      }
    }
  }

  useEffect(() => {
    fetchMovieInfo();
  }, [movieIdParam]);

  useEffect(() => {
    fetchMoviesData(props.searchString, props.selectedGenre);
  }, [offset, props.searchString, props.selectedGenre, props.currentSort]);

  const handlePreviousPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (props.searchString) params.set('query', props.searchString);
    if (props.selectedGenre) params.set('genre', props.selectedGenre);
    if (props.currentSort) params.set('sortBy', props.currentSort);
    params.set('offset', offset.toString());
    if (movieIdParam) {
      navigate(`/${movieIdParam}?${params.toString()}`);
    } else {
      navigate(`/?${params.toString()}`);
    }
  }, [props.searchString, props.selectedGenre, props.currentSort, offset, navigate]);


  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <MovieDetails movieInfo={movieInfo} />
          </div>
        </div>
      )}
      <section className="movielist">
        {moviesResponse !== null &&
          moviesResponse.map((input) => (
            <article key={input.id} className="moviecard">
              <MovieCard
                id={input.id}
                pictureURL={input.poster_path}
                tagline={input.tagline}
                name={input.title}
                year={input.release_date}
                genres={input.genres}
                overview={input.overview}
                runtime={input.runtime}
                film={input}
              />
            </article>
          ))}
      </section>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          className="pagination-button"
          disabled={offset === 0}
        >
          Previous
        </button>
        <div className="page-numbers">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          className="pagination-button"
          disabled={offset + limit >= totalMovies}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesList;

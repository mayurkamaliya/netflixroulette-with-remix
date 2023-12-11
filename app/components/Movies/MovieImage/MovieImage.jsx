import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactImageFallback from "react-image-fallback";
import placeholder from "../../../images/film-poster-placeholder.png";
import "./movieImage.css";
import MovieDetails from "../MovieDetails/MovieDetails";
import DeleteConfirmationDialog from "../DeleteMovie/DeleteConfirmationDialog";
import "../SuccessMessage/successMessage.css";
import MovieForm from "../MovieForm/MovieForm";
import { MOVIES_BASE_URL } from "../../constants";
import axios from "axios";
import { useNavigate } from '@remix-run/react';


const MovieImage = ({ img, filmTitle, film }) => {
  const [showModal, setShowModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        setShowModal(false);
        removePathParam();
      }
    };

    if (showModal) {
      addPathParam();
      document.addEventListener("keydown", handleKeyPress);
    } else {
      removePathParam();
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  const closeEditDialog = () => {
    setShowEditDialog(false);
  };

  const removePathParam = () => {
    const newPath = "/";
    navigate(newPath);
  };

  const addPathParam = () => {
    const newPath = `/${film.id}`;
    navigate(newPath);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  const handleDelete = () => {
    setShowConfirmationDialog(true);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleConfirmDelete = () => {
    setShowConfirmationDialog(false);
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 2000);
  };

  const updateMovie = async (formData) => {
    console.log("in edit movie " + JSON.stringify(formData));
    await axios.put(MOVIES_BASE_URL, formData);
  };

  const handleEditSubmit = (formData) => {
    updateMovie(formData);
    setEdited(true);
    setShowEditDialog(false);
    setTimeout(() => {
      setEdited(false);
    }, 2000);
  };

  return (
    <div>
      <img
        src={img}
        fallbackImage={placeholder}
        onClick={toggleModal}
        title={filmTitle}
        className="filcard-image"
      />
      <div className="dropdown" onClick={toggleOptions}>
        <div className="three-dots" />
        {showOptions && (
          <div className="dropdown-content">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      {showConfirmationDialog && (
        <DeleteConfirmationDialog
          show={showConfirmationDialog}
          onClose={handleCloseConfirmationDialog}
          onConfirm={handleConfirmDelete}
          title={filmTitle}
        />
      )}
      {showEditDialog && (
        <MovieForm
          initialMovieInfo={film}
          onClose={closeEditDialog}
          onSubmit={handleEditSubmit}
          formType="edit"
        />
      )}

      {deleted && (
        <div className="success-overlay">
          <div className="success-dialog">Movie Deleted successfully!</div>
        </div>
      )}
      {edited && (
        <div className="success-overlay">
          <div className="success-dialog">Movie Edited successfully!</div>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <MovieDetails movieInfo={film} />
          </div>
        </div>
      )}
    </div>
  );
};

MovieImage.propTypes = {
  img: PropTypes.string.isRequired,
  film: PropTypes.object.isRequired,
  filmTitle: PropTypes.string.isRequired,
};

export default MovieImage;

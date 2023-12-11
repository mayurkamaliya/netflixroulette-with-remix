import React, { Component } from "react";
import "./deleteConfirmationDialog.css";

class DeleteConfirmationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccessMessage: false,
    };
  }

  render() {
    const { show, onClose, onConfirm, title } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="dialog-overlay">
        <div className="dialog-content">
          <h2>Delete movie - {title}</h2>
          <p>Are you sure you want to delete this movie?</p>
          <div className="button-container">
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
        {this.state.showSuccessMessage && (
          <div className="success-overlay">
            <div className="success-dialog">Movie Deleted successfully!</div>
          </div>
        )}
      </div>
    );
  }
}

export default DeleteConfirmationDialog;


import React, { useState } from 'react';

const DeleteUserModal = ({ userId, onDelete, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Delete</h2>
        <p>Are you sure you want to delete this account?</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={() => onDelete(userId)} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
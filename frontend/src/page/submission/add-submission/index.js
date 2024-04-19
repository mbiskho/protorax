import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API from '../../../constants/api';
import { useParams } from 'react-router-dom';

const SubmissionPage = () => {
	const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedFiles, setSelectedFiles] = useState([]);
	const { id } = useParams();
  const id_course_task = id;
  const id_user = userData.id;

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
		e.preventDefault();
		Swal.showLoading();
    try {
      // Show loading alert
      // const loadingAlert = await Swal.fire({
      //   title: 'Processing',
      //   allowOutsideClick: false,
      //   didOpen: () => {
      //     Swal.showLoading();
      //   }
      // });

      // Process each file sequentially
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('id_course_task', id_course_task);
        formData.append('id_user', id_user);
        formData.append('file', file);

        // POST request to API for each file
        const response = await axios.post(`${API.used}/submission`, formData);

        if (response.status !== 200) {
          throw new Error('Submission Failed');
        }
      }

      // Close loading alert
      // loadingAlert.close();
			Swal.close();

      // Show success alert
      await Swal.fire({
        icon: 'success',
        title: 'All Files Submitted Successfully!',
				allowOutsideClick: false,
        showConfirmButton: false,
				timer: 2000,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        // Implement your redirect logic here
        window.location.href = `/assignment/${id}`;
      }, 2000);
    } catch (error) {
      // Show error alert with retry option
      const result = await Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.message,
        showCancelButton: true,
        confirmButtonText: 'Retry',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        // Retry submission
        handleSubmit(e);
      }
    }
  };

  return (
    <div>
      <h1>Submission Page</h1>
      <input type="file" multiple onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <div>
        {/* Display selected file names */}
        {selectedFiles.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={selectedFiles.length === 0}>
        Submit
      </button>
    </div>
  );
};

export default SubmissionPage;
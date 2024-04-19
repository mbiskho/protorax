import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { convertToRaw } from 'draft-js';
import axios from 'axios';
import API from '../../../constants/api';
import Swal from 'sweetalert2';
import Navbar from '../../../components/navbar';
import './styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddChapter = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [form, setForm] = useState({
    name: '',
  });

  /*
    Function
    */
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.showLoading();

    const payload = {
      name: form.name,
      id_course: courseId,
    };

    try {
      const response = await axios.post(`${API.used}/materi`, payload);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Chapter created successfully.',
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = `/chapter/course/${courseId}`;
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to create chapter. Please try again.',
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="wrapper">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h1 style={{ fontWeight: '600' }}>Tambah Chapter Baru</h1>
          </div>

          <div className="container" style={{ padding: '30px' }}></div>

          {/* name */}
          <p style={{ fontSize: '17px' }}>Judul Chapter *</p>
          <div className="form-group">
            <div class="form-floating">
              <input
                class="form-control"
                id="floatingInput"
                placeholder="judul"
                required
                style={{ width: '100%' }}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
              <label for="floatingInput" style={{ color: '#8C94A3' }}>
                Judul
              </label>
            </div>
          </div>

          <div className="container" style={{ padding: '40px' }}></div>

          {/* Button */}
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginRight: '10px', width: '120px', height: '45px' }}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              style={{ width: '120px' }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChapter;
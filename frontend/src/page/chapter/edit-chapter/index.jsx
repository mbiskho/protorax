import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Swal from 'sweetalert2';
import Navbar from '../../../components/navbar';
import API from '../../../constants/api';
import axios from 'axios';
import './styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditChapter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    id_course: '',
  });

  /*
	Function
	*/
  useEffect(() => {
    // Tampilkan SweetAlert dengan animasi loading
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    fetchData();
  }, []);

  // ambil data yg sesuai untuk isian pada kotak input
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API.used}/materi/${id}`);
      const materiData = response.data;

      setForm({
        id_course: materiData.id_course,
        name: materiData.name,
      });
    } catch (error) {
      console.error('Error fetching chapter data:', error);
    }
    Swal.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.showLoading();

    const payload = {
      id: id,
      id_course: form.id_course,
      name: form.name,
    };

    try {
      const response = await axios.put(`${API.used}/materi`, payload);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Chapter updated successfully.',
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = `/chapter/course/${form.id_course}`;
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update chapter. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update chapter. Please try again.',
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
            <h1 style={{ fontWeight: '600' }}>Edit Chapter</h1>
          </div>

          <div className="container" style={{ padding: '30px' }}></div>

          {/* Title */}
          <p style={{ fontSize: '17px' }}>Judul Chapter *</p>
          <div className="form-group">
            <div class="form-floating">
              <input
                class="form-control"
                id="floatingInput"
                placeholder="judul"
                required
                style={{ width: '100%' }}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
              <label htmlFor="floatingInput" style={{ color: '#8C94A3' }}>
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

export default EditChapter;

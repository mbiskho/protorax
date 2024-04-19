import React, { useState, useEffect, startTransition } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';
import API from '../../../constants/api';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';
import ListChapterFile from '../list-chapter-file';

const ChapterInCourse = () => {
  const [assignment, setAssignment] = useState([]);
  const [course, setCourse] = useState(null);
  const [chapter, setChapter] = useState([]);
  const { courseId } = useParams();
  const navigate = useNavigate();
  // Panggil user yang sudah login
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    fetchAssignment(courseId);
    fetchCourse(courseId);
    fetchChapter(courseId);
  }, []);

  // ambil semua data
  const fetchAssignment = async (courseId) => {
    const response = await axios.get(
      `${API.used}/assignment/course/${courseId}`
    );
    setAssignment(response.data);
  };

  const fetchCourse = async (courseId) => {
    try {
      const response = await axios.get(`${API.used}/courses/${courseId}`);
      setCourse(response.data.data);
    } catch (error) {
      console.log('Error fetching course:', error);
    }
  };

  const fetchChapter = async (courseId) => {
    try {
      const response = await axios.get(
        `${API.used}/materi/course/${courseId}`
      );
      setChapter(response.data);
    } catch (error) {
      console.log('Error fetching chapter:', error);
    }
  };

  const handleEditChapter = (id) => {
    startTransition(() => {
      navigate(`/chapter/edit/${id}`);
    });
  };

  // untuk navigasi ke tampilan add
  const handleAddChapter = (courseId) => {
    startTransition(() => {
      navigate(`/chapter/add/${courseId}`);
    });
  };

	const handleAddFile = (materiId) => {
		startTransition(() => {
			navigate(`/chapter-file/add/${materiId}`);
		});
	}

  const handleDeleteChapter = (id) => {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          const response = await axios.delete(`${API.used}/materi/${id}`);
          await fetchChapter(courseId);
        } catch (error) {
          console.log('Error deleting chapter:', error);
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle confirmation
        Swal.fire('Deleted!', 'The chapter has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="wrap">
      <div className="wrapper">
        <div className="container" style={{ padding: '20px' }}></div>

        {/* Header */}
        <div className="upper">
          {course ? (
            <>
              <p>Chapters : {course.name}</p>
              {/* Tomhol add chapter untuk mkurikulum */}
              {userData && userData.role === 'mkurikulum' && (
                <button onClick={() => handleAddChapter(courseId)}>
                  + Add Chapter
                </button>
              )}
            </>
          ) : (
            <p>Loading course chapter...</p>
          )}
        </div>

        <div className="container" style={{ padding: '15px' }}></div>

        {/* Content Assignments */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 40,
          }}
        >
          {chapter && chapter.length > 0 ? (
            // Jika assignment adalah array yang tidak kosong, lakukan pemetaan (mapping) untuk menampilkan daftar tugas
            chapter.map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: '#E9EAF0', padding: '30px' }}
              >
                <div className="chapter">
                  <div className="column-chapter">
                    <h3 style={{ fontWeight: '600' }}>{item.name}</h3>
                  </div>
                </div>

                {/* Daftar file materi di dalam chapter */}
                <ListChapterFile chapterId={item.id} />

                <div className="chapter-buttons">
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={() => handleAddFile(item.id)}
                  >
										Tambah File
                  </button>
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={() => handleEditChapter(item.id)}
                  >
                    Edit Nama Chapter
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleDeleteChapter(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Jika assignment adalah array kosong atau null, tampilkan pesan bahwa tidak ada hasil pencarian
            <p>~ Currently no chapter or loading ~</p>
          )}
        </div>

        <div className="container" style={{ padding: '10px' }}></div>
      </div>
      <Footer />
    </div>
  );
};

export default ChapterInCourse;

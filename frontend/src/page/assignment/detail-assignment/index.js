import React, { useState, useEffect, startTransition } from 'react';
import { PiClockClockwiseBold } from "react-icons/pi";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { LuAlarmClock } from "react-icons/lu";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import API from '../../../constants/api'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer';
import axios from 'axios';
import Swal from "sweetalert2";
import './styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const DetailAssignment = () => {
  const navigate = useNavigate();
  const [detailAssignment, setDetailAssignment] = useState([]);
  const [userSubmission, setUserSubmission] = useState([]);
  const [course, setCourse] = useState(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [assignmentLoading, setAssignmentLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { id } = useParams();
  // Panggil user yang sudah login
  const userData = JSON.parse(localStorage.getItem('userData'));


  useEffect(() => {
    // TODO: uncomment this line when the API is ready
    fetchDetailAssignment();
    fetchUserSubmission();

    // Tampilkan SweetAlert dengan animasi loading
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });

  }, []);

  useEffect(() => {
    if (detailAssignment.id_course) {
      fetchCourse(detailAssignment.id_course);
    }
  }, [detailAssignment]);

  useEffect(() => {
    // console.log('Assignment loading: ', assignmentLoading);
    // console.log('Course loading: ', courseLoading);
    // console.log('Submission loading: ', submissionLoading);
    if (!assignmentLoading && !courseLoading && !submissionLoading) {
      // if (userSubmission.length > 0) {
      //   console.log('User submission sebelum: ', userSubmission);
      //   const sortedUserSubmission = [...userSubmission];
      //   sortedUserSubmission.sort((a, b) => {
      //     const dateA = new Date(a.updated_at);
      //     const dateB = new Date(b.updated_at);
      //     if (dateA < dateB) {
      //       return -1;
      //     }
      //     if (dateA > dateB) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      //   setUserSubmission(sortedUserSubmission);
      //   console.log('User submission setelah: ', userSubmission);
      // }
      Swal.close();
    }
  }, [assignmentLoading, submissionLoading, courseLoading]);

  const fetchDetailAssignment = async () => {
    try {
      const response = await axios.get(`${API.used}/assignment/${id}`);
      if (response.status === 200) {
        setDetailAssignment(response.data);
      } else {
        throw new Error(response.message);
      }

      if (response.data.description) {
        const contentState = convertFromRaw(JSON.parse(response.data.description));
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
        setAssignmentLoading(false);
      }
      // Swal.close();

    } catch (error) {
      console.error('Failed to fetch assignment details: ', error);
      Swal.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch assignment details.',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Reload',
        cancelButtonText: 'Back',
      }).then((result) => {
        if (result.isConfirmed) {
          // Reload halaman saat tombol "Reload" ditekan
          window.location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Kembali ke halaman sebelumnya saat tombol "Back" ditekan
          window.history.back();
        }
      });
    }
  };

  const fetchCourse = async (id) => {
    try {
      const response = await axios.get(`${API.used}/courses/${id}`);
      if (response.status === 200) {
        setCourse(response.data.data);
        setCourseLoading(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log('Error fetching course: ', error);
    }
  }

  const fetchUserSubmission = async () => {
    try {
      const response = await axios.get(`${API.used}/submission/course-task/${id}/user/${userData.id}`);
      if (response.status === 200) {
        setUserSubmission(response.data);
      } else {
        throw new Error(response.message);
      }
      setSubmissionLoading(false);
    } catch (error) {
      console.log('Error fetching user assignment: ', error);
      Swal.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch user submission details.',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Reload',
        cancelButtonText: 'Back',
      }).then((result) => {
        if (result.isConfirmed) {
          // Reload halaman saat tombol "Reload" ditekan
          window.location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Kembali ke halaman sebelumnya saat tombol "Back" ditekan
          window.history.back();
        }
      });
    }
  }

  const handleEditAssignment = async (id) => {
    startTransition(() => {
      navigate(`/assignment/edit/${id}`);
    });
  };

  const handleSubmissionList = async (id) => {
    startTransition(() => {
      navigate(`/assignment/${id}/submissions`);
    });
  };

  const handleDeleteAssignment = async (id) => {
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          const response = await axios.delete(`${API.used}/assignment/${id}`);
          if (response.status !== 200) {
            throw new Error(response.message);
          }
        } catch (error) {
          console.log('Error deleting course student:', error);
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle confirmation
        Swal.fire(
          "Deleted!",
          "Your assignment has been deleted.",
          "success",
        );

        setTimeout(() => {
          window.location.href = `/assignment/course/${detailAssignment.id_course}`;
          // startTransition(() => {
          //   navigate(`/assignment/course/${detailAssignment.id_course}`);
          // });
        }, 2000);
      }
    });
  }

  const handleAddSubmission = async (id) => {
    startTransition(() => {
      navigate(`/assignment/${id}/submit`);
    });
  };

  const convertDate = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const period = (hour >= 12) ? 'PM' : 'AM';
    hour = (hour % 12) || 12; // Adjusting hour to 12-hour format
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}, ${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    return formattedDate;
  }

  const createDate = new Date(detailAssignment.created_at);
  const updateDate = new Date(detailAssignment.updated_at);
  const deadlineDate = new Date(detailAssignment.deadline);

  const formattedDateCreate = convertDate(createDate);
  const formattedDateUpdate = convertDate(updateDate);
  const formattedDateDeadline = convertDate(deadlineDate);

  return (
    <div className="wrap">
      <Navbar />
      <div className="wrapper">
        <div className='container' style={{ padding: "20px" }}></div>

        <div className="header">
          <p style={{ width: '1000px' }}>{detailAssignment.name}</p>
          {userData && userData.role === "mkurikulum" && (
            <div className='grid'>
              <button
                className='button'
                id='edit-button'
                onClick={() => handleEditAssignment(detailAssignment.id)} >
                <MdOutlineEdit />
              </button>
              <button
                className='button'
                id='delete-button'
                onClick={() => handleDeleteAssignment(detailAssignment.id)} >
                <MdOutlineDeleteForever />
              </button>
            </div>
          )}
        </div>

        <p><FaBook style={{ fontSize: '22px', color: '#F0C232' }} /> <i>On Course : {course ? course.name : 'Loading...'}</i></p>
        <p><IoIosCreate style={{ fontSize: '22px', color: '#F0C232' }} /> <i>Created At : {formattedDateCreate ? formattedDateCreate : 'Loading...'}</i></p>
        <p><PiClockClockwiseBold style={{ fontSize: '22px', color: '#F0C232' }} /> <i>Latest Update : {formattedDateUpdate ? formattedDateUpdate : 'Loading...'}</i></p>
        <p><LuAlarmClock style={{ fontSize: '22px', color: '#F0C232' }} /> <i>Deadline : {formattedDateDeadline ? formattedDateDeadline : 'Loading...'}</i></p>
        < div className='container' style={{ padding: "5px" }}></div>

        {/* Content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', gap: 30
        }}>

          <div className='detail'>
            <div style={{ lineHeight: '24px' }}>
              <h3 style={{ marginBottom: '20px' }}>Deskripsi Tugas :</h3>
              <Editor
                editorState={editorState}
                readOnly={true}
                toolbarHidden={true}
              />
            </div>
          </div>

          {/* cek apakah id_user sesuai dengan user yang sedang login */}
          {/* {userData && userData.role === "mkurikulum" && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  handleDeleteAssignment(id);
                }}
                style={{
                  marginRight: '10px',
                  width: '120px',
                  height: '45px'
                }}>
                Delete
              </button>
            </div>
          )} */}

          <hr />

          {/* Tombol menuju halaman semua submisi di assignment */}
          {userData && userData.role === "mkurikulum" && (
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <button
                className='button'
                id='submit-button'
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  handleSubmissionList(id);
                }}>
                Lihat Submisi Pelajar
              </button>
            </div>
          )}


          {/* Submission Status */}
          {userData && userData.role === "pelajar" && (
            <div className='individual-submission'>
              {/* Header submission status */}
              <div className="header">
                <p style={{ width: '1000px' }}>Status Submisimu</p>
              </div>

              {/* Table submission status */}
              {userSubmission.length > 0 ? (
                <table className="table">
                  <colgroup>
                    <col className="column1"></col>
                    <col className="column2"></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">Status Submisi</th>
                      <td><span className="badge bg-success">Telah disubmit</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Status Nilai</th>
                      {userSubmission[0].grade !== null ? (
                        <td><span className="badge bg-success">{userSubmission[0].grade}</span></td>
                      ) : (
                        <td><span className="badge bg-danger">Belum dinilai</span></td>
                      )}
                    </tr>
                    <tr>
                      <th scope="row">Deadline</th>
                      <td>{formattedDateDeadline}</td>
                    </tr>
                    <tr>
                      <th scope="row">Terakhir Tiap File Diubah</th>
                      <td>
                        {/* Menggunakan <div> untuk menampilkan data updated_at dalam baris terpisah */}
                        {userSubmission.map((submission, index) => (
                          <div key={index}>{convertDate(new Date(submission.updated_at))}</div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Files</th>
                      <td>
                        {userSubmission.map((submission, index) => (
                          <div
                            key={index}
                            style={{
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              color: 'blue'
                            }}
                            onClick={() => {
                              window.open(`${API.used}/submission/download/${submission.id}`, '_blank');
                            }}>
                            {submission.filename}
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table">
                  <colgroup>
                    <col className="column1"></col>
                    <col className="column2"></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">Status Submisi</th>
                      <td><span className="badge bg-danger">Belum ada submisi</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Status Nilai</th>
                      <td><span className="badge bg-danger">-</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Deadline</th>
                      <td>{formattedDateDeadline}</td>
                    </tr>
                    <tr>
                      <th scope="row">Terakhir Tiap File Diubah</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th scope="row">Files</th>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {/* Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className='button'
                  id='submit-button'
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    handleAddSubmission(id);
                  }}>
                  Tambah Submisi
                </button>
              </div>

              < div className='container' style={{ padding: "20px" }}></div>

            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DetailAssignment;
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
  const { id } = useParams();
  // Panggil user yang sudah login
  const userData = JSON.parse(localStorage.getItem('userData'));


  useEffect(() => {
    fetchDetailAssignment();
    fetchSubmission();

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
    if (!assignmentLoading && !courseLoading && !submissionLoading) {
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
			setAssignmentLoading(false);

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

  // const fetchUserSubmission = async () => {
  //   try {
  //     const response = await axios.get(`${API.used}/submission/course-task/${id}`);
  //     if (response.status === 200) {
  //       setUserSubmission(response.data);
  //     } else {
  //       throw new Error(response.message);
  //     }
  //     setSubmissionLoading(false);
  //   } catch (error) {
  //     console.log('Error fetching user assignment: ', error);
  //     Swal.close();
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Failed to fetch user submission details.',
  //       icon: 'error',
  //       showCancelButton: true,
  //       confirmButtonText: 'Reload',
  //       cancelButtonText: 'Back',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Reload halaman saat tombol "Reload" ditekan
  //         window.location.reload();
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         // Kembali ke halaman sebelumnya saat tombol "Back" ditekan
  //         window.history.back();
  //       }
  //     });
  //   }
  // }

	// TODO : Implement your function to fetch all assignment
	const fetchSubmission = async () => {
    try {
      const response = await axios.get(`${API.used}/submission/course-task/${id}`);
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
          <p style={{ width: '1000px' }}>Hasil Submisi : {detailAssignment.name}</p>
        </div>

        <p><FaBook style={{ fontSize: '22px', color: '#F0C232' }} /> <i>On Course : {course ? course.name : 'Loading...'}</i></p>
        <p><LuAlarmClock style={{ fontSize: '22px', color: '#F0C232' }} /> <i>Deadline : {formattedDateDeadline ? formattedDateDeadline : 'Loading...'}</i></p>
        < div className='container' style={{ padding: "5px" }}></div>

        {/* Content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', gap: 30
        }}>

					{/* Submissions table */}
					{userSubmission.length > 0 ? (
						<table className="table">
							<colgroup>
								<col className="column1"></col>
								<col className="column2"></col>
								<col className="column3"></col>
								<col className="column4"></col>
								<col className="column5"></col>
							</colgroup>
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">User</th>
									<th scope="col">Terakhir Edit</th>
									<th scope="col">File</th>
									<th scope="col">Nilai</th>
								</tr>
							</thead>
							<tbody>
								{userSubmission.map((submission, index) => (
									<tr key={index}>
										<th scope="row">{submission.id}</th>
										<td>{submission.id_user}</td>
										<td>{convertDate(new Date(submission.updated_at))}</td>
										<td>
											<div
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
										</td>
										<td>
											{submission.grade !== null ? (
												<span className="badge bg-success">{submission.grade}</span>
											) : (
												<span className="badge bg-danger">Belum dinilai</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>~ Belum ada submisi siswa di tugas ini. ~</p>
					)}


					< div className='container' style={{ padding: "20px" }}></div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DetailAssignment;
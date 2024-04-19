import React, { useState, useEffect, startTransition} from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { PiMegaphoneFill } from "react-icons/pi";
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg'; 
import axios from 'axios';
import API from '../../constants/api'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer';
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";

const CourseStudent = () => {

	// Panggil user yang sudah login
  const userData = JSON.parse(localStorage.getItem('userData'));

	const {courseId} = useParams();
	const [registeredLoading, setRegisteredLoading] = useState(true);
	const [unregisteredLoading, setUnregisteredLoading] = useState(true);
	const [courseStudents, setCourseStudents] = useState([]);
	const [students, setStudents] = useState([]);
	const [course, setCourse] = useState(null);

	useEffect(() => {
		fetchCourse();
		// fetchCourseStudents();
		// fetchStudents();
		fetchAllStudents();
	}, []);

	// ambil data pelajar terdaftar dan yang belum terdaftar
	const fetchAllStudents = async () => {
		try {
			const response = await axios.get(`${API.used}/course/${courseId}/students`);
			setCourseStudents(response.data);
			setRegisteredLoading(false);

			const response2 = await axios.get(`${API.used}/user`);
			let temp = response2.data.filter(student => student.role === "pelajar");
			temp = temp.filter(student => !response.data.some(itemSubtract => itemSubtract.id === student.id));
			setStudents(temp);

			setUnregisteredLoading(false);
		} catch (error) {
			console.log('Error fetching students:', error);
			setRegisteredLoading(false);
			setUnregisteredLoading(false);
		}
	
	}

	// // Ambil data pelajar yang terdaftar dalam course
	// const fetchCourseStudents = async () => {
	// 	try {
	// 		const response = await axios.get(`${API.used}/course/${courseId}/students`);
	// 		setCourseStudents(response.data);
	// 		setRegisteredLoading(false);

	// 		// Ambil data keseluruhan pelajar yang belum terdaftar dalam course
	// 		fetchStudents();

	// 	} catch (error) {
	// 		console.log('Error fetching students in course:', error);
	// 		setRegisteredLoading(false);
	// 	}
	// }

	// // Ambil data keseluruhan pelajar lalu disubtract dengan pelajar yang sudah terdaftar dalam course
	// const fetchStudents = async () => {
	// 	try {
	// 		const response = await axios.get(`${API.used}/user`);
			
	// 		// Hapus user yang role-nya bukan pelajar
	// 		setStudents(response.data.filter(student => student.role === "pelajar"));
	// 		// Hapus user yang sudah terdaftar dalam course
	// 		setStudents(subtractArray(students, courseStudents));

	// 		setUnregisteredLoading(false);
	// 	} catch (error) {
	// 		console.log('Error fetching students:', error);
	// 		setUnregisteredLoading(false);
	// 	}
	// }

	// Ambil data course
	const fetchCourse = async () => {
		try {
			const response = await axios.get(`${API.used}/courses/${courseId}`);
			setCourse(response.data.data);
		} catch (error) {
			console.log('Error fetching course:', error);
		}
	}

	// Fungsi untuk menghandle hapus pelajar yang terdaftar dalam course
	const deleteStudentFromCourse = async (id) => {
		Swal.fire({
			title: "Are you sure want to delete?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setRegisteredLoading(true);
				setUnregisteredLoading(true);
				try {
					const response = await axios.delete(`${API.used}/course/${courseId}/students/${id}`);
					fetchAllStudents();
					// setRegisteredLoading(false);
				} catch (error) {
					console.log('Error deleting course student:', error);
					// setRegisteredLoading(false);
				}
			}
		});
	}

	// Fungsi untuk menghandle daftarkan pelajar ke dalam course
	const registerStudentToCourse = async (id) => {
		Swal.fire({
			title: "Are you sure want to register this student?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, register!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setUnregisteredLoading(true);
				setRegisteredLoading(true);
				try {
					const response = await axios.post(`${API.used}/course/${courseId}/students/${id}`);
					console.log(response);
					fetchAllStudents();
					// setRegisteredLoading(false);
				} catch (error) {
					console.log('Error deleting course student:', error);
					// setRegisteredLoading(false);
				}
			}
		});
	}

	const registeredColumns = [
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    {
      name: "Sekolah",
      selector: (row) => row.school_name,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action-container">
          <button
            type="button"
            class="btn btn-outline-danger"
            onClick={() => {
              deleteStudentFromCourse(row.id);
            }}
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

	const unregisteredColumns = [
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    {
      name: "Sekolah",
      selector: (row) => row.school_name,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action-container">
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => {
              registerStudentToCourse(row.id);
            }}
          >
            Daftarkan
          </button>
        </div>
      ),
    },
  ];

	const customStyles = {
    headCells: {
      style: {
        fontSize: "16.7px",
        fontWeight: "600",
        backgroundColor: "#fafafa",
      },
    },

    cells: {
      style: {
        backgroundColor: "#fafafa",
        fontSize: "16.7px",
        color: "#4b5563",
      },
    },
  };

  return (
		<div className='wrap'>
			<div className='wrapper'>

				{/* Header */}
				<div className='header'>
					<div className='title'>
						<h1>Pelajar di dalam Course</h1>
					</div>
					<div className='subtitle'>
						<h3>({course ? course.name : "Course loading..."})</h3>
					</div>
				</div>

				<div className='container' style={{padding: "20px"}}></div>

				{/* Pelajar Terdaftar */}
				<div className="list-registered-students">
					<h4>Daftar Pelajar Terdaftar</h4>
          <DataTable
            columns={registeredColumns}
            data={courseStudents}
            customStyles={customStyles}
            pagination
            progressPending={registeredLoading}
          />
        </div>

				{/* Pelajar yang belum terdaftar */}
				<div className="list-registered-students">
				<h4>Daftar Pelajar yang Belum Terdaftar</h4>
          <DataTable
            columns={unregisteredColumns}
            data={students}
            customStyles={customStyles}
            pagination
            progressPending={unregisteredLoading}
          />
        </div>

			</div>
			<Footer/>
		</div>
  );

}

export default CourseStudent;
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

const CourseTeacher = () => {

	// Panggil user yang sudah login
  const userData = JSON.parse(localStorage.getItem('userData'));

	const {courseId} = useParams();
	const [teacherLoading, setTeacherLoading] = useState(true);
	const [currentTeacher, setCurrentTeacher] = useState(null);
	const [teacherList, setTeacherList] = useState([]);
	const [course, setCourse] = useState(null);

	useEffect(() => {
		fetchCourse();
		fetchTeachers();
	}, []);

	// ambil data semua guru dan guru yang terdaftar sebagai pengajar course
	const fetchTeachers = async () => {
		try {
			const response = await axios.get(`${API.used}/course/${courseId}/teacher`);

			setCurrentTeacher(response.data);
			// console.log(response.data);

			const response2 = await axios.get(`${API.used}/user`);
			let temp = response2.data.filter(student => student.role === "guru");
			
			// Filter teacherList dari object currentTeacher
			if (response.data !== null) {
				temp = temp.filter(teacher => (!(response.data.id === teacher.id)));
			}

			setTeacherList(temp);
			setTeacherLoading(false);
		} catch (error) {
			console.log('Error fetching students:', error);
			setTeacherLoading(false);
		}
	}

	// Ambil data course
	const fetchCourse = async () => {
		try {
			const response = await axios.get(`${API.used}/courses/${courseId}`);
			setCourse(response.data.data);
		} catch (error) {
			console.log('Error fetching course:', error);
		}
	}

	// Fungsi untuk menghandle hapus guru pengajar course
	const deleteCurrentTeacher = async (id) => {
		Swal.fire({
			title: "Are you sure want to remove the teacher?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, remove it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				if (!currentTeacher) {
					alert("Belum ada pengajar terdaftar di course ini")
					return;
				}
				setTeacherLoading(true);
				try {
					const response = await axios.delete(`${API.used}/course/${courseId}/teacher`);
					fetchTeachers();
					setTeacherLoading(false);
				} catch (error) {
					console.log('Error deleting course teacher:', error);
					alert("Gagal menghapus guru pengajar course");
					setTeacherLoading(false);
				}
			}
		});
	}

	// Fungsi untuk menghandle daftarkan pelajar ke dalam course
	const updateCurrentTeacher = async (id) => {
		Swal.fire({
			title: "Are you sure want to update current teacher?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, update!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setTeacherLoading(true);
				try {
					const response = await axios.post(`${API.used}/course/${courseId}/teacher/${id}`);
					fetchTeachers();
					setTeacherLoading(false);
				} catch (error) {
					console.log('Error updating teacher course:', error);
					alert("Gagal menjadikan guru sebagai pengajar course");
					setTeacherLoading(false);
				}
			}
		});
	}

	const teacherColumns = [
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
              updateCurrentTeacher(row.id);
            }}
          >
            Jadikan Pengajar
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
						<h1>Guru Pengajar Course</h1>
					</div>
					<div className='subtitle'>
						<h3>({course ? course.name : "Course loading..."})</h3>
					</div>
				</div>

				<hr style={{ width: '50%', height: '3px', backgroundColor: 'black' }} />

				{/* Guru Saat Ini */}
				<div className="current-teacher-section">
				<h3>Guru saat ini</h3>
					{currentTeacher ? (
						<div className="current-teacher">
							<div className="teacher-info">
								<p>Nama : {currentTeacher.name}</p>
								<p>Gender : {currentTeacher.gender}</p>
								<p>Username : {currentTeacher.username}</p>
								<p>Sekolah : {currentTeacher.school_name}</p>
							</div>
							<div className="action-container">
								<button
									type="button"
									class="btn btn-outline-danger"
									onClick={() => {
										deleteCurrentTeacher(currentTeacher.id);
									}}
								>
									Hapus Pengajar
								</button>
							</div>
						</div>
						) : (
							<p>Belum ada guru terdaftar di course ini</p>
						)
					}
				</div>

				<hr style={{ width: '50%', height: '3px', backgroundColor: 'black' }} />

				{/* Daftar Semua User Guru */}
				<div className="other-teachers">
				<h4>Daftar semua user guru lainnya</h4>
					<DataTable
						columns={teacherColumns}
						data={teacherList}
						customStyles={customStyles}
						pagination
						progressPending={teacherLoading}
					/>
				</div>

			</div>
			<Footer/>
		</div>
  );

}

export default CourseTeacher;
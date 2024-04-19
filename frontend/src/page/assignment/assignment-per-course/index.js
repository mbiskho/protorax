import React, { useState, useEffect, startTransition} from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { PiMegaphoneFill } from "react-icons/pi";
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg'; 
import axios from 'axios';
import API from '../../../constants/api'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer';
import Swal from "sweetalert2";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";



const AssignmentPerCourse = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [assignment, setAssignment] = useState([]);
	const [course, setCourse] = useState(null);
	const { courseId } = useParams();
  const navigate = useNavigate();
  // Panggil user yang sudah login
  const userData = JSON.parse(localStorage.getItem('userData'));
  

  useEffect(() => {
		fetchAssignment(courseId);
		fetchCourse(courseId);
  }, []);
  
  // ambil semua data
  const fetchAssignment = async (courseId) => {
    const response = await axios.get(`${API.used}/assignment/course/${courseId}`);
    setAssignment(response.data)
  }; 

	const fetchCourse = async (courseId) => {
		try {
			const response = await axios.get(`${API.used}/courses/${courseId}`);
			setCourse(response.data.data);
		} catch (error) {
			console.log('Error fetching course:', error);
		}
	};
  
  const handleDetailAssignment = (id) => {
    startTransition(() => {
      navigate(`/assignment/${id}`); 
    });
  };

  const handleEditAssignment = (id) => {
    startTransition(() => {
      navigate(`/assignment/edit/${id}`); 
    });
  };

  // untuk navigasi ke tampilan add
  const handleAddAssignment = (courseId) => {
    startTransition(() => {
      navigate(`/assignment/add/${courseId}`); 
    });
  };

	const handleDeleteAssignment = (id) => {
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
                await fetchAssignment(courseId);
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
                "success"
            );
        }
    });
	}

  // set format data
  const formatCreatedAt = (updateAt) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const updateDate = new Date(updateAt);
    const dayOfWeek = daysOfWeek[updateDate.getDay()];
    const dayOfMonth = updateDate.getDate();
    const month = monthsOfYear[updateDate.getMonth()];
    const year = updateDate.getFullYear();
    let hour = updateDate.getHours();
    const minute = updateDate.getMinutes();
    const period = (hour >= 12) ? 'PM' : 'AM';
    hour = (hour % 12) || 12; // Adjusting hour to 12-hour format
    return`${dayOfWeek}, ${dayOfMonth} ${month} ${year}, ${hour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  
  return (
      <div className="wrap">
        <Navbar />
        <div className="wrapper">

          <div className='container' style={{padding: "20px"}}></div>
          
          {/* Header */}
					<div className="upper">
            {(course && userData) ? (
              <>
                {/* <p>Tugas Course</p> */}
								<p>Tugas {course.name}</p>
                {userData.role === "mkurikulum" && (
                  <button onClick={() => handleAddAssignment(courseId)}>
                    + Add Assignment
                  </button>
                )}
              </>
            ) : (
              <p>Loading fetch course...</p>
            )}
          </div>

          <div className='container' style={{padding: "15px"}}></div>

					{/* Content Assignments */}
          <div style={{ display: 'flex', flexDirection: 'column', 
                      justifyContent: 'space-between', gap: 40 }}>

          {assignment && assignment.length > 0 ? (
          // Jika assignment adalah array yang tidak kosong, lakukan pemetaan (mapping) untuk menampilkan daftar tugas
          assignment.map((item, index) => (
            <div key={index} style={{backgroundColor: '#E9EAF0', padding: '30px'}}>
              <div className='assignment'>
                <div className='column-assignment'>
                  <h3 style={{fontWeight: '600'}}>{item.name}</h3>
                  <p style={{
                        alignSelf: 'center', 
                        width:'fit-content', 
                        justifySelf:'flex-end',
                        fontSize: '12px'
                  }}><i>Deadline: {formatCreatedAt(item.deadline)}</i></p>
                </div>
                {/* <p style={{marginBottom: '5px', fontSize: '22px'}}>{item.sub_title}</p> */}
                <Editor
                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(item.description)))}
                    readOnly={true}
                    toolbarHidden={true}
                />
              </div>

              <div className="read-assignment">
                  <button type="button" class="btn btn-dark" onClick={() => handleDetailAssignment(item.id)}>Detail</button>
									<button type="button" class="btn btn-dark" onClick={() => handleEditAssignment(item.id)}>Edit</button>
									<button type="button" class="btn btn-danger" onClick={() => handleDeleteAssignment(item.id)}>Hapus</button>
              </div>
							             
            </div>
          ))):(
            // Jika assignment adalah array kosong atau null, tampilkan pesan bahwa tidak ada hasil pencarian
            <p>No assignment found</p>
          )}
        	</div>


        <div className='container' style={{padding: "10px"}}></div>
      </div>
      <Footer/>
    </div>

  );    
}

export default AssignmentPerCourse;
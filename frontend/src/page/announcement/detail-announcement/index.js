import React, { useState, useEffect, startTransition } from 'react';
import { PiPushPinLight, PiPushPinFill, PiPencilSimpleLineLight, PiArrowCircleRightFill } from "react-icons/pi";
import { useParams, useNavigate } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; 
import API from '../../../constants/api'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer';
import axios from 'axios';
import Swal from "sweetalert2";
import './styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const DetailAnnouncement = () => {
  const navigate = useNavigate();
    const [detail, setDetail] = useState([]);
    const [author, setAuthor] = useState(null);
    const [isPinned, setIsPinned] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showEditButton, setShowEditButton] = useState(true);
    const {id} = useParams();
    // Panggil user yang sudah login
    const userData = JSON.parse(localStorage.getItem('userData'));


    useEffect(() => {
        fetchDetail();

        // setting untuk edit 30 menit pertama
        const now = new Date(); 
        const announcementCreationTime = new Date(detail.created_at); // Waktu pembuatan pengumuman
        const differenceInMinutes = (now - announcementCreationTime) / (1000 * 60); // Selisih waktu dalam menit

        if (differenceInMinutes > 30) {
          setShowEditButton(false);
      }
    }, [id, detail.created_at]);

    // ambil announcement sesuai id
    const fetchDetail = async () => {
        try {
            const response = await axios.get(`${API.used}/announcement/${id}`);
            setDetail(response.data);
            setIsPinned(response.data.is_pinned); 

            // set author
            const res = await axios.get(`${API.used}/user/${response.data.id_user}`);
            setAuthor(res.data[0]);

            if (response.data.content) {
              const contentState = convertFromRaw(JSON.parse(response.data.content));
              const newEditorState = EditorState.createWithContent(contentState);
              setEditorState(newEditorState);
          }

        } catch (error) {
            console.error('Error fetching announcement detail:', error);
        }    
    }; 

    // button untuk menuju update announcement
    const handleEditAnnouncement = async (id, id_user) => {
      startTransition(() => {
        navigate(`/announcement/${id}/update/${id_user}`); 
      });
    };

    // button untuk mengubah ikon pin announcement
    const handlePinToggle = async () => {
        try {
            // Mengubah status isPinned secara lokal
            setIsPinned(!isPinned) 

            const response = await axios.put(`${API.used}/announcement/${id}`,{ is_pinned: !isPinned });
            console.log(response.data)
        } catch (error) {
          console.error('Error pinning announcement:', error);
        }
    };

    // untuk delete announcement
    const deleteAnnouncement = async(id) => {
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
          try {
            const response = await axios.delete(`${API.used}/announcement/${id}/delete`);
            // Cek jika penghapusan berhasil
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Announcement has been deleted.",
                icon: "success",
              });
              // Dapat memfilter detail yang tidak memiliki ID yang dihapus.
              if (Array.isArray(detail)) {
                const updatedDetail = detail.filter((announcement) => announcement.id !== id);
                setDetail(updatedDetail);
              }
              navigate('/announcement');
            } else {
              Swal.fire({
                title: "Error!",
                text: "Announcement could not be deleted.",
                icon: "error",
              });
            }
          } catch (error) {
            console.error("Error deleting announcement:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting announcement.",
              icon: "error",
            });
          }
        }
      });
    }

    /*
    Set format
    */
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const updateDate = new Date(detail.updated_at);
    const dayOfWeek = daysOfWeek[updateDate.getDay()];
    const dayOfMonth = updateDate.getDate();
    const month = monthsOfYear[updateDate.getMonth()];
    const year = updateDate.getFullYear();
    let hour = updateDate.getHours();
    const minute = updateDate.getMinutes();
    const period = (hour >= 12) ? 'PM' : 'AM';
    hour = (hour % 12) || 12; // Adjusting hour to 12-hour format
    const formattedDateUpdate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}, ${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    
    
    return (
      <div className="wrap">
        <Navbar />
        <div className="wrapper">
        < div className='container' style={{padding: "20px"}}></div>
          <div className="upper"> 
            <p style={{width:'1000px'}}>{detail.title}</p>

            {/* cek apakah id_user sesuai dengan user yang sedang login dan kondisi sebelum 30 menit */}
            {userData && detail.id_user === userData.id && showEditButton && (
              <div className='grid'>
                <button
                  className='button'
                  onClick={handlePinToggle}>
                  {isPinned ? <PiPushPinFill /> : <PiPushPinLight />}
                </button>
                <button
                    className='button'
                    onClick={() => handleEditAnnouncement(detail.id, userData.id)} >
                    <PiPencilSimpleLineLight />
                </button>
              </div>
            )} 

            {/* Jika sudah lewat 30 menit */}
            {userData && detail.id_user === userData.id && !showEditButton && (
              <button
                className='button'
                onClick={handlePinToggle}>
                {isPinned ? <PiPushPinFill /> : <PiPushPinLight />}
              </button>
            )}
          </div>
          
          <p><PiArrowCircleRightFill style={{fontSize: '22px', color: '#F0C232'}}/> <i>By : {author && author ? author.name : 'Loading...'} - {formattedDateUpdate}</i></p>
          < div className='container' style={{padding: "5px"}}></div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', 
                      justifyContent: 'space-between', gap: 30 }}>

            <div className='detail'>
              <div style={{lineHeight: '24px'}}>
                <h2 style={{marginBottom : '20px'}}>{detail.sub_title}</h2>
                <Editor
                    editorState={editorState}
                    readOnly={true}
                    toolbarHidden={true}
                />
              </div>
            </div> 
            
            {/* cek apakah id_user sesuai dengan user yang sedang login */}
            {userData && detail.id_user === userData.id && ( 
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <button 
                type="button" 
                class="btn btn-danger" 
                onClick={() => {
                  deleteAnnouncement(id);
                }}
                style={{
                  marginRight: '10px', 
                  width: '120px', 
                  height:'45px'
                }}>
                Delete
              </button>
            </div>
            )}                         
          </div>
        </div>
        <Footer/>
      </div>
    )
}

export default DetailAnnouncement;
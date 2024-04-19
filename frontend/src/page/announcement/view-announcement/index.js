import React, { useState, useEffect, startTransition} from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { PiMegaphoneFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg'; 
import axios from 'axios';
import API from '../../../constants/api'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";



const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  // Panggil user yang sudah login
  const userData = JSON.parse(localStorage.getItem('userData'));
  

  useEffect(() => {
    fetchAnnouncement();
  }, []);
  
  // ambil semua data
  const fetchAnnouncement = async () => {
    const response = await axios.get(`${API.used}/announcement`);
    setAnnouncement(response.data)
  }; 
  
  // untuk navigasi ke tampilan detail
  const handleDetailAnnouncement = (id) => {
    startTransition(() => {
      navigate(`/announcement/${id}`); 
    });
  };

  // untuk navigasi ke tampilan add
  const handleAddAnnouncement = (id_user) => {
    startTransition(() => {
      navigate(`/announcement/${id_user}/create`); 
    });
  };
  
  const handleSortChange = async (value) => {
  try {
      const response = await axios.get(`${API.used}/announcement/sort?sortBy=${value}`);
      setAnnouncement(response.data);
    } catch (error) {
      console.error("Error sorting announcement:", error);
    }
  };

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value); // Update nilai input pencarian saat nilainya berubah
    try {
      const response = await axios.post(`${API.used}/announcement/search?q=${event.target.value}`);
      setAnnouncement(response.data);
    } catch (error) {
      console.error("Error searching announcement:", error);
    }
  };

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
          {/* Sort Announcement */}
          <div className='column-announcement' style={{verticalAlign: 'middle'}}>
            <select className='dropdown-sort' onChange={(e) => handleSortChange(e.target.value)}>
              <option value="" disabled selected>Sort By</option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>

            {/* Search Announcement */}
            <input
              className='search-bar'
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                backgroundImage: `url('data:image/svg+xml;base64,${btoa(
                  `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`
                )}')`,
              }}
            />
          </div>

          <div className='container' style={{padding: "20px"}}></div>
          
          {/* Header */}
          <div className="upper">
            {userData ? (
              <>
                <p>Halo, {userData.name}</p>
                {userData.role === "guru" && (
                  <button onClick={() => handleAddAnnouncement(userData.id)}>
                    + Add Announcement
                  </button>
                )}
              </>
            ) : (
              <p>Halo, Anonim.</p>
            )}
          </div>

          <div className='container' style={{padding: "15px"}}></div>

          {/* Pinned Announcement */}
          <div className='container'>
            {announcement.map((item, index) => {
              // Cek apakah nilai is_pinned adalah 1
              if (item.is_pinned === 1) {
                return (
                  <div key={index}>
                    <h3><b><PiMegaphoneFill style={{color: '#F0C232'}}/> {item.title}</b></h3>
                    <Editor
                      editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(item.content)))}
                      readOnly={true}
                      toolbarHidden={true}
                      editorStyle={{
                        lineHeight: '25px',
                        overflow: 'hidden',
                        maxHeight: '70px',
                      }}
                    />
                    <a onClick={() => handleDetailAnnouncement(item.id)} 
                      style={{color: 'gray', fontSize: '13px'}}><u><i>Read Announcement</i></u></a>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className='container' style={{padding: "20px",}}></div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', 
                      justifyContent: 'space-between', gap: 40 }}>

          {announcement && announcement.length > 0 ? (
          // Jika announcement adalah array yang tidak kosong, lakukan pemetaan (mapping) untuk menampilkan daftar pengumuman
          announcement.map((item, index) => (
            <div key={index} style={{backgroundColor: '#E9EAF0', padding: '30px'}}>
              <div className='announcement'>
                <div className='column-announcement'>
                  <h3 style={{fontWeight: '600'}}>{item.title}</h3>
                  <p style={{
                        alignSelf: 'center', 
                        width:'fit-content', 
                        justifySelf:'flex-end',
                        fontSize: '12px'
                  }}><i>{formatCreatedAt(item.updated_at)}</i></p>
                </div>
                <p style={{marginBottom: '5px', fontSize: '22px'}}>{item.sub_title}</p>
                <Editor
                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(item.content)))}
                    readOnly={true}
                    toolbarHidden={true}
                />
              </div>

              <div className="read-announcement">
                  <a onClick={() => handleDetailAnnouncement(item.id)} style={{color: 'gray'}}><u><i>Read Announcement</i></u></a>
              </div>                
            </div>
          ))):(
            // Jika announcement adalah array kosong atau null, tampilkan pesan bahwa tidak ada hasil pencarian
            <p>No announcements found</p>
          )}
        </div>
        <div className='container' style={{padding: "10px"}}></div>

      </div>
      <Footer/>
    </div>

  );    
}

export default Announcement;
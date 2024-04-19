import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import axios from 'axios';
import API from '../../../constants/api'
import Swal from "sweetalert2";
import Navbar from '../../../components/navbar'
import "./styles.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const AddAssignment = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [form, setForm] = useState({
        title: "",
				deadlineDate: '',
				deadlineTime: '',
        content:"",
    });

    // opsi untuk toolbar
    const toolbarOptions = {
      options: ['inline', 'list', 'textAlign', 'history'],
      inline: {
        options: ['bold', 'italic', 'underline'], 
      },
      list: {
        options: ['unordered', 'ordered'],
      },
      textAlign: {
        options: ['left', 'center', 'right', 'justify'],
      },
      history: {
        options: ['undo', 'redo'], 
      },
    };


    /*
    Function
    */
    const handleSubmit = async (e) => {
      e.preventDefault();

      Swal.showLoading();

      // convert isi content
      const contentState = form.content.getCurrentContent();
      const contentText = JSON.stringify(convertToRaw(contentState));
      // Menggabungkan tanggal dan waktu menjadi satu string dengan format "YYYY-MM-DD HH:MM:SS"
      const deadlineDateTime = `${form.deadlineDate} ${form.deadlineTime}:00`;

      const payload = {
        name: form.title,
        description: contentText,
        id_course: courseId,
        deadline: deadlineDateTime,
      };

      try {
        const response = await axios.post(`${API.used}/assignment`, payload);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Assignment created successfully.',
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = `/assignment/course/${courseId}`;
        }, 2000);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to create assignment. Please try again.',
        });
      }
    };
      
    const handleCancel = () => {
      navigate(-1);
    };
    
    return (
        <div>
          <Navbar/>
          <div className="wrapper">

						{/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px", textAlign: "center"}}>
                <h1 style={{ fontWeight: "600"}}>Tambah Assignment Baru</h1>
              </div>

              <div className='container' style={{padding: "30px"}}></div>

              {/* Title */}
              <p style={{ fontSize: '17px'}}>Judul Tugas *</p>
              <div className="form-group">
                <div class="form-floating">
                  <input
                    class="form-control"
                    id="floatingInput"
                    placeholder="judul"
                    required
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setForm({ ...form, title: e.target.value });
                    }}
                  />
                  <label for="floatingInput" style={{color: '#8C94A3'}}>Judul</label>
                </div>

								{/* Due Date */}
                <div className='container' style={{padding: "20px"}}></div>
                <p style={{ fontSize: '17px'}}>Tanggal Deadline *</p>
                <div class="form-floating">
                  <input
										type='date'
                    class="form-control"
                    id="floatingInput"
                    placeholder="tanggal deadline"
                    style={{ width: "100%" }}
                    required
                    onChange={(e) => {
                      setForm({ ...form, deadlineDate: e.target.value });
                    }}
                  />
                  <label for="floatingInput" style={{color: '#8C94A3'}}>Tanggal Deadline</label>
                </div>

								{/* Due Time */}
								<div className='container' style={{padding: "20px"}}></div>
                <p style={{ fontSize: '17px'}}>Waktu Deadline *</p>
                <div class="form-floating">
                  <input
										type='time'
                    class="form-control"
                    id="floatingInput"
                    placeholder="waktu deadline"
                    style={{ width: "100%" }}
                    required
                    onChange={(e) => {
                      setForm({ ...form, deadlineTime: e.target.value });
                    }}
                  />
                  <label for="floatingInput" style={{color: '#8C94A3'}}>Waktu Deadline</label>
                </div>

                {/* Content */}
                <div className='container' style={{padding: "20px"}}></div>
                <p style={{ fontSize: '17px'}}>Deskripsi Tugas *</p>
                <div class="form-floating">
                <Editor
                  wrapperClassName="editor-wrapper"
                  editorClassName="editor-content"
                  editorState={form.content}
                  onEditorStateChange={(editorState) => {
                      setForm({ ...form, content: editorState });
                  }}
                  editorStyle={{
                    border: '1px solid #ced4da',
                    borderRadius: '5px', 
                    padding: '10px',
                    minHeight: '300px'
                  }}
                  toolbar={toolbarOptions}
                />
                </div>
              </div>

              <div className='container' style={{padding: "40px"}}></div>

              {/* Button */}
              <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
                <button type="button" className="btn btn-secondary" style={{marginRight: '10px', width: '120px', height:'45px'}} onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary" style={{ width: '120px'}}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
    );
}

export default AddAssignment;
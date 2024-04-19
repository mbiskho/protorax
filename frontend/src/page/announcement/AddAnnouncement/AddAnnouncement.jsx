import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { convertToRaw } from 'draft-js';
import { AxiosError } from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import axios from '../../../lib/axios';
import Swal from 'sweetalert2';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



export default function AddAnnouncement () {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));

    const [form, setForm] = React.useState({
        title: '',
        sub_title: '',
        content: '',
    })

    const onSubmit = async (data) => {

        data.preventDefault();

        try{
            const contentState = form.content.getCurrentContent();
            const contentText = JSON.stringify(convertToRaw(contentState));
    
            const formData = {
                title: form.title,
                sub_title: form.sub_title,
                content: contentText,
                id_user: userData.id,
              };
            
    
            const result = await axios.post(`/announcement/${userData.id}/create`, formData, {});
            Swal.fire('Success', result.message, 'success');
            navigate('/announcement', { replace: true });
        } catch (error) {
			if (error instanceof AxiosError)
				Swal.fire('Error', error.response.data.message, 'error');
			else Swal.fire('Error', error.message, 'error');
		}
    }

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

    return(
        <>
            <div className='d-flex justify-content-between align-items-start'>
                <h1 className='fs-2 fw-bold' style={{ color: '#1c4a78' }}>
                    Create Announcement
                </h1>
            </div>

            <form className='py-4' onSubmit={onSubmit}>
                <div className='mb-3'>
                    <Label htmlFor='title'>Judul</Label>
                    <input
                        className='form-control'
                        id='title'
                        type='text'
                        required
                        placeholder='Masukkan Judul'
                        style={{
                            fontSize: '0.9rem',
                        }}
                        onChange={(e) => {
                            setForm({ ...form, title: e.target.value });
                          }}
                    />
                </div>

                <div className='mb-3'>
                    <Label htmlFor='sub_title'>Sub Judul</Label>
                    <input
                        className='form-control'
                        id='sub_title'
                        type='text'
                        required
                        placeholder='Masukkan Sub Judul'
                        style={{
                            fontSize: '0.9rem',
                        }}
                        onChange={(e) => {
                            setForm({ ...form, sub_title: e.target.value });
                        }}
                    />
                </div>

                <div className='mb-3'>
                    <Label htmlFor='Content'>Deskripsi</Label>
                    <Editor
                        wrapperClassName="editor-wrapper"
                        editorClassName="editor-content"
                        editorState={form.content}
                        onEditorStateChange={(editorState) => {
                            setForm({ ...form, content: editorState});
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

                <Button type='submit' className='py-2 px-3'>
					<span>Submit</span>
				</Button>
            </form>
        </>
    )
}

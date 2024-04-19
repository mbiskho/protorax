import * as React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { AxiosError } from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import Swal from 'sweetalert2';
import axios from '../../../lib/axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function EditAnnouncement () {
    let location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split("/");
    const id = path[path.length - 3];
    const idUser = path[path.length - 1];
    const [form, setForm] = React.useState({
        title: "",
        sub_title: "",
        content: EditorState.createEmpty(),
      });


    React.useEffect(() => {
        fetch();
    }, []);

    const onSubmit = async (data) => {
        data.preventDefault();

        try {
            const contentState = form.content.getCurrentContent();
            const formData = {
                title: form.title,
                sub_title: form.sub_title,
                content: JSON.stringify(convertToRaw(contentState)),
            };

            const result = await axios.put(
                `/announcement/${id}/update/${idUser}`, 
                formData
            );
            Swal.fire('Success', result.id, 'success');
            navigate(`/announcement/${id}`, { replace: true });
        } catch (error) {
			if (error instanceof AxiosError)
				Swal.fire('Error', error.response.data.message, 'error');
			else Swal.fire('Error', error.message, 'error');
        }
    };

    const fetch = async () => {
        try {
            const response = await axios.get(`/announcement/${id}`);
            const announcementData = response.data;
            setForm({
                title: announcementData.title,
                sub_title: announcementData.sub_title,
                content: EditorState.createWithContent(convertFromRaw(JSON.parse(announcementData.content)))
            });
        } catch (error) {
            console.error("Error fetching announcement data:", error);
        }  
    };

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


    return (
        <>
            <div className='d-flex justify-content-between align-items-start'>
                <h1 className='fs-2 fw-bold' style={{ color: '#1c4a78' }}>
                    Edit Announcement
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
                        value={form && form.title}
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
                        value={form && form.sub_title}
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
                        editorState={form.content}
                        onEditorStateChange={(editorState) => {
                        setForm({ ...form, content: editorState });
                        }}
                        wrapperClassName="editor-wrapper"
                        editorClassName="editor-content"
                        toolbar={toolbarOptions}
                        editorStyle={{
                        border: '1px solid #ced4da',
                        borderRadius: '5px',
                        padding: '10px',
                        minHeight: '200px',
                        }}
                    />
                </div>

                <Button type='submit' className='py-2 px-3'>
					<span>Submit</span>
				</Button>
            </form>
        </>
    )


}
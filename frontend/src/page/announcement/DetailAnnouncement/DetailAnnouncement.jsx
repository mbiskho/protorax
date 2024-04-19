import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; 
import { PiPushPinBold, PiPushPinFill, PiArrowCircleRightFill } from "react-icons/pi";
import axios from '../../../lib/axios';
import Button from '../../../components/Button/Button';
import Swal from 'sweetalert2';

export default function DetailAnnouncement() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [detail, setDetail] = React.useState([]);
    const [author, setAuthor] = React.useState(null);
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [showEditButton, setShowEditButton] = React.useState(true);
    const [isPinned, setIsPinned] = React.useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData)


    React.useEffect(() => {
        fetchDetail();

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
            const response = await axios.get(`/announcement/${id}`);
            setDetail(response.data);
            setIsPinned(response.data.is_pinned); 

            // set author
            const res = await axios.get(`/user/${response.data.id_user}`);
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


    const handlePinToggle = () => {
        try {
            // Mengubah status isPinned secara lokal
            setIsPinned(!isPinned) 

            const response = axios.put(`/announcement/${id}`,{ is_pinned: !isPinned });
            console.log(response.data)
        } catch (error) {
          console.error('Error pinning announcement:', error);
        }
    };

    const handleDelete = () => {
        Swal.fire({
			title: 'Are you sure?',
			text: 'You will not be able to recover this course!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it',
		}).then((result) => {
			if (result.isConfirmed) {
				axios.delete(`/announcement/${id}/delete`).then(() => {
					Swal.fire(
						'Deleted!',
						'Your course has been deleted.',
						'success'
					);
					navigate('/announcement', { replace: true });
				});
			}
		});
    }

    const formatDate = (date) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        const updateDate = new Date(date);
        const dayOfWeek = daysOfWeek[updateDate.getDay()];
        const dayOfMonth = updateDate.getDate();
        const month = monthsOfYear[updateDate.getMonth()];
        const year = updateDate.getFullYear();
        let hour = updateDate.getHours();
        const minute = updateDate.getMinutes();
        const period = (hour >= 12) ? 'PM' : 'AM';
        hour = (hour % 12) || 12;
        return`${dayOfWeek}, ${dayOfMonth} ${month} ${year}, ${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    };
    
    return (
        <>
            <div className='d-flex justify-content-between align-items-start'>
                <div>
                    <h1 className='fs-2 fw-bold' style={{ color: '#1c4a78' }}>
                        {detail.title}
                    </h1>
                </div>
                {userData && detail.id_user == userData.id && showEditButton && (
                    <div className='d-flex align-items-end'>
                        <Button className='me-2' onClick={handlePinToggle}>
                                {isPinned ? <b><PiPushPinFill style={{fontSize: '18px', margin: '4px'}}/></b> : <b><PiPushPinBold style={{fontSize: '18px', margin: '4px'}}/></b>}        
                        </Button>
                        <Link 
                            to={`/announcement/${id}/update/${userData.id}`} 
                            className='text-decoration-none'>
                            <Button className='py-2 px-3'>
                                <i className='fas fa-edit me-2'></i>
                                <span
                                    style={{
                                        whiteSpace: 'nowrap',
                                    }}>
                                    Edit
                                </span>
                            </Button>
                        </Link> 
                    </div>
                )}

                {userData && detail.id_user === userData.id && !showEditButton && (
                    <Button className='me-2' onClick={handlePinToggle}>
                        {isPinned ? <b><PiPushPinFill style={{fontSize: '18px', margin: '4px'}}/></b> : <b><PiPushPinBold style={{fontSize: '18px', margin: '4px'}}/></b>}        
                    </Button>
                )}

            </div>
            <p className='fs-6 mt-4'>
                <PiArrowCircleRightFill style={{fontSize: '22px', color: '#F0C232'}}/>
                <i> By : {author && author ? author.name : 'Loading...'} - {formatDate(detail.created_at)}</i>
            </p>

            <div className='p-5' style={{backgroundColor: '#E9EAF0'}}> 
                <h3 className='mb-20'>{detail.sub_title}</h3>
                <Editor
                    editorState={editorState}
                    readOnly={true}
                    toolbarHidden={true}
                />
            </div>

            <div className='d-flex justify-content-end mt-5'>
                {userData && detail.id_user == userData.id && (
                    <Button
                        className='py-2 px-3 ms-3 bg-danger'
                        onClick={handleDelete}>
                        <i className='fas fa-trash me-2'></i>
                        <span
                            style={{
                                whiteSpace: 'nowrap',
                            }}>
                            Delete
                        </span>
                    </Button>
                )}
            </div>
        </>
    )
}
import * as React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import DataTable from "react-data-table-component";
import Button from '../../../components/Button/Button';
import Label from '../../../components/Label/Label';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import axios from '../../../lib/axios';


export default function DetailAbsensi() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));
	const { data: meeting, loading, error } = useFetch(`/courses/${id}/meeting`);
    const { data: course } = useFetch(`/courses/${id}`);
    const [isOpen, setIsOpen] = React.useState(false);
    const [submissionStatus, setSubmissionStatus] = React.useState({});    
    
    const [form, setForm] = React.useState({
        name: '',
    })

    const onSubmit = async(data) => {
        data.preventDefault();
        try {
            const formData = {
                name: form.name,
              };

            const result = await axios.post(`/courses/${course.id}/meeting`, formData, {});
            // navigate(`/absensi/${course.id}/input`, { replace: true });
            setIsOpen(false);
        } catch (error) {
			if (error instanceof AxiosError)
				Swal.fire('Error', error.response.data.message, 'error');
			else Swal.fire('Error', error.message, 'error');
        }
    };

    const onChange = async (row) => {
        if (!submissionStatus[row.id]) {
            setSubmissionStatus({ ...submissionStatus, [row.id]: true });
            const result = await axios.post(`/absence/${userData.id}/meeting/${row.id}`);
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false); 
    };

    const columns = [
        {
            name: 'Tanggal',
            selector: (row) => formatCreatedAt(row.date),
        },
        {
            name: 'Name',
            selector: (row) => row.name,
        },
        {
            name: 'Action',
            cell: (row) => {
                const isSubmitted = submissionStatus[row.id];
                return isSubmitted ? 'Present' : (
                    <button
                        className='py-2 px-3'
                        disabled={isSubmitted}
                        onClick={() => onChange(row)}
                    >
                        Submit
                    </button>
                );
            },
        }
    ]

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
        <>
            <div className='d-flex justify-content-between align-items-start mb-5'>
                <div>
                    <h1 className='fs-2 fw-bold' style={{ color: '#1c4a78' }}>
                        {loading ? 'Loading...' : course.name}
                    </h1>
                </div>
                <div className=''>
                    <Button className='py-2 px-3' onClick={setIsOpen}>
                        <i className='fas fa-plus me-2'></i>
                        <span
                            style={{
                                whiteSpace: 'nowrap',
                            }}>
                            Add Meeting
                        </span>
                    </Button>
                    <ReactModal
                        isOpen={isOpen}
                        contentLabel="Add Meeting"
                    >
                        <button onClick={handleCloseModal}>X</button>
                        <form className='py-4' onSubmit={onSubmit}>
                            <Label htmlFor='sub_title'>Nama Meeting</Label>
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
                                    setForm({ ...form, name: e.target.value });
                                }}
                            />
                            <Button type='submit' className='py-2 px-3'>
                                <span>Submit</span>
                            </Button>
                        </form>
                    </ReactModal>
				</div>
            </div>

            <div className='row py-4'>
                <DataTable
                    columns={columns}
                    data={meeting}
                    customStyles={customStyles}
                    pagination
                    progressPending={loading}
                />
			</div>
        </>
    )
}
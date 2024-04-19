import * as React from 'react';
import DataTable from "react-data-table-component";
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function InputAbsensi() {
    const [attendanceData] = React.useState([
        {
            id_course_meeting: 1,
            id_user: 'Yanto Hariadi',
            time: '13 May 2024, 1PM - 2PM',
            status: 'Present'
        },
        {
            id_course_meeting: 1,
            id_user: 'Yanti Sumiyati Adelweis',
            time: '13 May 2024, 1PM - 2PM',
            status: 'Present'
        },
        {
            id_course_meeting: 1,
            id_user: 'Soleh Rajin Shalat',
            time: '13 May 2024, 1PM - 2PM',
            status: 'Absence'
        },
    ]);

    const columns = [
        {
            name: 'Nama Pelajar',
            selector: (row) => row.id_user,
        },
        {
            name: 'Status',
            selector: (row) => row.status,
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

    const [activeTab, setActiveTab] = React.useState('current');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    
    return (
        <>
            <div>
                <div className='d-flex justify-content-end'>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected={activeTab === 'current'}
                                onClick={() => handleTabClick('current')}
                                style={{
                                    color: activeTab === 'current' ? 'white' : '#1c4a78',
                                    backgroundColor: activeTab === 'current' ? '#1c4a78' : 'transparent',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 'medium',
                                }}
                            >
                                Current
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'month' ? 'active' : ''}`}
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected={activeTab === 'month'}
                                onClick={() => handleTabClick('month')}
                                style={{
                                    color: activeTab === 'month' ? 'white' : '#1c4a78',
                                    backgroundColor: activeTab === 'month' ? '#1c4a78' : 'transparent',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 'medium',
                                }}
                            >
                                Month
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'year' ? 'active' : ''}`}
                                id="pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected={activeTab === 'year'}
                                onClick={() => handleTabClick('year')}
                                style={{
                                    color: activeTab === 'year' ? 'white' : '#1c4a78',
                                    backgroundColor: activeTab === 'year' ? '#1c4a78' : 'transparent',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 'medium',
                                }}
                            >
                                Year
                            </button>
                        </li>
                    </ul>
                </div>
                <div className='mb-2'> 
                    <p className='mb-20 fs-6 fst-italic'>{attendanceData[0].time}</p>
                </div>
                <DataTable
                    columns={columns}
                    pagination
                    data={attendanceData}
                    customStyles={customStyles}
                />          
            </div>         
        </>
    )
}
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '../../../components/Announcement/Box/Box';
import { useFetch } from '../../../hooks/useFetch';
import { Card } from '../../../components/Announcement/Card/Card';
import axios from '../../../lib/axios';
import Button from '../../../components/Button/Button';
import Select from '../../../components/Select/Select';
import styles from './view.module.css';


export default function ViewAnnouncement() {
    const {data: announcement, setData: setAnnouncement, loading, error } = useFetch('/announcement');
    const [search, setSearch] = React.useState(null);
    const userData = JSON.parse(localStorage.getItem('userData'));

    console.log(announcement);

    const handleSortChange = async (value) => {
        try {
                const response = await axios.get(`/announcement/sort?sortBy=${value}`);
                setAnnouncement(response.data);
            } catch (error) {
                console.error("Error sorting announcement:", error);
            }
        };
    
    const handleSearchChange = async (event) => {
        setSearch(event.target.value); // Update nilai input pencarian saat nilainya berubah
        try {
            const response = await axios.post(`/announcement/search?q=${event.target.value}`);
            const test = setAnnouncement(response.data);
            console.log(test)
        } catch (error) {
            console.error("Error searching announcement:", error);
        }
    };    

    return (
        <>
            <div className='d-flex justify-content-between align-items-start mb-5'>
                <Select className='py-2 px-3'onChange={(e) => handleSortChange(e.target.value)}>
                    <option value="" disabled selected>Sort By</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </Select>
                <input
                    className={styles.search}
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                    style={{
                        backgroundImage: `url('data:image/svg+xml;base64,${btoa(
                        `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`
                        )}')`,
                    }}
                />
            </div>

            <div className='d-flex justify-content-between align-items-start'>
                <div>
                    <h1 className='fs-2 fw-bold' style={{ color: '#1c4a78' }}>
                        Halo, {userData.name}
                    </h1>
                </div>
                <div>
                    {userData.role === 'guru' && (
                        <Link to='/announcement/add' style={{ textDecoration: 'none' }}>
                            <Button className='py-2 px-3'>
                                <i className='fas fa-plus me-2'></i>
                                <span
                                    style={{
                                        whiteSpace: 'nowrap',
                                    }}>
                                    Add Announcement
                                </span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <div className='mt-5'>
                {announcement?.map((item) => {
                if (item.is_pinned === 1) {
                    return (
                        <Card key={item.id} {...item} />
                    );
                }
                return null;
                })}
            </div>

            <div className='row py-4'>
                {announcement && announcement.length > 0 ? (
                    announcement?.map((list) => (
                        <Box key={list.id} {...list}/>
                ))):(
                    <p>No announcements found</p>
                )}
            </div>
        </>
    )
}
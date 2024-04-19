 import * as React from 'react';
import { Card } from '../../../components/Absensi/Card/Card';
import { useFetch } from '../../../hooks/useFetch';

export default function ViewAllAbsensi() {
    const { data: courses, loading, error } = useFetch('/courses');
    const userData = JSON.parse(localStorage.getItem('userData'));

    
    const filteredCourses = courses.filter((course) => course.id_teacher === userData.id);
    console.log(userData.id, filteredCourses)

    return (
        <>
            <div className='d-flex justify-content-between align-items-start'>
				<div>
					<h1 className='fs-2 fw-bold' style={{ color: '#1c4a78' }}>
						Absensi
					</h1>
				</div>
            </div>
            
            <div className='row py-4'>
                {filteredCourses.length > 0 ? (
                    filteredCourses?.map((course) => (
                        <Card key={course.id} {...course} />
                    ))):(
                        <p>No courses found</p>
                )}
            </div>
            
        </>
    )
}
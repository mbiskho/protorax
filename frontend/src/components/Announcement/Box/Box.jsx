import * as React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; 
import { Link } from 'react-router-dom';

export const Box = ({ ...list }) => {

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
        <div 
            className='' 
            style={{
                padding: '40px',
                marginBottom: '30px',
                backgroundColor: '#E9EAF0',    
            }}>
            <div
                style={{
                    maxHeight: '250px',
                    overflow: 'hidden',
                    lineHeight: '24px',
                }}>
                <div className='d-flex justify-content-between mb-3'>
                    <h5 style={{fontWeight: '600'}}>
                        {list.title}
                    </h5>
                    <p 
                        className='align-items-center fst-italic'
                        style={{fontSize: '10px'}}>
                        {formatCreatedAt(list.updated_at)}
                    </p>
                </div>

                <p
                    style={{
                        marginBottom: '5px',
                        fontSize: '18px',
                    }}>
                    {list.sub_title}
                </p>
                <p 
                    style={{
                        marginBottom: '5px',
                        fontSize: '14px',
                    }}>
                    <Editor
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(list.content)))}
                        readOnly={true}
                        toolbarHidden={true}
                    />
                </p>  
            </div>
            <div className="mt-4 d-flex justify-content-end fst-italic">
                <Link to={`/announcement/${list.id}`}>
                    <a style={{
                        color: 'gray',
                        fontSize: '12px'
                    }}><u>Read Announcement</u></a>
                </Link>
            </div>   
        </div>
    )
}
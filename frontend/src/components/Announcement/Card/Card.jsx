import * as React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; 
import { Link } from 'react-router-dom';
import { PiMegaphoneFill } from "react-icons/pi";


export const Card = ({ ...item }) => {

    return (
        <div className='mt-4 mb-3'>
            <h3><b><PiMegaphoneFill style={{color: '#F0C232'}}/> {item.title}</b></h3>
            <Editor
                editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(item.content)))}
                readOnly={true}
                toolbarHidden={true}
                editorStyle={{
                lineHeight: '25px',
                overflow: 'hidden',
                maxHeight: '70px',
                fontSize: '14px'
                }}
            />
            <Link className='fst-italic' to={`/announcement/${item.id}`}>
                <a style={{
                    color: 'gray',
                    fontSize: '12px'
                }}><u>Read Announcement</u></a>
            </Link>
        </div>
    )
}
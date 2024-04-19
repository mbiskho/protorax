import React, { useState, useEffect, startTransition } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../constants/api';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FaFile } from 'react-icons/fa';

const ListChapterFile = (props) => {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchChapterFile(props.chapterId);
  }, []);

  const fetchChapterFile = async (chapterId) => {
    try {
      const response = await axios.get(
        `${API.used}/file-materi/materi/${chapterId}`
      );
      setFiles(response.data);
    } catch (error) {
      console.log('Error fetching list of chapter files:', error);
    }
  };

  return (
    <div>
      {files && files.length > 0 ? (
        files.map((item, index) => (
      <p key={index}>
        <FaFile style={{ fontSize: '22px', color: '#000000' }} />
        <a
          href={`${API.used}/file-materi/download/${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.name}
        </a>
      </p>
        ))
      ) : (
        <p>Tidak ada file di chapter ini</p>
      )}
    </div>
  );
};

export default ListChapterFile;

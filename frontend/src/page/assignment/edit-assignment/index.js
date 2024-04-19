import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Swal from "sweetalert2";
import Navbar from "../../../components/navbar";
import API from "../../../constants/api";
import axios from "axios";
import "./styles.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditAssignment = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [form, setForm] = useState({
		title: "",
		id_course: "",
		deadlineDate: '',
		deadlineTime: '',
		content: EditorState.createEmpty(),
	});
	// const [assignment, setAssignment] = useState([]);

	// opsi toolbar
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


	/*
	Function
	*/
	useEffect(() => {
		// Tampilkan SweetAlert dengan animasi loading
		Swal.fire({
			title: 'Loading...',
			allowOutsideClick: false,
			showConfirmButton: false,
			willOpen: () => {
				Swal.showLoading();
			}
		});

		fetchData();
	}, []);

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	// const path = location.pathname.split("/");
	// 	// const id = path[path.length - 3];
	// 	// const idUser = path[path.length - 1]

	// 	try {
	// 		setLoading(true);
	// 		const contentState = form.content.getCurrentContent();
	// 		const payload = {
	// 			title: form.title,
	// 			sub_title: form.sub_title,
	// 			content: JSON.stringify(convertToRaw(contentState)),
	// 		};

	// 		const response = await axios.put(`${API.used}/announcement/${id}/update/${idUser}`, payload);

	// 		Swal.fire({
	// 			title: "Successfull",
	// 			text: "Announcement has been updated",
	// 			icon: "success",
	// 			timer: 1500,
	// 		});

	// 		setTimeout(() => {
	// 			window.location.assign("/announcement");
	// 		}, 1500);
	// 	} catch (error) {
	// 		setLoading(false);
	// 		Swal.fire({
	// 			title: "Error",
	// 			text: error.message || "An error occurred",
	// 			icon: "error",
	// 		});
	// 	}
	// };

	// ambil data yg sesuai untuk isian pada kotak input
	const fetchData = async () => {
		// const path = location.pathname.split("/");
		// const id = path[path.length - 3];
		try {
			const response = await axios.get(`${API.used}/assignment/${id}`);
			const assignmentData = response.data;

			// Extract date and time from ISO timestamp
			const isoTimestamp = new Date(assignmentData.deadline);
			const deadlineDate = `${isoTimestamp.getFullYear()}-${(isoTimestamp.getMonth() + 1).toString().padStart(2, '0')}-${isoTimestamp.getDate().toString().padStart(2, '0')}`;
			const deadlineTime = `${isoTimestamp.getHours().toString().padStart(2, '0')}:${isoTimestamp.getMinutes().toString().padStart(2, '0')}`;

			setForm({
				id_course: assignmentData.id_course,
				title: assignmentData.name,
				deadlineDate: deadlineDate,
				deadlineTime: deadlineTime,
				content: EditorState.createWithContent(convertFromRaw(JSON.parse(assignmentData.description)))
			});
		} catch (error) {
			console.error("Error fetching assignment data:", error);
		}
		Swal.close();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		Swal.showLoading();

		// convert isi content
		const contentState = form.content.getCurrentContent();
		const contentText = JSON.stringify(convertToRaw(contentState));
		// Menggabungkan tanggal dan waktu menjadi satu string dengan format "YYYY-MM-DD HH:MM:SS"
		const deadlineDateTime = `${form.deadlineDate} ${form.deadlineTime}:00`;

		const payload = {
			id: id,
			id_course: form.id_course,
			name: form.title,
			description: contentText,
			deadline: deadlineDateTime,
		};
		console.log("🚀 ~ handleSubmit ~ payload:", payload)

		try {
			const response = await axios.put(`${API.used}/assignment`, payload);
			if (response.status === 200) {
				Swal.fire({
					icon: 'success',
					title: 'Success!',
					text: 'Assignment updated successfully.',
				});
	
				// Redirect after 2 seconds
				setTimeout(() => {
					window.location.href = `/assignment/course/${form.id_course}`;
				}, 2000);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Failed to update assignment. Please try again.',
				});
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Failed to update assignment. Please try again.',
			});
		}
	};

	const handleCancel = () => {
		navigate(-1);
	};



	return (
		<div>
			<Navbar />
			<div className="wrapper">

				{/* Form */}
				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: "10px", textAlign: "center" }}>
						<h1 style={{ fontWeight: "600" }}>Edit Assignment</h1>
					</div>

					<div className='container' style={{ padding: "30px" }}></div>

					{/* Title */}
					<p style={{ fontSize: '17px' }}>Judul Tugas *</p>
					<div className="form-group">
						<div class="form-floating">
							<input
								class="form-control"
								id="floatingInput"
								placeholder="judul"
								required
								style={{ width: "100%" }}
								value={form.title}
								onChange={(e) => {
									setForm({ ...form, title: e.target.value });
								}}
							/>
							<label htmlFor="floatingInput" style={{ color: '#8C94A3' }}>Judul</label>
						</div>

						{/* Due Date */}
						<div className='container' style={{ padding: "20px" }}></div>
						<p style={{ fontSize: '17px' }}>Tanggal Deadline *</p>
						<div class="form-floating">
							<input
								type='date'
								class="form-control"
								id="floatingInput"
								placeholder="tanggal deadline"
								style={{ width: "100%" }}
								required
								value={form.deadlineDate}
								onChange={(e) => {
									setForm({ ...form, deadlineDate: e.target.value });
								}}
							/>
							<label htmlFor="floatingInput" style={{ color: '#8C94A3' }}>Tanggal Deadline</label>
						</div>

						{/* Due Time */}
						<div className='container' style={{ padding: "20px" }}></div>
						<p style={{ fontSize: '17px' }}>Waktu Deadline *</p>
						<div class="form-floating">
							<input
								type='time'
								class="form-control"
								id="floatingInput"
								placeholder="waktu deadline"
								style={{ width: "100%" }}
								required
								value={form.deadlineTime}
								onChange={(e) => {
									setForm({ ...form, deadlineTime: e.target.value });
								}}
							/>
							<label htmlFor="floatingInput" style={{ color: '#8C94A3' }}>Waktu Deadline</label>
						</div>

						{/* Content */}
						<div className='container' style={{ padding: "20px" }}></div>
						<p style={{ fontSize: '17px' }}>Deskripsi Tugas *</p>
						<div class="form-floating">
							<Editor
								wrapperClassName="editor-wrapper"
								editorClassName="editor-content"
								editorState={form.content}
								onEditorStateChange={(editorState) => {
									setForm({ ...form, content: editorState });
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
					</div>

					<div className='container' style={{ padding: "40px" }}></div>

					{/* Button */}
					<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
						<button type="button" className="btn btn-secondary" style={{ marginRight: '10px', width: '120px', height: '45px' }} onClick={handleCancel}>
							Cancel
						</button>
						<button type="submit" class="btn btn-primary" style={{ width: '120px' }}>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditAssignment;

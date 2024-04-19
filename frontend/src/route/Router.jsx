import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../common/ProtectedRoute";

import Home from "../page/home/Home";
import UserManagement from "../page/admin/user-management";
import AddUser from "../page/admin/add-user";
import UpdateUser from "../page/admin/update-user";
import PaymentOverview from "../page/admin/payment-overview";

// course pages
import HomeLayout from "../layouts/HomeLayout";
import CoursePage from "../page/course/AllCourse/AllCourse";
import AddCourse from "../page/course/AddCourse/AddCourse";
import SingleCourse from "../page/course/SingleCourse/SingleCourse";
import EditCourse from "../page/course/EditCourse/EditCourse";
import { NotFound } from "../page/error/NotFound";
import Login from "../page/auth/Login";

// Course Student & Teacher
import CourseStudent from "../page/course-student";
import CourseTeacher from "../page/course-teacher";

// announcement
import ViewAnnouncement from "../page/announcement/ViewAnnouncement/ViewAnnouncement";
import DetailAnnouncement from "../page/announcement/DetailAnnouncement/DetailAnnouncement";
import AddAnnouncement from "../page/announcement/AddAnnouncement/AddAnnouncement";
import EditAnnouncement from "../page/announcement/EditAnnouncement/EditAnnouncement";

// Absensi
import ViewAllAbsensi from "../page/absensi/ViewAbsensi/ViewAllAbsensi";
import DetailAbsensi from "../page/absensi/DetailAbsensi/DetailAbsensi";
import InputAbsensi from "../page/absensi/InputAbsensi/InputAbsensi";

// Chapter
import AddChapter from "../page/chapter/add-chapter";
import EditChapter from "../page/chapter/edit-chapter";
import ChapterInCourse from "../page/chapter/chapter-in-course";
import AddChapterFile from "../page/chapter/add-chapter-file";

// Assignment
import AddAssignment from "../page/assignment/add-assignment";
import DetailAssignment from "../page/assignment/detail-assignment";
import EditAssignment from "../page/assignment/edit-assignment";
import AssignmentPerCourse from "../page/assignment/assignment-per-course";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="auth" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="users">
              <Route index element={<UserManagement />} />
              <Route path="add" element={<AddUser />} />
              <Route path=":id/update" element={<UpdateUser />} />
            </Route>

            <Route path="course">
              <Route index element={<CoursePage />} />
              <Route path="add" element={<AddCourse />} />
              <Route path=":id" element={<SingleCourse />} />
              <Route path=":id/update" element={<EditCourse />} />
            </Route>

            <Route path="announcement">
              <Route index element={<ViewAnnouncement />} />
              <Route path="add" element={<AddAnnouncement />} />
              <Route path=":id" element={<DetailAnnouncement />} />
              <Route path=":id/update/:idUser" element={<EditAnnouncement />} />
            </Route>

            <Route path="absensi">
              <Route index element={<ViewAllAbsensi />} />
              <Route path=":id" element={<DetailAbsensi />} />
              <Route path=":id-course/input" element={<InputAbsensi />} />
            </Route>

            <Route path="chapter">
              <Route path="add/:courseId" element={<AddChapter />} />
              <Route path="edit/:id" element={<EditChapter />} />
              <Route path="course/:courseId" element={<ChapterInCourse />} />
            </Route>
            <Route
              path="chapter-file/add/:chapterId"
              element={<AddChapterFile />}
            />

            <Route path="assignment">
              <Route path="add/:courseId" element={<AddAssignment />} />
              <Route path="edit/:id" element={<EditAssignment />} />
              <Route
                path="course/:courseId"
                element={<AssignmentPerCourse />}
              />
              <Route path=":id" element={<DetailAssignment />} />
              {/* <Route path=":id/submit" element={<AddSubmission />} />
              <Route
                path=":id/submissions"
                element={<SubmissionPerAssignment />}
              /> */}
            </Route>

            <Route
              path="course-student/:courseId"
              element={<CourseStudent />}
            />
            <Route
              path="course-teacher/:courseId"
              element={<CourseTeacher />}
            />
            <Route path="payment-collection" element={<PaymentOverview />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

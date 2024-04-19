/**
 * Important: DONT USE ANYMORE !!
 */



import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ProtectedRoute } from "./common/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

/**
 * Import Component
 */
const Auth = React.lazy(() => import("./page/auth"));
const Home = React.lazy(() => import("./page/home"));
const UserManagement = React.lazy(() => import("./page/admin/user-management"));
const AddUser = React.lazy(() => import("./page/admin/add-user"));
const UpdateUser = React.lazy(() => import("./page/admin/update-user"));
const Announcement = React.lazy(() =>
  import("./page/announcement/view-announcement")
);
const DetailAnnouncement = React.lazy(() =>
  import("./page/announcement/detail-announcement")
);
const AddAnnouncement = React.lazy(() =>
  import("./page/announcement/add-announcement")
);
const EditAnnouncement = React.lazy(() =>
  import("./page/announcement/edit-announcement")
);
const PaymentOverview = React.lazy(() =>
  import("./page/admin/payment-overview")
);

const CourseStudent = React.lazy(() => import("./page/course-student"));
const CourseTeacher = React.lazy(() => import("./page/course-teacher"));
const AddAssignment = React.lazy(() =>
  import("./page/assignment/add-assignment")
);
const DetailAssignment = React.lazy(() =>
  import("./page/assignment/detail-assignment")
);
const EditAssignment = React.lazy(() =>
  import("./page/assignment/edit-assignment")
);
const AssignmentPerCourse = React.lazy(() =>
  import("./page/assignment/assignment-per-course")
);
const AddSubmission = React.lazy(() =>
  import("./page/submission/add-submission")
);
const SubmissionPerAssignment = React.lazy(() =>
  import("./page/submission/submission-per-assignment")
);
const AddChapter = React.lazy(() => import("./page/chapter/add-chapter"));
const EditChapter = React.lazy(() => import("./page/chapter/edit-chapter"));
const ChapterInCourse = React.lazy(() =>
  import("./page/chapter/chapter-in-course")
);
const AddChapterFile = React.lazy(() =>
  import("./page/chapter/add-chapter-file")
);




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path=""
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="auth" element={<Auth />} />
      <Route
        path="user-management"
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="add-user"
        element={
          <ProtectedRoute>
            <AddUser />
          </ProtectedRoute>
        }
      />
      <Route path="user-management/add" element={<AddUser />} />
      <Route path="user-management/update/:id" element={<UpdateUser />} />
      <Route
        path="announcement"
        element={
          <ProtectedRoute>
            <Announcement />
          </ProtectedRoute>
        }
      />
      <Route path="announcement/:id" element={<DetailAnnouncement />} />
      <Route path="announcement/:id/create" element={<AddAnnouncement />} />
      <Route
        path="announcement/:id/update/:idUser"
        element={<EditAnnouncement />}
      />
      <Route
        path="payment-overview"
        element={
          <ProtectedRoute>
            <PaymentOverview />
          </ProtectedRoute>
        }
      />

      <Route
        path="course-student/:courseId"
        element={
          <ProtectedRoute>
            <CourseStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="course-teacher/:courseId"
        element={
          <ProtectedRoute>
            <CourseTeacher />
          </ProtectedRoute>
        }
      />

      <Route path="assignment/add/:courseId" element={<AddAssignment />} />
      <Route path="assignment/edit/:id" element={<EditAssignment />} />
      <Route
        path="assignment/course/:courseId"
        element={<AssignmentPerCourse />}
      />
      <Route path="assignment/:id" element={<DetailAssignment />} />
      <Route path="assignment/:id/submit" element={<AddSubmission />} />
      <Route
        path="assignment/:id/submissions"
        element={<SubmissionPerAssignment />}
      />

      <Route path="chapter/add/:courseId" element={<AddChapter />} />
      <Route path="chapter/edit/:id" element={<EditChapter />} />
      <Route path="chapter/course/:courseId" element={<ChapterInCourse />} />
      <Route path="chapter-file/add/:chapterId" element={<AddChapterFile />} />
    </Route>
  )
);

export default router;

import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

/**
 * Import Component
 */
const Auth = React.lazy(() => import("./page/auth"));
const Home = React.lazy(() => import("./page/home"));
const UserManagement = React.lazy(()=> import('./page/admin/user-management'))
const AddUser = React.lazy(()=> import('./page/admin/add-user'))
const UpdateUser = React.lazy(()=> import('./page/admin/update-user'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="auth" element={<Auth />} />
      <Route path="user-management" element={<UserManagement/>}/>
      <Route path="user-management/add" element={<AddUser />} />
      <Route path="user-management/update/:id" element={<UpdateUser />} />
    </Route>
  )
);

export default router;

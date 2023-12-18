import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import ReviewPage from "../pages/ReviewPage";
import AccountPage from "../pages/AccountPage";
import AboutPage from "../pages/AboutPage";
import MyProfilePage from "../pages/MyProfilePage";
import TestPage from "../pages/TestPage";
import RegisterPage from "../pages/RegisterPage";
import TestDetailPage from "../pages/TestDetailPage";
import AdminControlPanel from "../features/user/AdminControlPanel";
import UpdateReadingLessonsByAdmin from "../features/lessons/UpdateReadingLessonsByAdmin";
import UpdateUserByAdmin from "../features/user/UpdateUserByAdmin";
import UserChangePassword from "../features/user/UserChangePassword";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/test"
          element={
            <AuthRequire>
              <TestPage />
            </AuthRequire>
          }
        />
        <Route
          path="/test/:id"
          element={
            <AuthRequire>
              <TestDetailPage />
            </AuthRequire>
          }
        />
        <Route
          path="reading-lessons/:id"
          element={
            <AuthRequire>
              <DetailPage />
            </AuthRequire>
          }
        />
        <Route
          path="/result/:id"
          element={
            <AuthRequire>
              <ReviewPage />
            </AuthRequire>
          }
        />
        <Route
          path="/account-settings"
          element={
            <AuthRequire>
              <AccountPage />
            </AuthRequire>
          }
        />
        <Route
          path="/my-profile"
          element={
            <AuthRequire>
              <MyProfilePage />
            </AuthRequire>
          }
        />
           <Route
          path="/admin/controlpanel"
          element={
            <AuthRequire>
              <AdminControlPanel />
            </AuthRequire>
          }
        />
        <Route
          path="/admin/editReadingLessons/:id"
          element={
            <AuthRequire>
              <UpdateReadingLessonsByAdmin />
            </AuthRequire>
          }
        />
        <Route
          path="/admin/updateUser/:userId"
          element={
            <AuthRequire>
              <UpdateUserByAdmin />
            </AuthRequire>
          }
        />
      </Route>

      <Route element={<BlankLayout />}>
      <Route
          path="/changePassword"
          element={
            <AuthRequire>
              <UserChangePassword />
            </AuthRequire>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;

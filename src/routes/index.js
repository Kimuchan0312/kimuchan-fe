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

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <MainLayout />
        }
      > 
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="reading-lessons/:id" element={ <AuthRequire><DetailPage /></AuthRequire>} />
        <Route path="/result/:id" element={<AuthRequire><ReviewPage /></AuthRequire>} />
        <Route path="/account-settings" element={<AuthRequire><AccountPage /></AuthRequire>} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
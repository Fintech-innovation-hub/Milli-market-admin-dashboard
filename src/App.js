import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import ProtectedRoutes from './routes/protectedRoutes';
import updateToken from './utils/updateToken';


const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))


const token = JSON.parse(localStorage.getItem('access-token'));
function App() {
  setInterval(() => {
    updateToken()
  }, 240000)
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/app/*" element={<Layout />} />
          </Route>
          <Route path="*" element={<Navigate to={token ? "/app/dashboard" : "/login"} replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LoginPage from './pages/login/LoginPage'
import TrackerPage from './pages/TrackerPage/TrackerPage'

// Auth gate + shared chrome in one layout route.
// Renders for any child route that matches; <Outlet/> is where the page lands.
function ProtectedLayout() {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public page: no navbar/footer */}
        <Route path="/login" element={<LoginPage />} />

        {/* Everything below requires auth and gets shared chrome */}
        <Route element={<ProtectedLayout />}>
          <Route path="/markets" element={<TrackerPage />} />
          {/* <Route path="/stock/:symbol" element={<StockDetail />} /> */}
        </Route>

        {/* Unknown URLs bounce to the app (or to /login if not authed) */}
        <Route path="*" element={<Navigate to="/markets" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
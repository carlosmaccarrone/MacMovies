import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PrivateLayout from '@/layouts/PrivateLayout';
import { useAuth } from '@/contexts/AuthContext';
import Spinner from '@/components/Spinner';
import Login from '@/pages/Login/Login';
import Home from '@/pages/Home/Home';

function PrivateRoute() {
  const { isLogged, loading } = useAuth();
  if (loading) return <Spinner />
  return isLogged ? <Outlet /> : <Navigate to="/" replace />;
}

function PublicRoute() {
  const { isLogged, loading } = useAuth();
  if (loading) return <Spinner />
  return !isLogged ? <Outlet /> : <Navigate to="/home" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>

      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
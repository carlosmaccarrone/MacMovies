import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MovieDetail from '@/pages/MovieDetail/MovieDetail';
import PrivateLayout from '@/layouts/PrivateLayout';
import Spinner from '@/components/Spinner/Spinner';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/Login/Login';
import Home from '@/pages/Home/Home';

function AuthRoute({ checkAuth, redirectTo }) {
  const { isLogged, loading } = useAuth();
  if (loading) return <Spinner />;
  return checkAuth(isLogged) ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

function PrivateRoute() {
  return <AuthRoute checkAuth={(isLogged) => isLogged} redirectTo="/" />;
}

function PublicRoute() {
  return <AuthRoute checkAuth={(isLogged) => !isLogged} redirectTo="/home" />;
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
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
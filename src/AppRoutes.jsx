import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login/Login';
import Home from '@/pages/Home/Home';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
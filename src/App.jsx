import { AuthProvider } from '@/contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';

function App() {
  return (
    <AuthProvider>
    	<BrowserRouter>
      	<AppRoutes />
    	</BrowserRouter>
    </AuthProvider>
  );
}

export default App;
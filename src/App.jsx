import { AuthProvider } from '@/contexts/AuthContext';
import { HashRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
    	<HashRouter>
      	<AppRoutes />
    	</HashRouter>
    </AuthProvider>
  );
}

export default App;
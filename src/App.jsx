import { AuthProvider } from '@/contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';

function App() {
  return (
    <BrowserRouter>
    	<HashRouter>
      	<AppRoutes />
    	</HashRouter>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';

// Componente para rutas protegidas
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={
        <PrivateRoute>
          <Products />
        </PrivateRoute>
      } />
      <Route path="/products/new" element={
        <PrivateRoute>
          <ProductForm />
        </PrivateRoute>
      } />
      <Route path="/products/edit/:id" element={
        <PrivateRoute>
          <ProductForm />
        </PrivateRoute>
      } />
      <Route path="/" element={<Navigate to="/products" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
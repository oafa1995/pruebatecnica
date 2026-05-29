import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error('Error loading products', error);
      if (error.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar producto?')) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error('Error deleting', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gestión de Productos</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px' }}>Cerrar sesión</button>
      </div>
      <Link to="/products/new">
        <button style={{ marginBottom: '20px' }}>Crear nuevo producto</button>
      </Link>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.type}</td>
              <td>
                <Link to={`/products/edit/${p.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(p.id)} style={{ marginLeft: '8px' }}>Eliminar</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No hay productos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
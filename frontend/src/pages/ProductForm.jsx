import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../services/productService';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    type: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await getProduct(id);
      setFormData(res.data);
    } catch (error) {
      console.error('Error loading product', error);
      navigate('/products');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.price || formData.price <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (formData.stock === undefined || formData.stock < 0) newErrors.stock = 'El stock no puede ser negativo';
    if (!formData.type.trim()) newErrors.type = 'El tipo es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (isEditing) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/products');
    } catch (error) {
      console.error('Error saving product', error);
      alert('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>{isEditing ? 'Editar producto' : 'Nuevo producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%' }} />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div>
          <label>Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Precio *</label>
          <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} style={{ width: '100%' }} />
          {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
        </div>
        <div>
          <label>Stock *</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} style={{ width: '100%' }} />
          {errors.stock && <span style={{ color: 'red' }}>{errors.stock}</span>}
        </div>
        <div>
          <label>Tipo *</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} style={{ width: '100%' }} />
          {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={() => navigate('/products')} style={{ marginLeft: '10px' }}>Cancelar</button>
      </form>
    </div>
  );
}
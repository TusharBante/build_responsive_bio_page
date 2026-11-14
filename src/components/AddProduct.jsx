import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

// AddProduct Component: Form to create a new product matching MySQL schema
function AddProduct() {
  const navigate = useNavigate();
  const { fetchProducts } = useContext(ProductContext);

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    icon: '📦'
  });

  // Form feedback state
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle field value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for modified field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Client-side input validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Product name is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Product name must be at least 2 characters long.';
    }

    if (!formData.price) {
      errors.price = 'Price is required.';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be a valid number greater than 0.';
    }

    if (!formData.category.trim()) {
      errors.category = 'Category is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    // Validate inputs before submitting
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          price: parseFloat(formData.price),
          category: formData.category.trim(),
          description: formData.description.trim(),
          icon: formData.icon.trim() || '📦'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Express-validator response handling
        if (data.errors && Array.isArray(data.errors)) {
          const apiErrors = {};
          data.errors.forEach((err) => {
            apiErrors[err.field] = err.message;
          });
          setValidationErrors(apiErrors);
          throw new Error('Please correct the validation errors below.');
        } else {
          throw new Error(data.message || 'Failed to add product.');
        }
      }

      // Refresh product list in context
      if (fetchProducts) {
        fetchProducts();
      }

      // Show success message and redirect to catalog
      setSuccessMessage('🎉 Product added successfully! Redirecting to catalog...');
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      console.error('Failed to create product:', err);
      setServerError(err.message || 'An error occurred while adding the product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="form-card">
        <div className="form-header">
          <h2>➕ Add New Product</h2>
          <p className="form-subtitle">Enter product details to add an item to the store catalog.</p>
        </div>

        {/* Success Notification */}
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        {/* Error Notification */}
        {serverError && (
          <div className="alert alert-error">
            ⚠️ {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${validationErrors.name ? 'input-error' : ''}`}
              placeholder="e.g. Ergonomic Office Chair"
              value={formData.name}
              onChange={handleChange}
            />
            {validationErrors.name && (
              <span className="field-error-text">{validationErrors.name}</span>
            )}
          </div>

          {/* Price & Category Fields */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0.01"
                className={`form-input ${validationErrors.price ? 'input-error' : ''}`}
                placeholder="e.g. 79.99"
                value={formData.price}
                onChange={handleChange}
              />
              {validationErrors.price && (
                <span className="field-error-text">{validationErrors.price}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                className={`form-input ${validationErrors.category ? 'input-error' : ''}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category...</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Fitness">Fitness</option>
                <option value="Accessories">Accessories</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
              </select>
              {validationErrors.category && (
                <span className="field-error-text">{validationErrors.category}</span>
              )}
            </div>
          </div>

          {/* Icon (Emoji) Field */}
          <div className="form-group">
            <label htmlFor="icon">Product Icon (Emoji)</label>
            <input
              type="text"
              id="icon"
              name="icon"
              className="form-input"
              placeholder="e.g. 🎧, 💻, 📱, 📦"
              value={formData.icon}
              onChange={handleChange}
            />
            <small className="form-hint">Icon displayed on the product card (defaults to 📦).</small>
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="form-input"
              placeholder="Brief details about the product..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Add Product'}
            </button>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

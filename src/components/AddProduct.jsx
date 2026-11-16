import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductContext } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useFormErrors } from '../hooks/useFormErrors';

// Styled Components for Add Product Page
const FormWrapper = styled.div`
  max-width: 650px;
  margin: 1rem auto;
`;

const FormCard = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: background-color 0.25s ease, border-color 0.25s ease;
`;

const FormHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const FormTitle = styled.h2`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.textHeading};
  margin-bottom: 0.35rem;
`;

const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.95rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textMain};
  margin-bottom: 0.4rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? '#dc2626' : theme.borderInput)};
  border-radius: 6px;
  background-color: ${({ $hasError, theme }) => ($hasError ? (theme.mode === 'dark' ? '#450a0a' : '#fef2f2') : theme.inputBg)};
  color: ${({ theme }) => theme.textMain};
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? '#dc2626' : theme.borderInput)};
  border-radius: 6px;
  background-color: ${({ $hasError, theme }) => ($hasError ? (theme.mode === 'dark' ? '#450a0a' : '#fef2f2') : theme.inputBg)};
  color: ${({ theme }) => theme.textMain};
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  border: 1px solid ${({ theme }) => theme.borderInput};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.textMain};
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const FormHint = styled.small`
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.8rem;
  margin-top: 0.3rem;
`;

const FieldError = styled.span`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  font-weight: 500;
`;

const FormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.75rem;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: #ffffff;
  border: none;
  padding: 0.65rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

// Complete CancelLink styled-component
const CancelLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.textMain};
  border: 1px solid ${({ theme }) => theme.borderInput};
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.iconBg};
    border-color: ${({ theme }) => theme.textMuted};
    color: ${({ theme }) => theme.textHeading};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const AlertSuccess = styled.div`
  padding: 0.85rem 1.25rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
`;

const AlertError = styled.div`
  padding: 0.85rem 1.25rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
`;

// AddProduct Component
function AddProduct() {
  const navigate = useNavigate();
  const { fetchProducts } = useContext(ProductContext);
  const { token } = useAuth();

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    icon: '📦'
  });

  // Reusable custom hook for validation errors
  const {
    errors: validationErrors,
    clearFieldError,
    setErrors: setValidationErrors,
    setApiErrors
  } = useFormErrors();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for field as user updates it
    clearFieldError(name);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
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
        if (data.errors && Array.isArray(data.errors)) {
          setApiErrors(data.errors);
          throw new Error('Please correct the validation errors below.');
        } else {
          throw new Error(data.message || 'Failed to add product.');
        }
      }

      if (fetchProducts) {
        fetchProducts();
      }

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
    <FormWrapper>
      <FormCard>
        <FormHeader>
          <FormTitle>➕ Add New Product</FormTitle>
          <FormSubtitle>Enter product details to add an item to the store catalog.</FormSubtitle>
        </FormHeader>

        {successMessage && <AlertSuccess>{successMessage}</AlertSuccess>}
        {serverError && <AlertError>⚠️ {serverError}</AlertError>}

        <form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <FormLabel htmlFor="name">Product Name *</FormLabel>
            <FormInput
              type="text"
              id="name"
              name="name"
              $hasError={Boolean(validationErrors.name)}
              placeholder="e.g. Ergonomic Office Chair"
              value={formData.name}
              onChange={handleChange}
            />
            {validationErrors.name && <FieldError>{validationErrors.name}</FieldError>}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <FormLabel htmlFor="price">Price ($) *</FormLabel>
              <FormInput
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0.01"
                $hasError={Boolean(validationErrors.price)}
                placeholder="e.g. 79.99"
                value={formData.price}
                onChange={handleChange}
              />
              {validationErrors.price && <FieldError>{validationErrors.price}</FieldError>}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="category">Category *</FormLabel>
              <FormSelect
                id="category"
                name="category"
                $hasError={Boolean(validationErrors.category)}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category...</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Fitness">Fitness</option>
                <option value="Accessories">Accessories</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
              </FormSelect>
              {validationErrors.category && <FieldError>{validationErrors.category}</FieldError>}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <FormLabel htmlFor="icon">Product Icon (Emoji)</FormLabel>
            <FormInput
              type="text"
              id="icon"
              name="icon"
              placeholder="e.g. 🎧, 💻, 📱, 📦"
              value={formData.icon}
              onChange={handleChange}
            />
            <FormHint>Icon displayed on the product card (defaults to 📦).</FormHint>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormTextarea
              id="description"
              name="description"
              rows="3"
              placeholder="Brief details about the product..."
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>

          <FormActions>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Product'}
            </SubmitButton>
            <CancelLink to="/">Cancel</CancelLink>
          </FormActions>
        </form>
      </FormCard>
    </FormWrapper>
  );
}

export default AddProduct;

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';

// Styled Components
const Card = styled.article`
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }
`;

const CardIcon = styled.div`
  background-color: ${({ theme }) => theme.iconBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  padding: 1.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: background-color 0.25s ease, border-color 0.25s ease;
`;

const CardBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  align-self: flex-start;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primaryLight};
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
`;

const CardTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textHeading};
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.4;
  margin-bottom: 1.25rem;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const CardPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textHeading};
`;

const BuyButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

// Admin-specific Action Buttons & Containers
const AdminToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background-color: ${({ theme }) => theme.iconBg};
  border-top: 1px dashed ${({ theme }) => theme.border};
`;

const EditButton = styled.button`
  flex: 1;
  background-color: transparent;
  color: ${({ theme }) => theme.textMain};
  border: 1px solid ${({ theme }) => theme.borderInput};
  border-radius: 6px;
  padding: 0.35rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.cardBg};
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #fca5a5;
  border-radius: 6px;
  padding: 0.35rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fee2e2;
    border-color: #ef4444;
  }
`;

// Inline Edit Form Elements
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.25rem;
`;

const EditInput = styled.input`
  padding: 0.45rem 0.65rem;
  font-size: 0.85rem;
  border: 1px solid ${({ theme }) => theme.borderInput};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.textMain};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const EditSelect = styled.select`
  padding: 0.45rem 0.65rem;
  font-size: 0.85rem;
  border: 1px solid ${({ theme }) => theme.borderInput};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.textMain};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SaveBtn = styled.button`
  flex: 1;
  background-color: #16a34a;
  color: #ffffff;
  border: none;
  padding: 0.45rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #15803d;
  }
`;

const CancelBtn = styled.button`
  flex: 1;
  background-color: transparent;
  color: ${({ theme }) => theme.textMuted};
  border: 1px solid ${({ theme }) => theme.borderInput};
  padding: 0.45rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.iconBg};
  }
`;

// Reusable Product Card Component with RBAC features
function ProductCard({ product }) {
  const { isAdmin, token } = useAuth();
  const { fetchProducts } = useContext(ProductContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description || '',
    icon: product.icon || '📦'
  });
  const [isSaving, setIsSaving] = useState(false);

  const formattedPrice = Number(product.price).toFixed(2);

  // Handle Admin Delete
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/products/${product.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Failed to delete product.');
        return;
      }

      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error while deleting product.');
    }
  };

  // Handle Admin Edit Save
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editData.name.trim(),
          price: parseFloat(editData.price),
          category: editData.category.trim(),
          description: editData.description.trim(),
          icon: editData.icon.trim() || '📦'
        })
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Failed to update product.');
        setIsSaving(false);
        return;
      }

      setIsEditing(false);
      fetchProducts();
    } catch (err) {
      console.error('Update error:', err);
      alert('Network error while updating product.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardIcon>{isEditing ? editData.icon || '📦' : product.icon || '📦'}</CardIcon>

      {isEditing ? (
        <EditForm onSubmit={handleSaveEdit}>
          <EditInput
            type="text"
            value={editData.name}
            placeholder="Product Name"
            required
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <EditInput
            type="number"
            step="0.01"
            min="0.01"
            value={editData.price}
            placeholder="Price"
            required
            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
          />
          <EditSelect
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Fitness">Fitness</option>
            <option value="Accessories">Accessories</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </EditSelect>
          <EditInput
            type="text"
            value={editData.icon}
            placeholder="Icon (Emoji)"
            onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
          />
          <EditInput
            type="text"
            value={editData.description}
            placeholder="Description"
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
          <EditActions>
            <SaveBtn type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </SaveBtn>
            <CancelBtn type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </CancelBtn>
          </EditActions>
        </EditForm>
      ) : (
        <CardBody>
          <CategoryBadge>{product.category}</CategoryBadge>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description || ''}</CardDescription>
          <CardFooter>
            <CardPrice>${formattedPrice}</CardPrice>
            <BuyButton
              type="button"
              onClick={() => alert(`Added ${product.name} to cart!`)}
            >
              Buy Now
            </BuyButton>
          </CardFooter>
        </CardBody>
      )}

      {/* Role-Based: Only Admin can view Edit and Delete actions */}
      {isAdmin && !isEditing && (
        <AdminToolbar>
          <EditButton
            type="button"
            onClick={() => setIsEditing(true)}
            title="Edit this product (Admin only)"
          >
            ✏️ Edit
          </EditButton>
          <DeleteButton
            type="button"
            onClick={handleDelete}
            title="Delete this product (Admin only)"
          >
            🗑️ Delete
          </DeleteButton>
        </AdminToolbar>
      )}
    </Card>
  );
}

export default ProductCard;

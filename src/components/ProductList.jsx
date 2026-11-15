import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';

// Styled animations and components
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  gap: 1rem;
  color: ${({ theme }) => theme.textMuted};
  font-size: 1rem;
`;

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border: 4px solid ${({ theme }) => theme.border};
  border-top-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const ErrorContainer = styled.div`
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
  padding: 1.5rem;
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const ErrorText = styled.p`
  color: #b91c1c;
  font-size: 1rem;
  font-weight: 500;
`;

const RetryButton = styled.button`
  background-color: #b91c1c;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #991b1b;
  }
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.textMuted};
  font-size: 1.1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

// ProductList Component
function ProductList() {
  const { filteredProducts, loading, error, searchTerm, fetchProducts } = useContext(ProductContext);

  // 1. Loading State
  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
        <p>Loading products...</p>
      </SpinnerContainer>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>⚠️ {error}</ErrorText>
        <RetryButton type="button" onClick={fetchProducts}>
          Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }

  // 3. Empty State
  if (filteredProducts.length === 0) {
    return (
      <EmptyContainer>
        <EmptyText>
          {searchTerm
            ? `No products found matching "${searchTerm}".`
            : 'No products available in the database.'}
        </EmptyText>
      </EmptyContainer>
    );
  }

  // 4. Products Grid
  return (
    <Grid>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}

export default ProductList;

import React from 'react';
import styled from 'styled-components';

// Styled Components consuming theme colors
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
  padding: 2rem;
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

// Reusable Product Card Component with styled-components
function ProductCard({ product }) {
  const formattedPrice = Number(product.price).toFixed(2);

  return (
    <Card>
      <CardIcon>{product.icon || '📦'}</CardIcon>
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
    </Card>
  );
}

export default ProductCard;

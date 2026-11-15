import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from '../context/ProductContext';

// Styled Components for SearchBar
const SearchWrapper = styled.div`
  max-width: 550px;
  margin: 0 auto 2.5rem;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderInput};
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.25s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const SearchIcon = styled.span`
  font-size: 1.1rem;
  margin-right: 0.5rem;
  opacity: 0.7;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textMain};
  background: transparent;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textMuted};
  font-size: 1rem;
  cursor: pointer;
  padding: 0 0.25rem;
  border-radius: 50%;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.textHeading};
  }
`;

function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(ProductContext);

  return (
    <SearchWrapper>
      <SearchBox>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <ClearButton
            type="button"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            ✕
          </ClearButton>
        )}
      </SearchBox>
    </SearchWrapper>
  );
}

export default SearchBar;

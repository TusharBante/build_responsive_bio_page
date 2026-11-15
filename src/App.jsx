import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

// Styled Components for Layout & Navigation
const AppContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.navbarBg};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: 2rem;
  transition: background-color 0.25s ease, border-color 0.25s ease;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const NavBrand = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textHeading};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const NavLinkItem = styled(Link)`
  text-decoration: none;
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.textMuted)};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.primaryLight : 'transparent')};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
  font-size: 0.95rem;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.iconBg};
  }
`;

const ThemeToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: ${({ theme }) => theme.toggleBg};
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.toggleText};
  padding: 0.45rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.03);
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.textHeading};
  margin-bottom: 0.5rem;
  transition: color 0.25s ease;
`;

const HeaderSubtitle = styled.p`
  color: ${({ theme }) => theme.textMuted};
  font-size: 1rem;
  transition: color 0.25s ease;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 3.5rem;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.875rem;
  transition: color 0.25s ease;
`;

// Top Navigation Bar Component with Theme Toggle
function Navigation() {
  const location = useLocation();
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Navbar>
      <NavBrand to="/">🛍️ ProductStore</NavBrand>
      <NavRightSection>
        <NavLinks>
          <NavLinkItem to="/" $isActive={location.pathname === '/'}>
            Catalog
          </NavLinkItem>
          <NavLinkItem to="/add-product" $isActive={location.pathname === '/add-product'}>
            ➕ Add Product
          </NavLinkItem>
        </NavLinks>
        <ThemeToggleBtn
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {themeMode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </ThemeToggleBtn>
      </NavRightSection>
    </Navbar>
  );
}

// Catalog View (Home Route)
function CatalogPage() {
  return (
    <>
      <Header>
        <HeaderTitle>Product Catalog</HeaderTitle>
        <HeaderSubtitle>
          React Context API &bull; styled-components &bull; Express API &bull; MySQL Database
        </HeaderSubtitle>
      </Header>
      <SearchBar />
      <ProductList />
    </>
  );
}

// Main App Layout wrapped in ThemeProvider & ProductProvider
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ProductProvider>
          <AppContainer>
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/add-product" element={<AddProduct />} />
              </Routes>
            </main>
            <Footer>
              <p>Simple React &bull; styled-components &bull; Express &bull; MySQL Application</p>
            </Footer>
          </AppContainer>
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

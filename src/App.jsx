import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Styled Components for Layout
const AppContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
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

// Catalog Page Component (Home Route)
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

// Main App Layout wrapped in ThemeProvider, AuthProvider & ProductProvider
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <AppContainer>
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<CatalogPage />} />
                  <Route
                    path="/add-product"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AddProduct />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<CatalogPage />} />
                </Routes>
              </main>
              <Footer>
                <p>Simple React &bull; JWT Auth &bull; styled-components &bull; Express &bull; MySQL Application</p>
              </Footer>
            </AppContainer>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

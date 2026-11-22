import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

// Styled Components for Navigation
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

  @media (max-width: 768px) {
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
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const NavRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
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

const UserBadge = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textMuted};
  background-color: ${({ theme }) => theme.iconBg};
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const RoleTag = styled.strong`
  color: ${({ $isAdmin, theme }) => ($isAdmin ? '#16a34a' : theme.primary)};
  text-transform: capitalize;
`;

const AuthBtn = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.borderInput};
  color: ${({ theme }) => theme.textMain};
  padding: 0.45rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.iconBg};
    border-color: ${({ theme }) => theme.textMuted};
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
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.03);
  }
`;

// Navigation Component with Role-Based Access Control
function Navigation() {
  const location = useLocation();
  const { themeMode, toggleTheme } = useTheme();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <Navbar>
      <NavBrand to="/">🛍️ ProductStore</NavBrand>
      <NavRightSection>
        <NavLinks>
          <NavLinkItem to="/" $isActive={location.pathname === '/'}>
            Catalog
          </NavLinkItem>

          {/* Role-Based: Only Admin can see the Add Product navigation link */}
          {isAdmin && (
            <NavLinkItem to="/add-product" $isActive={location.pathname === '/add-product'}>
              ➕ Add Product
            </NavLinkItem>
          )}

          {!isAuthenticated ? (
            <NavLinkItem to="/login" $isActive={location.pathname === '/login'}>
              🔑 Login
            </NavLinkItem>
          ) : (
            <>
              <UserBadge title={user?.email}>
                👤 {user?.name || 'User'} (<RoleTag $isAdmin={isAdmin}>{user?.role || 'user'}</RoleTag>)
              </UserBadge>
              <AuthBtn type="button" onClick={logout} title="Sign Out">
                Sign Out
              </AuthBtn>
            </>
          )}
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

export default Navigation;

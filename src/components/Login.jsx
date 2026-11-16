import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useFormErrors } from '../hooks/useFormErrors';

// Styled Components for Login Page
const LoginWrapper = styled.div`
  max-width: 480px;
  margin: 2rem auto;
`;

const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2.25rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: background-color 0.25s ease, border-color 0.25s ease;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h2`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.textHeading};
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.95rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textMain};
  margin-bottom: 0.4rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? '#dc2626' : theme.borderInput)};
  border-radius: 6px;
  background-color: ${({ $hasError, theme }) =>
    $hasError ? (theme.mode === 'dark' ? '#450a0a' : '#fef2f2') : theme.inputBg};
  color: ${({ theme }) => theme.textMain};
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const FieldError = styled.span`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.35rem;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: #ffffff;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
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

const DemoCredentialsBox = styled.div`
  margin-top: 1.75rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.iconBg};
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.4;
`;

// Login Component
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    errors: validationErrors,
    setErrors: setValidationErrors,
    clearFieldError,
    setApiErrors
  } = useFormErrors();

  // Validate form inputs before submission
  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long.';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          setApiErrors(data.errors);
          throw new Error('Please fix the errors indicated below.');
        } else {
          throw new Error(data.message || 'Login failed. Please check your credentials.');
        }
      }

      // Store JWT token and user info via AuthContext (saves to localStorage)
      login(data.token, data.user);

      setSuccessMessage('🎉 Login successful! Redirecting...');

      // Redirect user to their intended destination or default to /add-product
      const destination = location.state?.from?.pathname || '/add-product';
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setServerError(err.message || 'Unable to log in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <LoginHeader>
          <LoginTitle>🔐 Account Login</LoginTitle>
          <LoginSubtitle>Sign in to access and manage products</LoginSubtitle>
        </LoginHeader>

        {successMessage && <AlertSuccess>{successMessage}</AlertSuccess>}
        {serverError && <AlertError>⚠️ {serverError}</AlertError>}

        <form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <FormInput
              type="email"
              id="email"
              name="email"
              placeholder="admin@example.com"
              value={email}
              $hasError={Boolean(validationErrors.email)}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError('email');
              }}
            />
            {validationErrors.email && <FieldError>{validationErrors.email}</FieldError>}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              $hasError={Boolean(validationErrors.password)}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError('password');
              }}
            />
            {validationErrors.password && <FieldError>{validationErrors.password}</FieldError>}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
        </form>

        <DemoCredentialsBox>
          <strong>Demo Credentials:</strong><br />
          Email: <code>admin@example.com</code><br />
          Password: <code>admin123</code> (or any password &ge; 6 characters)
        </DemoCredentialsBox>
      </LoginCard>
    </LoginWrapper>
  );
}

export default Login;

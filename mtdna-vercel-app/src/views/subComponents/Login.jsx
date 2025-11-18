import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let isValid = true;
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would implement your authentication logic
      console.log('Form submitted:', { email, password, rememberMe, isRegistering });
      
      // Example API call to your backend (commented out)
      /*
      const endpoint = isRegistering ? '/api/register' : '/api/login';
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Handle successful login/registration
            window.location.href = '/dashboard';
          } else {
            // Handle errors
            console.error(data.message);
          }
        })
        .catch(error => console.error('Authentication error:', error));
      */
    }
  };

  const handleGoogleLogin = () => {
    // Here you would implement Google OAuth authentication
    console.log('Google login clicked');
    
    // Example implementation using Google OAuth (commented out)
    /*
    // This requires setting up Google OAuth in your project
    // and including the Google Sign-In SDK
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signIn().then(
      (googleUser) => {
        const idToken = googleUser.getAuthResponse().id_token;
        
        // Send the token to your backend for verification
        fetch('/api/google-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: idToken })
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              window.location.href = '/dashboard';
            }
          })
          .catch(error => console.error('Google authentication error:', error));
      },
      (error) => {
        console.error('Google Sign-In Error:', error);
      }
    );
    */
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    // Clear form errors when switching modes
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
          <p>
            {isRegistering
              ? 'Sign up to join the mtDNA Project'
              : 'Sign in to access your mtDNA Project account'}
          </p>
        </div>

        <div className="social-login">
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
              alt="Google Logo" 
              className="google-icon" 
            />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError ? 'error' : ''}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? 'error' : ''}
              placeholder={isRegistering ? 'Create a password' : 'Enter your password'}
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>

          {!isRegistering && (
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" className="login-button">
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account?"}
            <button className="toggle-mode" onClick={toggleMode}>
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
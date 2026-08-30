import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css'
import { useAuth } from "../../components/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stop the browser's default submit (page reload)

    if (username.length == 0) {
      setError('Empty username.');
      return;
    }
    if (password.length == 0) {
      setError('Empty password.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    let numUpper = 0;
    let numLower = 0;
    let numDigit = 0;
    let hasSymbol = password.search('/[\!\@\#\$\%\^\&\*]/');
    for (const char of password) {
      numLower += Number(char >= 'a' && char <= 'z');
      numUpper += Number(char >= 'A' && char <= 'Z');
      numDigit += Number(char >= '0' && char <= '9');
    }

    if (numUpper == 0) {
      setError('Password must contain uppercase character(s).');
      return;
    }
    if (numLower == 0) {
      setError('Password must contain lowercase character(s).');
      return;
    }
    if (numDigit == 0) {
      setError('Password must contain a digit.');
      return;
    }

    if (!hasSymbol) {
      setError('Password must contain a symbol.');
      return;
    }

    if (passwordConfirmation != password) {
      setError('Passwords must match.');
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    navigate('/login');
  };

  return (
    <div className="form-container">
      <form className='login-form' onSubmit={handleSubmit}>
        <h1>Register</h1>

        <label htmlFor="username">Username:</label>
        <input
          name='username'
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          name='password'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="password-confirmation">Confirm Password:</label>
        <input
          name='password-confirmation'
          type="password"
          id="password-confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        {error && <p className="error" data-testid='error-message'>{error}</p>}

        <button name="log in" type="submit">Log in</button>

        <p>Already have an account?<Link to='/login' style={{ display: "inline" }}>Login now</Link></p>

      </form>
    </div>

  );
}
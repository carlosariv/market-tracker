import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css'
import { useAuth } from "../../components/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stop the browser's default submit (page reload)

    let authenticated = login(username, password);

    if (authenticated) {
      navigate('/markets')
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="form-container">
      <form className='login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Log in</button>

        <p>Don't have an account?<Link to='/register' style={{ display: "inline" }}>Register now</Link></p>
      </form>
    </div>
    
  );
}
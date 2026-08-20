import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stop the browser's default submit (page reload)

    if (username === "admin" && password === "admin") {
      localStorage.setItem("authenticated", "true");
      navigate('/markets')
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="form-container">
        <form className = 'login-form' onSubmit={handleSubmit}>
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
    </form>
    </div>
    
  );
}
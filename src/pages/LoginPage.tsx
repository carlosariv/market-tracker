import { useState } from "react";


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        // Hardcoded login for now
        if (username == "admin") {

        } else {
            // Alert to incorrect password
        }

        if (password == "admin") {

        } else {
            // Alert to incorrect password
        }
    }
    return (
        <>
            <label for="username">Username:</label>
            <input 
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}>
            </input>
            <label for="password" name="username">password:</label>
            <input 
                type="passord" 
                id="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
            </input>
        </>
    );
}
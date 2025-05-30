// LoginWithMagicLink.js
import React, { useState } from "react";
import { Descope } from '@descope/web-js-sdk';

const projectId = "P2xmZ6o36U02wn4PDWZ59KoixPcg";
const descope = Descope({ projectId });

export default function LoginWithMagicLink({ onLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setMessage("Sending magic link...");
      await descope.magicLink.signIn.email(email, {
        redirectUrl: window.location.href,
      });
      setMessage("Magic link sent! Check your email.");
    } catch (err) {
      setMessage("Error sending magic link.");
    }
  };

  return (
    <div>
      <h3>Login to Escape Room</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Magic Link</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

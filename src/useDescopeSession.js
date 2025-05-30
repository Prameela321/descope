// useDescopeSession.js
import { useEffect, useState } from "react";
import { Descope } from '@descope/web-js-sdk';

const projectId = "P2xmZ6o36U02wn4PDWZ59KoixPcg";
const descope = Descope({ projectId });

export function useDescopeSession() {
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    async function exchangeToken() {
      try {
        const { sessionJwt } = await descope.exchange();
        if (sessionJwt) {
          setSessionToken(sessionJwt);
        }
      } catch (e) {
        console.error("Failed to exchange token", e);
      }
    }

    exchangeToken();
  }, []);

  return sessionToken;
}

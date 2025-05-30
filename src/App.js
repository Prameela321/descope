import React, { useEffect, useState, useCallback } from "react";
import { useDescope, useSession, useUser } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'
import { getSessionToken } from '@descope/react-sdk';
import { sendMessage } from "./api/data";

function App() {
    const { isAuthenticated, isSessionLoading } = useSession()
    const { user, isUserLoading } = useUser()
    const { logout } = useDescope()
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [tokenval,setTokenVal] = useState(null);
    const [location,setLocation] = useState(null);

    const exampleFetchCall = async () => {
        const sessionToken = getSessionToken();
		/*
        created backend api in src/api/data.js
        which is a replication of  hosted backend to test it locally with custom jwt claim
        for newly created project : P2xmZ6o36U02wn4PDWZ59KoixPcg




            const response = sendMessage(sessionToken);
            console.log(response,"response");
            setData(response.body);
         */


        if (!sessionToken) {
            console.log('No session token available');
            return;
        }

        try {
            const response = await fetch(
                "https://descope-escape-room.com/api/data", 
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        'x-project-id': 'P2xmZ6o36U02wn4PDWZ59KoixPcg',
                        'authorization': `Bearer ${sessionToken}`,
                    },
                }
            );
            const json = await response.json();
            if (json.body.startsWith("Error")) {
                throw new Error(json.body);
            }
            setData(json.body);
        } catch (err) {
            setError(err.message);
        }
    }

    const handleLogout = useCallback(() => {
        logout()
    }, [logout])

    // Call API when user becomes authenticated
    useEffect(() => {
        if (isAuthenticated && !isSessionLoading && !isUserLoading) {
            exampleFetchCall();
        }
    }, [isAuthenticated, isSessionLoading, isUserLoading]);

    return <>
        {!isAuthenticated &&
            (
                <Descope
                    flowId="sign-up-or-in"
                    onSuccess={(e) => {
                        console.log(e.detail.user);
                        // console.log("testing");
                    }}
                    onError={(e) => console.log('Could not log in!')}
                />
            )
        }

        {
            (isSessionLoading || isUserLoading) && <p>Loading...</p>
        }

        {!isUserLoading && isAuthenticated &&
            (
                <>
                    <p>Hello {user.name}</p>
                    <p>Location : {data}</p>
                    <button onClick={handleLogout}>Logout</button>
                    {data && <div>Data: {data}</div>}
                    {error && <div>Error: {error}</div>}
                </>
            )
        }
    </>;
}

export default App;
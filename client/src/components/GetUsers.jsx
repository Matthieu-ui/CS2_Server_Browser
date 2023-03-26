import React, { useState, useEffect } from "react";
const VITE_APP_STEAM_API_KEY = process.env.VITE_APP_STEAM_API_KEY;

// search and return personaname
// The player's persona name (display name)
// Example URL: http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=XXXXXXXXXXXXXXXXXXXXXXX&steamids=76561197960435530

// get users from steam api



const GetUsers = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {

            const response = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${VITE_APP_STEAM_API_KEY}&steamids=76561197960435530`);
            const jsonData = await response.json();

            setUsers(jsonData);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
<div>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Personaname</th>
                        <th>Realname</th>
                        <th>Profileurl</th>
                        <th>Avatar</th>
              </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.steamid}>
                            <td>{user.personaname}</td>
                            <td>{user.realname}</td>
                            <td>{user.profileurl}</td>
                            <td>{user.avatar}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
</div>
    )
}

export default GetUsers;
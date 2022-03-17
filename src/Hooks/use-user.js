import { useState } from "react";

export default function useUser(){

    const [userId, SetUserId] = useState("");
    const [username, SetUsername] = useState("");
    const [isAdmin, SetIsAdmin] = useState("");
    const [isProjectManager, SetIsProjectManager] = useState("");

    return { userId, SetUserId, username, SetUsername, isAdmin, SetIsAdmin, isProjectManager, SetIsProjectManager } 
}
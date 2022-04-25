import { useState } from "react";

export default function useUser(){

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [isProjectManager, setIsProjectManager] = useState("");
    const [isSpecialist, setIsSpecialist] = useState("");
    const [fullName, setFullName] = useState("");
    const [userItems, setUserItems] = useState("");

    return { userId, setUserId, username, setUsername, isAdmin, setIsAdmin, isProjectManager, setIsProjectManager, isSpecialist, setIsSpecialist, fullName, setFullName, userItems, setUserItems } 
}
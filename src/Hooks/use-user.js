import { useState } from "react";

export default function checkItems(){

    const [userId, SetUserId] = useState("");
    const [username, SetUsername] = useState("");
    const [isAdmin, SetIsAdmin] = useState("");


    
    return { userId, SetUserId, username, SetUsername, isAdmin, SetIsAdmin } 
}
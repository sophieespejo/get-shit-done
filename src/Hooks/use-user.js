import { useState } from "react";

export default function useUser(){

    const [userItems, setUserItems] = useState({
        Id : 0,
        Username : "",
        FullName : "",
        Salt: "",
        Hash: "",
        IsAdmin: false,
        IsProjectManager: false,
        IsSpecialist: false

    });
    
    return { userItems, setUserItems } 
}
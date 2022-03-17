import { useState } from "react";

export default function checkItems(){

    const [username, SetUsername] = useState("");
    
    return { username, SetUsername } 
}
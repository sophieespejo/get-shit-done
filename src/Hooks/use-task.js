import { useState } from "react";

export default function useTask(){

    // const [projectId, setProjectId] = useState("");
    // const [username, setUsername] = useState("");
    // const [isAdmin, setIsAdmin] = useState("");
    // const [isProjectManager, setIsProjectManager] = useState("");
    // const [isSpecialist, setIsSpecialist] = useState("");
    // const [fullName, setFullName] = useState("");
    const [allTasks, setAllTasks] = useState("");
    const [statusBar, setStatusBar] = useState(0);

    return { allTasks, setAllTasks, statusBar, setStatusBar} 
}
import { useState } from "react";

export default function useProject(){

    // const [projectId, setProjectId] = useState("");
    // const [username, setUsername] = useState("");
    // const [isAdmin, setIsAdmin] = useState("");
    // const [isProjectManager, setIsProjectManager] = useState("");
    // const [isSpecialist, setIsSpecialist] = useState("");
    // const [fullName, setFullName] = useState("");
    const [clickedProject, setClickedProject] = useState("");
    const [currentProjects, setCurrentProjects] = useState([]);

    return { clickedProject, setClickedProject, currentProjects, setCurrentProjects} 
}
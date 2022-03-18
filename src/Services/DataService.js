let successfulCreateAcct = false;
let userData = {};

function checkToken(){
    let result = false;
    let lsData = localStorage.getItem('Token');
    if(lsData && lsData != null)
    {
        result = true;
    }
    return result;
}

////These are the endpoints for User


//Create Account
async function createAccount(createdUser){
    //wait for fetch to for api
    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/User/AddUser', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(createdUser)
    });

    //check status of request
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;
    // if(data)
    // {
    //     successfulCreateAcct = true;
    // }
    // else{
    //     successfulCreateAcct = false;
    //     alert("Unable to create an account. Please try again");
    // }
    // return successfulCreateAcct;
}

//Login
async function logIn(userInfo){

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/User/Login', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userInfo)
    });
    //check status of request
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        alert("Username and/or Password is incorrect. Please try again or create a new account.");
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}

//GetAllUsers
async function getAllUsers(){
    let res = await fetch("https://dylanmcfarlinbackend.azurewebsites.net/User/GetAllUsers");
    let data = await res.json();
    // console.log(data);
    return data;
}

//Get User By Username
async function getUserByUsername(Username) {
    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/User/UserByUsername/${Username}`);
    let data = await res.json();
    // console.log(data);
    return data;
}

//Update User
async function updateUser(userData)
{
    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/User/UpdateUser/${userData.Username}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;
}

//Delete User Account, need clarification with userToDelete and what data is being passed in, not sure if its userName?
async function deleteUser(userData)
{
    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/User/DeleteUser/${userData.Username}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;
}

//UpdateUserRole, need clarification

async function updateUserRole(userData, UserName, IsAdmin, isProjectManager, isSpecialist) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/User/DeleteUser/${UserName}/${IsAdmin}/${isProjectManager}/${isSpecialist}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;
}

//-----------------------------------------------------------------------------------------------------
//These are the endpoints for ProjectItem

//Add a new Project Item
async function AddProjectItem(NewProject) {

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/AddProjectItem', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(NewProject)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}

//Get all Project Items

async function getAllProjectItems(){

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetAllProjectItems');
    let data = await res.json();
    return data;
}

//Get ProjectItem by Specific Id


async function getProjectItemById(Id){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemById/${Id}`);
    let data = await res.json();
    return data;
}

// Get a LIST of ProjectItems by a specific userId (PMs)

async function getProjectItemsByUserId(UserId){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemsByUserId/${UserId}`);
    let data = await res.json();
    return data;
}

//Get Project Item by Title of a ProjectItem (Specialist)
async function getProjectItemByTitle(Title){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemByTitle/${Title}`);
    let data = await res.json();
    return data;
}

//Get a ProjectItem by the descrioption of a ProjectItem
async function getProjectItemByDescription(Description){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemByDescription/${Description}`);
    let data = await res.json();
    return data;
}

// Get a ProjectItem by the dateCreated of a ProjectItem
async function getProjectItemByDateCreated(DateCreated){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemByDateCreated/${DateCreated}`);
    let data = await res.json();
    return data;
}

// Get a ProjectItem by the dueDate of a ProjectItem 
async function getProjectItemByDueDate(DueDate){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemByDueDate/${DueDate}`);
    let data = await res.json();
    return data;
}

// Get all ProjectItems by status. (E.g "GetProjectItemByStatus/toDo")
async function getProjectItemsByStatus(Status){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemsByStatus/${Status}`);
    let data = await res.json();
    return data;
}

// Get a LIST of all ProjectItems you are a member of by memberId
async function getProjectItemsByAMemberId(MemberId){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemsByAMemberId/${MemberId}`);
    let data = await res.json();
    return data;
}

// Get a LIST of all ProjectItems you are a member of by memberUsername
async function getProjectItemsByAMemberUsername(MemberUsername){

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetProjectItemsByAMemberUsername/${MemberUsername}`);
    let data = await res.json();
    return data;
}

// Get all soft deleted ProjectItems
async function getDeletedProjectItems(){

    let res = await fetch("https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetDeletedProjectItems");
    let data = await res.json();
    return data;
}

 // Get all archived ProjectItems
 async function getArchivedProjectItems(){

    let res = await fetch("https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/GetArchivedProjectItems");
    let data = await res.json();
    return data;
}

// This is the endpoint front end will use to push a new member to the 
// string[] MembersUsername array.
// 
// This will update the entire project, so it will take in a model that must contain
// every required field to make the ProjectItemModel.cs
//To The same as NewProject

async function updateProjectItem(UpdatedProject) {

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/UpdateProjectItem', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(UpdatedProject)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}

//Soft Delete A ProjectItem
async function deleteProjectItem(DeletedProject) {

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/ProjectItem/DeleteProjectItem', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(DeletedProject)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}









//--------------------------------------------------------------------------------------------------------------------
//These are the endpoints for TaskItem

//Add A New Task Item
async function AddTaskItem(NewTaskItem) {

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/AddTaskItem', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(NewTaskItem)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}



//Get All Task Items
async function getAllTaskItems(){

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetAllTaskItems');
    let data = await res.json();
    return data;
}

//Get a TaskItem by ID
async function getTaskItemsById(ID) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemsById/${ID}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a List of TaskItems by the parent ProjectItem Id, need clarification on what to send over
async function getTaskItemsByProjectID(ProjectID) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemsByProjectID/${ProjectID}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a taskItem by the Title of TaskItem
async function getTaskItemByTitle(Title) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemByTitle/${Title}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a TaskItem by the description of a TaskItem
async function getTaskItemByDescription(Description) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemByDescription/${Description}`);
    let data = await res.json();
    console.log(data);
    return data;

}

//Get a List of all TaskItems by DateCreated
async function getTaskItemsByDateCreated(DateCreated) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemsByDateCreated/${DateCreated}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a List of all TaskItems by DueDate
async function getTaskItemsByDueDate(DueDate) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemsByDueDate/${DueDate}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a list of TaskItems by Priority
async function getTaskItemsByPrority(Priority) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemsByPriority/${Priority}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a list of all TaskItems by specific Assignee
async function getTaskItemsByAssignee(Assignee) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemsByAssignee/${Assignee}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a List of all TaskItems by Status
async function getTaskItemsByStatus(Status) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/GetTaskItemsByStatus/${Status}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//UpdateTaskItem
//Whenever we update and adding, we pass in an object
async function updateTaskItem(TaskUpdate) {

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/UpdateTaskItem', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(TaskUpdate)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}




//Soft Delete a TaskItem
async function deleteTaskItem(TaskDelete) {

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/TaskItem/DeleteTaskItem', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(TaskDelete)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}










export { createAccount, checkToken, getAllUsers, logIn, 
    deleteUser, getUserByUsername, updateUser, updateUserRole, 
    AddProjectItem, getAllProjectItems, getProjectItemById, getProjectItemsByUserId,
    getProjectItemByTitle, getProjectItemByDescription, getProjectItemByDateCreated,
    getProjectItemByDueDate, getProjectItemsByStatus, getProjectItemsByAMemberId,
    getProjectItemsByAMemberUsername, getDeletedProjectItems, getArchivedProjectItems,
    updateProjectItem, deleteProjectItem, AddTaskItem, getAllTaskItems, getTaskItemsById,
    getTaskItemsByProjectID, getTaskItemByTitle, getTaskItemByDescription, getTaskItemsByDateCreated,
    getTaskItemsByDueDate, getTaskItemsByPrority, getTaskItemsByAssignee, getTaskItemsByStatus,
    updateTaskItem, deleteTaskItem

}

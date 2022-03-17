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

//Add a new Project Item





//--------------------------------------------------------------------------------------------------------------------

//Add A New Task Item



//Get All Task Items
async function getAllTaskItems(){

    let res = await fetch('https://dylanmcfarlinbackend.azurewebsites.net/User/GetAllTaskItems');
    let data = await res.json();
    return data;
}

//Get a TaskItem by ID
async function getTaskItemsById(UserID) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/User/GetTaskItemsById/${UserID}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a List of TaskItems by the parent ProjectItem Id, need clarification on what to send over
async function getTaskItemsByProjectID(ProjectID) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/Users/GetTaskItemsByProjectID/${ProjectID}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a taskItem by the Title of TaskItem
async function getTaskItemByTitle(Title) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/Users/GetTaskItemByTitle/${Title}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a TaskItem by the description of a TaskItem
async function getTaskItemByDescription(Description) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/Users/GetTaskItemByDescription/${Description}`);
    let data = await res.json();
    console.log(data);
    return data;

}

//Get a List of all TaskItems by DateCreated
async function getTaskItemsByDateCreated(DateCreated) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/Users/GetTaskItemsByDateCreated/${DateCreated}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a List of all TaskItems by DueDate
async function getTaskItemsByDueDate(DueDate) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/Users/GetTaskItemsByDueDate/${DueDate}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a list of TaskItems by Priority
async function getTaskItemsByPrority(Priority) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/Users/GetTaskItemsByPriority/${Priority}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a list of all TaskItems by specific Assignee
async function getTaskItemsByAssignee(Assignee) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/Users/GetTaskItemsByAssignee/${Assignee}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//Get a List of all TaskItems by Status
async function getTaskItemsByStatus(Status) {

    let res = await fetch(`https://dylanmcfarlinbackend.azurewebsites.net/Users/GetTaskItemsByStatus/${Status}`);
    let data = await res.json();
    console.log(data);
    return data;
}

//UpdateTaskItem




//Soft Delete a TaskItem











export { createAccount, checkToken, getAllUsers, logIn, deleteUser, getUserByUsername }

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

//Needs to be changed later
async function createAccount(createdUser){
    //wait for fetch to for api
    let res = await fetch('getshitdonebackend.database.windows.net/Users/AddUser', {
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
    
    if(data)
    {
        successfulCreateAcct = true;
    }
    else{
        successfulCreateAcct = false;
        alert("Unable to create an account. Please try again");
    }
    return successfulCreateAcct;
}

//Needs to be changed for Log in, check if works

async function logIn(userInfo){

    let res = await fetch('http://getshitdonebackend.database.windows.net/User/Login', {
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
    // console.log(data.token);
    // if(!data.token)
    // {
    //     successfulLogin = false;
    //     alert("unable to login");
    // }
    // else{
    //     successfulLogin = true;
    //     localStorage.setItem('Token', JSON.stringify(data.token));
    // }
    // console.log(successfulLogin);
    // return successfulLogin;
    return data;
}

//GetAllUsers
async function getAllUsers(){
    let res = await fetch(`http://getshitdonebackend.database.windows.net/Users/GetAllUsers`);
    let data = await res.json();
    console.log(data);
    return data;
}

export { createAccount, checkToken, getAllUsers, logIn }

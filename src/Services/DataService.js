function checkToken(){
    let result = false;
    let lsData = localStorage.getItem('Token');
    if(lsData && lsData != null)
    {
        result = true;
    }
    return result;
}

async function createAccount(createdUser){
    //wait for fetch to for api
    let res = await fetch('getshitdonebackend.database.windows.net/', {
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


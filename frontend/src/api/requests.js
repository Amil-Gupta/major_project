const { default: axios } = require("api/axios");
const { GET_ACCOUNT_URL, GET_STATEMENT_URL, GET_ALL_TRANSACTIONS_URL, DEPOSIT_URL, LOGIN_URL, CHANGE_PASSWORD_URL, CREATE_ACCOUNT_URL, TRANSFER_URL, WITHDRAWAL_URL } = require("constants/constants");

// ERROR HANDLING COMMON TO ALL REQUESTS
const commonErrorHandling = ({error, onError, disableAlertsOnResponse})=>{
    console.log(error)
    if(onError){
        onError(error);
    }
    if(disableAlertsOnResponse){
        if(!error?.response){
            alert(error?.message);
        }
    }
    else{
        alert(error?.response?.data?.message ?? error?.message);
    }
}

const loginRequest = async({accountId, password, onError, onSuccess, disableAlertsOnResponse})=>await axios.post(
    LOGIN_URL,
    JSON.stringify({accountId, password}),
    {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }    
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});

const createAccountRequest = async({name, password, onError, onSuccess, disableAlertsOnResponse})=>await axios.post(
    CREATE_ACCOUNT_URL,
    JSON.stringify({name, password}),
    {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});

const changePasswordRequest = async({token, oldPassword, newPassword, onError, onSuccess, disableAlertsOnResponse})=>await axios.post(
    CHANGE_PASSWORD_URL,
    JSON.stringify({oldPassword, newPassword}),
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token,
        },
        withCredentials: true
    }
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});

const getAccountRequest = async({token, onError, onSuccess, disableAlertsOnResponse})=>await axios.get(
    GET_ACCOUNT_URL,
    {
        headers: {
            Authorization: "Bearer "+token,
        }
    }
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});

const getStatementRequest = async({token, onError, onSuccess, disableAlertsOnResponse})=>await axios.get(
    GET_STATEMENT_URL,
    {
        headers: {
            Authorization: "Bearer "+token,
        }
    }
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});

const getAllTransactionsRequest = async({token, onError, onSuccess, disableAlertsOnResponse})=>await axios.get(
    GET_ALL_TRANSACTIONS_URL,
    {
        headers: {
            Authorization: "Bearer "+token,
        }
    }
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});;

const depositRequest = async({token, accountId, amountPaise, onError, onSuccess, disableAlertsOnResponse}) => await axios.post(
    DEPOSIT_URL,
    JSON.stringify({accountId, amountPaise}),
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token,
        },
    }    
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});;

const withdrawalRequest = async({token, accountId, amountPaise, onError, onSuccess, disableAlertsOnResponse})=>await axios.post(
    WITHDRAWAL_URL,
    JSON.stringify({accountId, amountPaise}),
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token,
        },
    }    
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});;

const transferRequest = async({token, toAccountId, amountPaise, onError, onSuccess, disableAlertsOnResponse})=>await axios.post(
    TRANSFER_URL,
    JSON.stringify({toAccountId, amountPaise}),
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token,
        },
    }    
).then((response)=>{
    if(onSuccess){
        onSuccess(response);
    }
}).catch((error)=>{
    commonErrorHandling({error, onError, disableAlertsOnResponse});
});;

export {
    loginRequest,
    createAccountRequest,
    changePasswordRequest,
    getAccountRequest,

    getStatementRequest,
    getAllTransactionsRequest,

    depositRequest,
    withdrawalRequest,
    transferRequest,
}
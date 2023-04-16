const { default: axios } = require("api/axios");
const { GET_ACCOUNT_URL, GET_STATEMENT_URL, GET_ALL_TRANSACTIONS_URL, DEPOSIT_URL, LOGIN_URL, CHANGE_PASSWORD_URL, CREATE_ACCOUNT_URL, TRANSFER_URL, WITHDRAWAL_URL } = require("constants/constants");

const loginRequest = async({accountId, password})=>await axios.post(
    LOGIN_URL,
    JSON.stringify({accountId, password}),
    {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }    
);

const createAccountRequest = async({name, password})=>await axios.post(
    CREATE_ACCOUNT_URL,
    JSON.stringify({name, password}),
    {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }
);

const changePasswordRequest = async({token, oldPassword, newPassword})=>await axios.post(
    CHANGE_PASSWORD_URL,
    JSON.stringify({oldPassword, newPassword}),
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token,
        },
        withCredentials: true
    }
);

const getAccountRequest = async({token})=>await axios.get(
    GET_ACCOUNT_URL,
    {
        headers: {
            Authorization: "Bearer "+token,
        }
    }
);

const getStatementRequest = async({token})=>await axios.get(
    GET_STATEMENT_URL,
    {
        headers: {
            Authorization: "Bearer "+token,
        }
    }
);

const getAllTransactionsRequest = async({token})=>await axios.get(
    GET_ALL_TRANSACTIONS_URL,
    {
        headers: {
            Authorization: "Bearer "+token,
        }
    }
);

const depositRequest = async({token, accountId, amountPaise}) => await axios.post(
    DEPOSIT_URL,
    JSON.stringify({accountId, amountPaise}),
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token,
        },
    }    
);

const withdrawalRequest = async({token, accountId, amountPaise})=>await axios.post(
    WITHDRAWAL_URL,
    JSON.stringify({accountId, amountPaise}),
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token,
        },
    }    
);

const transferRequest = async({token, toAccountId, amountPaise})=>await axios.post(
    TRANSFER_URL,
    JSON.stringify({toAccountId, amountPaise}),
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token,
        },
    }    
);

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
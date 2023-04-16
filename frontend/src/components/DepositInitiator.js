import AuthContext from "context/AuthProvider";
import LoadingContext from "context/LoadingProvider";
import { useState, useContext } from "react";
import DepositContext from "context/DepositProvider";
import useStyles from "styles/DepositInitiatorStyles";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { depositRequest } from "api/requests";

function DepositInitiator(){
    const classes = useStyles();

    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);
    const { setDeposit } = useContext(DepositContext);
    const { setLoading } = useContext(LoadingContext);
    
    const [ accountId, setAccountId ] = useState('');
    const [ amountRupees, setAmountRupees ] = useState('');
    const amountPaise = amountRupees ? (amountRupees * 100) : '';
    // const [ loading, setLoading ] = useState(false);

    const handleAccountIdUpdate = (e)=>{
        const newId = parseInt(e.target.value) > 0 ? e.target.value : '';
        setAccountId(newId);
    }
    const handleAmountRupeesUpdate = (e)=>{
        const newAmount = parseInt(e.target.value) > 0 ? e.target.value : '';
        setAmountRupees(newAmount);
    }

    const handleDeposit = (e)=>{
        e.preventDefault();
        setLoading(true);
        const token = auth?.token;
        const onError = (error)=>{
            if(error?.response?.status === 401){
                alert('Authorization expired. Please login again.');
                setAuth({});
            }
            else{
                setLoading(false);
            }
        }
        const onSuccess = (response)=>{
            const depositData = response?.data;
            setDeposit(depositData);
            setLoading(false);
            navigate('success', {replace: true})
        }

        depositRequest({token, accountId, amountPaise, onError, onSuccess});
    }

    return ( 
        <div className={classes.root}>
            <div className={classes.customerCard}>
                <span className={classes.heading}>
                    DEPOSIT
                </span>
                <div className={classes.avatarContainer}>
                    <Avatar
                        sx={{
                            bgcolor: 'greenyellow',
                            color: 'green',
                            width: '70%',
                            height: '70%',
                        }}
                    />
                </div>
                <div className={classes.depositForm}>
                    <div className={classes.entry}>
                        <label className={classes.label}>
                            Account no.
                        </label>
                        <input
                        id='account_no'
                        type = 'number' 
                        className={classes.input}
                        autoComplete='off'
                        onChange={handleAccountIdUpdate}
                        value={accountId}
                        />
                    </div>
                    <div className={classes.entry}>
                        <label className={classes.label}>
                            Deposit In ₹
                        </label>
                        <input
                        id='amount'
                        type = 'number' 
                        className={classes.input}
                        autoComplete='off'
                        onChange={handleAmountRupeesUpdate}
                        value={amountRupees}
                        />
                    </div>
                    <Button
                    className={classes.submitButton}
                    sx={{
                        color: 'white', 
                        backgroundColor: '#4b484c',
                        width: '100%',
                        margin: '1rem 0'
                        }}
                    onClick={handleDeposit}
                    disabled={!accountId.length || !amountRupees.length}
                    >
                        Record Deposit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DepositInitiator;
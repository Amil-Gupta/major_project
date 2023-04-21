import AuthContext from "context/AuthProvider";
import LoadingContext from "context/LoadingProvider";
import { useState, useContext } from "react";
import WithdrawalContext from "context/WithdrawalProvider";
import useStyles from "styles/WithdrawalInitiatorStyles";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { withdrawalRequest } from "api/requests";

function WithdrawalInitiator(){
    const classes = useStyles();

    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);
    const { setWithdrawal } = useContext(WithdrawalContext);
    const { setLoading } = useContext(LoadingContext);
    
    const [ accountId, setAccountId ] = useState('');
    const [ amountRupees, setAmountRupees ] = useState('');
    const amountPaise = amountRupees ? (-amountRupees * 100) : '';
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
                setLoading(false);
                navigate('/login',{replace:true});
            }
            setLoading(false);
        }
        const onSuccess = (response)=>{
            const withdrawalData = response?.data;
            setWithdrawal(withdrawalData);
            setLoading(false);
            navigate('success', {replace: true});
        }

        withdrawalRequest({token, accountId, amountPaise, onError, onSuccess});
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
                        bgcolor: 'pink',
                        color: 'crimson',
                        width: '70%',
                        height: '70%',
                    }}
                    />
                </div>
                <div className={classes.withdrawalForm}>
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
                            Withdrawal In ₹
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
                        Record Withdrawal
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default WithdrawalInitiator;
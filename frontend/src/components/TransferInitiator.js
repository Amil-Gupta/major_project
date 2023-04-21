import AuthContext from "context/AuthProvider";
import LoadingContext from "context/LoadingProvider";
import { useState, useContext } from "react";
import TransferContext from "context/TransferProvider";
import useStyles from "styles/TransferInitiatorStyles";
import { Grid, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { transferRequest } from "api/requests";

function TransferInitiator(){
    const classes = useStyles();

    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);
    const { setTransfer } = useContext(TransferContext);
    const { setLoading } = useContext(LoadingContext);
    
    const [ toAccountId, setToAccountId ] = useState('');
    const [ amountRupees, setAmountRupees ] = useState('');
    const amountPaise = amountRupees ? (amountRupees * 100) : '';
    // const [ loading, setLoading ] = useState(false);

    const handleAccountIdUpdate = (e)=>{
        const newId = parseInt(e.target.value) > 0 ? e.target.value : '';
        setToAccountId(newId);
    }
    const handleAmountRupeesUpdate = (e)=>{
        const newAmount = parseInt(e.target.value) > 0 ? e.target.value : '';
        setAmountRupees(newAmount);
    }

    const handleTransfer = (e)=>{
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
                const transferData = response?.data;
                setTransfer(transferData);
                setLoading(false);
                navigate('success', {replace: true})
            }

            transferRequest({token, toAccountId, amountPaise, onError, onSuccess});
    }

    const UserInfo = (props)=>{
        const name = props.name ? props.name : 'Anonymous';
        const accountNo = props.accountNo ? props.accountNo : '...';

        return(
            <div className={classes.userInfo}>
                <span className={classes.heading}>
                    {props.heading}
                </span>
                <Grid container>
                    <Grid item xs={4} md={12}>
                        <div className={classes.avatarContainer}>
                            <Avatar
                            sx={{
                                bgcolor: props.avatarBgcolor,
                                color: props.avatarColor,
                                width: '50%',
                                height: '50%',
                            }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={8} md={12}>
                        <div className={classes.details}>
                            <div className={classes.username}>
                                {name}
                            </div>
                            <div className={classes.accountNo}>
                                Account no.:&nbsp;
                                {accountNo}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const Sender = ()=>{
        const { id, name } = auth;

        return(
            <div className={classes.sender}>
                <UserInfo heading='FROM' name={name} accountNo={id} avatarBgcolor='khaki' avatarColor='lightcoral' />
            </div>
        );
    }

    const Receiver = ()=>{
        return(
            <div className={classes.receiver}>
                <UserInfo heading='TO' accountNo={toAccountId} avatarBgcolor='indigo' avatarColor='green' />
            </div>
        );
    }

    // const TransferForm = ()=>{
    //     return(
            
    //     );
    // }

    return ( 
        <div className={classes.root}>
            {/* <NavLink to='/customerConsole'>
                Transfer Screen
            </NavLink> */}
            {/* <LoadingOverlay show={loading} /> */}
            <Grid container>
                <Grid item xs={12} md={4}>
                    <Sender />
                </Grid>
                <Grid item xs={12} md={4}>        
                <div className={classes.transferFormContainer}>
                    <div className={classes.transferForm}>
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
                            value={toAccountId}
                            />
                        </div>
                        <div className={classes.entry}>
                            <label className={classes.label}>
                                Amount in ₹
                                {/* <FontAwesomeIcon icon={faInr} size='1x' /> */}
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
                            width: '100%',
                            color: 'white',
                            backgroundColor: 'grey',
                            margin: '.5rem 0',
                            border: '.1rem solid white'
                        }}
                        onClick={handleTransfer}
                        disabled={!toAccountId.length || !amountRupees.length}
                        >
                            Initiate Transfer
                        </Button>
                    </div>
                </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Receiver />
                </Grid>
            </Grid>
        </div>
    );
}

export default TransferInitiator;
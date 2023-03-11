import { Avatar, Grid, Button } from "@mui/material";
import AuthContext from "context/AuthProvider";
import { useState, useContext } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import useStyles from "styles/TransferScreenStyles";
import { faInr } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "api/axios";
import LoadingOverlay from "./LoadingOverlay";

const TRANSFER_URL = '/transfers';

function TransferScreen(props){
    const classes = useStyles();
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const TransferInitiator = ()=>{
        const [ toAccountId, setToAccountId ] = useState('');
        const [ amountRupees, setAmountRupees ] = useState('');
        const amountPaise = amountRupees ? (amountRupees * 100) : '';
        const [ success, setSuccess ] = useState(false);
        // const [ loading, setLoading ] = useState(false);

        const handleAccountIdUpdate = (e)=>{
            const newId = parseInt(e.target.value) > 0 ? e.target.value : '';
            setToAccountId(newId);
        }
        const handleAmountRupeesUpdate = (e)=>{
            const newAmount = parseInt(e.target.value) > 0 ? e.target.value : '';
            setAmountRupees(newAmount);
        }

        const handleTransfer = async(e)=>{
            e.preventDefault();
            try{
                props.setLoading(true);
                const token = auth?.token;
                const response = await axios.post(
                    TRANSFER_URL,
                    JSON.stringify({toAccountId, amountPaise}),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer "+token,
                        },
                    }    
                );
                console.log(response?.data);
                alert(`INR ${amountRupees} transferred to account no. ${toAccountId}`);
                setSuccess(true);
                props.setLoading(false);
            }catch(err){
                props.setLoading(false);
                console.log(err);
            }
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
            <div className={classes.TransferInitiator}>
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
                                    Amount in&nbsp;
                                    <FontAwesomeIcon icon={faInr} size='1x' />
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
                            onClick={handleTransfer}
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
    return(
        <div className={classes.root}>
            <Routes>
                <Route path='*' element={<TransferInitiator />} />
            </Routes>
        </div>
    )
}

export default TransferScreen;
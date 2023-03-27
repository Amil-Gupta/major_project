import axios from "api/axios";
import AuthContext from "context/AuthProvider";
import LoadingContext from "context/LoadingProvider";
import { useState, useContext } from "react";
import TransferContext from "context/TransferProvider";
import useStyles from "styles/TransferInitiatorStyles";
import { Grid, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TRANSFER_URL = '/transfers';
function TransferInitiator(){
    const classes = useStyles();

    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);
    const { transfer, setTransfer } = useContext(TransferContext);
    const { loading, setLoading, loadingColor, setLoadingColor } = useContext(LoadingContext);
    
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

    const handleTransfer = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
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
            const transferData = response?.data;
            setTransfer(transferData);
            // console.log(transferData);
            // alert(`INR ${amountRupees} transferred to account no. ${toAccountId}`);
            // let newBal = auth.balancePaise - amountPaise;
            // setAuth({...auth, balancePaise: newBal });
            setLoading(false);
            navigate('success', {replace: true})
        }catch(err){
            setLoading(false);
            // console.log(err);

            if(!err?.response){
                alert('No server response');
            }
            else{
                alert(err?.response?.data?.message);
            }
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
                            margin: '1rem 0',
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
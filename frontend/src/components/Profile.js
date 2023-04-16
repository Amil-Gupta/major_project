import { Avatar, Button, Grid } from "@mui/material";
import { changePasswordRequest, getAccountRequest } from "api/requests";
import AuthContext from "context/AuthProvider";
import { useContext, useState } from "react";
import useStyles from "styles/ProfileStyles";

function Profile(props) {
    const classes = useStyles();
    const { auth, setAuth } = useContext(AuthContext);
    const { name, id, balancePaise, admin } = auth;

    const DetailsAndFunctionalities = ()=>{
        const [changePassword, setChangePassword] = useState(false);

        const handleFormDisplayChange = ()=>{
            setChangePassword((changePassword)=>(!changePassword));
        }

        const handleBalanceRefresh = (e)=>{
            e.preventDefault();
            const {token} = auth;
            const onError = (error)=>{
                if(error?.response?.status === 401){
                    alert('Authorization expired. Please login again.');
                    setAuth({});
                }
            }
            const onSuccess = (response)=>{
                const userdata = response?.data;
                setAuth((auth)=>({...auth, ...userdata}));
            }

            getAccountRequest({token, onError, onSuccess, disableAlertsOnResponse:true});
        }

        const Details = ()=>{
            return(
            <div className={classes.details}>
                <div className={classes.entry}>
                    <div className={classes.label}>
                        Name
                    </div>
                    <div className={classes.value}>
                        {name}
                    </div>
                </div>
                <div className={classes.entry}>
                        <div className={classes.label}>
                            Account No.
                        </div>
                        <div className={classes.value}>
                            {id}
                        </div>
                </div>
                {!admin ? (
                    <div className={classes.entry}>
                        <div className={classes.label}>
                            Balance
                        </div>
                        <div className={classes.value}>
                            ₹ {balancePaise / 100}
                            <div
                            className={classes.balanceRefreshButton}
                            onClick={handleBalanceRefresh}
                            // sx={{
                            //     color: 'white',
                            //     backgroundColor: 'black',
                            //     fontSize: '1.3rem',
                            //     height: '70%',
                            // }}
                            >
                                ↻
                            </div>
                        </div>
                    </div>
                ):(<></>)}
            </div>
            )
        }

        const ChangePasswordForm = ()=>{
            const [oldPassword, setOldPassword] = useState('');
            const [newPassword, setNewPassword] = useState('');
            const [confirmPassword, setConfirmPassword] = useState('');

            const [oldPasswordErrors, setOldPasswordErrors] = useState([]);
            const [newPasswordErrors, setNewPasswordErrors] = useState([]);

            const confirmPasswordMatch = (newPassword === confirmPassword) ? true : false;

            const oldPasswordErrorComponent = (oldPasswordErrors.length) ? (
                <ul className={classes.error}>
                    {
                        oldPasswordErrors.map((error)=>(
                            <li key={error.code}>
                                {error.message}
                            </li>
                        ))
                    }
                </ul>
            ):(<></>);
            
            const newPasswordErrorComponent = (newPasswordErrors.length) ? (
                <ul className={classes.error}>
                    {
                        newPasswordErrors.map((error)=>(
                            <li key={error.code}>
                                {error.message}
                            </li>
                        ))
                    }
                </ul>
            ):(<></>);
        
            const confirmPasswordErrorComponent = (confirmPasswordMatch) ? (<></>) : (
                <ul className={classes.error}>
                    <li key='mismatchError'>
                        passwords must match.
                    </li>
                </ul>
            );

            const handleOldPasswordUpdate = (e)=>{
                setOldPasswordErrors([]);
                setOldPassword(e.target.value);
            }
            const handleNewPasswordUpdate = (e)=>{
                setNewPasswordErrors([]);
                setNewPassword(e.target.value);
            }
            const handleConfirmPasswordUpdate = (e)=>{
                // setNewPasswordErrors([]);
                setConfirmPassword(e.target.value);
            }

            const handlePasswordChange = (e)=>{
                e.preventDefault();
        
                if(confirmPasswordMatch){
                    const token = auth?.token;
                    const onError = (error)=>{
                        const response = error?.response;
    
                        if(response?.status === 403){
                            let {type, message} = response?.data;
                            let err = {
                                code: type,
                                message: message
                            }
                            setOldPasswordErrors((oldPasswordErrors)=>([...oldPasswordErrors, err]))
                        }
                        else{
                            const errors = response?.data?.errors;
            
                            if(errors?.length){
                                errors.forEach(err => {
                                    if(err.field === 'oldPassword'){
                                        setOldPasswordErrors((oldPasswordErrors)=>([...oldPasswordErrors, err]));
                                    }
                                    else if(err.field === 'newPassword'){
                                        setNewPasswordErrors((newPasswordErrors)=>([...newPasswordErrors, err]));
                                    }
                                });
                            }
                        }
                    }

                    const onSuccess = ()=>{
                        alert('Password changed successfully!');
                        setAuth({});
                    }

                    changePasswordRequest({token, oldPassword, newPassword, onError, onSuccess, disableAlertsOnResponse:true});
    
                }
                else{
                    alert('Password and Confirm Password do not match');
                }
            }

            return(
                <div className={classes.changePasswordForm}>
                    <div className={classes.entry}>
                        <div className={classes.label}>
                            Old Password
                        </div>
                        <div className={classes.input}>
                            <input
                            id = 'oldPassword'
                            type = 'password'
                            className={classes.input}
                            onChange={handleOldPasswordUpdate}
                            />
                        </div>
                    </div>
                    {oldPasswordErrorComponent}
                    <div className={classes.entry}>
                        <div className={classes.label}>
                            New Password
                        </div>
                        <div className={classes.input}>
                            <input
                            id = 'newPassword'
                            type = 'password'
                            className={classes.input}
                            onChange={handleNewPasswordUpdate}
                            />
                        </div>
                    </div>
                    {newPasswordErrorComponent}
                    <div className={classes.entry}>
                        <div className={classes.label}>
                            Confirm New Password
                        </div>
                        <div className={classes.input}>
                            <input
                            id = 'confirmPassword'
                            type = 'password'
                            className={classes.input}
                            onChange={handleConfirmPasswordUpdate}
                            />
                        </div>
                    </div>
                    {confirmPasswordErrorComponent}
                    <div className={classes.changePasswordButtonContainer}>
                        <Button
                        onClick={handlePasswordChange}
                        className={classes.changePasswordButton}
                        sx={{
                            color: 'white', 
                            backgroundColor: '#4b484c',
                            // width: '100%',
                            margin: '1rem 0'
                        }}
                        disabled={ oldPasswordErrors.length || newPasswordErrors.length || !confirmPasswordMatch || !oldPassword.length || !newPassword.length}
                        >
                            Change Password
                        </Button>
                    </div>
                </div>
            )
        }

        return(
            <div className={classes.detailsAndFunctionalities}>
                {changePassword?(<></>):(
                    <Details />
                )}
                {/* <div className={classes.formContainer}> */}
                    {changePassword ? (
                        <ChangePasswordForm />
                    ):(<></>)}
                {/* </div> */}
                <div className={classes.formToggleButtonContainer}>
                    <Button
                    onClick={handleFormDisplayChange}
                    className={classes.formToggleButton}
                    sx={{
                        color: 'white', 
                        backgroundColor: '#4b484c',
                        // width: '100%',
                        margin: '1rem 0'
                        }}
                    >
                        {changePassword ? (<>Cancel</>) : (<>Change Password</>)}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <div className={classes.avatarContainer}>
                        <Avatar
                        sx={{
                            bgcolor: props.bgcolor,
                            color: props.color,
                            width: '50%',
                            height: '50%',
                        }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <DetailsAndFunctionalities />
                </Grid>
            </Grid>
        </div>
    );
}

export default Profile;
import useStyles from "styles/AdminConsoleStyles";
import { Grid, Avatar, Popper, IconButton, Box, Button } from '@mui/material';
import { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import AuthContext from 'context/AuthProvider';
import logo from 'assets/logo.svg';
import { accountStatementIcon, recordDepositIcon, recordWithdrawalIcon } from "assets/assets";
import AdminConsoleProvider from "context/AdminConsoleProvider";
import DepositScreen from "components/DepositScreen";
import WithdrawalScreen from "components/WithdrawalScreen";
import { BANK_NAME } from "constants/constants";
import Profile from "components/Profile";
import AllTransactionsContext from "context/AllTransactionsProvider";
import LoadingContext from "context/LoadingProvider";
import axios from "api/axios";
import AllTransactions from "components/AllTransactions";

const GET_TRANSACTIONS_URL = '/admin/alltransactions';

function AdminConsole() {
    const classes = useStyles();

    const { loading, setLoading, loadingColor, setLoadingColor } = useContext(LoadingContext);
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(auth?.token)
        if(! auth?.token){
            if(! auth?.admin){
                navigate('/customerConsole', {replace: true});
            }
            navigate('/login', {replace: true});
        }
    },[auth]);

    const handleBannerClick = ()=>{
        navigate('/adminConsole', {replace:true});
    }

    const Banner = useMemo(()=>{
        return(
            <div className={classes.banner} onClick={handleBannerClick}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt='online_bank' className={classes.logo} />
                </div>

                <div className={classes.title}>
                    {BANK_NAME} Administrator
                </div>
            </div>
        )
    },[]);

    function TitleBar() {
        const {name} = auth;
        const user = (name) ? name : 'Loading...';
        const [popperAnchor, setPopperAnchor] = useState(null);
        const popperOpen = Boolean(popperAnchor);
        const popperId = popperOpen ? 'avatarPopper' : undefined;

        const avatarRef = useRef(null);
        const popperRef = useRef(null);

        useEffect(()=>{
            const handleClickOutside = (event) => {
                if (avatarRef.current && !avatarRef.current.contains(event.target) && popperRef.current && !popperRef.current.contains(event.target)) {
                    setPopperAnchor(null);
                }
                };
                    document.addEventListener('click', handleClickOutside, true);
                return () => {
                    document.removeEventListener('click', handleClickOutside, true);
                };
        },[]);

        const handleAvatarClick = (e)=>{
            // console.log('enter/leave');
            setPopperAnchor(popperAnchor ? null : e.currentTarget);
        }

        const handleProfileDisplay = async()=>{
            navigate('profile', {replace:true});
        }

        const handleLogout = ()=>{
            // console.log('admin logged out');
            setAuth({});
        }

        return ( 
            <div className={classes.titleBar}>
                {/* <Banner /> */}
                {Banner}
                <div className={classes.avatar}>
                    <IconButton
                        onClick={handleAvatarClick}
                        ref={avatarRef}
                    >
                        <Avatar 
                            sx={{ bgcolor: 'black' }}
                        />
                    </IconButton>
                    <Popper
                        id={popperId}
                        open={popperOpen}
                        anchorEl={popperAnchor}
                        ref={popperRef}
                    >
                        <Box
                            className = {classes.popperBox}
                        >
                            <section className={classes.username}>
                                {user}
                            </section>

                            <Button
                                className={classes.popperButton}
                                onClick={handleProfileDisplay}
                                sx={{
                                    color:'mediumspringgreen',
                                    width: '100%',
                                    backgroundColor: 'black',
                                    margin: '.1rem',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                Profile
                            </Button>

                            <Button
                                className={classes.popperButton}
                                onClick={handleLogout}
                                sx={{
                                    color:'darkred',
                                    width: '100%',
                                    backgroundColor: 'aliceblue',
                                    margin: '.1rem',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                Log Out
                            </Button>
                        </Box>
                    </Popper>
                </div>
            </div>
        );
    }

    function Body() {
        const { transactions, setTransactions } = useContext(AllTransactionsContext);
        const handleTransactionsFetch = async(e)=>{
            // console.log('click')
            // e.preventDefault();
            setLoading(true);
            setLoadingColor('red');
            try{
                const token = auth?.token;
                const response = await axios.get(
                    GET_TRANSACTIONS_URL,
                    {
                        headers: {
                            Authorization: "Bearer "+token,
                        }
                    }
                );
                setLoading(false);
                setTransactions(response?.data);
                navigate('transactions', {replace:true});
            }catch(err){
                if(!err?.response){
                    alert('No server response');
                }else{
                    alert(err?.response?.data?.message ?? 'An error occured.');
                }
                navigate('/customerConsole', {replace:true});
                setLoading(false);
            }
        }

        const OptionButton = (props)=>{
            // const icon = useMemo(()=>(`url(${props.icon})`),[]);
            const icon = `url(${props.icon})`;
            return(
                <NavLink to={props.route}
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        width: '100%',
                        display: 'block',
                        aspectRatio: '1 / 1',
                    }}
                    replace
                >
                    <div style={{
                        backgroundImage: icon,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }} 
                    className={classes.optionButton}
                    onClick={props.onClick}
                    id = {props.id}
                    >   
                            {props.name}
                    </div>
                </NavLink>
            )
        }

        const Options = ()=>{
            return(
                <div className={classes.options}>
                    <Grid container>
                        <Grid item xs={6} md={2}>
                            <OptionButton name='Record Deposit' icon={recordDepositIcon} id='depositButton' route='deposit' />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <OptionButton name='Record Withdrawal' icon={recordWithdrawalIcon} id='withdrawalButton' route='withdrawal' />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <OptionButton name='All Transactions' icon={accountStatementIcon} id='allTransactionsButton' route='transactions' onClick={handleTransactionsFetch} />
                        </Grid>
                    </Grid>
                </div>
            )
        }

        return (
            <div className={classes.body}>
                <Routes>
                    <Route path='*' element={<Options />} />
                    <Route path='deposit/*' element={<DepositScreen />} />
                    <Route path='withdrawal/*' element={<WithdrawalScreen />} />
                    <Route path='profile/*' element={<Profile bgcolor='pink' color='red' />} />
                    <Route path='transactions/*' element={<AllTransactions />} />
                </Routes>
            </div> 
        );
    }

    return (
        <AdminConsoleProvider>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <TitleBar />
                    </Grid>
                    <Grid item xs={12}>
                        <Body />
                    </Grid>
                </Grid>
            </div> 
        </AdminConsoleProvider>
    );
}

export default AdminConsole;
import { Grid, Avatar, Popper, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import logo from 'assets/logo.svg';
import useStyles from 'styles/CustomerConsoleStyles';

function CustomerConsole()
{
    const classes = useStyles();

    function TitleBar() {
        const user = 'Sample User' //CHANGE TO USERNAME VIA REDUX
        const [popperAnchor, setPopperAnchor] = useState(null);
        const popperOpen = Boolean(popperAnchor);
        const popperId = popperOpen ? 'avatarPopper' : undefined;

        const handleAvatarMouseEnterLeave = (e)=>{
            // console.log('enter/leave');
            setPopperAnchor(popperAnchor ? null : e.currentTarget);
        }
        return ( 
            <div className={classes.titleBar}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt='online_bank' className={classes.logo} />
                </div>

                <div className={classes.title}>
                    Online Bank
                </div>

                <div className={classes.avatar}>
                    <IconButton onMouseEnter={handleAvatarMouseEnterLeave} onMouseLeave={handleAvatarMouseEnterLeave}>
                        <Avatar 
                            sx={{ bgcolor: 'black' }}
                        />
                    </IconButton>
                    <Popper id={popperId} open={popperOpen} anchorEl={popperAnchor} >
                        <Box
                            className = {classes.popperBox}
                        >
                            {user}
                        </Box>
                    </Popper>
                </div>
            </div>
        );
    }

    function Body() {
        return (
            <div className={classes.body}>
                
            </div> 
        );
    }

    return (
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
    );
}

export default CustomerConsole;
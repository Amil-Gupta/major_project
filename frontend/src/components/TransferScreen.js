import { NavLink } from "react-router-dom";
import useStyles from "styles/TransferScreenStyles";

function TransferScreen() {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <NavLink to='/customerConsole'>
                Transfer Screen
            </NavLink>
        </div>
    );
}

export default TransferScreen;
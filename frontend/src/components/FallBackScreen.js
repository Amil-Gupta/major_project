import { CircularProgress } from "@mui/material";
import useStyles from "styles/FallBackScreenStyles";

const FallBackScreen = ()=>{
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

export default FallBackScreen;
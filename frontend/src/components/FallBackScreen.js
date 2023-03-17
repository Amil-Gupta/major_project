import { CircularProgress } from "@mui/material";
import { memo } from "react";
import useStyles from "styles/FallBackScreenStyles";

const FallBackScreen = ()=>{
    console.log('fallback')
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

export default FallBackScreen;
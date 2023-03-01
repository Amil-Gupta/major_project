import { CircularProgress } from "@mui/material";
import useStyles from "styles/FallBackScreenStyles";

function FallBackScreen() {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

export default FallBackScreen;
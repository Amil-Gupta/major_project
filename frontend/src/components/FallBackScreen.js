import { CircularProgress } from "@mui/material";
import { memo } from "react";
import useStyles from "styles/FallBackScreenStyles";

const FallBackScreen = memo(()=>{
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
},
(prevProps, nextProps) => {
    if (prevProps === nextProps) {
      return true;
    }
    return false;
}
);

export default FallBackScreen;
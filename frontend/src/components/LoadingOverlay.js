import { CircularProgress } from "@mui/material";
import useStyles from "styles/LoadingOverlayStyles";

const LoadingOverlay = (props)=>{
    const classes = useStyles();
    const showHide = (props.show) ? classes.show : classes.hide;
    const color = props.color;
    return (
        <div className={showHide}>
            <CircularProgress sx={{
                color: props.color
            }} />
        </div>
    );
}

export default LoadingOverlay;
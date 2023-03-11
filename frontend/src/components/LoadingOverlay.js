import { CircularProgress } from "@mui/material";
import useStyles from "styles/LoadingOverlayStyles";

function LoadingOverlay(props) {
    const classes = useStyles();
    const showHide = (props.show) ? classes.show : classes.hide;
    return (
        <div className={showHide}>
            <CircularProgress />
        </div>
    );
}

export default LoadingOverlay;
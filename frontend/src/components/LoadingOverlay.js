import { CircularProgress } from "@mui/material";
import { memo } from "react";
import useStyles from "styles/LoadingOverlayStyles";

const LoadingOverlay = memo((props)=>{
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
},
(prevProps, nextProps) => {
    if (prevProps === nextProps) {
      return true;
    }
    return false;
}
);

export default LoadingOverlay;
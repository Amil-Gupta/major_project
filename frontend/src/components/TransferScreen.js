import LoadingContext from "context/LoadingProvider";
import { memo, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useStyles from "styles/TransferScreenStyles";
// import LoadingOverlay from "./LoadingOverlay";
import TransferInitiator from "components/TransferInitiator";
import TransferSuccessScreen from "components/TransferSuccessScreen";

const TransferScreen = memo(()=>{
    const { setLoading, setLoadingColor } = useContext(LoadingContext);

    useEffect(
        ()=>{
            setLoadingColor('green');
            // setLoading(false);
        },
        [setLoadingColor]
    );

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Routes>
                <Route path='*' element={<TransferInitiator setLoading={setLoading} />} />
                <Route path='success' element={<TransferSuccessScreen />} />
            </Routes>
        </div>
    )
});

export default TransferScreen;
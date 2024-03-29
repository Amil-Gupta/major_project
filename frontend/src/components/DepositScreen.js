import LoadingContext from "context/LoadingProvider";
import { memo, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useStyles from "styles/DepositScreenStyles";
import DepositInitiator from "components/DepositInitiator";
import DepositSuccessScreen from "components/DepositSuccessScreen";

const DepositScreen = memo(()=>{
    const { setLoading, setLoadingColor } = useContext(LoadingContext);

    useEffect(
        ()=>{
            setLoadingColor('lime');
            // setLoading(false);
        },
        [setLoadingColor]
    );

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Routes>
                <Route path='*' element={<DepositInitiator setLoading={setLoading} />} />
                <Route path='success' element={<DepositSuccessScreen />} />
            </Routes>
        </div>
    )
});

export default DepositScreen;
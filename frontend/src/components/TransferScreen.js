import { Avatar, Grid, Button } from "@mui/material";
import AuthContext from "context/AuthProvider";
import { useState, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useStyles from "styles/TransferScreenStyles";
// import LoadingOverlay from "./LoadingOverlay";
import TransferInitiator from "components/TransferInitiator";
import TransferSuccessScreen from "components/TransferSuccessScreen";

function TransferScreen(props){
    useEffect(
        ()=>{
            props.setLoadingColor('green');
        },
        []
    )

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Routes>
                <Route path='*' element={<TransferInitiator setLoading={props.setLoading} />} />
                <Route path='success' element={<TransferSuccessScreen />} />
            </Routes>
        </div>
    )
}

export default TransferScreen;
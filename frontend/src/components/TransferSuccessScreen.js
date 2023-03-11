import useStyles from "styles/TransferSuccessScreenStyles";
import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import TransferContext from "context/TransferProvider";

function TransferSuccessScreen() {
    const classes = useStyles();

    const { transfer, setTransfer } = useContext(TransferContext);
    const { id, fromAccount, toAccount, amountPaise, transferredAt } = transfer;
    const amountRupees = amountPaise / 100;
    const transferDate = new Date(transferredAt);

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                Transfer Successful!
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.amount}>
                        ₹{amountRupees}
                    </div>
                </Grid>
                <Grid item xs={12} md={4} className={classes.label}>
                    Transfer Id
                </Grid>
                <Grid item xs={12} md={8} className={classes.value}>
                    {id}
                </Grid>
                <Grid item xs={12} md={4} className={classes.label}>
                    From Account No.
                </Grid>
                <Grid item xs={12} md={8} className={classes.value}>
                    {fromAccount}
                </Grid>
                <Grid item xs={12} md={4} className={classes.label}>
                    To Account No.
                </Grid>
                <Grid item xs={12} md={8} className={classes.value}>
                    {toAccount}
                </Grid>
                <Grid item xs={12} md={4} className={classes.label}>
                    Time of Transfer
                </Grid>
                <Grid item xs={12} md={8} className={classes.value}>
                    {transferDate.toString()}
                </Grid>
            </Grid>
        </div>
    );
}

export default TransferSuccessScreen;
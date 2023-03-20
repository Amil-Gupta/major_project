import AuthContext from "context/AuthProvider";
import StatementContext from "context/StatementProvider";
import { useContext, useEffect } from "react";
import useStyles from "styles/AccountStatementStyles";
import { DataGrid, gridPageCountSelector, gridPageSelector, gridPageSizeSelector, gridRowCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Pagination, PaginationItem, TablePagination, Tooltip } from "@mui/material";
import { depositIcon, inboundIcon, outboundIcon, withdrawalIcon } from "assets/assets";

const GET_STATEMENT_URL = '/accounts/statement';

function AccountStatement() {
    const classes = useStyles();

    const { auth, setAuth } = useContext(AuthContext);
    const { statement, setStatement } = useContext(StatementContext);

    const rows = statement?.rows?.content ?? [];

    const columns = [
        {
            field: 'type',
            headerName: 'Type',
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params)=>{
                const {withdrawalAmount, description} = params.row;
                if(withdrawalAmount){
                    if(description.startsWith('To Account')){
                        return 'Outbound Transfer';
                    }
                    else{
                        return 'Withdrawal';
                    }
                }
                else{
                    if(description.startsWith('From Account')){
                        return 'Inbound Transfer';
                    }
                    else{
                        return 'Deposit';
                    }
                }
            },
            renderCell: (params)=>{
                const getIcon = ()=>{
                    switch(params.value){
                        case 'Withdrawal':
                            return(
                                <img src={withdrawalIcon} className={classes.typeIcon} />
                            );
                            break;
                        case 'Deposit':
                            return(
                                <img src={depositIcon} className={classes.typeIcon} />
                            );
                            break;
                        case 'Inbound Transfer':
                            return(
                                <img src={inboundIcon} className={classes.typeIcon} />
                            );
                            break;
                        case 'Outbound Transfer':
                            return(
                                <img src={outboundIcon} className={classes.typeIcon} />
                            );
                            break;
                        default:
                            return(
                                <>
                                    Unknown
                                </>
                            )
                    }
                }
                return(
                    <Tooltip title={params.value} enterTouchDelay={0}>
                        <div className={classes.typeIconContainer}>
                            {
                                getIcon()
                            }
                        </div>
                    </Tooltip>
                )
            },
        },
        {
            field: 'amount',
            headerName: 'Amount',
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params)=>{
                const {withdrawalAmount, depositAmount} = params.row;
                return `₹  ${(withdrawalAmount ?? depositAmount) / 100}`;
            },
            flex: 1,
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
    ]

    // useEffect(()=>{
    //     console.log(rows);
    // },[statement]);

    const CustomPagination = ()=>{
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        // const pageCount = useGridSelector(apiRef, gridPageCountSelector);
        const count = useGridSelector(apiRef, gridRowCountSelector);
        const rowsPerPage = useGridSelector(apiRef, gridPageSizeSelector);

        return (
        <TablePagination
        component="div"
        variant="outlined"
        shape="rounded"
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage={<span>Records Per Page:</span>}
        onRowsPerPageChange={
            (event)=>{
                apiRef.current.setPageSize(event.target.value);
                apiRef.current.setPage(0);
            }
        }
        onPageChange={
            (event, newPage) =>{
                apiRef.current.setPage(newPage);
            }
        }
        showFirstButton={true}
        showLastButton={true}
        sx={{
            color: 'white',
        }}
        />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.gridContainer}>
                <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                sx={{
                    color: 'white',
                    backgroundColor: 'darkslategrey',
                    fontWeight: 'bolder',
                    fontSize: '1.2rem',
                }}
                components={{
                    Pagination: CustomPagination,
                }}
                />
            </div>
        </div>
    );
}

export default AccountStatement;
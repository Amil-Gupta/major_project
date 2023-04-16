import AuthContext from "context/AuthProvider";
import AllTransactionsContext from "context/AllTransactionsProvider";
import { useContext, } from "react";
import useStyles from "styles/AllTransactionsStyles";
import { DataGrid, gridPageSelector, gridPageSizeSelector, gridRowCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Button, Grid, TablePagination } from "@mui/material";
import LoadingContext from "context/LoadingProvider";
import { Svg, Path, PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from "@david.kucsai/react-pdf-table";
import pdfStyles from "styles/AllTransactionsPDFStyles";
import { BANK_NAME } from "constants/constants";
import { getAllTransactionsRequest } from "api/requests";
import { useNavigate } from "react-router-dom";

function AllTransactions() {
    const classes = useStyles();
    const { auth, setAuth } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);
    const { transactions, setTransactions } = useContext(AllTransactionsContext);

    const navigate = useNavigate();

    // const rows = transactions?.rows?.content ?? []; // WHEN PAGINATED AT SERVER SIDE
    const rows = transactions ?? [];

    // console.log(rows);

    const columns = [
        {
            field: 'fromAccount',
            headerName: 'From',
            headerAlign: 'center',
            align: 'center',
            flex: 2,
            valueGetter: (params)=>(
                params.value ?? 'self'
            )
        },
        {
            field: 'toAccount',
            headerName: 'To',
            headerAlign: 'center',
            align: 'center',
            flex: 2,
            valueGetter: (params)=>(
                params.value ?? 'self'
            )
        },
        {
            field: 'amountPaise',
            headerName: 'Amount',
            headerAlign: 'center',
            align: 'center',
            flex: 3,
            renderCell: (params)=>{
                return(
                    <p style={{
                        overflowX: 'auto'
                    }}>
                        ₹ {params.value / 100}
                    </p>
                )
            }
        },
        {
            field: 'transferredAtDate',
            headerName: 'Date',
            headerAlign: 'center',
            align: 'center',
            flex: 3,
            valueGetter: ({row})=>{
                const date = new Date(row?.transferredAt);

                const year = String(date.getFullYear()).padStart(4,0);
                const month = String(date.getMonth() + 1).padStart(2,0);
                const day = String(date.getDate()).padStart(2,0);

                const dateString = `${year}-${month}-${day}`;
                return dateString;
            },
            renderCell: (params)=>{
                return(
                    <p style={{
                        overflowX: 'auto'
                    }}>
                        {params.value}
                    </p>
                )
            }
        },
        {
            field: 'transferredAtTime',
            headerName: 'Time',
            headerAlign: 'center',
            align: 'center',
            flex: 3,
            valueGetter: ({row})=>{
                const date = new Date(row?.transferredAt);

                const hours = String(date.getHours()).padStart(2,0);
                const minutes = String(date.getMinutes()).padStart(2,0);
                const seconds = String(date.getSeconds()).padStart(2,0);

                const timeString = `${hours}:${minutes}:${seconds}`;
                return timeString;
            },
            renderCell: (params)=>{
                return(
                    <p style={{
                        overflowX: 'auto'
                    }}>
                        {params.value}
                    </p>
                )
            }
        },
    ]

    // useEffect(()=>{
    //     console.log(rows);
    // },[transactions]);

    const handleRefresh = (e)=>{
        e.preventDefault();
        setLoading(true);
        const token = auth?.token;
        const onError = (error)=>{
            if(error?.response?.status === 401){
                alert('Authorization expired. Please login again.');
                setAuth({});
            }
            else{
                navigate('/adminConsole', {replace:true});
                setLoading(false);
            }
        }
        const onSuccess = (response)=>{
            setLoading(false);
            setTransactions(response?.data);
        }

        getAllTransactionsRequest({token, onError, onSuccess, disableAlertsOnResponse:true});
        
    }

    const AllTransactionsPDF = ()=>{
        const LogoSVG = ()=>(
            <Svg viewBox="0 0 51 61" fill="none" style={pdfStyles.logo}>
                <Path d="M0.0904897 55.3956C0.0930622 57.7706 1.83725 59.7757 4.25801 59.8757C7.62804 60.0132 11.0058 59.9307 14.381 59.9307C16.8352 59.9307 18.9755 57.7681 18.9086 55.0456C18.834 51.9931 18.9549 48.9331 18.9832 45.878L19.099 33.4079C19.1067 32.6454 19.2173 32.5029 19.9608 32.3079C21.6481 31.8489 23.4243 31.7914 25.1393 32.1404C28.3036 32.7954 30.6163 35.1654 30.9558 38.2905C31.1256 39.8405 31.1359 41.413 31.1565 42.9755C31.2208 47.0756 31.2543 51.1756 31.2954 55.2781C31.3211 57.9957 33.3432 59.9707 36.1395 59.9832C39.152 59.9982 42.1644 60.0032 45.1769 60.0007C48.0221 59.9957 50.0518 58.0557 50.0595 55.2931C50.0775 46.8655 50.0775 38.438 50.0853 30.0104C50.0853 29.8804 50.0853 29.7479 50.0724 29.6204C49.9952 28.7329 49.6376 27.9754 48.8299 27.5254C48.2728 27.201 47.6707 26.956 47.042 26.7979C44.6104 26.2275 42.0877 26.123 39.615 26.4904C37.7036 26.7729 35.818 27.2229 33.922 27.5954C31.4266 28.0854 28.9158 28.2954 26.3742 28.0404C23.1122 27.7179 20.2772 26.3754 17.6224 24.5903C16.3648 23.7361 15.0832 22.9158 13.779 22.1303C12.184 21.1803 10.3987 20.8678 8.55672 20.7703C6.57587 20.6628 4.6053 20.6128 2.65789 21.0478C1.14009 21.3878 0.345171 22.2453 0.172811 23.7403C0.136862 24.055 0.118827 24.3713 0.118788 24.6878M18.9935 9.2277C18.9988 8.02117 18.7594 6.82545 18.2891 5.70881C17.8189 4.59218 17.1269 3.57649 16.2527 2.71975C15.3785 1.863 14.3392 1.18198 13.1942 0.715556C12.0492 0.249135 10.8208 0.00645223 9.57931 0.00136346C8.33778 -0.00372531 7.10738 0.22888 5.95835 0.685898C4.80932 1.14292 3.76418 1.8154 2.88258 2.66494C2.00098 3.51449 1.3002 4.52447 0.820254 5.63721C0.340304 6.74995 0.0905813 7.94367 0.085345 9.1502C0.0751108 11.5869 1.06135 13.9277 2.8271 15.6578C4.59285 17.3878 6.99347 18.3653 9.50085 18.3753C12.0082 18.3852 14.417 17.4268 16.1972 15.7108C17.9774 13.9948 18.9833 11.6644 18.9935 9.2277ZM40.4357 4.70266C37.9314 4.69135 35.525 5.64661 33.745 7.35856C31.9651 9.0705 30.9573 11.3991 30.943 13.8327C30.9345 15.0431 31.1724 16.2432 31.643 17.3638C32.1136 18.4845 32.8076 19.5037 33.6851 20.3627C34.5626 21.2217 35.6062 21.9036 36.7559 22.3692C37.9056 22.8347 39.1387 23.0747 40.3842 23.0753C42.8887 23.0767 45.2917 22.1129 47.0662 20.3954C48.8408 18.6779 49.8423 16.3467 49.8512 13.9127C49.8566 11.4786 48.8685 9.14172 47.1034 7.41467C45.3383 5.68762 42.9404 4.7114 40.4357 4.70016V4.70266Z" fill="black"/>
            </Svg>
        )

        return (
            <Document>
                <Page size='A4' style={pdfStyles.body}>
                    <LogoSVG style={pdfStyles.logo} />
                    <Text style={pdfStyles.bankName}>
                        {BANK_NAME}
                    </Text>
                    <Text style={pdfStyles.info}>
                        Requested By Admin: {auth?.name}
                    </Text>
                    <Text style={pdfStyles.info}>
                        Admin Account No.: {auth?.id}
                    </Text>
                    <Text style={pdfStyles.tableHeading}>
                        All Transactions
                    </Text>
                    <Table data={rows}>
                        <TableHeader style={pdfStyles.tableHeader}>
                            {
                                columns.map((column)=>(
                                    <TableCell key={column.field} style={pdfStyles.tableHeaderCell}>
                                        {column.headerName}
                                    </TableCell>
                                ))
                            }
                        </TableHeader>
                        <TableBody style={pdfStyles.tableBody}>
                        <DataTableCell
                        getContent={({fromAccount})=>fromAccount}
                        style={pdfStyles.tableCell}
                        />
                        <DataTableCell
                        getContent={({toAccount})=>toAccount}
                        style={pdfStyles.tableCell}
                        />
                        <DataTableCell getContent={({amountPaise})=>`INR ${amountPaise / 100}`}
                        style={pdfStyles.tableCell}
                        />
                        <DataTableCell getContent={({transferredAt})=>{
                            const date = new Date(transferredAt);
                            const dateString = `${String(date.getFullYear()).padStart(4,0)}-${String(date.getMonth() + 1).padStart(2,0)}-${String(date.getDate()).padStart(2,0)}`;
                            return dateString;
                        }}
                        style={pdfStyles.tableCell}
                        />
                        <DataTableCell getContent={({transferredAt})=>{
                            const date = new Date(transferredAt);
                            const timeString = `${String(date.getHours()).padStart(2,0)}:${String(date.getMinutes()).padStart(2,0)}:${String(date.getSeconds()).padStart(2,0)}`;
                            return timeString;
                        }}
                        style={pdfStyles.tableCell}
                        />
                        </TableBody>
                    </Table>
                </Page>
            </Document>
        );
    }

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
            <div className={classes.header}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.heading}>
                            All Transactions
                        </div>
                    </Grid>
                </Grid>
            </div>
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
            {/* <div className={classes.hoverTapSuggestion}>
                *Hover/Tap on Type to view details
            </div> */}
            <div className={classes.buttonContainer}>

                <Button
                    onClick={handleRefresh}
                    sx={{
                        color: 'greenyellow',
                        backgroundColor: 'green',
                        margin: '.5rem .5rem',
                        border: '.1rem solid greenyellow'
                    }}
                    >
                    Refresh
                </Button>
                <PDFDownloadLink style={{textDecoration: 'none'}} document={<AllTransactionsPDF/>} fileName={`allTransactions`}>
                    {
                        ({loading})=>loading?(
                            <Button
                            sx={{
                                color: 'white',
                                backgroundColor: 'brown',
                                margin: '.5rem .5rem',
                                border: '.1rem solid white',
                            }}
                            disabled
                            >
                                Loading...
                            </Button>
                        ):(
                            <Button
                            sx={{
                                color: 'white',
                                backgroundColor: 'brown',
                                margin: '.5rem .5rem',
                                border: '.1rem solid white',
                            }}
                            >
                                Get PDF
                            </Button>
                        )
                    }
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default AllTransactions;
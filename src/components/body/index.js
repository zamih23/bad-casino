import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { findByLabelText } from '@testing-library/dom';
import { Button, Modal } from '@material-ui/core';

function createData(id, slots, time) {
    return { id, slots, time};
  }

const rows = [
    createData(1, "-1-2-3-", 3.7, ),
    createData(2, "-1-2-3-", 25.0, ),
    createData(3, "-1-2-3-", 16.0),
    createData(4, "-1-2-3-", 6.0),
    createData(5, "-1-2-3-", 16.0),
    createData(6, "-1-2-3-", 3.2),
    createData(7, "-1-2-3-", 9.0),
    createData(8, "-1-2-3-", 0.0),
    createData(9, "-1-2-3-", 26.0),
    createData(10, "-1-2-3-", 0.2),
    createData(11, "-1-2-3-", 0),
    createData(12, "-1-2-3-", 19.0),
    createData(13, "-1-2-3-", 18.0),
  ];

  const headCells = [
    { id: 'ID', numeric: true, disablePadding: true, sortable: true, label: 'ID' },
    { id: 'Slots', numeric: false, disablePadding: false, sortable: false, label: 'Slots' },
    { id: 'Time', numeric: true, disablePadding: false, sortable: true, label: 'Time' },
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy } = props;
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'center'}
              padding={headCell.disablePadding ? 'none' : 'default'}
            >
              <TableSortLabel>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: '100%',
    },
    paper: {
      width: '70%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 100,
    },
    tableHeader: {
      color: "black"
    },
  }));
  
    export default function EnhancedTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [gameModal, setGameModal] = useState(false)
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleGameModalOpen = () => {
      setGameModal(true);
    };
  
    const handleGameModalClose = () => {
      setGameModal(false);
    };
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
    return (
      <div className={classes.root}>
        <Modal
        open={gameModal}
        onClose={handleGameModalClose}
        style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "50px"}}
        >
          <div style={{width: "80%", height: "100%", backgroundColor: "white"}}>
            <span>GAME THERE</span>
          </div>
        </Modal>
        <h3 className={classes.tableHeader}>Your Last Games</h3>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'medium'}
              aria-label="enhanced table"
            >
                 <EnhancedTableHead
                classes={classes}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.slots}</TableCell>
                        <TableCell align="center">{row.time}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <Button variant="outlined" color="primary" size="large" onClick={handleGameModalOpen}>Play</Button>
      </div>
    );
  };

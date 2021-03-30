import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import { TableSortLabel, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@material-ui/core";



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "ID",
    numeric: true,
    disablePadding: true,
    sortable: true,
    label: "ID",
  },
  {
    id: "Slots",
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: "Slots",
  },
  {
    id: "Time",
    numeric: true,
    disablePadding: false,
    sortable: true,
    label: "Time",
  },
];

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

export default function EnhancedTable() {
  const history = useSelector(state => state.history);
  const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');

  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
 
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return(
    <div className="tableContainer">
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
          >
            <TableSortLabel
              active={true}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
      </TableHead>
      <TableBody>
        {history.length === 0 ? 
        (<TableRow>
          <TableCell align="center">Empty</TableCell>
          <TableCell align="center">Empty</TableCell>
          <TableCell align="center">Empty</TableCell>
        </TableRow>) :
        (stableSort(history, getComparator(order, orderBy))
        .map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row" align="center">
              {row.id}
            </TableCell>
            <TableCell align="center">{row.slots}</TableCell>
            <TableCell align="center">{row.time}</TableCell>
          </TableRow>
        )))}
      </TableBody>
    </Table>
  </div>

  );
}

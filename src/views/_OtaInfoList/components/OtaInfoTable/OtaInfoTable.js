import React from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { SpanUtility } from 'components';
import { useTheme } from '@material-ui/core/styles';
import { capFirst } from 'helpers';
import moment from 'moment';
import EnhancedTableToolbar from '../EnhancedTableToolbar';


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
  { id: 'live', numeric: false, disablePadding: false, label: 'Live' },
  { id: 'versionName', numeric: true, disablePadding: false, label: 'Version Name' },
  { id: 'versionCode', numeric: true, disablePadding: false, label: 'Version Code' },
  { id: 'minimumSupportedAppVersionCode', numeric: true, disablePadding: false, label: 'Min. App Code' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            align={headCell.numeric ? 'right' : 'left'}
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
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
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

// eslint-disable-next-line react/no-multi-comp
export default function EnhancedTable(props) {
  const { otaInfo } = props;
  const rows = otaInfo.filteredItems.map((item) => ({
    id: item.id,
    live: item.live,
    versionName: item.versionName,
    versionCode: item.versionCode,
    minimumSupportedAppVersionCode: item.minimumSupportedAppVersionCode,
    created: item.created,
  }));
  // console.log(rows);

  const theme = useTheme();
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar otaInfo={otaInfo} />
        <TableContainer>
          <Table
            aria-label="enhanced table"
            aria-labelledby="tableTitle"
            className={classes.table}
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={row.id}
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <SpanUtility
                          color={row.live ? `${theme.palette.success.main}` : `${theme.palette.error.main}`}
                        >
                          {` ${capFirst(row.live.toString())}`}
                        </SpanUtility>
                      </TableCell>
                      <TableCell align="right">{row.versionName}</TableCell>
                      <TableCell align="right">{row.versionCode}</TableCell>
                      <TableCell align="right">{row.minimumSupportedAppVersionCode}</TableCell>
                      <TableCell align="right">{moment(row.created).format('DD/MM/YYYY')}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={handleChangeDense}
          />
        }
        label="Dense padding"
      />
    </div>
  );
}

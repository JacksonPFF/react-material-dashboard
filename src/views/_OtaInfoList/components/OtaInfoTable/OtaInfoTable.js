import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { SpanUtility } from 'components';
import { useTheme } from '@material-ui/core/styles';
import { capFirst } from 'helpers';

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

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const OtaInfoTable = props => {
  const { className, otaInfo, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { otaInfo } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = otaInfo.filteredItems.map(ota => ota.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === otaInfo.filteredItems.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < otaInfo.filteredItems.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Live</TableCell>
                  <TableCell>Version Name</TableCell>
                  <TableCell>Version Code</TableCell>
                  <TableCell>Minimum Supported App Code</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {otaInfo.filteredItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(ota => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={ota.id}
                      selected={selectedUsers.indexOf(ota.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.indexOf(ota.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, ota.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <SpanUtility
                          color={ota.live ? `${theme.palette.success.main}` : `${theme.palette.error.main}`}
                        >
                          {` ${capFirst(ota.live.toString())}`}
                        </SpanUtility>
                      </TableCell>
                      <TableCell>{ota.versionName}</TableCell>
                      <TableCell>{ota.versionCode}</TableCell>
                      <TableCell>{ota.minimumSupportedAppVersionCode}</TableCell>
                      <TableCell>{moment(ota.created).format('DD/MM/YYYY')}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={otaInfo.filteredItems.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[1, 2, 3]}
        />
      </CardActions>
    </Card>
  );
};

OtaInfoTable.propTypes = {
  className: PropTypes.string,
  otaInfo: PropTypes.object.isRequired
};

export default OtaInfoTable;

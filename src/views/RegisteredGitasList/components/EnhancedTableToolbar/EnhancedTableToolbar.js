import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SearchInput } from 'components';
import { searchFilter } from 'helpers';
import { registeredGitasActions } from '_actions';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  smallGutter: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
}));

const EnhancedTableToolbar = (props) => {
  const { registeredGitas, dispatch } = props;

  const classes = useToolbarStyles();

  function handleSearchInput(e) {
    const searchText = e.target.value;
    const results = {};
    // Registered Gitas in redux state
    results.gitas = searchFilter(searchText, registeredGitas.items);
    // update store with filtered list
    dispatch(registeredGitasActions.filterItems(results));
  }

  return (
    <Toolbar className={classes.smallGutter}>
      <Typography 
        className={classes.title} 
        component="div" 
        id="tableTitle" 
        variant="h4"
      >
        Registered Gitas
      </Typography>
      <SearchInput
        onInput={handleSearchInput}
        placeholder="Search for..."
        type="text"
      />
    </Toolbar>
  );
};

function mapStateToProps(state) {
  const { registeredGitas } = state;
  return {
    registeredGitas,
  };
}

const connectedEnhancedTableToolbar = connect(mapStateToProps)(EnhancedTableToolbar);
export default connectedEnhancedTableToolbar;

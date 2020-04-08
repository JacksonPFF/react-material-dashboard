import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SearchInput } from 'components';
import { searchFilter } from 'helpers';
import { otaInfoConstants } from '_constants';

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
  const { otaInfo, dispatch } = props;

  const classes = useToolbarStyles();

  function handleSearchInput(e) {
    const searchText = e.target.value;
    // We only want to filter based on the properties visible to the user
    const visibleProperties = otaInfo.items.map((item) => ({
      // TODO: Need unique Id for React list key attribute,
      // but dont really want to filter by it if not visible to user...
      // can we exclude it from the filter somehow?
      id: item.id,
      live: item.live,
      versionName: item.versionName,
      versionCode: item.versionCode,
      minimumSupportedAppVersionCode: item.minimumSupportedAppVersionCode,
      created: item.created,
    }));
  
    const items = searchFilter(searchText, visibleProperties)
    // update store with filtered list
    dispatch({ type: otaInfoConstants.GETALL_FILTERED_ITEMS, items });
  }

  return (
    <Toolbar className={classes.smallGutter}>
      <Typography 
        className={classes.title} 
        component="div" 
        id="tableTitle" 
        variant="h4"
      >
        OTA Info
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
  const { otaInfo } = state;
  return {
    otaInfo,
  };
}

const connectedEnhancedTableToolbar = connect(mapStateToProps)(EnhancedTableToolbar);
export default connectedEnhancedTableToolbar;

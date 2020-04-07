import _ from 'lodash';

export default (searchText, listItems) => {
  const items = _.filter(listItems, (item) => // each object
    _.filter(_.values(item), (itemPropertyValue) => // each value in object
      _.includes(itemPropertyValue.toString().toLowerCase(), searchText.toLowerCase())).length > 0);

  return items
}
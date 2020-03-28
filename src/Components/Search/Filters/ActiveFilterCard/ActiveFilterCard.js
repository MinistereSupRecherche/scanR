import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import DictionaryData from '../../../Shared/DictionaryData/DictionaryData';

/* Gestion des langues */

import classes from './ActiveFilterCard.scss';

const ActiveFilterCard = (props) => {
  const filters = (props.filters) ? props.filters : {};
  let count = 0;
  const filteredFilters = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key].type === 'MultiValueSearchFilter' && key !== 'isFrench' && key !== 'status') {
      filteredFilters[key] = filters[key];
    }
  });
  const activeFilters = Object.keys(filteredFilters).map(key => (
    filters[key].values.map((value) => {
      count += 1;
      return (
        <div
          key={key}
          className={`badge badge-pill p-2 mt-1 mr-2 d-flex ${classes.deleteFilter}`}
        >
          <div className={`justify-content-start ${classes.deleteFilterTxt}`}>
            <DictionaryData id={value} />
          </div>
          <i
            className={`fas fa-times ml-3 ${classes.closeIcon}`}
            onClick={() => props.multiValueFilterHandler(key, value)}
            onKeyPress={() => props.multiValueFilterHandler(key, value)}
            role="button"
            tabIndex={0}
          />
        </div>
      );
    })
  ));
  const shouldPrintActiveFilters = (counter) => {
    if (counter > 0) {
      return (
        <div className={classes.FilterHeaders}>
          <div className="d-flex flex-wrap mt-2 mb-2 p-1">
            {activeFilters}
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div className={`p-3 mb-2 ${classes.ActiveFiltersContainer}`}>
      <div className={`d-flex flex-nowrap align-items-center ${classes.FilterHeaders}`}>
        <FormattedHTMLMessage id="Search.Filters.activeFilters" defaultMessage="Search.Filters.activeFilters" />
        <div className="pl-2">{` - ${count}`}</div>
        <button
          type="button"
          onClick={() => props.activateFilters(!props.isActive)}
          className={`ml-auto mr-2 ${classes.ActivateFiltersBtn} ${classes[(props.isMobile) ? 'Visible' : 'Hidden']}`}
        >
          <i className={`fas fa-angle-${(props.isActive) ? 'down' : 'up'}`} />
        </button>
      </div>
      {shouldPrintActiveFilters(count)}
    </div>
  );
};

export default ActiveFilterCard;

ActiveFilterCard.propTypes = {
  multiValueFilterHandler: PropTypes.func,
  filters: PropTypes.object,
  isActive: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  activateFilters: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';
import YearRangeSlider from '../../../Shared/YearRangeSlider/YearRangeSlider';
import styles from '../../../../style.scss';

const ProjectsFilters = (props) => {
  const facets = props.facets || [];
  const generalFacets = props.generalFacets || [];
  const geoFacets = facets.find(item => item.id === 'localisations') || { entries: [] };
  const typeActiveFilters = props.filters.type || {};
  const typeFacets = generalFacets.find(item => item.id === 'types') || { entries: [] };
  const domainsFacets = facets.find(item => item.id === 'domains') || { entries: [] };
  if (!props.facets) return null;
  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          language={props.language}
          title={<FormattedHTMLMessage id="Search.Filters.localisation" />}
          subtitle={<FormattedHTMLMessage id="Search.Filters.localisation.subtitle" />}
          placeholder=""
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="participants.structure.address.localisationSuggestions"
        />
        <hr
          style={{
            height: '2px',
            color: styles.projectsColor,
            backgroundColor: styles.projectsColor,
          }}
        />
        <CheckBoxFilter
          language={props.language}
          defaultActive
          retractable={false}
          nbItemsToShow={10}
          title={<FormattedHTMLMessage id="Search.Filters.fundingType" />}
          facets={typeFacets.entries}
          filters={typeActiveFilters}
          facetID="type"
          onSubmit={props.multiValueFilterHandler}
        />
        <hr
          style={{
            height: '2px',
            color: styles.projectsColor,
            backgroundColor: styles.projectsColor,
          }}
        />
        <CheckBoxFilter
          language={props.language}
          defaultActive
          retractable={false}
          title={<FormattedHTMLMessage id="Search.Filters.actions" />}
          facets={domainsFacets.entries}
          filters={typeActiveFilters}
          facetID="action.label.default"
          onSubmit={props.multiValueFilterHandler}
        />
        <hr
          style={{
            height: '2px',
            color: styles.projectsColor,
            backgroundColor: styles.projectsColor,
          }}
        />
        <YearRangeSlider
          data={props.sliderData}
          barColor={styles.projectsColor}
          height={60}
          label={<FormattedHTMLMessage id="Search.Filters.yearFilter" />}
          min={(props.filters.year) ? props.filters.year.min : null}
          max={(props.filters.year) ? (props.filters.year.max - 1) : null}
          minBound={2000}
          maxBound={new Date().getFullYear()}
          handleSliderRange={props.rangeFilterHandler}
        />
      </div>
    </div>
  );
};

export default ProjectsFilters;

ProjectsFilters.propTypes = {
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  sliderData: PropTypes.array,
  rangeFilterHandler: PropTypes.func,
  filters: PropTypes.object,
};

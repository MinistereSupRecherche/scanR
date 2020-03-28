import React from 'react';
import PropTypes from 'prop-types';

import Affiliations from './SubSections/Affiliations/Affiliations';
import Domains from './SubSections/Domains/Domains';
import Identity from './SubSections/Identity/Identity';
import Roles from './SubSections/Roles/Roles';
import Prizes from './SubSections/Prizes/Prizes';
import Web from './SubSections/Web/Web';
import classes from './Informations.scss';

/**
 * Informations
 * Url : .
 * Informations : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Informations = (props) => {
  const hasAffiliations = (props.data.affiliations) ? 'col-12' : 'col-lg-6 col-md-12';
  return (
    <div className="row">
      <div className="col-lg">
        <div className="row">
          <div className={`${hasAffiliations} ${classes.NoSpace}`}>
            <Identity
              language={props.language}
              data={props.data}
            />
          </div>
          <div className={`${hasAffiliations} ${classes.NoSpace}`}>
            <Domains
              language={props.language}
              data={props.data}
            />
          </div>
          <div className={`${hasAffiliations} ${classes.NoSpace}`}>
            <Prizes
              language={props.language}
              data={props.data}
            />
          </div>
          <div className={`${hasAffiliations} ${classes.NoSpace}`}>
            <Web
              language={props.language}
              data={props.data}
            />
          </div>
          {
            (!props.data.affiliations)
              ? (
                <div className={`${hasAffiliations} ${classes.NoSpace}`}>
                  <Roles
                    language={props.language}
                    data={props.data}
                  />
                </div>
              )
              : null
          }
        </div>
      </div>
      {
        (props.data.affiliations)
          ? (
            <div className="col-lg">
              <div className="row">
                <div className={`col-12 ${classes.NoSpace}`}>
                  <Affiliations
                    language={props.language}
                    data={props.data.affiliations}
                  />
                </div>
                <div className={`col-12 ${classes.NoSpace}`}>
                  <Roles
                    language={props.language}
                    data={props.data}
                  />
                </div>
              </div>
            </div>
          )
          : null
      }
    </div>
  );
};

export default Informations;

Informations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};

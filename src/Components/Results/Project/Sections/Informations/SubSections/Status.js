import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';
import 'moment/locale/fr';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';
import SimpleCard from '../../../../../Shared/Ui/SimpleCard/SimpleCard2';
import PileCard from '../../../Components/PileCard';

import classes from './SubSectionsStyles.scss';

/**
 * Informations
 * Url : .
 * Informations : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Status = (props) => {
  moment.locale(props.language);
  let calculatedEndDate;
  if (props.data.startDate && props.data.duration) {
    const dt = new Date(props.data.startDate);
    dt.setMonth(dt.getMonth() + props.data.duration);
    calculatedEndDate = dt;
  }
  const statusEndDate = (props.data.endDate) ? new Date(props.data.endDate) : calculatedEndDate;
  const status = (statusEndDate > Date.now()) ? 'running' : 'over';
  const startDate = (props.data.startDate) ? moment(props.data.startDate).format('LL') : null;
  const endDate = (statusEndDate) && moment(statusEndDate).format('LL');
  let percents = 100;
  if (status && status === 'running') {
    percents = Math.round(
      ((Date.now() - new Date(props.data.startDate)) * 100 / (new Date(statusEndDate) - new Date(props.data.startDate))),
    );
  }
  return (
    <div className="col-6">
      <div className="row">
        <div className={`col-12 ${classes.NoSpace}`}>
          <CardsTitle title={<FormattedHTMLMessage id="Project.Informations.Status.title" />} />
        </div>
        <div className={`col-6 ${classes.CardContainer}`}>
          {
            (startDate)
              ? (
                <SimpleCard
                  language={props.language}
                  logo="fas fa-calendar-day"
                  title={<FormattedHTMLMessage id="Project.Informations.Status.startDate" />}
                  label={startDate}
                  tooltip=""
                />
              )
              : null
          }
        </div>
        <div className={`col-6 ${classes.CardContainer}`}>
          {
            (endDate)
              ? (
                <SimpleCard
                  language={props.language}
                  logo="fas fa-calendar-day"
                  title={<FormattedHTMLMessage id="Project.Informations.Status.endDate" />}
                  label={endDate}
                  tooltip=""
                />
              )
              : null
          }
        </div>
        <div className={`col-6 ${classes.CardContainer}`}>
          {
            (percents)
              ? (
                <PileCard
                  language={props.language}
                  percents={percents}
                />
              )
              : null
          }
        </div>
      </div>
    </div>
  );
};

export default Status;

Status.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import ButtonWithModal from '../../../../Shared/Ui/Buttons/ButtonWithModal';
import EmptySection from '../../../Shared/EmptySection/EmptySection';

import classes from './Evaluations.scss';
import logo from '../../../../Shared/images/hceres-logo.png';

/**
 * Evaluations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Evaluations = (props) => {
  // Test des données
  if (!props.data || !props.data.evaluations || !props.data.evaluations.length > 0) {
    return <EmptySection />;
  }

  const evaluations = props.data.evaluations;

  // 1) Liste des évaluateurs
  const evaluators = [];
  /* eslint-disable-next-line */
  for (const evaluation of evaluations) {
    const evaluator = evaluation.evaluator.split('__')[0];
    if (!evaluators.includes(evaluator)) {
      evaluators.push(evaluator);
    }
  }

  const JSXcontents = [];

  // Groupement par évaluateur
  /* eslint-disable-next-line */
  for (const evaluator of evaluators) {
    const listOfEvaluations = evaluations.filter(ev => ev.evaluator.split('__')[0] === evaluator);

    // 2) Groupement par année
    const years = [];
    /* eslint-disable-next-line */
    for (const evaluation of listOfEvaluations) {
      if (!years.includes(evaluation.year)) {
        years.push(evaluation.year);
      }
    }
    // Plus récentes en premier
    years.sort((a, b) => b - a);

    const jsx = years.map((year) => {
      let finalList = evaluations.filter(ev => ev.evaluator.split('__')[0] === evaluator && ev.year === year);
      const counter = finalList.length;
      let miniListJSX = null;
      let listJSX = null;
      if (counter < 3) {
        miniListJSX = finalList.map((el) => {
          const labels = el.evaluator.split('__');
          return (
            <div key={el.url}>
              <div className={classes.EvaluationLabel}>
                {labels[1]}
              </div>
              <div className="d-flex flex-row">
                <div>
                  <a href={el.url} target="_blank" rel="noopener noreferrer">
                    {labels[2]}
                    &nbsp;
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>
            </div>
          );
        });
        finalList = null;
      } else {
        listJSX = finalList.map((el) => {
          const labels = el.evaluator.split('__');
          return (
            <div className={classes.InnerListItem} key={el.url}>
              <div className={classes.EvaluationLabel}>
                {labels[1]}
              </div>
              <div className="d-flex flex-row">
                <div>
                  <a href={el.url} target="_blank" rel="noopener noreferrer">
                    {labels[2]}
                    &nbsp;
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>
            </div>
          );
        });
      }

      return (
        <div className={`col-md-6 ${classes.NoSpace} ${classes.CardContainer}`} key={year}>
          <div className={classes.EvaluationCard}>
            <div className="d-flex flex-row">
              <div className="w-100 text-center">
                <p className={classes.TitleYear}>{year}</p>
                <p className={classes.NbReports}>{counter}</p>
                <p className={classes.ReportsLabel}>
                  {<FormattedHTMLMessage id="Entity.Evaluations.report" />}
                  {(counter > 1) ? 's' : null}
                </p>
                <div>
                  {(finalList) ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <ButtonWithModal
                        logo="fas fa-landmark"
                        title={<FormattedHTMLMessage id="Entity.Evaluations.title" />}
                        buttonLabel={<FormattedHTMLMessage id="Entity.Evaluations.listLabel" />}
                        dataHtml={listJSX}
                      />
                    </div>
                  ) : (
                    <div>
                      <hr />
                      <div className="text-left">
                        {miniListJSX}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-auto">
                <img src={logo} alt="Evaluator logo" />
              </div>
            </div>

          </div>
        </div>
      );
    });
    JSXcontents.push(jsx);
  }


  return (
    <div className="row">
      {
        JSXcontents.map(card => card)
      }
    </div>
  );
};

export default Evaluations;

Evaluations.propTypes = {
  data: PropTypes.string.isRequired,
};

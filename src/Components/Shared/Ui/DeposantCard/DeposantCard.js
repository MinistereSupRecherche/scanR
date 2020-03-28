import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import getSelectKey from '../../../../Utils/getSelectKey';
import classes from './DeposantCard.scss';

// import logo from './icon-entities.svg';
import ButtonToPage from '../Buttons/ButtonToPage2';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/**
 * Leaders
 * Url : ex: /entite/200711886U
 * Description : Bloc Direction visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PersonCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  let label = props.data.label;
  const country = props.data.country;
  if (props.data.structure) {
    if (props.data.structure && props.data.structure.label) {
      label = getSelectKey(props.data.structure, 'label', props.language, 'default');
    }
  }
  let url = '';
  if (props.data.structure && props.data.structure.id) {
    url = `/entite/${props.data.structure.id}`;
  }

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`d-flex flex-column ${classes.PersonCard} ${props.className}`}>
        <div className={classes.Logo}>
          <i className="fas fa-edit fa-3x" alt="" />
        </div>
        <div className={classes.Name} title={label}>
          {label}
        </div>
        <div>
          {(country) ? (
            <span className={classes.Role}>
              {country}
            </span>
          ) : null}
        </div>
        {
          (url)
            ? (
              <div>
                <ButtonToPage
                  className={`${classes.Button} ${classes.btn_scanrBlue}`}
                  url={url}
                >
                  <FormattedHTMLMessage
                    id="DeposantCard.ButtonToPage.label"
                    defaultMessage="DeposantCard.ButtonToPage.label"
                  />
                </ButtonToPage>
              </div>
            )
            : null
        }
      </div>
    </IntlProvider>
  );
};

export default PersonCard;

PersonCard.propTypes = {
  data: PropTypes.object,
  language: PropTypes.string,
  className: PropTypes.any,
};

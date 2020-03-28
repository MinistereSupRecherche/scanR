import React, { Fragment } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
// import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';


/* SCSS */
import classes from './IdentityCard.scss';

/* Import des métadonnées */
import metadata from './metadata.json';

const IdentityCard = (props) => {
  const logo = `../img/${props.imageName}`;
  const logopart = (logo) ? (
    <Fragment>
      <div className={`row ${classes.Logo}`}>
        <img
          src={logo}
          alt={props.labelKey}
          className={`img-fluid ${classes.img}`}
        />
      </div>
      <hr />
    </Fragment>
  ) : null;
  const websourcepart = (metadata[`${props.labelKey}.WebSource`]) ? (
    <Fragment>
      <a href={metadata[`${props.labelKey}.WebSource`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            <FormattedHTMLMessage
              id="Identity.Source.Website.Title"
              defaultMessage="contentTexte"
            />
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
      <hr />
    </Fragment>
  ) : null;
  const webprodpart = (metadata[`${props.labelKey}.WebProducteur`]) ? (
    <Fragment>
      <a href={metadata[`${props.labelKey}.WebProducteur`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            <FormattedHTMLMessage
              id="Identity.Producer.Website.Title"
              defaultMessage="contentTexte"
            />
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
    </Fragment>
  ) : null;
  const webprodwikipediapart = (metadata[`${props.labelKey}.WebWikipedia`]) ? (
    <Fragment>
      <a href={metadata[`${props.labelKey}.WebWikipedia`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            <FormattedHTMLMessage
              id="Identity.Producer.Wikipedia.Title"
              defaultMessage="contentTexte"
            />
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
      <hr />
    </Fragment>
  ) : null;
  return (
    <div className={`container ${classes.IdentityCard}`}>
      {logopart}
      {websourcepart}
      <div className={classes.ProducteurGras}>
        <FormattedHTMLMessage
          id="Identity.Producer"
          defaultMessage="s"
        />
      </div>
      <div className={classes.ProducteurNom}>
        <FormattedHTMLMessage
          id={`Ressource.Producteur.Nom.${props.labelKey}`}
          defaultMessage="s"
        />
      </div>
      {webprodpart}
      {webprodwikipediapart}
    </div>
  );
};


export default IdentityCard;

IdentityCard.propTypes = {
  labelKey: PropTypes.string,
  imageName: PropTypes.string,
};

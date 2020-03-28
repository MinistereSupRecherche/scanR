import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';

import getSelectKey from '../../../../../Utils/getSelectKey';
import ButtonToPage from '../../../../Shared/Ui/Buttons/ButtonToPage';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './ProductionDetail.scss';

/**
 * ProductionDetail
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProductionDetail = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  if (Object.entries(props.data).length === 0) {
    return null;
  }

  let date = '';
  if (props.data.publicationDate) {
    date = moment(props.data.publicationDate).format('YYYY');
  }

  let id = '';
  if (props.data.id.substring(0, 3) === 'doi') {
    id = `doi : ${props.data.id.substring(3)}`;
  } else if (props.data.id.substring(0, 5) === 'these') {
    id = `these : ${props.data.id.substring(5)}`;
  } else if (props.data.id.substring(0, 5) === 'sudoc') {
    id = `sudoc : ${props.data.id.substring(5)}`;
  } else if (props.data.id.substring(0, 6) === 'brevet') {
    id = `brevet : ${props.data.id.substring(6)}`;
  }

  // Mots clés
  let keywords = [];
  if (props.data.keywords && props.data.keywords.fr) {
    keywords = props.data.keywords.fr;
  } else if (props.data.keywords && props.data.keywords.en) {
    keywords = props.data.keywords.en;
  }
  keywords = [...new Set(keywords)];

  // Auteurs
  const getInventors = (data) => {
    if (!data.authors || data.authors.length === 0) {
      return { inventeurs: null, deposants: null };
    }
    let inventeurs = data.authors.filter(auth => auth.role.indexOf('__inventeur') >= 0).map((auth) => {
      const [fullName, country] = auth.fullName.split('__');
      return { fullName, country };
    });
    inventeurs = [...new Set(inventeurs.map(i => JSON.stringify(i)))].length;

    let depos = data.authors.filter(deposant => deposant.role.indexOf('__deposant') >= 0).map((deposant) => {
      const label = deposant.fullName.split('__')[0];
      return { label, id: (deposant.affiliations && deposant.affiliations.length) && deposant.affiliations[0].structure };
    });
    depos = [...new Set(depos.map(i => JSON.stringify(i)))].map(i => JSON.parse(i));
    let deposants = 0;
    const ids = [];
    depos.forEach((deposant) => {
      if (deposant.id) {
        ids.push(deposant.id);
        if (ids.filter(iden => iden === deposant.id).length < 2) {
          deposants += 1;
        }
      } else {
        deposants += 1;
      }
    });
    return (
      <React.Fragment>
        <FormattedHTMLMessage id="inventor" values={{ count: inventeurs }} />
        ,&nbsp;
        <FormattedHTMLMessage id="deposant" values={{ count: deposants }} />
      </React.Fragment>
    );
  };

  const maxAuthors = 2;
  const getAuthors = (data) => {
    let authors = [];
    if (data.productionType === 'publication') {
      authors = data.authors.map((author) => {
        if (author.person) {
          return <a href={`person/${author.person.id}`} key={JSON.stringify(author)}>{author.fullName}</a>;
        }
        return <span key={JSON.stringify(author)}>{author.fullName}</span>;
      });
    } else if (data.productionType === 'thesis') {
      authors = data.authors
        .filter(author => author.role === 'author')
        .map((author) => {
          if (author.person) {
            return <a key={JSON.stringify(author)} href={`person/${author.person.id}`}>{author.fullName}</a>;
          }
          return <span key={JSON.stringify(author)}>{author.fullName}</span>;
        });
    } else {
      return [getInventors(data)];
    }
    return authors;
  };

  const authors = getAuthors(props.data).slice(0, maxAuthors);

  const diff = props.data.authors.length - maxAuthors;
  let others = '';
  if (diff === 1) {
    others = `${(props.language === 'fr') ? 'et ' : 'and '} 1 ${(props.language === 'fr') ? 'autre auteur' : 'more author'}`;
  } else if (diff > 1) {
    others = `${(props.language === 'fr') ? 'et ' : 'and '} ${diff} ${(props.language === 'fr') ? 'autres auteurs' : 'more authors'}`;
  }


  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="d-flex flex-column h-100">
        <p className={classes.detailTitle}>
          {getSelectKey(props.data, 'title', props.language, 'default')}
        </p>
        <p className="m-0">
          {
            authors.reduce((prev, curr) => [prev, ', ', curr])
          }
          {' '}
          {props.data.productionType === 'publication' && others}
        </p>
        <div>
          <p className={classes.Grey}>
            {
              (props.data.source && props.data.source.title)
                ? <a href={`recherche/publications?filters={"source.title": {"type": "MultiValueSearchFilter", "op": "any", "values": ["${props.data.source.title}"]}}`} className={classes.Italic}>{props.data.source.title}</a>
                : null
            }
            {(props.data.source && props.data.source.title && date) ? ' | ' : null}
            {date}
          </p>
          <p className={classes.Grey}>
            {id}
          </p>
        </div>
        {
          (getSelectKey(props.data, 'summary', props.language, 'default') || keywords.length > 0)
            ? <hr className={`w-100 ${classes[props.data.productionType]}`} />
            : null
        }
        {
          (getSelectKey(props.data, 'summary', props.language, 'default'))
            ? (
              <div className={classes.Summary}>
                {getSelectKey(props.data, 'summary', props.language, 'default')}
              </div>
            )
            : null
        }
        <div className={classes.Keywords}>
          {
            keywords.map(keyword => (
              <Fragment key={keyword}>
                <a href={`/recherche/all?query=${keyword}`}>
                  {`#${keyword}`}
                </a>
                &nbsp;
              </Fragment>
            ))
          }
        </div>
        <hr className={`w-100 mt-auto ${classes[props.data.productionType]}`} />
        <div className="d-flex justify-content-between flex-wrap">
          <div className={`my-1 ${classes.Oa}`}>
            {(props.data.isOa) ? (
              <div className="d-flex align-items-center">
                <span aria-hidden className={`fa-stack ${classes.isOa}`}>
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fas fa-lock-open fa-stack-1x fa-inverse" />
                </span>
                <ButtonToPage
                  className={`${classes.btn_scanrBlue} ${classes.RectangleButton}`}
                  url={props.data.oaEvidence.url}
                  target="_blank"
                >
                  {(props.language === 'fr') ? 'Accéder à la publication' : 'Access the publication'}
                </ButtonToPage>
              </div>
            ) : (
              <span className={`fa-stack ${classes.isNotOa}`}>
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fas fa-lock fa-stack-1x fa-inverse" />
              </span>
            )}
          </div>
          <ButtonToPage
            className={`${classes.btn_scanrBlue} ${classes.RectangleButton}`}
            url={`publication/${props.data.id.replace(new RegExp('/', 'g'), '%25252f')}`}
          >
            <FormattedHTMLMessage id="voir_production" />
          </ButtonToPage>
        </div>
      </div>
    </IntlProvider>
  );
};

export default ProductionDetail;

ProductionDetail.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import TagCard from '../../../../../../Shared/Ui/TagCard/TagCard';
import getSelectedKey from '../../../../../../../Utils/getSelectKey';
import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';

import classes from './Domains.scss';

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Domains = (props) => {
  if (props.data) {
    let tags = [];
    if (props.data.domains && props.data.domains.length > 0) {
      tags = props.data.domains
        .filter(dom => dom.type !== 'macro_level_barometre')
        .map(dom => getSelectedKey(dom, 'label', props.language, 'default'))
        .filter(txt => (txt))
        .filter(txt => (txt.length > 1))
        .map(txt => txt.split('(')[0])
        .map(txt => txt.split('/')[txt.split('/').length - 1])
        .map(txt => txt.split('[')[0])
        .sort((a, b) => a.length - b.length);
    }
    const domains = [...new Set(tags)];
    const keywords = [...new Set(getSelectedKey(props.data, 'keywords', props.language, 'default'))];
    const tagL = keywords.concat(domains);
    const tagList = [...new Set(tagL)];
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle
              title={<FormattedHTMLMessage id="Person.Informations.Domains.title" />}
              lexicon="PersonThematics"
              language={props.language}
            />
          </div>
        </div>
        <div className="row">
          <div className={`col-md ${classes.CardContainer}`}>
            <TagCard
              logo="fas fa-flask"
              title={<FormattedHTMLMessage id="Person.Informations.Domains.domainCard" />}
              tagList={tagList}
              language={props.language}
              labelListButton="Tous les domaines"
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Domains;

Domains.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};

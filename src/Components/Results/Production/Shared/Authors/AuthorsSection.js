import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import PersonCard from '../../../../Shared/Ui/PersonCard/PersonCard';
import CounterCard from '../../../../Shared/Ui/CounterCard/CounterCard';
import CounterListCard from '../../../../Shared/Ui/CounterListCard/CounterListCard';

import classes from '../../../../../style.scss';

/**
 * Open Access Section
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const AuthorsSection = (props) => {
  const getAuthors = role => (props.data.authors.filter(person => person.role === role));

  const getSortedAuthors = () => {
    const orderAuthors = ['author', 'directeurthese', 'rapporteur', 'presidentjury', 'membrejury'];
    const sortedAuthors = [];
    orderAuthors.forEach((role) => {
      const authors = getAuthors(role);
      if (authors.length > 0) {
        authors.forEach(author => sortedAuthors.push(author));
      }
    });

    // Ajout des auteurs sans role
    props.data.authors.forEach((author) => {
      if (!sortedAuthors.find(authorIn => author === authorIn)) {
        sortedAuthors.push(author);
      }
    });

    return sortedAuthors;
  };


  const nbAuthorsToShow = 6;
  const sortedAuthors = getSortedAuthors();

  return (
    <Fragment>
      <div className="row">
        {
          (props.data.authors && props.data.authors.length > 1)
            ? (
              <div className={`col-md-3 ${classes.CardContainer}`}>
                <CounterCard
                  counter={sortedAuthors.length}
                  title=""
                  label={(props.data.type === 'these') ? <FormattedHTMLMessage id="Publication.thesis.persons" /> : <FormattedHTMLMessage id="Publication.publication.persons" />}
                  color="Persons"
                  className={classes.PersonCardHeight}
                />
              </div>
            ) : null
        }
        {
          sortedAuthors.map((author, index) => {
            if (index < nbAuthorsToShow && (author.fullName || author.firstName || author.lastName)) {
              return (
                <div className={`col-md-3 ${classes.CardContainer}`}>
                  <PersonCard
                    data={author}
                    showTitle={false}
                    language={props.language}
                    className={classes.PersonCardHeight}
                    role={(props.data.type === 'these') ? author.role : null}
                  />
                </div>
              );
            }
            return null;
          })
        }
        {
          (props.data.authors && sortedAuthors.length > nbAuthorsToShow)
            ? (
              <div className={`col-md-3 ${classes.CardContainer}`}>
                <CounterListCard
                  language={props.language}
                  data={sortedAuthors}
                  objectType={props.data.productionType}
                  limit={nbAuthorsToShow}
                  title=""
                  color="Default"
                  labelKey="authors-publication"
                  isPerson
                />
              </div>
            ) : null
        }
      </div>
    </Fragment>
  );
};

export default AuthorsSection;

AuthorsSection.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

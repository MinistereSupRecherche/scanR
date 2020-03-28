import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Markdown from 'markdown-to-jsx';

/* Gestion des langues */
import messagesPanelFr from './translations/fr.json';
import messagesPanelEn from './translations/en.json';

/* Chargement du lexique */
import terms from '../../terms/faq.json';

/* SCSS */
import classes from './FAQModal.scss';

class FAQModal extends Component {
  state={
    showModal: false,
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  render() {
    const messagesPanel = {
      fr: messagesPanelFr,
      en: messagesPanelEn,
    };

    if (this.props.target) {
      const termObject = terms.find(el => el.key === this.props.target);
      const term = (termObject) ? termObject.label[this.props.language] : null;
      const definition = (termObject) ? termObject.definition[this.props.language] : null;
      return (
        <IntlProvider locale={this.props.language} messages={messagesPanel[this.props.language]}>
          <Fragment>
            <Modal
              show={this.state.showModal}
              onHide={this.handleCloseModal}
              className={classes.FAQModal}
              size="lg"
            >
              <Modal.Header closeButton className={classes.Header}>
                <p className={classes.Title}>
                  <i className="fas fa-question-circle" />
                  <FormattedHTMLMessage id="faq" />
                </p>
              </Modal.Header>
              <Modal.Body className={classes.Content}>
                <p className={classes.Term}>
                  {term}
                </p>
                <p className={classes.Definition}>
                  <Markdown>
                    {definition}
                  </Markdown>
                </p>
              </Modal.Body>
              <Modal.Footer className={classes.Footer}>
                <a href="/faq" target="_blank" rel="noopener noreferrer">
                  <FormattedHTMLMessage id="fullFaq" />
                  &nbsp;
                  <i className="fas fa-external-link-alt" />
                </a>
              </Modal.Footer>
            </Modal>
            {/* eslint-disable-next-line */}
            <span onClick={this.handleShowModal}>
              {this.props.children}
            </span>
          </Fragment>
        </IntlProvider>
      );
    }
    return null;
  }
}

export default FAQModal;

FAQModal.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  target: PropTypes.string.isRequired,
};

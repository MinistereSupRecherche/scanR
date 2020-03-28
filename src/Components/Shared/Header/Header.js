import React, { useContext } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { GlobalContext } from '../../../GlobalContext';
import ShareModal from '../ShareModal/ShareModal';
import useScrollY from '../../../Hooks/useScrollY';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Header.scss';

import LogoScanrWhiteSVG from '../svg/logo-scanr-blue';


const Header = () => {
  const context = useContext(GlobalContext);
  const scrollY = useScrollY();

  const frActive = (context.language === 'fr') ? classes.ActiveLink : '';
  const enActive = (context.language === 'en') ? classes.ActiveLink : '';

  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={context.language} messages={messages[context.language]}>
      <section className={`${classes.Header} ${(scrollY !== 0) ? classes.HeaderScroll : null}`}>
        <div className={classes.ribbon}>Bêta</div>
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${classes['has-background-white']}`}>
          <a className="navbar-brand" href="/">
            <LogoScanrWhiteSVG fill={classes.scanrdeepblueColor} height="40px" width="160px" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className={`dropdown-toggle ${classes.Link}`}
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FormattedHTMLMessage
                    id="Header.link.about"
                    defaultMessage="Header.link.about"
                  />
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/faq">
                    <FormattedHTMLMessage
                      id="Header.link.faq"
                      defaultMessage="Header.link.faq"
                    />
                  </a>
                  <a className="dropdown-item" href="/ressources">
                    <FormattedHTMLMessage
                      id="Header.link.sources"
                      defaultMessage="Header.link.sources"
                    />
                  </a>
                  <a className="dropdown-item" href="/opendata">
                    <FormattedHTMLMessage
                      id="Header.link.opendata"
                      defaultMessage="Header.link.opendata"
                    />
                  </a>
                  <a className="dropdown-item" href="/l-equipe-et-son-projet">
                    <FormattedHTMLMessage
                      id="Header.link.team"
                      defaultMessage="Header.link.team"
                    />
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="https://data.esr.gouv.fr/FR/" target="_blank" rel="noopener noreferrer">
                    <FormattedHTMLMessage
                      id="Header.link.dataesr"
                      defaultMessage="Header.link.dataesr"
                    />
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className={classes.Link} href="/recherche/all">
                  <FormattedHTMLMessage
                    id="Header.link.search"
                    defaultMessage="Header.link.search"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className={classes.Link} href="/focus">
                  <FormattedHTMLMessage
                    id="Header.link.focus"
                    defaultMessage="Header.link.focus"
                  />
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <ShareModal />
              </li>
              <li className={`nav-item ${classes.Link}`}>
                <a
                  className={`px-1 ${frActive}`}
                  onClick={() => context.switchLanguage('fr')}
                  onKeyPress={() => context.switchLanguage('fr')}
                  role="button"
                  tabIndex={0}
                >
                  FR
                </a>
                <span className={classes.PipeLink}>|</span>
                <a
                  className={`pl-1 ${enActive}`}
                  onClick={() => context.switchLanguage('en')}
                  onKeyPress={() => context.switchLanguage('en')}
                  role="button"
                  tabIndex={0}
                >
                  EN
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </IntlProvider>
  );
};
export default Header;

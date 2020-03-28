import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

// import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import LogoCard from '../../Shared/Ui/LogoCard/LogoCard';
// import Banner from '../../Shared/Banner/Banner';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Legal-notice.scss';

import Background from './poudre-bleu_Fgris-B.jpg';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
};

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const LegalNoticePage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.LegalNoticePage}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <HeaderTitle
        language={props.language}
        labelkey="legal"
        url1="/"
      />
      <section style={sectionStyle} className={classes.LegalSectionPoudre}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.service"
                  defaultMessage="Section.title.service"
                />
              </div>
              <div className={classes.bold}>
                <FormattedHTMLMessage
                  id="Section.text.service.bold"
                  defaultMessage="Section.title.service"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.service.light"
                  defaultMessage="Section.title.service"
                />
              </div>
              <div className={classes.address}>
                <FormattedHTMLMessage
                  id="Section.text.service.address"
                  defaultMessage="Section.title.service"
                />
              </div>
              { /* <div className={`row ${classes.buttonsRow}`}>
                <div className="col-lg-4">
                  <ButtonToPage
                    className={classes.MarginTop}
                    url="#"
                  >
                    <FormattedHTMLMessage
                      id="Voir"
                      defaultMessage="Voir"
                    />
                  </ButtonToPage>
                </div>
                <div className="col-lg-4">
                  <ButtonToPage
                    className={classes.MarginTop}
                    url="#"
                  >
                    Contactez-nous
                  </ButtonToPage>
                </div>
              </div> */ }
            </div>
            <div className={`col-lg-4 ${classes.CardContainer}`}>
              <div className={`${classes.CardContainer}`}>
                <LogoCard
                  label="scanr-blue"
                />
              </div>
              <div className={`${classes.CardContainer}`}>
                <LogoCard
                  label="ministere"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.LegalSectionBlanc}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-4">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.actor1"
                  defaultMessage="Section.title.actor1"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.actor1.light"
                  defaultMessage="Section.text.actor1.light"
                />
              </div>
              <div className={classes.bold}>
                <FormattedHTMLMessage
                  id="Section.text.actor1.bold"
                  defaultMessage="Section.text.actor1.bold"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.actor2"
                  defaultMessage="Section.title.actor2"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.actor2.light"
                  defaultMessage="Section.text.actor2.light"
                />
              </div>
              <div className={classes.bold}>
                <FormattedHTMLMessage
                  id="Section.text.actor2.bold"
                  defaultMessage="Section.text.actor2.bold"
                />
              </div>
              { /* <div className={classes.address}>
                <FormattedHTMLMessage
                  id="Section.text.actor2.address"
                  defaultMessage="Section.text.actor2.address"
                />
              </div>
              <ButtonToPage
                className={classes.MarginTop}
                url="#"
              >
                Voir le site
              </ButtonToPage> */}
            </div>
            <div className="col-lg-4">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.actor3"
                  defaultMessage="Section.title.actor3"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.actor3.light"
                  defaultMessage="Section.text.actor3.light"
                />
              </div>
              <div className={classes.bold}>
                <FormattedHTMLMessage
                  id="Section.text.actor3.bold"
                  defaultMessage="Section.text.actor3.bold"
                />
              </div>
              { /* <div className={classes.address}>
                <FormattedHTMLMessage
                  id="Section.text.actor3.address"
                  defaultMessage="Section.text.actor3.address"
                />
              </div>
              <ButtonToPage
                className={classes.MarginTop}
                url="#"
              >
                Voir le site
              </ButtonToPage> */}
            </div>
          </div>
        </div>
      </section>

      <section className={classes.LegalSectionGris}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.team"
                  defaultMessage="Section.title.team"
                />
              </div>
              <div className={classes.paragraph}>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.team.bold1"
                    defaultMessage="Section.text.team.bold1"
                  />
                </div>
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.team.light1"
                    defaultMessage="Section.text.team.light1"
                  />
                </div>
              </div>
              { /* <div className={classes.paragraph}>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.team.bold2"
                    defaultMessage="Section.text.team.bold2"
                  />
                </div>
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.team.light2"
                    defaultMessage="Section.text.team.light2"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className={classes.LegalSectionBlanc}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.data1"
                  defaultMessage="Section.title.data1"
                />
              </div>
              <div className={classes.subtitle}>
                <FormattedHTMLMessage
                  id="Section.subtitle.data1"
                  defaultMessage="Section.subtitle.data1"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.data1.light"
                  defaultMessage="Section.text.data1.light"
                />
              </div>
            </div>
            { /* <div className="col-lg-4">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.data2"
                  defaultMessage="Section.title.data2"
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      { /* <section className={classes.LegalSectionGris}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.personal"
                  defaultMessage="Section.title.personal"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      { /* <section>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.credit"
                  defaultMessage="Section.title.credit"
                />
              </div>
              <div className="sectionContent">
                <div className="content">
                  <FormattedHTMLMessage
                    id="credit.image"
                    defaultMessage="credit.image"
                  />
                </div>
                <div className="content">
                  <FormattedHTMLMessage
                    id="credit.infographic"
                    defaultMessage="credit.infographic"
                  />
                </div>
                <div className="content">
                  <FormattedHTMLMessage
                    id="credit.video"
                    defaultMessage="credit.video"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section style={sectionStyle} className={classes.LegalSectionPoudre}>
        <div className="container">
          <div className="row">
            <CardWithButton
              language={props.language}
              messages={messages}
              schema="card_dark"
              title="Discover.TalkAboutScanr"
              url="./medias"
              lib_button="Voir"
              position="CardCenter"
            />
            <CardWithButton
              language={props.language}
              messages={messages}
              schema="card_dark"
              title="Discover.Sources"
              url="./ressources"
              lib_button="Voir"
              position="CardCenter"
            />
            <CardWithButton
              language={props.language}
              messages={messages}
              schema="card_dark"
              title="Discover.Team"
              url="./l-equipe-et-son-projet"
              lib_button="Voir"
              position="CardCenter"
            />
          </div>
        </div>
      </section>

      { /* <Banner
        language={props.language}
        labelKey="Appear"
        cssClass="BannerDark"
        url=""
      /> */ }

      <Footer language={props.language} />

    </div>
  </IntlProvider>
);

export default LegalNoticePage;

LegalNoticePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};

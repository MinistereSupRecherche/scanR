import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';


// Composants
import ScanRMeta from '../Shared/MetaTags/ScanRMeta';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import Banner from '../Shared/Banner/Banner';
import ButtonToPage from '../Shared/Ui/Buttons/ButtonToPage';
import Loader from '../Shared/LoadingSpinners/RouterSpinner';

import getSelectKey from '../../Utils/getSelectKey';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import PublicationsKeywords from '../Shared/StandaloneGraphs/PublicationsKeywords';
import PublicationsPacketBubble from '../Shared/StandaloneGraphs/PublicationsPacketBubble';
import OpendataPackedBubble from './Components/OpendataPackedBubble';
import EntityNetwork from '../Shared/StandaloneGraphs/EntityNetwork';
import OpendataEntityMap from './Components/OpendataEntityMap';
import GenderTreemap from './Components/GenderTreemap';
import EntityList from './Components/EntityList';
import PublicationList from './Components/PublicationList';
import YoutubeList from './Components/YoutubeList';
import EntityMap from '../Shared/StandaloneGraphs/EntityMap';
import GridMap from '../Shared/StandaloneGraphs/GridMap';
import SimpleAggregationGraph from '../Shared/StandaloneGraphs/SimpleAggregationGraph';
import LastFocus from '../Shared/LastFocus/LastFocus';
import classes from './Focus.scss';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';
/**
 * Focus
 * Url : /focus/$id <br/>
 *  Description : Page qui va charger GraphComponent <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/
const msg = {
  fr: messagesFr,
  en: messagesEn,
};

const GraphTypes = {
  GridMap,
  EntityMap,
  EntityList,
  EntityNetwork,
  PublicationList,
  PublicationsKeywords,
  PublicationsPacketBubble,
  OpendataPackedBubble,
  GenderTreemap,
  SimpleAggregationGraph,
  OpendataEntityMap,
  YoutubeList,
};

const buildFocusFromConfig = (components, lang) => {
  const componentsData = [];
  components.forEach((component) => {
    const properties = {
      request: component.request,
      style: { height: '60vh' },
      api: component.api,
      opendata: component.opendata,
      aggSize: component.aggSize,
      aggField: component.aggField,
      filename: component.filename,
      tooltipEn: component.tooltipEn,
      tooltipFr: component.tooltipFr,
      graphType: component.graphType,
      lexicon: component.lexicon,
      href: component.href,
      title: getSelectKey(component, 'title', lang, 'fr'),
      subtitle: getSelectKey(component, 'subtitle', lang, 'fr'),
      language: lang,
    };
    const Comp = GraphTypes[component.componentType];
    componentsData.push(<React.Fragment key={component.title.fr}><Comp {...properties} /></React.Fragment>);
  });
  return componentsData;
};


const Focus = (props) => {
  let isError = true;
  let isLoading = true;
  let data = [];
  if (isError || data.length === 0) {
    const filename = `./Configs/${props.match.params.id}.json`;
    // eslint-disable-next-line
    data = require(`${filename}`);
    isLoading = false;
    isError = true;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (data) {
    const htmlList = buildFocusFromConfig(data.components, props.language);
    return (
      <IntlProvider locale={props.language} messages={msg[props.language]}>
        <div className="d-flex flex-column h-100">
          <ScanRMeta
            title={getSelectKey(data, 'title', props.language, 'fr')}
            href2="/focus"
            href2Title="Focus"
            href3={`/focus/${props.match.params.id}`}
          />
          <Header />
          <HeaderTitle
            language={props.language}
            title={getSelectKey(data, 'title', props.language, 'fr')}
            labelkey="focus"
            url1="/"
            url2="/focus"
          />
          <section className={classes.FocusSection}>
            <div className="container d-flex flex-column pb-4">
              <div className="py-3 px-2">
                <Markdown>{getSelectKey(data, 'text', props.language, 'fr')}</Markdown>
                <div className="container d-flex py-1 align-items-center">
                  <div className="flex-grow-1">
                    {
                      (data.tags)
                        ? getSelectKey(
                          data,
                          'tags',
                          props.language,
                          'fr',
                        ).map(tag => <a key={tag} href={`/recherche/all?query=${tag}`} className="pr-1">{`#${tag} `}</a>)
                        : null
                    }
                  </div>
                  <div className="pl-2">
                    {
                      (data.href)
                        ? (
                          <ButtonToPage
                            className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
                            target="_blank"
                            url={data.href}
                          >
                            <FormattedHTMLMessage id="Focus.button.explorScanr" />
                          </ButtonToPage>
                        )
                        : null
                    }
                  </div>
                  <div className="pl-2">
                    {
                      (data.hrefOpendata)
                        ? (
                          <ButtonToPage
                            className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
                            target="_blank"
                            url={data.hrefOpendata}
                          >
                            <FormattedHTMLMessage id="Focus.button.explorOpenData" />
                          </ButtonToPage>
                        )
                        : null
                    }
                  </div>
                </div>
              </div>
              {htmlList.map(elem => elem)}
            </div>
          </section>
          <Banner
            language={props.language}
            labelKey="Explore"
            cssClass="BannerDark"
            url={data.hrefX}
            target="_blank"
          />
          <LastFocus language={props.language} match={props.match} />
          <Footer />
        </div>
      </IntlProvider>
    );
  }
  return (<div>PROBLEM</div>);
};

export default Focus;

Focus.propTypes = {
  match: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

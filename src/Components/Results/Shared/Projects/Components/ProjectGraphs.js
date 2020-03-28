import React from 'react';
import PropTypes from 'prop-types';

import BarChart from '../../../../Shared/GraphComponents/Graphs/HighChartsBar';
import WorldCloud from '../../../../Shared/GraphComponents/Graphs/HighChartsWordCloud';
import YearChart from '../../../../Shared/GraphComponents/Graphs/HighChartsLine';
import SankeyChart from '../../../../Shared/GraphComponents/Graphs/HighChartsSankey';
import classes from './ProjectGraphs.scss';

/**
 * ProjectGraphs
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProjectGraphs = (props) => {
  const createWordCloudData = () => (
    props.graphData.keywords
  );

  const createSankeyData = () => {
    const relations = [];
    for (let i = 0; i < props.data.length; i += 1) {
      const currentProject = props.data[i].value;
      const type = currentProject.type;
      const year = (currentProject.year) ? (currentProject.year.toString()) : 'NODATA#';
      const duration = (currentProject.duration) ? (currentProject.duration) : -1;
      let durationKey = 'NODATA#';
      if (duration > 0 && duration <= 6) {
        durationKey = '0-6 mois';
      }
      if (duration > 6 && duration <= 12) {
        durationKey = '7-12 mois';
      }
      if (duration > 12 && duration <= 24) {
        durationKey = '13-24 mois';
      }
      if (duration > 24 && duration <= 36) {
        durationKey = '25-36 mois';
      }
      if (duration > 36 && duration <= 48) {
        durationKey = '37-48 mois';
      }
      if (duration > 48) {
        durationKey = '48+ mois';
      }

      const nbParticipants = (currentProject.participantCount) ? (currentProject.participantCount) : 0;
      let participantKey = 'NODATA#';
      if (nbParticipants > 0 && nbParticipants <= 1) {
        participantKey = '1 participant';
      }
      if (nbParticipants > 2 && nbParticipants <= 5) {
        participantKey = '2-5 participants';
      }
      if (nbParticipants > 5 && nbParticipants <= 10) {
        participantKey = '6-10 participants';
      }
      if (nbParticipants > 10) {
        participantKey = '11+ participants';
      }


      const key1 = year.concat(';', type);
      const key2 = type.concat(';', participantKey);
      const key3 = participantKey.concat(';', durationKey);
      const keys = [key1, key2, key3];
      for (let j = 0; j < keys.length; j += 1) {
        if (keys[j].indexOf('NODATA#') === -1) {
          if (!(keys[j] in relations)) {
            relations[keys[j]] = 0;
          }
          relations[keys[j]] += 1;
        }
      }
    }
    const sankeyData = [];
    const keys = Object.keys(relations);
    for (let i = 0; i < keys.length; i += 1) {
      const from = keys[i].split(';')[0];
      const to = keys[i].split(';')[1];
      const weight = relations[keys[i]];
      sankeyData.push([from, to, weight]);
    }
    return sankeyData;
  };
  const graphs = ['types', 'years', 'keywords', 'sankey'];
  const labelFor = {
    fr: {
      years: 'Projets par année',
      keywords: 'Nuage de mots clés des projets',
      types: 'Types de projets',
      sankey: 'Caractéristiques des projets',
    },
    en: {
      years: 'Projects by year',
      keywords: 'Wordcloud for projects',
      types: 'Project types',
      sankey: 'Project caracteristics',
    },
  };
  const active = (props.activeGraph) ? props.activeGraph : 'types';
  const subtitle = (props.language === 'fr') ? ("Avertissement : Ces données ne représentent que ce que scanR a réussi à collecter. Elles ne doivent pas être utilisées à des fins d'évaluation.") : ('Disclaimer: These data represent only what scanR managed to collect. They cannot be used for assessment purposes.');

  const renderGraph = () => {
    if (active === 'keywords') {
      const data = createWordCloudData();
      return <WorldCloud filename={labelFor[props.language][active]} data={data} language={props.language} subtitle={subtitle} />;
    }
    if (active === 'sankey') {
      const data = createSankeyData();
      return <SankeyChart filename={labelFor[props.language][active]} data={data} language={props.language} subtitle={subtitle} />;
    }
    if (active === 'years') {
      const data = {
        entries: props.graphData[active].entries.sort((a, b) => (a.value - b.value)),
      };
      return <YearChart filename={labelFor[props.language][active]} data={data} language={props.language} subtitle={subtitle} />;
    }
    return (
      <BarChart filename={labelFor[props.language][active]} data={props.graphData[active]} language={props.language} subtitle={subtitle} />
    );
  };

  const graphNav = () => (
    graphs.map(graph => (
      <button
        key={graph}
        type="button"
        className={`btn mx-1 ${classes.graphSelector} ${(graph === active) ? classes.active : ''}`}
        onClick={() => props.setActiveGraphHandler(graph)}
        onKeyPress={() => props.setActiveGraphHandler(graph)}
        disabled={props.graphData[graph] && props.graphData[graph].entries && props.graphData[graph].entries.length === 0}
      >
        {labelFor[props.language][graph]}
      </button>
    ))
  );
  if (props.totalPerType[props.ProjectType] < 2) {
    return (
      <React.Fragment>
        <div className={`justify-content-center py-1 ${classes.ProjectGraphs}`}>
          <p className={`py-5 pl-4 ${classes.ToFew}`}>
            {
              (props.language === 'fr')
                ? 'Trop peu de publication pour afficher les visualisations'
                : 'Not enought data to print vizualisations'
            }
          </p>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.ProjectGraphs}>
        <div className="justify-content-center py-1">
          {graphNav()}
        </div>
        <div className="row">
          <div className={`col-md-12 ${classes.graphCard}`}>
            {renderGraph(props.activeGraph, props.graphData)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectGraphs;

ProjectGraphs.propTypes = {
  language: PropTypes.string.isRequired,
  activeGraph: PropTypes.string,
  setActiveGraphHandler: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  data: PropTypes.object,
  ProjectType: PropTypes.string,
  totalPerType: PropTypes.object.isRequired,
};

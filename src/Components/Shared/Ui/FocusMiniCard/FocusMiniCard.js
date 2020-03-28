import React from 'react';
import PropTypes from 'prop-types';

import BubbleSVG from '../../svg/icon-focus-bubble';
import BubbleTopSVG from '../../svg/icon-focus-bubbleTop';
import DonutSVG from '../../svg/icon-focus-donut';
import HistoTopSVG from '../../svg/icon-focus-histoTop';
import MapSVG from '../../svg/icon-focus-map';
import TreemapSVG from '../../svg/icon-focus-treemap';
import YoutubeSVG from '../../svg/icon-focus-youtube';
import MT180SVG from '../../svg/icon-focus-mt180';
import SoftwareHeritageSVG from '../../svg/icon-focus-software-heritage';

/* SCSS */
import classes from './FocusMiniCard.scss';

const FocusMiniCard = (props) => {
  let color = '#ffffff';
  switch (props.schema) {
    case 'structures':
      color = classes.entityColor;
      break;
    case 'persons':
      color = classes.personColor;
      break;
    case 'projects':
      color = classes.projectgreenColor;
      break;
    case 'publications':
      color = classes.productionColor;
      break;
    default:
      color = classes.scanrblueColor;
  }

  let componentSvg = null;
  const marginMT = { 'margin-bottom': '28px' };
  switch (props.type) {
    case 'bubble':
      componentSvg = <BubbleSVG fill={color} width="50px" />;
      break;
    case 'bubbleTop':
      componentSvg = <BubbleTopSVG fill={color} width="50px" />;
      break;
    case 'donut':
      componentSvg = <DonutSVG fill={color} width="50px" />;
      break;
    case 'histoTop':
      componentSvg = <HistoTopSVG fill={color} width="50px" />;
      break;
    case 'map':
      componentSvg = <MapSVG fill={color} width="50px" />;
      break;
    case 'youtube':
      componentSvg = <YoutubeSVG fill={color} width="50px" />;
      break;
    case 'mt180':
      componentSvg = <MT180SVG fill={color} style={marginMT} width="50px" />;
      break;
    case 'software-heritage':
      componentSvg = <SoftwareHeritageSVG fill={color} width="50px" />;
      break;
    case 'treemap':
      componentSvg = <TreemapSVG fill={color} width="50px" />;
      break;
    default:
      componentSvg = null;
  }

  return (
    <div className={`d-flex align-items-center ${classes.FocusMiniCard}`}>
      <a href={props.url} className="pr-3">
        {componentSvg}
      </a>
      <a href={props.url} className={classes.Title}>
        {props.title}
      </a>
    </div>
  );
};

export default FocusMiniCard;

FocusMiniCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  schema: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

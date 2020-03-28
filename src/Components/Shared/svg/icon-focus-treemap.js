import React from 'react';
import PropTypes from 'prop-types';

const SVG = props => (
  <svg
    width={props.width}
    style={props.style}
    height={props.width}
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${props.className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="icon-focus-treemap">
      <g>
        <g>
          <g>
            <rect x="17" y="17" width="56" height="96" rx="2.55" ry="2.55" fill={props.fill} />
            <path d="M70.45,19a.55.55,0,0,1,.55.55v90.91a.55.55,0,0,1-.55.55H19.55a.55.55,0,0,1-.55-.55V19.55a.55.55,0,0,1,.55-.55H70.45m0-4H19.55A4.55,4.55,0,0,0,15,19.55v90.91A4.55,4.55,0,0,0,19.55,115H70.45A4.55,4.55,0,0,0,75,110.45V19.55A4.55,4.55,0,0,0,70.45,15Z" fill="#fff" />
          </g>
          <g>
            <path d="M79.54,67h30.91A2.54,2.54,0,0,1,113,69.54V85.28a2.55,2.55,0,0,1-2.55,2.55H79.54A2.55,2.55,0,0,1,77,85.28V69.54A2.54,2.54,0,0,1,79.54,67Z" fill={props.fill} />
            <path d="M110.45,69a.55.55,0,0,1,.55.55V85.28a.55.55,0,0,1-.55.55H79.55a.55.55,0,0,1-.55-.55V69.55a.55.55,0,0,1,.55-.55h30.91m0-4H79.55A4.55,4.55,0,0,0,75,69.55V85.28a4.55,4.55,0,0,0,4.55,4.55h30.91A4.55,4.55,0,0,0,115,85.28V69.55A4.55,4.55,0,0,0,110.45,65Z" fill="#fff" />
          </g>
          <g>
            <rect x="77" y="17" width="36" height="46" rx="2.55" ry="2.55" fill={props.fill} />
            <path d="M110.45,19a.55.55,0,0,1,.55.55V60.45a.55.55,0,0,1-.55.55H79.55a.55.55,0,0,1-.55-.55V19.55a.55.55,0,0,1,.55-.55h30.91m0-4H79.55A4.55,4.55,0,0,0,75,19.55V60.45A4.55,4.55,0,0,0,79.55,65h30.91A4.55,4.55,0,0,0,115,60.45V19.55A4.55,4.55,0,0,0,110.45,15Z" fill="#fff" />
          </g>
          <g>
            <path d="M99.55,91.83h10.91A2.54,2.54,0,0,1,113,94.37v16.08a2.55,2.55,0,0,1-2.55,2.55H99.55A2.55,2.55,0,0,1,97,110.45V94.37A2.55,2.55,0,0,1,99.55,91.83Z" fill={props.fill} />
            <path d="M110.45,93.83a.55.55,0,0,1,.55.55v16.08a.55.55,0,0,1-.55.55H99.55a.55.55,0,0,1-.55-.55V94.37a.55.55,0,0,1,.55-.55h10.91m0-4H99.55A4.55,4.55,0,0,0,95,94.37v16.08A4.55,4.55,0,0,0,99.55,115h10.91a4.55,4.55,0,0,0,4.55-4.55V94.37a4.55,4.55,0,0,0-4.55-4.55Z" fill="#fff" />
          </g>
          <g>
            <path d="M79.55,91.83H90.46A2.54,2.54,0,0,1,93,94.37v16.08A2.55,2.55,0,0,1,90.45,113H79.55A2.55,2.55,0,0,1,77,110.45V94.37A2.55,2.55,0,0,1,79.55,91.83Z" fill={props.fill} />
            <path d="M90.45,93.83a.55.55,0,0,1,.55.55v16.08a.55.55,0,0,1-.55.55H79.55a.55.55,0,0,1-.55-.55V94.37a.55.55,0,0,1,.55-.55H90.45m0-4H79.55A4.55,4.55,0,0,0,75,94.37v16.08A4.55,4.55,0,0,0,79.55,115H90.45A4.55,4.55,0,0,0,95,110.45V94.37a4.55,4.55,0,0,0-4.55-4.55Z" fill="#fff" />
          </g>
        </g>
        <g>
          <rect x="15" y="15" width="60" height="100" rx="4.55" ry="4.55" fill="none" stroke={props.fill} strokeMiterlimit="10" />
          <rect x="75" y="65" width="40" height="24.83" rx="4.55" ry="4.55" fill="none" stroke={props.fill} strokeMiterlimit="10" />
          <rect x="75" y="15" width="40" height="50" rx="4.55" ry="4.55" fill="none" stroke={props.fill} strokeMiterlimit="10" />
          <rect x="95" y="89.83" width="20" height="25.17" rx="4.55" ry="4.55" fill="none" stroke={props.fill} strokeMiterlimit="10" />
          <rect x="75" y="89.83" width="20" height="25.17" rx="4.55" ry="4.55" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        </g>
      </g>
    </g>
  </svg>
);

export default SVG;

SVG.propTypes = {
  style: PropTypes.object,
  fill: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

SVG.defaultProps = {
  style: {},
  fill: '#000',
  width: '100%',
  className: '',
};

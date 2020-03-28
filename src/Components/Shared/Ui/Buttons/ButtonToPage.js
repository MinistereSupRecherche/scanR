import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './ButtonToPage.scss';

const ButtonToPage = props => (
  <a href={props.url} target={props.target}>
    <div className={`d-flex align-items-center px-3 ${classes.ButtonToPage} ${props.className}`}>
      <p className="m-0">
        {props.children}
      </p>
      <div className="pl-4">
        <i className="fas fa-chevron-right" aria-hidden />
      </div>
    </div>
  </a>
);

export default ButtonToPage;

ButtonToPage.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string,
};

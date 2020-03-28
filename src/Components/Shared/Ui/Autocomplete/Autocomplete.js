import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from './Autocomplete.scss';
import getSelectKey from '../../../../Utils/getSelectKey';

class Autocomplete extends Component {
  state = {
    active: false,
    query: '',
  };

  queryTextChangeHandler = (e) => {
    this.setState({
      active: true,
      query: e.target.value,
    });
    if (e.target.value === '') {
      this.setState({ active: false });
    }
  }

  selectSuggestion = (e) => {
    this.setState({
      query: e.target.id,
      active: false,
    });
    this.submitWrapper(e.target.id);
  }

  erase = () => {
    this.setState({
      active: false,
      query: '',
    });
  }

  setActive = () => {
    if (this.state.query !== '') {
      this.setState({ active: true });
    }
  }

  setInactive = () => {
    if (this.props.data.includes(document.activeElement.id)) {
      this.submitWrapper(document.activeElement.id);
    }
    this.setState({
      active: false,
    });
  }

  submitWrapper(project) {
    this.setState({ active: false });
    this.props.onSubmit(project);
  }

  render() {
    const data = this.props.data || [];
    const filtered = data.filter((item) => {
      const founded = item.values.filter(el => (
        el.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
      ));
      if (founded.length > 0) {
        return true;
      }
      return false;
    });
    /* eslint-disable*/
    return (
      <div className={`d-flex flex-column mb-3 ${classes.Container}`}>
        <form id="searchForm">
          <span className={classes.Title} htmlFor="input">
            {this.props.title}
          </span>
          <input
            type="text"
            autoComplete="off"
            id="input"
            value={this.state.query}
            className={`pl-2 ${classes.SearchBar}`}
            placeholder={this.props.placeholder}
            onChange={this.queryTextChangeHandler}
            onFocus={this.setActive}
            onBlur={this.setInactive}
            onClick={this.erase}
          />
          <button
            className={classes.SearchButton}
            type="submit"
            onClick={() => this.submitWrapper(document.getElementById('input').value)}
          >
            <i className={`fas fa-search ${classes.SearchIcon}`} />
          </button>
          <div
            style={{ display: this.state.active ? 'block' : 'none' }}
            className={`p-2 mt-2 ${classes.AutocompleteFull}`}
          >
            <ul id="suggestions" className={`d-flex flex-column ${classes.Autocomplete}`}>
              {
                filtered.map((filter, ind) => (
                  <li
                    role="option"
                    aria-selected={false}
                    key={`${filter.id}_${ind}`}
                    id={filter.label}
                    className={`p-1 pl-2 pr-2 ${classes.Suggestion}`}
                    onClick={() => this.submitWrapper(filter.project)}
                    onKeyPress={() => this.submitWrapper(filter.project)}
                    onMouseDown={event => event.preventDefault()}
                  >
                    <div>
                      {
                        filter.project
                          ? (
                            <Fragment>
                              <strong>
                                {getSelectKey(filter.project.value, 'acronym', 'fr', 'default')}
                              </strong>
                              &nbsp;-&nbsp;
                            </Fragment>
                          ) : null
                      }
                      {filter.label}
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default Autocomplete;

Autocomplete.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.array,
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

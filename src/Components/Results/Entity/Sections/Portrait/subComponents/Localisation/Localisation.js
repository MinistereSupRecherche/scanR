import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import {
  Map, Marker, TileLayer, Tooltip,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { yellowIcon, greenIcon } from './icons';
import useGetData from '../../../../../../../Hooks/useGetData';
import { API_STRUCTURES_END_POINT } from '../../../../../../../config/config';

import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';

import classes from './Localisation.scss';

/**
 * Localisation
 * Url : /entite/<id>
 * Description : Affichage du bloc localisation. carte positionnant l'adresse + adresse en dessous
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const createMarkers = (address, data = []) => {
  const markers = [];
  if (data) {
    data.forEach((element) => {
      try {
        markers.push(
          <Marker icon={greenIcon} position={element.address[0].gps} key={element.id}>
            <Tooltip>{element.label.fr}</Tooltip>
          </Marker>,
        );
      } catch (error) {
        // eslint-disable-no-empty
      }
    });
  }
  markers.push(
    <Marker position={address} icon={yellowIcon} key="1" />,
  );
  return markers;
};

const Localisation = (props) => {
  const [showEntityAround, setEntityAround] = useState(false);
  const url = `${API_STRUCTURES_END_POINT}/near/${props.id}?distance=${0.5}&nb=${1000}`;
  const { data } = useGetData(url);

  if (!props.address) {
    return null;
  }

  const getDisplayedAddress = (address = {}, main = false) => {
    const displayedCity = address.city || '';
    const displayedCountry = address.country || '';
    const displayedSep = (address.city) ? ' - ' : '';
    const cityCountry = displayedCity.concat(displayedSep, displayedCountry);
    return (
      <React.Fragment>
        <hr />
        <div className="d-flex flex-row">
          <div>
            <div>{address.address}</div>
            <div>{cityCountry}</div>
          </div>
          {
            (main) ? <i className="fas fa-flag ml-auto" /> : null
          }
        </div>
      </React.Fragment>
    );
  };

  // Get main Address
  const mainAddress = props.address.find(ad => ad.main === true);
  const otherAddresses = props.address.filter(ad => ad.main === false);

  let mapProps = {};
  if (props.address[0].gps && props.address[0].gps.lat && props.address[0].gps.lon) {
    mapProps = { maxZoom: 17, center: [props.address[0].gps.lat, props.address[0].gps.lon], zoom: 14 };
  }

  const markers = createMarkers(props.address[0].gps, data);

  return (
    <div className="col-md-6">
      <div className={classes.Localisation}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={<FormattedHTMLMessage id="Entity.Portrait.Localisation.title" />} />
          </div>
        </div>
        <div className="row">
          <div className={`col-lg ${classes.NoSpace}`}>
            <div className={classes.MapContainer}>
              <Map
                className={classes.Map}
                {...mapProps}
              >
                <TileLayer
                  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
                />
                {
                  (showEntityAround && markers)
                    ? (
                      <MarkerClusterGroup maxClusterRadius={20}>
                        {markers}
                      </MarkerClusterGroup>
                    )
                    : (
                      <Marker
                        position={props.address[0].gps}
                        icon={yellowIcon}
                      />
                    )
                }
              </Map>
            </div>
            <div className={classes.AddressContainer}>
              <div className={classes.Title}>
                <div className="d-flex align-items-center">
                  <div>
                    <i className="fas fa-map-marker" />
                    Localisation
                  </div>
                  <div className="px-2 ml-auto">
                    {
                      (markers.length)
                        ? (
                          <button
                            className={`btn ${classes.btn_scanrBlue} ${classes.ButtonRectangle}`}
                            type="button"
                            onClick={() => setEntityAround(!showEntityAround)}
                          >
                            <FormattedHTMLMessage id="Entity.Portrait.Localisation.nearby" />
                          </button>
                        )
                        : null
                    }
                  </div>
                </div>
                <div className={classes.Address}>
                  {getDisplayedAddress(mainAddress, true)}
                  {
                    otherAddresses.map(ad => (getDisplayedAddress(ad)))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localisation;

Localisation.propTypes = {
  address: PropTypes.object.isRequired,
  id: PropTypes.array,
  language: PropTypes.string.isRequired,
};

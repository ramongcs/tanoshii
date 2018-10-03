import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './AnimeDetails.css';
import api from '../../utils/api';
import Loading from '../Loading';
import LeftContent from './LeftContent';
import MiddleContent from './MiddleContent';
import RightContent from './RightContent';

class AnimeDetails extends Component {
  state = {
    animeData: null
  }

  getIdAndFetchResults = () => {
    const animeId = Number(this.props.location.pathname.match(/\d+/g));

    api.fetchAnimeById(animeId).then(response => {
      this.setState({ animeData: response });
    });
  }

  componentDidMount() {
    this.getIdAndFetchResults();
  }

  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({ animeData: null });
      this.getIdAndFetchResults();
    }
  }

  render() {
    const { animeData } = this.state;

    console.log(animeData);

    if (!animeData) {
      return <Loading />;
    }

    return (
      <div className='details-container'>
        <LeftContent data={animeData} />
        <MiddleContent data={animeData} />
        <RightContent data={animeData} />
      </div>
    );
  }
}

export default AnimeDetails;
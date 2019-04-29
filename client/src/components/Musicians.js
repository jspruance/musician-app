import React, { Component, Fragment } from 'react';
import Musician from './Musician';
import axios from "axios";
const config = require('../config.json');

export default class Musicians extends Component {

  state = {
    newmusician: null,
    musicians: []
  }

  fetchMusicians = () => {
    // add call to AWS API Gateway to fetch musicians here
    // then set them in state
  }

  componentDidMount = () => {
    this.fetchMusicians();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Energy Musicians</h1>
            <p className="subtitle is-5">Invest in a clean future with our efficient and cost-effective green energy musicians:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                    { 
                      this.state.musicians && this.state.musicians.length > 0
                      ? this.state.musicians.map(musician => <Musician name={musician.musicianname} id={musician.id} key={musician.id} />)
                      : <div className="tile notification is-warning">No musicians available</div>
                    }
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

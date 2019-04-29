import React, { Component, Fragment } from 'react';
import Musician from './Musician';
import axios from "axios";

export default class MusiciansAdmin extends Component {

  state = {
    newmusician: { 
      firstName: "",
      lastName: "",
      genre: ""
    },
    musicians: []
  }

  outputHTML = "";

  handleAddMusician = async(id, event) => {
    event.preventDefault();
    try {
      await axios.put(`/musician/${id}`, this.state.newmusician);
      this.setState({ musicians: [...this.state.musicians, this.state.newmusician] });
      this.setState({ newmusician: { "firstName": "", "lastName": "", "genre": "" }});
    }catch(err) {
      console.log(err);
    }
  }

  handleUpdateMusician = (id, name) => {
    // add call to AWS API Gateway update musician endpoint here
    const musicianToUpdate = [...this.state.musicians].find(musician => musician.id === id);
    const updatedMusicians = [...this.state.musicians].filter(musician => musician.id !== id);
    musicianToUpdate.musicianname = name;
    updatedMusicians.push(musicianToUpdate);
    this.setState({musicians: updatedMusicians});
  }

  handleDeleteMusician = async(id, event) => {
    // using firstName as the id in musicians state
    event.preventDefault();
    try {
      await axios.delete(`/musician/${id}`);
      const updatedMusicians = await [...this.state.musicians].filter(musician => musician.firstName.toLowerCase() !== id);
      this.setState({musicians: updatedMusicians});
    }catch(err) {
      console.log(err);
    }
  }

  fetchMusicians = async() => {
    try{
      const res = await axios.get('/musician/all');
      const allMusicians = Object.keys(res.data).map((key) => {
        return res.data[key];
      });
      this.setState({ musicians: [...allMusicians] });
    }catch(err) {
      console.log(err);
    }
  }

  onAddMusicianFirstNameChange = event => this.setState({ newmusician: { ...this.state.newmusician, "firstName": event.target.value } });
  onAddMusicianLastNameChange = event => this.setState({ newmusician: { ...this.state.newmusician, "lastName": event.target.value } });
  onAddMusicianGenreChange = event => this.setState({ newmusician: { ...this.state.newmusician, "genre": event.target.value } });

  componentDidMount = () => {
    this.fetchMusicians();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <p className="subtitle is-5">Add and remove musicians using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddMusician(this.state.newmusician.firstName.toLowerCase(), event)}>
                  <div className="field">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter first name"
                        value={this.state.newmusician.firstName}
                        onChange={this.onAddMusicianFirstNameChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter last name"
                        value={this.state.newmusician.lastName}
                        onChange={this.onAddMusicianLastNameChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter genre"
                        value={this.state.newmusician.genre}
                        onChange={this.onAddMusicianGenreChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add musician
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                {
                  this.state.musicians.map((musician, index) =>
                    <Musician
                        isAdmin={true}
                        handleUpdateMusician={this.handleUpdateMusician}
                        handleDeleteMusician={this.handleDeleteMusician}
                        firstname={musician.firstName}
                        lastname={musician.lastName}
                        genre={musician.genre}
                        key={musician.lastName.toLowerCase()}
                        id={musician.firstName.toLowerCase()}
                        index={index}
                      />
                  )}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

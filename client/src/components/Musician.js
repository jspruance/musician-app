import React, { Component, Fragment }  from 'react';

export default class MusicianAdmin extends Component {

  state = {
    isEditMode: false,
    updatedmusicianname: this.props.name
  }

  handleMusicianEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateMusician(this.props.id, this.state.updatedmusicianname);
  }

  onAddMusicianNameChange = event => this.setState({ "updatedmusicianname": event.target.value });

  render() {
    return (
        <div className="box musician-card notification is-success">
          {
            this.props.isAdmin && 
            <Fragment>
              <button onClick={event => this.props.handleDeleteMusician(this.props.id, event)} className="delete"></button>
            </Fragment>
          }
          {
            this.state.isEditMode 
            ? <div>
                <p>Edit musician name</p>
                <input 
                  className="input is-medium"
                  type="text" 
                  placeholder="Enter name"
                  value={this.state.updatedmusicianname}
                  onChange={this.onAddMusicianNameChange}
                />
                <p className="musician-id">id: { this.props.id }</p>
                <button type="submit" 
                  className="button is-info is-small"
                  onClick={ this.handleEditSave }
                >save</button>
              </div>
            : <div>
                <p className="musician-title">{this.props.firstname } {this.props.lastname }</p>
                <p className="musician-id">genre: { this.props.genre }</p>
              </div>
          }
      </div>
    )
  }
}

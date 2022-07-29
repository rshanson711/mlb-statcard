import React, {Component} from 'react';
import PlayerSearch from './components/PlayerSearch';
import PlayerSearchNew from './components/PlayerSearchNew';

class App extends Component {
  constructor(props) {
    super(props);

    this.getPlayerName = this.getPlayerName.bind(this);

    this.state = {
      playerName: "judge"
    }
  }

  getPlayerName() {
    const search = document.getElementById('player-search').value;
    this.setState({
      playerName: search
    })
  }

  render() {
    return ( 
      <div className='container'>
        <PlayerSearchNew name={this.state.playerName}></PlayerSearchNew>
        <input type='text' id='player-search' placeholder='Name...'></input>
        <button onClick={() => this.getPlayerName()}>Search</button>
      </div>
    )
  }

  
}

export default App;
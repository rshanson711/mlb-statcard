import React, {Component} from 'react';
import PlayerSearch from './components/PlayerSearch';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <PlayerSearch name='judge'></PlayerSearch>
    )
  }
}

export default App;
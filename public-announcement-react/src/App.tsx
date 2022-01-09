import React from 'react';
import './App.css';
import ETHSession from './services/ETHSession';
import AnnounceBox from './components/AnnounceBox';

interface AppState {
  session: ETHSession | null,
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      session: null
    };
  }

  render() {
    return (
      <div>
        <AnnounceBox ethSession={this.state.session}/>
      </div>
    );
  }

  async componentDidMount() {
    let session = this.state.session;
    if (!session) {
      session = new ETHSession();
      this.setState({session});
    }

    if (await session.connectWalletIfNeeded()) {
      await session.loadAnnouncements();
    }
  }
}

export default App;

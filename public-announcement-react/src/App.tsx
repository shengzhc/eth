import React from 'react';
import './App.css';
import ETHSession from './services/ETHSession';

interface AppState {
  session?: ETHSession | null,
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
      <div>Hello World</div>
    );
  }

  async componentDidMount() {
    var session = this.state.session;
    if (!session) {
      session = new ETHSession();
      this.setState({session});
    }
    const accountAddress = await session.connectWalletIfNeeded();
    console.log(accountAddress);
  }
}

export default App;

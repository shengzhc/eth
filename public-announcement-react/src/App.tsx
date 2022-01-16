import React from 'react';
import './App.css';
import ETHSession from './services/ETHSession';
import AnnounceBox from './components/AnnounceBox';
import Announcement from './models/Announcement';
import AnnouncementBoard from './components/AnnouncementBoard';

interface AppState {
  session: ETHSession | null,
  announcements: Array<Announcement>
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      session: null,
      announcements: [],
    };
  }

  render() {
    return (
      <div>
        <AnnounceBox ethSession={this.state.session} />
        <AnnouncementBoard 
          announcements={this.state.announcements} 
          ethSession={this.state.session} />
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
      const announcements = await session.loadAnnouncements();
      this.setState({ announcements });
    }
    session.addUpdateListener(
      (announcement) => {
        this._didReceiveAnnouncement(announcement);
      }
    );
    session.addRemoveListener(
      (nonce) => {
        this._didRemoveAnnouncementWithNonce(nonce);
      }
    )
  }

  _didReceiveAnnouncement(announcement: Announcement) {
    var announcements = Array.from(this.state.announcements);
    const findingDuplicate = announcements.find(function(item) {
      return item.nonce == announcement.nonce;
    });
    if (findingDuplicate) {
      return;
    }

    // Insert announcement and sort
    announcements.push(announcement);
    announcements.sort(function(a: Announcement, b: Announcement) {
      return a.nonce > b.nonce ? 1 : -1;
    });
    this.setState({ announcements });
  }

  _didRemoveAnnouncementWithNonce(nonce: number) {
    var announcements = Array.from(this.state.announcements);
    announcements = announcements.filter(function (item) {
      return item.nonce != nonce;
    });
    this.setState({ announcements });
  }
}

export default App;

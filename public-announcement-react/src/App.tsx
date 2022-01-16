import React from 'react';
import './App.css';
import ETHSession from './services/ETHSession';
import AnnounceBox from './components/AnnounceBox';
import Announcement from './models/Announcement';
import AnnouncementBoard from './components/AnnouncementBoard';
import Grid from '@mui/material/Grid';

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
      <Grid container justifyContent="center">
        <Grid direction="column" xs={8}>
          <AnnounceBox ethSession={this.state.session} />
          <AnnouncementBoard
            announcements={this.state.announcements}
            ethSession={this.state.session} />
        </Grid>
      </Grid>
    );
  }

  async componentDidMount() {
    let session = this.state.session;
    if (!session) {
      session = new ETHSession();
      this.setState({ session });
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
    console.log(announcement);
    var announcements = Array.from(this.state.announcements);
    const findingDuplicate = announcements.find(function (item) {
      return item.nonce == announcement.nonce;
    });
    if (findingDuplicate) {
      return;
    }

    // Insert announcement and sort
    announcements.push(announcement);
    announcements.sort(function (a: Announcement, b: Announcement) {
      return a.nonce > b.nonce ? 1 : -1;
    });
    this.setState({ announcements });
  }

  _didRemoveAnnouncementWithNonce(nonce: number) {
    console.log(nonce);
    var announcements = Array.from(this.state.announcements);
    announcements = announcements.filter(function (item) {
      return item.nonce != nonce;
    });
    this.setState({ announcements });
  }
}

export default App;

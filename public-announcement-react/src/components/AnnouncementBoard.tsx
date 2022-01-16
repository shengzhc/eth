import * as React from 'react';
import List from '@mui/material/List';
import AnnouncementItem from './AnnouncementItem';
import Divider from '@mui/material/Divider';
import Announcement from './../models/Announcement';
import ETHSession from '../services/ETHSession';

interface AnnouncementBoardProps {
  announcements: Array<Announcement>
  ethSession: ETHSession | null
}

class AnnouncementBoard extends React.Component<AnnouncementBoardProps> {
  render() {
    const ethSession = this.props.ethSession;
    return (
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          this.props.announcements.map(function (item, idx, items) {
            return (
              <React.Fragment key={item.nonce}>
                <AnnouncementItem announcement={item} ethSession={ethSession} />
                {idx + 1 < items.length
                  ? <Divider variant="inset" component="li" />
                  : null}
              </React.Fragment>
            );
          })
        }
      </List>
    );
  }
}

export default AnnouncementBoard;
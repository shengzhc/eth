import * as React from 'react';
import List from '@mui/material/List';
import AnnouncementItem from './AnnouncementItem';
import Divider from '@mui/material/Divider';
import Announcement from './../models/Announcement';

interface AnnouncementBoardProps {
  announcements: Array<Announcement>
}

class AnnouncementBoard extends React.Component<AnnouncementBoardProps> {
  render() {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          this.props.announcements.map(function (item, idx, items) {
            return (
              <React.Fragment key={item.nonce}>
                <AnnouncementItem announcement={item}/>
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
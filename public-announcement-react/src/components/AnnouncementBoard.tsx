import * as React from 'react';
import List from '@mui/material/List';
import AnnouncementItem from './AnnouncementItem';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

interface AnnouncementBoardProps {
  announcements: Array<any>
}

class AnnouncementBoard extends React.Component<AnnouncementBoardProps> {
  render() {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          this.props.announcements.map(function (item, idx, items) {
            return (
              <React.Fragment>
                <AnnouncementItem
                  addr={item.addr}
                  content={item.content}
                  nonce={item.nonce} />
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
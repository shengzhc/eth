import * as React from 'react';
import StringColorUtils from '../utils/StringColorUtils';

import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Announcement from './../models/Announcement';

interface AnnouncementItemProps {
  announcement: Announcement;
}

class AnnouncementItem extends React.Component<AnnouncementItemProps> {
  render() {
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar {...this._addrAvatar(this.props.announcement.addr)} />
        </ListItemAvatar>
        <ListItemText
          primary={this.props.announcement.content}
          secondary={`nonce(${this.props.announcement.nonce}): ${this.props.announcement.addr}`}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={() => { this.removeAnnouncement(); }}>
          Remove
        </Button>
      </ListItem>
    );
  }

  removeAnnouncement() {
  }

  _addrAvatar(addr: string) {
    return {
      sx: {
        bgcolor: StringColorUtils.stringToColor(addr),
      },
      children: `${addr[2]}${addr[3]}`,
    };
  }
}

export default AnnouncementItem;
import * as React from 'react';
import StringColorUtils from '../utils/StringColorUtils';

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
      </ListItem>
    );
  }

  _addrAvatar(addr: string) {
    console.log(addr);
    return {
      sx: {
        bgcolor: StringColorUtils.stringToColor(addr),
      },
      children: `${addr[2]}${addr[3]}`,
    };
  }
}

export default AnnouncementItem;
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
          <Avatar sx={{ bgcolor: StringColorUtils.stringToHexColor(this.props.announcement.addr) }} />
        </ListItemAvatar>
        <ListItemText primary={this.props.announcement.content} secondary={this.props.announcement.addr} />
      </ListItem>
    );
  }
}

export default AnnouncementItem;
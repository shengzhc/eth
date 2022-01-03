import * as React from 'react';
import StringColorUtils from '../utils/StringColorUtils';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

interface AnnouncementItemProps {
  addr: string;
  content: string;
  nonce: number;
}

class AnnouncementItem extends React.Component<AnnouncementItemProps> {
  render() {
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar  sx={{ bgcolor: StringColorUtils.stringToHexColor(this.props.addr) }}/>
        </ListItemAvatar>
        <ListItemText primary={this.props.content} secondary={this.props.addr}/>
      </ListItem>
    );
  }
}

export default AnnouncementItem;
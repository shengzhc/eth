import * as React from 'react';
import StringColorUtils from '../utils/StringColorUtils';

import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Announcement from './../models/Announcement';
import ETHSession from '../services/ETHSession';
import Grid from '@mui/material/Grid';

interface AnnouncementItemProps {
  announcement: Announcement
  ethSession: ETHSession | null
}

interface AnnouncementItemState {
  canRemove: boolean
}

class AnnouncementItem extends React.Component<AnnouncementItemProps, AnnouncementItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      canRemove: true,
    };
  }

  render() {
    return (
      <ListItem alignItems="flex-start">
        <Grid container direction="row" alignItems="center" justifyContent="center">
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
            color="error"
            disabled={!this.state.canRemove}
            onClick={() => { this.removeAnnouncement(); }}>
            Remove
          </Button>
        </Grid>
      </ListItem>
    );
  }

  async removeAnnouncement() {
    if (!this.props.ethSession || !this.state.canRemove) {
      return;
    }

    this.setState({ canRemove: false });
    await this.props.ethSession.takedown(this.props.announcement.nonce);
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
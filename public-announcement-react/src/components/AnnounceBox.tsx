import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ETHSession from '../services/ETHSession';

interface AnnounceBoxProps {
  ethSession: ETHSession | null
}

class AnnounceBox extends React.Component<AnnounceBoxProps> {
  render() {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mt: 4, mb: 4, ml: '10%', maxWidth: '80%' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          required
          fullWidth
          id="announce-content-text-input"
          label="Announce something?"
        />
        <Button
          variant="contained"
          size="medium"
          onClick={() => {this.announceBtnClicked();}}>
          Announce
        </Button>
      </Box>
    );
  }

  async announceBtnClicked() {
    if (!this.props.ethSession) {
      return;
    }

    const textField = 
      document.getElementById('announce-content-text-input') as HTMLInputElement;
    if (!textField) {
      return;
    }

    const content = textField.value;
    if (content.length < 1) {
      alert("Please at least enter sth");
      return;
    }
    if (await this.props.ethSession.announce(content)) {
      // Successfully generate the tx, but not mined yet
    } else {
      // Error happens, tx is defintely failed to be submitted
    }
  }
}

export default AnnounceBox;

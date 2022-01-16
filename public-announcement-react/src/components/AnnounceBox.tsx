import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ETHSession from '../services/ETHSession';
import Grid from '@mui/material/Grid';

interface AnnounceBoxProps {
  ethSession: ETHSession | null
}

class AnnounceBox extends React.Component<AnnounceBoxProps> {
  render() {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mt: 4, mb: 4, ml: 2},
        }}
        noValidate
        autoComplete="off">
        <Grid 
          container 
          spacing={12} 
          direction="row" 
          justifyContent="center" 
          alignItems="center">
          <Grid item xs={10}>
            <TextField
              required
              fullWidth
              id="announce-content-text-input"
              label="记录你的预言?"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => { this.announceBtnClicked(); }}>
              发布预言
            </Button>
          </Grid>

        </Grid>
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

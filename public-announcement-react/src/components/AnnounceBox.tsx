import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

class AnnounceBox extends React.Component {
  render() {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 4, width: '480pt' },
        }}
        noValidate
        autoComplete="off">
          <TextField 
            required 
            id="announce-content-text-input"
            label="Announce something?"
            defaultValue=""
          />
      </Box>
    );
  }
}

export default AnnounceBox;

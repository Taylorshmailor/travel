import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import styled from '@emotion/styled';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
//======================================================
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//======================================================
const ContentWrapper = styled('div') ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  backgroundColor: '#F6F4EE',
})
const StyledDialog = styled(Dialog) ({
})
const StyledAppBar = styled(AppBar) ({
  backgroundColor: 'darkolivegreen',
})
//======================================================
export default function DetailsModal(props:any) {
  const { isOpen, closeFunc, location, locationPhoto } = props;

  const handleClose = () => {
    closeFunc();
  }

  React.useEffect(() => {
    axios.post('/api/fetchLocationPhotos', {
      location: location,
    })
    .then(( response: any ) => {
      console.log('response', response);
      
    })
  }, [])

  return (
    <StyledDialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <StyledAppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {location}
          </Typography>
        </Toolbar>
      </StyledAppBar>

    <ContentWrapper>
      <Image 
        src={locationPhoto}
        // width={500}
        // height={500}
        quality={100}
        layout='fill'
        alt={location}
      />
    </ContentWrapper>
    </StyledDialog>
  )
}
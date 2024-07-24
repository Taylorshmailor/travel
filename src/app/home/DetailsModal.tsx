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
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Image from 'next/image';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  ContentWrapper,
  StyledDialog,
  StyledAppBar,
  MyMap,
  DayCard
} from "@/utils/styles/details.styles";

//======================================================
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CurrentLocationMarker = ({ text }: any) => (
  <div>
    {text}
    <LocationOnIcon fontSize='large' style={{ color: 'red' }} />
  </div>
);

const LocationMarker = ({ lat, lng, name, address }: { lat: number, lng: number, name: string, address: string }) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)', textAlign: 'center', zIndex: 1000 }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <LocationOnIcon fontSize='large' style={{ color: 'blue' }} />
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 0px 6px rgba(0,0,0,0.2)', fontSize: '14px', width: '200px', wordBreak: 'break-word', padding: '10px' }}>
        <strong>{name}</strong><br />
        {address}
      </div>
    </div>
  </div>
);

const DetailsModal = React.memo((props: any) => {
  const { isOpen, closeFunc, location, lat, lng, museumMarkers, dateRange } = props;
  console.log('Rendering DetailsModal with dateRange:', dateRange);

  const handleClose = () => {
    closeFunc();
  };

  return (
    <StyledDialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <StyledAppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {location}
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <ContentWrapper>
        <MyMap>
          <GoogleMapReact
            bootstrapURLKeys={{ key: String(process.env.NEXT_PUBLIC_KEY_GOOGLEMAPS) }}
            defaultCenter={{ lat, lng }}
            defaultZoom={14}
          >
            <CurrentLocationMarker lat={lat} lng={lng} text="Current Location" />
            {museumMarkers.map((marker: { lat: number; lng: number; name: string; address: string; }, index: React.Key | null | undefined) => (
              <LocationMarker
                key={index}
                lat={marker.lat}
                lng={marker.lng}
                name={marker.name}
                address={marker.address}
              />
            ))}
          </GoogleMapReact>
        </MyMap>
        <DayCard>Howdy</DayCard>
      </ContentWrapper>
    </StyledDialog>
  );
});

export default DetailsModal;
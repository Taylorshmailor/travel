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
import { createClient } from 'pexels';

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
});
const StyledDialog = styled(Dialog) ({});
const StyledAppBar = styled(AppBar) ({ backgroundColor: 'darkolivegreen' });
const Embla = styled('div')({ overflow: 'hidden' });
const EmblaContainer = styled('div')({ display: 'flex', height: '400px', width: '100%' });
const EmblaSlide = styled('div')({ flex: '0 0 100%', minWidth: 0, height: '100%', width: '100%' });
const MyMap = styled('div')({ height: '70vh', width: '100%' });
const DayCard = styled('div')({ height: '600px', width: '300px', backgroundColor: 'White', borderRadius: '20px', marginTop: '15px', textAlign: 'center' });

//======================================================
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
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { isOpen, closeFunc, location, lat, lng, museumMarkers, dateRange } = props;

  const [locationPhotos, setLocationPhotos] = React.useState([]);

  console.log('Rendering DetailsModal with dateRange:', dateRange);

  React.useEffect(() => {
    if (emblaApi) {
      console.log('Embla carousel API:', emblaApi.slideNodes());
    }
  }, [emblaApi]);

  // React.useEffect(() => {
  //   // This effect only runs if isOpen is true
  //   if (isOpen) {
  //     // Fetch photos and set state
  //     // (Assuming `client` is properly initialized somewhere else in your code)
  //     client.photos.search({ query: location, per_page: 10 })
  //       .then((pexelsResponse: any) => {
  //         console.log('pexelsResponse', pexelsResponse);
  //         setLocationPhotos(pexelsResponse.photos);
  //       }).catch(e => {
  //         console.log(e);
  //         setLocationPhotos([]);
  //       });
  //   }
  // }, [isOpen, location]);

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
        <Embla ref={emblaRef}>
          <EmblaContainer>
            {locationPhotos.map((photo) => {
              const { src } = photo;
              const { landscape } = src;
              return (
                <EmblaSlide key={landscape}>
                  <Image src={landscape} quality={100} layout='fill' alt={location} />
                </EmblaSlide>
              );
            })}
          </EmblaContainer>
        </Embla>
      </ContentWrapper>
    </StyledDialog>
  );
});

export default DetailsModal;
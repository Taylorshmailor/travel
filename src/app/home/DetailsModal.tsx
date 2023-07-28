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
})
const StyledDialog = styled(Dialog) ({
})
const StyledAppBar = styled(AppBar) ({
  backgroundColor: 'darkolivegreen',
})
const Embla = styled('div')({
  overflow: 'hidden',
})
const EmblaContainer = styled('div')({
  display: 'flex',
  height: '400px',
  width: '100%',
})
const EmblaSlide = styled('div')({
  flex: '0 0 100%',
  minWidth: 0,
  height: '100%',
  width: '100%',
})

const MyMap = styled('div')({
  height: '50vh', 
  width: '100%',
})
//======================================================
const AnyReactComponent = ({ text }: any) => (
  <LocationOnIcon fontSize='large' style={{color:'red'}}/>
) 

export default function DetailsModal(props:any) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const client = createClient(String(process.env.KEY_PEXELS));
  const { isOpen, closeFunc, location } = props;

  const [locationPhotos, setLocationPhotos] = React.useState([]);

  
  const defaultProps = {
    center: {
      lat: 41.881832,
      lng: -87.623177
    },
    zoom: 14
  };

  React.useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes())
    }
  }, [emblaApi])

  const handleClose = () => {
    closeFunc();
  }

  React.useEffect(() => {
    if (isOpen === true) {
      // axios.post('/api/fetchLocationPhotos', {
      //   location: location,
      // })
      // .then(( response: any ) => {
      //   console.log('photos response', response.data);
        
      // })
      client.photos.search({ query: location, per_page: 10 })
      .then((pexelsResponse:any) => {
        console.log('pexelsResponse', pexelsResponse)
        setLocationPhotos(pexelsResponse.photos)
      }).catch(e => {
        console.log(e);
        setLocationPhotos([]);
      });
    }
  }, [isOpen])

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
      <MyMap>
        <GoogleMapReact
          bootstrapURLKeys={{ key: String(process.env.KEY_GOOGLEMAPS)}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={41.885840}
            lng={-87.635740}
            text="My Home"
          />
        </GoogleMapReact>
      </MyMap>
      <Embla ref={emblaRef}>
        <EmblaContainer >
          {
            locationPhotos.map((photo) => {
              const { src } = photo;
              const { landscape } = src;
              return (
                <EmblaSlide>
                  <Image 
                    src={landscape}
                    quality={100}
                    layout='fill'
                    alt={location}
                  />
                </EmblaSlide>
              )
            })
          }
        </EmblaContainer>
      </Embla>

      {/* <Image 
        src={locationPhoto}
        // width={500}
        // height={500}
        quality={100}
        layout='fill'
        alt={location}
      /> */}

    </ContentWrapper>
    </StyledDialog>
  )
}
'use client';
import { Button, Card, TextField, Select, FormControl, MenuItem, InputLabel, Box } from "@mui/material";
import { styled } from "@mui/system";
// import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import DetailsModal from "./DetailsModal";

const PageWrapper = styled('div')({
  height: '100vh',
  width: '100%',
  backgroundColor: '#F6F4EE',
  padding: '2%',
  display: 'flex',
  justifyContent: 'center'
})

const SearchInfo = styled('div')({

})

const pricesGenerator = () => {
  const prices = []
  for (let i = 0; i < 100; i++) {
    prices.push(`$${i * 100}`)
  }
  return prices
}

const prices = pricesGenerator();

const ITEM_HEIGHT = 150;
const ITEM_PADDING_TOP = 10;
const PriceDropdown = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const Home = () => {
  const router = useRouter();

  const [detailsModelOpen, setDetailsModelOpen] = useState(false);

  const [location, setLocation] = useState('')
  const [locationPhoto, setLocationPhoto] = useState('')
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const handleMinPriceChange = (event: any) => {
    setMin(event.target.value);
  };

  const handleMaxPriceChange = (event: any) => {
    setMax(event.target.value);
  };

  const handleSetStartDate = (date: any) => {
    setStartDate(date)
  }

  const handleSetEndDate = (date: any) => {
    setEndDate(date)
  }

  const handleSetLocation = (event: any) => {
    setLocation(event.target.value)
  }

  const generatePlan = () =>{
    axios.post('/api/fetchLocationInfo', {
      location: location,
    })
    .then((response: any) => {
      console.log(response.data);
      // const landscapePhoto = response?.data?.images?.src?.landscape || '';
      // setLocationPhoto(landscapePhoto);
      setDetailsModelOpen(true);
    }, (error: any) => {
      console.log(error);
    });
  }

  const plannable = location.length > 0;

  return (
    <PageWrapper>
      <SearchInfo>
        <TextField
          label='Location'
          id='location'
          value={location}
          onChange={(newLocation) => handleSetLocation(newLocation)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label='Start'
            value={startDate}
            onChange={(newStart) => handleSetStartDate(newStart)}
          />
          <DatePicker 
            label='End'
            value={endDate}
            onChange={(newEnd) => handleSetEndDate(newEnd)}
          />
        </LocalizationProvider>  
        <FormControl sx={{ width: 100 }}>
          <InputLabel id="minLabel">Min</InputLabel>
          <Select
            labelId="minLabel"
            id="min"
            value={min}
            label="Min"
            onChange={handleMinPriceChange}
            MenuProps={PriceDropdown}
          >
            {prices.map((price) => (
              <MenuItem key={price} value={price}>
                {price}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      
        <FormControl sx={{ width: 100 }}>
          <InputLabel id="maxLabel">Max</InputLabel>
          <Select
            labelId="maxLabel"
            id="max"
            value={max}
            label="Max"
            onChange={handleMaxPriceChange}
            MenuProps={PriceDropdown}
          >
            {prices.map((price) => (
              <MenuItem key={price} value={price}>
                {price}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button 
          variant="contained"
          onClick={generatePlan}
          disabled={!plannable}
        >
          Plan
        </Button>
      </SearchInfo>

      <DetailsModal 
        location={location}
        locationPhoto={locationPhoto}
        isOpen={detailsModelOpen}
        closeFunc={() => setDetailsModelOpen(false)}
      />
    </PageWrapper>
  )
};

export default Home;
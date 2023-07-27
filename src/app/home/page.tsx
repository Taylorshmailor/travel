'use client';
import { Button, Card, TextField, Select, FormControl, MenuItem, InputLabel, Box } from "@mui/material";
import { styled } from "@mui/system";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";

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

const prices = [
  '0',
  '$100',
  '$200',
  '$300',
  '$400',
  '$500',
  '$600',
  '$700',
  '$800',
  '$900',
  '$1000'
]

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

  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const handleMinPriceChange = (event: any) => {
    console.log(event.target.value)
    setMin(event.target.value);
  };

  const handleMaxPriceChange = (event: any) => {
    console.log(event.target.value)
    setMax(event.target.value);
  };

  const handleSetStartDate = (date: any) => {
    console.log(date)
    setStartDate(date)
  }

  const handleSetEndDate = (date: any) => {
    console.log(date)
    setEndDate(date)
  }

  const handleSetLocation = (event: any) => {
    console.log(event.target.value)
    setLocation(event.target.value)
  }

  const generatePlan = () =>{
    console.log('Mugi is stinky')
  }

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
        >
          Plan
        </Button>
      </SearchInfo>
    </PageWrapper>
  )
};

export default Home;
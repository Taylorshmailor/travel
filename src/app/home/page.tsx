'use client';
import { Button, Card, TextField, Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import { styled } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { useRouter } from "next/navigation";
import DetailsModal from "./DetailsModal";
import {
  prices,
  PriceDropdown,
  generatePlan
} from "@/utils/functions"; // Import functions

const PageWrapper = styled('div')({
  height: '100vh',
  width: '100%',
  backgroundColor: '#F6F4EE',
  padding: '2%',
  display: 'flex',
  justifyContent: 'center'
});

const SearchInfo = styled('div')({});

// Define the type for museum markers
export interface MuseumMarker {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const Home = () => {
  const router = useRouter();
  const [detailsModelOpen, setDetailsModelOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [locationPhoto, setLocationPhoto] = useState('');
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [museumMarkers, setMuseumMarkers] = useState<MuseumMarker[]>([]);
  const [dateRange, setDateRange] = useState<Date[]>([]);

  const handleMinPriceChange = (event: any) => {
    setMin(event.target.value);
  };

  const handleMaxPriceChange = (event: any) => {
    setMax(event.target.value);
  };

  const handleSetStartDate = (date: any) => {
    setStartDate(date);
  };

  const handleSetEndDate = (date: any) => {
    setEndDate(date);
  };

  const handleSetLocation = (event: any) => {
    setLocation(event.target.value);
  };

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
          onClick={() => generatePlan(
            location,
            startDate,
            endDate,
            setLat,
            setLng,
            setMuseumMarkers,
            setDateRange,
            setDetailsModelOpen
          )}
          disabled={!plannable}
        >
          Plan
        </Button>
      </SearchInfo>

      <DetailsModal 
        location={location}
        locationPhoto={locationPhoto}
        isOpen={detailsModelOpen}
        lat={lat}
        lng={lng}
        museumMarkers={museumMarkers}
        dateRange={dateRange}
        closeFunc={() => setDetailsModelOpen(false)}
      />
    </PageWrapper>
  );
};

export default Home;

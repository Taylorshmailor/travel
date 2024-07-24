// utils/functions.ts
import { User } from "@/types";
import { AppContextType } from "@/components/ContextProvider";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { MuseumMarker } from "../app/home/page";

// Function to fetch users from the API endpoint
export async function fetchUsers() {
    try {
      const response = await axios.get('/api/users'); // Calls the endpoint
      return response.data; // Returns the data from the endpoint
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

export const handleLogIn = (
  newUserName: string,
  password: string,
  users: User[],
  handleUserLogIn: AppContextType["handleUserLogIn"],
  router: ReturnType<typeof useRouter>
) => {
  if (newUserName.length > 0 && password.length > 0) {
    const user = users.find(user => user.username === newUserName && user.password === password);
    if (user) {
      handleUserLogIn(newUserName);
      router.push('/home');
    } else {
      alert('Invalid username or password');
    }
  }
};

export const loadUsers = async (): Promise<User[]> => {
  try {
    const data = await fetchUsers();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Function to generate prices
export const pricesGenerator = () => {
    const prices = [];
    for (let i = 0; i < 100; i++) {
      prices.push(`$${i * 100}`);
    }
    return prices;
  };
  
  export const prices = pricesGenerator();
  
  export const ITEM_HEIGHT = 150;
  export const ITEM_PADDING_TOP = 10;
  export const PriceDropdown = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT + ITEM_PADDING_TOP,
        width: 100,
      },
    },
  };
  
  // Function to get dates between start and end date
  export const getDatesBetween = (startDate: any, endDate: any): Date[] => {
    if (!startDate || !endDate) return [];
    
    let dates: Date[] = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };
  
  // Function to generate the plan
  export const generatePlan = async (
    location: string,
    startDate: any,
    endDate: any,
    setLat: (lat: number) => void,
    setLng: (lng: number) => void,
    setMuseumMarkers: (markers: MuseumMarker[]) => void, // Use the defined type
    setDateRange: (range: Date[]) => void,
    setDetailsModelOpen: (open: boolean) => void
  ) => {
    const newDateRange = getDatesBetween(startDate, endDate);
    setDateRange(newDateRange);
  
    try {
      const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.NEXT_PUBLIC_KEY_GEOCODE}`);
      const newLat = geoResponse.data.results[0].geometry.lat;
      const newLng = geoResponse.data.results[0].geometry.lng;
      setLat(newLat);
      setLng(newLng);
  
      const locationResponse = await axios.post('/api/fetchLocationInfo', { location });
      const museums = locationResponse.data.locationInfoMuseum.elements.slice(0, 10);
      const newMuseumMarkers: MuseumMarker[] = museums.map((museum: { tags: { [x: string]: any; name: any; }; lat: any; lon: any; }) => {
        const houseNumber = museum.tags['addr:housenumber'] || '';
        const street = museum.tags['addr:street'] || '';
        const city = museum.tags['addr:city'] || '';
        const state = museum.tags['addr:state'] || '';
        const postcode = museum.tags['addr:postcode'] || '';
  
        const address = [
          houseNumber + (street ? ` ${street}` : ''),
          city,
          state,
          postcode
        ].filter(Boolean).join(', ');
  
        return {
          lat: museum.lat,
          lng: museum.lon,
          name: museum.tags.name,
          address: address
        };
      }).filter((museum: { address: string | any[]; }) => museum.address.length > 5);
  
      setMuseumMarkers(newMuseumMarkers);
      setDetailsModelOpen(true);
    } catch (error) {
      console.error('Error generating plan:', error);
    }
  };

  export async function handleAccountCreation(
    newUsername: string,
    newEmail: string,
    newPassword: string,
    handleUserLogIn: AppContextType["handleUserLogIn"],
    router: ReturnType<typeof useRouter>
  ) {
    try {
      const response = await axios.post('/api/users', {
        username: newUsername,  // Matches the database column name
        email: newEmail,
        password: newPassword
      });
  
      if (response.status === 200) {
        alert('Account created successfully!');
        handleUserLogIn(newEmail);  // Log in the user
        router.push('/home'); // Redirect to /home after success
      } else {
        alert(`Error: ${response.data.error || 'Failed to create account. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account. Please try again.');
    }
  }
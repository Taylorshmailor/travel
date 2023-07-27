import axios from 'axios';
import { NextResponse } from 'next/server';
import { createClient } from 'pexels';
//======================================================
export async function POST(req: any) {
  const body = await req.json();

  const { location } = body;

  const overpassApiBaseUrl = 'https://overpass-api.de/api/interpreter';

  const overpassQuery = `
    [out:json];
    area[name="${location}"];
    (
      node["tourism"="museum"]["name"](area);
      way["tourism"="museum"]["name"](area);
      relation["tourism"="museum"]["name"](area);
    );
    out body;
    >;
    out skel qt;
  `;
  try {




    const response = await axios.post(overpassApiBaseUrl, overpassQuery, {
      headers: { 'Content-Type': 'text/plain' },
    });

    

    // const pexelsResponse = await axios.post(`https://api.pexels.com/v1/search?query=${location}&per_page=1`, {
    //   'Authorization': '',
    // })
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // The response will contain the data retrieved from OpenStreetMap for points of interest in Chicago

    return NextResponse.json({
      locationInfo: response.data,
    
    });

  } catch (error) {
    console.error('Error fetching data from OpenStreetMap:', error);
  }
}


// need to take maybe first 100 given POIs 
// create coordinate pairs [lat, lng] for each location 
// create function to group locations based on distance threshold
// export function groupLocationsByDistance(arrays, threshold) --> clustering 
  // grab first 7-10 activies of a cluster = itinerary for the day

  // itineraries should have 3 spots to eat 
  // 1 morning activity, 3 activities in afternoon, 1 night activity --> 5 activities in the day
  // restaurants, museums, landmarks, 

  // lat, lon
  // name
  // Format Address
    // addr:housenumber
    // addr:street
    // addr:city
    // addr: state
    // addr:postcode
  // opening_hours
  // fee  







// https://www.pexels.com/search/chicago/
// https://www.pexels.com/api/documentation/

// pexels api key uoBR1y1BtjSeAVbGYI65emJJjrGJiDmbOrFNCUfF4G3hod9SV4S3P98H
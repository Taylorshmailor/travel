import axios from 'axios';
import { NextResponse } from 'next/server';
import { createClient } from 'pexels';
//======================================================
export async function POST(req: any) {
  const body = await req.json();

  const { location } = body;

  const overpassApiBaseUrl = 'https://overpass-api.de/api/interpreter';

  const overpassQueryM = `
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
  const overpassQueryR = `
    [out:json];
    area[name="${location}"];
    (
      node["amenity"="restaurant"]["name"](area);
      way["amenity"="restaurant"]["name"](area);
      relation["amenity"="restaurant"]["name"](area);
    );
    out body;
    >;
    out skel qt;
  `;

  try {

    const responseM = await axios.post(overpassApiBaseUrl, overpassQueryM, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const responseR = await axios.post(overpassApiBaseUrl, overpassQueryR, {
      headers: { 'Content-Type': 'text/plain' },
    });

    // The response will contain the data retrieved from OpenStreetMap for points of interest in Chicago

    return NextResponse.json({
      locationInfoMuseum: responseM.data,
      locationInfoRestaurant: responseR.data,
    
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








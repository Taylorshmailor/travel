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
  const overpassQueryQ = `
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
  const overpassQueryR = `
    [out:json];
    area[name="${location}"];
    (
      node["leisure"="park"]["name"](area);
      way["leisure"="park"]["name"](area);
      relation["leisure"="park"]["name"](area);
    );
    out body;
    >;
    out skel qt;
  `;
  const overpassQueryS = `
    [out:json];
    area[name="${location}"];
    (
      node["historic"="monument"]["name"](area);
      way["historic"="monument"]["name"](area);
      relation["historic"="monument"]["name"](area);
    );
    out body;
    >;
    out skel qt;
  `;
  const overpassQueryT = `
    [out:json];
    area[name="${location}"];
    (
      node["amenity"="cafe"]["name"](area);
      way["amenity"="cafe"]["name"](area);
      relation["amenity"="cafe"]["name"](area);
    );
    out body;
    >;
    out skel qt;
  `;

  try {

    const responseM = await axios.post(overpassApiBaseUrl, overpassQueryM, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const responseQ = await axios.post(overpassApiBaseUrl, overpassQueryQ, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const responseR = await axios.post(overpassApiBaseUrl, overpassQueryR, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const responseS = await axios.post(overpassApiBaseUrl, overpassQueryS, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const responseT = await axios.post(overpassApiBaseUrl, overpassQueryT, {
      headers: { 'Content-Type': 'text/plain' },
    });

    // The response will contain the data retrieved from OpenStreetMap for points of interest in Chicago

    return NextResponse.json({
      locationInfoMuseum: responseM.data,
      locationInfoRestaurant: responseQ.data,
      locationInfoOutdoors: responseR.data,
      locationInfoMonument: responseS.data,
      locationInfoCafes: responseT.data,
    
    });

  } catch (error) {
    console.error('Error fetching data from OpenStreetMap:', error);
  }
}







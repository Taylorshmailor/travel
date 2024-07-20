import { NextResponse } from 'next/server';
import { createClient } from 'pexels';
//======================================================
export async function POST(req:any) {
  const body = await req.json();
  const { location } = body;
  const client = createClient('uoBR1y1BtjSeAVbGYI65emJJjrGJiDmbOrFNCUfF4G3hod9SV4S3P98H');
  const pexelsQuery = location;

  const response = client.photos.search({ query: pexelsQuery, per_page: 1 })
  .then(photos => {
    console.log('photos', photos)
    return photos;
  }).catch(e => {
    console.log(e);
    return e
  });
  return NextResponse.json({ response })
}

// https://www.pexels.com/search/chicago/
// https://www.pexels.com/api/documentation/

// pexels api key uoBR1y1BtjSeAVbGYI65emJJjrGJiDmbOrFNCUfF4G3hod9SV4S3P98H
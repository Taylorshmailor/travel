import axios from 'axios';
import { NextResponse } from 'next/server';
import { useEffect, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";

//======================================================


// import GoogleMapReact from 'google-map-react'

// const medPlusLatLong = { lat: 29.67561129384909, lng: -95.55940824563754 }
// const mapCenter = { lat: 29.674176846912186, lng: -95.5500312429117 }

// <GoogleMapReact
// bootstrapURLKeys={{ key: String(apiKey) }}

// defaultCenter={ window.innerWidth > 600 ? mapCenter : medPlusLatLong }
// // zoom={14}
// defaultZoom={15}
// options={{
//   disableDefaultUI: true,
//   keyboardShortcuts: false,
//   styles: mapStyles,
// }}
// onClick={handleMarkerClick}
// >
// <MyMarker
//   lat={medPlusLatLong.lat}
//   lng={medPlusLatLong.lng}
//   text="MedPlus LLC"
// />
// </GoogleMapReact>

//======================================================

// export const mapStyles =  [
//     {featureType: 'poi.business', stylers: [{visibility: 'off'}]},
//     {featureType: 'poi.park', stylers: [{visibility: 'off'}]},
//     // {featureType: 'poi.hotel', stylers: [{visibility: 'off'}]},
//     {featureType: 'poi.school', stylers: [{visibility: 'off'}]},
//     {featureType: 'poi.medical', stylers: [{visibility: 'off'}]},
//     {featureType: 'poi.place_of_worship', stylers: [{visibility: 'off'}]},
//     {featureType: 'poi.sports_complex', stylers: [{visibility: 'off'}]},
//     {featureType: 'poi.government', stylers: [{visibility: 'off'}]},
//     {featureType: 'poi.attraction', stylers: [{visibility: 'off'}]},
//     // {featureType: 'highway.marker', stylers: [{visibility: 'off'}]},
//     {elementType: 'geometry', stylers: [{color: '#1B1B1A'}]},
//     {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
//     {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
//     {
//       featureType: 'administrative.locality',
//       elementType: 'labels.text.fill',
//       stylers: [{color: '#A9A9A9'}]
//     },
//     {
//       featureType: 'poi',
//       elementType: 'labels.text.fill',
//       stylers: [{
//         color: '#A9A9A9',
//         'visibility': 'off',
//       }]
//     },
//     {
//       featureType: 'poi.park',
//       elementType: 'geometry',
//       stylers: [{
//         color: '#263c3f',
//         'visibility': 'off',
//       }]
//     },
//     {
//       featureType: 'poi.park',
//       elementType: 'labels.text.fill',
//       stylers: [{
//         color: '#6b9a76',
//         'visibility': 'off',
//       }]
//     },
//     {
//       featureType: 'road',
//       elementType: 'geometry',
//       stylers: [{
//         color: '#38414e',
//       }]
//     },
//     {
//       featureType: 'road',
//       elementType: 'geometry.stroke',
//       stylers: [{color: '#212a37'}]
//     },
//     {
//       featureType: 'road',
//       elementType: 'labels.text.fill',
//       stylers: [{color: '#9ca5b3'}]
//     },
//     {
//       featureType: 'road.highway',
//       elementType: 'geometry',
//       stylers: [{color: '#808080'}]
//     },
//     {
//       featureType: 'road.highway',
//       elementType: 'geometry.stroke',
//       stylers: [{color: '#1f2835'}]
//     },
//     {
//       featureType: 'road.highway',
//       elementType: 'labels.text.fill',
//       stylers: [{color: '#A9A9A9'}]
//     },
//     {
//       featureType: 'transit',
//       elementType: 'geometry',
//       stylers: [{color: '#2f3948'}]
//     },
//     {
//       featureType: 'transit.station',
//       elementType: 'labels.text.fill',
//       stylers: [{
//         color: '#A9A9A9',
//         'visibility': 'off',
//       }]
//     },
//     {
//       featureType: 'water',
//       elementType: 'geometry',
//       stylers: [{
//         color: '#17263c'
//       }]
//     },
//     {
//       featureType: 'water',
//       elementType: 'labels.text.fill',
//       stylers: [{
//         color: '#515c6d'
//       }]
//     },
//     {
//       featureType: 'water',
//       elementType: 'labels.text.stroke',
//       stylers: [{
//         color: '#17263c'
//       }]
//     },
//   ]
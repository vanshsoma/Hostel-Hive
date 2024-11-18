import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarker from './location.png';  


const customIcon = L.icon({
  iconUrl: customMarker,
  iconSize: [38, 38],  
  iconAnchor: [19, 38],  
  popupAnchor: [0, -38]  
});


const impplaces = [
  { id: 1, name: "Amaatra Hostel (you are here)", position: [12.895512, 77.672951] },  
  { id: 2, name: "Happy Mart", position: [12.892364, 77.673782] },
  { id: 3, name: "Vishal Mega Mart", position: [12.901585, 77.675913] },       
  { id: 4, name: "Aarogya Hastha Hospital", position: [12.900588, 77.675686] },  
  { id: 5, name: "KVM Multi-Speciality Hospital", position: [12.894682, 77.661681] }, 
  { id: 6, name: "Aster Pharmacy", position: [12.894479, 77.677838] } 
];


const foodplaces = [
  { id: 5, name: "Goli Vada Pav", position: [12.898326, 77.675344] },  
  { id: 6, name: "The Lassi Corner", position: [12.89258, 77.673705] },  
  { id: 7, name: "Reliance Fresh", position: [12.890726, 77.673405] },  
  { id: 8, name: "Juicy lucy", position: [12.90074, 77.675555] }  
];

const shoppingplaces = [
  { id: 5, name: "Max", position: [12.89919, 77.67528] },  
  { id: 6, name: "TRENDS", position: [12.9033204, 77.67672] }, 
  { id: 7, name: "Polar Bear Ice Cream", position: [12.90211, 77.67557] },
  { id: 8, name: "Subway", position: [12.90139, 77.676192] }  
];




function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

const MapComponent = () => {
  const [selectedPosition, setSelectedPosition] = useState([12.895512, 77.672951]);  // Default to Eiffel Tower

  // Function to handle clicking on a place from the list
  const handlePlaceClick = (position) => {
    setSelectedPosition(position);  // Update the selected position
  };

  return (
    <div>
      {/* Map container */}
      <MapContainer center={selectedPosition} zoom={19} style={{ height: "300px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Change the map view to the selected position */}
        <ChangeMapView coords={selectedPosition} />

        {/* Render markers */}
        {impplaces.concat(foodplaces).map((impplaces) => (
          <Marker key={impplaces.id} position={impplaces.position} icon={customIcon}>
            <Popup>{impplaces.name}</Popup>
          </Marker>
        ))}

         {/* Render markers */}
         {impplaces.concat(shoppingplaces).map((impplaces) => (
          <Marker key={impplaces.id} position={impplaces.position} icon={customIcon}>
            <Popup>{impplaces.name}</Popup>
          </Marker>
        ))}

      </MapContainer>

      {/* Two lists under the map */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        
        {/* First list of places */}
        <div style={{ width: '45%' }}>
          <h3 style={{ fontFamily: 'Italiana, serif', fontWeight: 'bold', textAlign: 'left', textDecoration: 'underline' }}>Important Places near You</h3>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
            {impplaces.map((impplaces) => (
              <li
                key={impplaces.id}
                style={{ cursor: 'pointer', margin: '10px 0', textDecoration: 'none', color: 'black', fontFamily: 'Italiana, serif', fontWeight: 'bold' }}
                onClick={() => handlePlaceClick(impplaces.position)}
              >
                {impplaces.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Second list of other places */}
        <div style={{ width: '45%' }}>
          <h3 style={{ fontFamily: 'Italiana, serif', fontWeight: 'bold', textAlign: 'left', textDecoration: 'underline' }}>Hangout and Food Spots</h3>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
            {foodplaces.map((impplaces) => (
              <li
                key={impplaces.id}
                style={{ cursor: 'pointer', margin: '10px 0', textDecoration: 'none', color: 'black', fontFamily: 'Italiana, serif', fontWeight: 'bold' }}
                onClick={() => handlePlaceClick(impplaces.position)}
              >
                {impplaces.name}
              </li>
            ))}
          </ul>
        </div>


        <div style={{ width: '45%' }}>
          <h3 style={{ fontFamily: 'Italiana, serif', fontWeight: 'bold', textAlign: 'left', textDecoration: 'underline' }}>Shopping Spots</h3>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
            {shoppingplaces.map((impplaces) => (
              <li
                key={impplaces.id}
                style={{ cursor: 'pointer', margin: '10px 0', textDecoration: 'none', color: 'black', fontFamily: 'Italiana, serif', fontWeight: 'bold' }}
                onClick={() => handlePlaceClick(impplaces.position)}
              >
                {impplaces.name}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default MapComponent;
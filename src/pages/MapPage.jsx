import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import statesData from '../data/statesData';
import { useGame } from '../context/GameContext';
import './MapPage.css'; // Make sure this CSS file exists

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapPage = () => {
  const { setSelectedMapState } = useGame();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('costOfLiving');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const stateDataMap = statesData.reduce((acc, state) => { acc[state.name] = state; return acc; }, {});

  const handleStateClick = (geo) => { const stateName = geo.properties.name; const stateData = stateDataMap[stateName]; if (stateData) { setSelectedState(stateData); setSelectedMapState(stateData); /* Navigate to start screen with state info */ navigate(`/start/${stateData.name}`); } };
  const handleMouseMove = (e) => { if (mapRef.current) { const rect = mapRef.current.getBoundingClientRect(); setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top }); } };

  const getStateColor = (stateName) => {
    const state = stateDataMap[stateName];
    if (!state || !state.costIndices) return "#ECEFF1"; // Default if state or costIndices is missing
    switch (selectedFilter) {
      case 'costOfLiving': const housingIndex = state.costIndices.housingIndex || 1; if (housingIndex >= 1.5) return '#1a237e'; if (housingIndex >= 1.2) return '#303f9f'; if (housingIndex >= 1.0) return '#5c6bc0'; if (housingIndex >= 0.8) return '#9fa8da'; return '#c5cae9';
      case 'minWage': const minWage = state.minWage || 0; if (minWage >= 15) return '#1b5e20'; if (minWage >= 12) return '#388e3c'; if (minWage >= 10) return '#66bb6a'; if (minWage >= 8) return '#a5d6a7'; return '#c8e6c9';
      case 'medianIncome': const income = state.medianBottom50Annual || 0; if (income >= 60000) return '#4a148c'; if (income >= 55000) return '#7b1fa2'; if (income >= 50000) return '#ab47bc'; if (income >= 45000) return '#ce93d8'; return '#e1bee7';
      default: return '#9e9e9e';
    }
  };

  const getDataLabel = (state) => {
    if (!state || !state.costIndices) return '';
    switch (selectedFilter) {
      case 'costOfLiving': return `Housing Index: ${state.costIndices.housingIndex || 'N/A'}`;
      case 'minWage': return `Min Wage: ${(state.minWage || 0).toFixed(2)}/hr`;
      case 'medianIncome': return `Median Income: ${Math.round((state.medianBottom50Annual || 0)/1000)}k`;
      default: return '';
    }
  };

  if (loading) {
    return <div className="loading-container"><h1>Loading Map...</h1></div>;
  }

  return (
    <div className="map-page-container fade-in" onMouseMove={handleMouseMove}>
      <div className="map-header">
        <h1>Select Your Starting State</h1>
        <p className="map-description">Economic conditions vary greatly. Choose a state to begin your simulation.</p>
        <div className="map-controls">
          <div className="search-container"><input type="text" placeholder="Search for a state..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/></div>
          <div className="filter-controls"><span>View by:</span><div className="filter-buttons"> <button className={selectedFilter === 'costOfLiving' ? 'active' : ''} onClick={() => setSelectedFilter('costOfLiving')}>Cost of Living</button> <button className={selectedFilter === 'minWage' ? 'active' : ''} onClick={() => setSelectedFilter('minWage')}>Minimum Wage</button> <button className={selectedFilter === 'medianIncome' ? 'active' : ''} onClick={() => setSelectedFilter('medianIncome')}>Median Income</button> </div></div>
        </div>
      </div>
      {/* Legend (simplified) */}
      <div className="map-legend"> <p>Legend: Color intensity indicates higher values for the selected filter.</p> </div>
      <div className="map-container" ref={mapRef}>
        <ComposableMap projection="geoAlbersUsa">
          <ZoomableGroup zoom={0.8} center={[-98, 39]}> {/* Zoomed out */}
            <Geographies geography={geoUrl}>
              {({ geographies }) => geographies.map(geo => { const stateName = geo.properties.name; const stateData = stateDataMap[stateName]; return ( <Geography key={geo.rsmKey} geography={geo} fill={getStateColor(stateName)} stroke="#FFF" strokeWidth={0.5} style={{ default: { outline: "none" }, hover: { outline: "none", fill: "#FFD54F" }, pressed: { outline: "none" }, }} onMouseEnter={() => { if (stateData) setHoveredState(stateData); }} onMouseLeave={() => setHoveredState(null)} onClick={() => handleStateClick(geo)} /> ); }) }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {hoveredState && ( <div className="map-tooltip" style={{ left: tooltipPos.x + 10, top: tooltipPos.y + 10 }}> <h3>{hoveredState.name}</h3> <p>{getDataLabel(hoveredState)}</p> <p className="tooltip-hint">Click state to select</p> </div> )}
      </div>
      {selectedState && (
        <div className="state-details-card-map"> {/* Unique class for map page card */}
          <div className="state-details-header"><h2>{selectedState.name}</h2><button className="close-button" onClick={() => setSelectedState(null)}>×</button></div>
          <div className="state-details-content">
             <p>Minimum Wage: ${selectedState.minWage.toFixed(2)}/hr</p>
             <p>Median Income (Bottom 50%): ${selectedState.medianBottom50Annual.toLocaleString()}/year</p>
             <p>Housing Index: {selectedState.costIndices.housingIndex} (Nat'l Avg = 1)</p>
            <Link to={`/start/${selectedState.name}`} className="button primary" style={{marginTop: '1rem'}}>Start Simulation Here</Link>
          </div>
        </div>
      )}
      <div className="state-list-container">
        <h2>Or Select from a List:</h2>
        <ul className="state-list">
          {statesData
            .filter(state =>
              state.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(state => (
              <li key={state.name} onClick={() => handleStateClick({ properties: { name: state.name } })}>
                {state.name}
              </li>
            ))}
        </ul>
      </div>
      <footer className="map-footer"><p>Data sources: U.S. Bureau of Labor Statistics, U.S. Census Bureau (Simulated 2025 Data)</p></footer>
    </div>
  );
};
export default MapPage;
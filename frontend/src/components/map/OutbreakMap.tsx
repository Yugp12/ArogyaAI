import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { mockOutbreaks } from '../../data/mockData';
import { useCommand } from '../../context/CommandContext';
import L from 'leaflet';
import {
  MapPin,
  Flame,
  ChevronRight,
  Filter,
  Globe,
  Layers,
  Map as MapIcon,
  Radio,
  ExternalLink,
  Maximize2,
  Minimize2,
  Navigation,
  Search,
  Plus,
  Minus,
  LocateFixed,
  Compass
} from 'lucide-react';
import { clsx } from 'clsx';

export const OutbreakMap: React.FC = () => {
  const { selectedOutbreak, setSelectedOutbreak, setActiveTab } = useCommand();
  const [diseaseFilter, setDiseaseFilter] = useState<string>('ALL');
  const [mapMode, setMapMode] = useState<'google' | 'carto' | 'osm'>('google');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [citySearchQuery, setCitySearchQuery] = useState<string>('');

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const filteredOutbreaks = diseaseFilter === 'ALL'
    ? mockOutbreaks
    : mockOutbreaks.filter(o => o.disease.includes(diseaseFilter));

  const cityJumpShortcuts = [
    { name: 'India Overview', lat: 20.5937, lng: 78.9629, zoom: 5 },
    { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090, zoom: 9 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, zoom: 9 },
    { name: 'Kozhikode', lat: 11.2588, lng: 75.7804, zoom: 10 },
    { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, zoom: 9 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639, zoom: 9 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707, zoom: 9 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, zoom: 9 }
  ];

  // Initialize Leaflet GIS Engine with 100% Active Mouse Drag / Cursor Navigation
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        touchZoom: true,
        boxZoom: true,
        keyboard: true,
        bounceAtZoomLimits: true
      });

      map.dragging.enable();
      mapInstanceRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Invalidate size on fullscreen toggle
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 200);
    }
  }, [isFullscreen]);

  // Update Tile Layer based on selected Map Mode (Google / CARTO / OSM)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let newTileLayer: L.TileLayer;

    if (mapMode === 'google') {
      newTileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
    } else if (mapMode === 'carto') {
      newTileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
    } else {
      newTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      });
    }

    newTileLayer.addTo(map);
    tileLayerRef.current = newTileLayer;
  }, [mapMode]);

  // Synchronized City Hotspot Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    filteredOutbreaks.forEach(ob => {
      const isSelected = selectedOutbreak?.id === ob.id;

      const riskColorClass =
        ob.riskLevel === 'CRITICAL' ? 'bg-rose-500 border-rose-400' :
        ob.riskLevel === 'HIGH' ? 'bg-amber-500 border-amber-400' :
        ob.riskLevel === 'MODERATE' ? 'bg-sky-500 border-sky-400' :
        'bg-emerald-500 border-emerald-400';

      const customIcon = L.divIcon({
        className: 'custom-outbreak-pin',
        html: `
          <div class="relative group cursor-pointer flex items-center justify-center pointer-events-auto">
            <span class="absolute -inset-2 rounded-full opacity-75 animate-ping ${riskColorClass.split(' ')[0]}"></span>
            <div class="relative w-4 h-4 rounded-full ${riskColorClass} border-2 shadow-lg flex items-center justify-center ${isSelected ? 'ring-4 ring-white scale-125' : ''}">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
            <div class="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/95 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-100 shadow-xl pointer-events-none">
              ${ob.region.split(' ')[0]}: ${ob.r0Value}
            </div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([ob.lat, ob.lng], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedOutbreak(ob);
        map.flyTo([ob.lat, ob.lng], Math.max(map.getZoom(), 8), { duration: 1.2 });
      });

      markersRef.current.push(marker);
    });
  }, [filteredOutbreaks, selectedOutbreak, setSelectedOutbreak]);

  // Google Maps Native Navigation Handlers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleRecenterIndia = () => mapInstanceRef.current?.flyTo([20.5937, 78.9629], 5, { duration: 1.2 });

  const handleCityJump = (lat: number, lng: number, zoom: number) => {
    mapInstanceRef.current?.flyTo([lat, lng], zoom, { duration: 1.2 });
  };

  const handleCitySearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citySearchQuery.trim()) return;

    const matched = mockOutbreaks.find(
      o => o.region.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
           o.state.toLowerCase().includes(citySearchQuery.toLowerCase())
    );

    if (matched) {
      setSelectedOutbreak(matched);
      mapInstanceRef.current?.flyTo([matched.lat, matched.lng], 9, { duration: 1.2 });
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/70 light:bg-white backdrop-blur-md">
        <div>
          <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            National Epidemic Geospatial Surveillance (Interactive Mouse Drag Navigation)
          </h2>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
            Click & drag mouse cursor to pan up/down/left/right smoothly across India.
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1 font-mono">
            <Filter className="w-3.5 h-3.5 text-teal-400" /> Filter:
          </span>
          {['ALL', 'Nipah', 'Dengue', 'Influenza'].map((filter) => (
            <button
              key={filter}
              onClick={() => setDiseaseFilter(filter)}
              className={clsx(
                'px-3 py-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer font-mono',
                diseaseFilter === filter
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                  : 'bg-slate-800/60 light:bg-slate-100 text-slate-400 light:text-slate-600 border-slate-700/50 light:border-slate-300 hover:text-slate-200'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className={clsx(
            'relative rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-950 light:bg-slate-900 p-6 overflow-hidden flex flex-col justify-between shadow-2xl transition-all',
            isFullscreen
              ? 'fixed inset-4 z-50 lg:col-span-3 min-h-[90vh]'
              : 'lg:col-span-2 min-h-[600px]'
          )}
        >
          {/* Top Control Bar */}
          <div className="relative z-30 flex flex-col gap-3 mb-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 font-mono shadow-xl">
                <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
                <span className="font-bold text-teal-300">CURSOR MOUSE DRAG ACTIVE</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">• Click & Drag Up/Down/Left/Right</span>
              </div>

              {/* Map Type Switcher & Search & Fullscreen */}
              <div className="flex items-center gap-2 flex-wrap">
                <form onSubmit={handleCitySearchSubmit} className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search India City..."
                    value={citySearchQuery}
                    onChange={(e) => setCitySearchQuery(e.target.value)}
                    className="pl-8 pr-2 py-1.5 text-xs bg-slate-900/95 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500 font-mono w-36 shadow-lg"
                  />
                </form>

                <div className="flex items-center gap-1 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl p-1 font-mono text-xs shadow-xl">
                  <button
                    onClick={() => setMapMode('google')}
                    className={clsx(
                      'px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-[11px] font-bold',
                      mapMode === 'google'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200'
                    )}
                  >
                    <Globe className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Google Map</span>
                  </button>

                  <button
                    onClick={() => setMapMode('carto')}
                    className={clsx(
                      'px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-[11px] font-bold',
                      mapMode === 'carto'
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200'
                    )}
                  >
                    <Layers className="w-3.5 h-3.5 text-teal-300" />
                    <span>Satellite Hybrid</span>
                  </button>

                  <button
                    onClick={() => setMapMode('osm')}
                    className={clsx(
                      'px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-[11px] font-bold',
                      mapMode === 'osm'
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200'
                    )}
                  >
                    <MapIcon className="w-3.5 h-3.5 text-emerald-300" />
                    <span>OpenStreetMap</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
                  className="p-2 rounded-xl bg-slate-900/95 border border-slate-800 text-teal-400 hover:text-teal-200 transition-all cursor-pointer shadow-xl"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick City Jump Shortcuts Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs no-scrollbar">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0 font-bold">
                <Navigation className="w-3 h-3 text-teal-400" /> Fly To:
              </span>
              {cityJumpShortcuts.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleCityJump(c.lat, c.lng, c.zoom)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-teal-300 border border-slate-800 text-[10px] font-bold transition-all shrink-0 cursor-pointer"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Leaflet GIS Map Viewport Container */}
          <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[440px] cursor-grab active:cursor-grabbing">
            <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-10" />

            {/* Google Maps Standard Controls (Bottom-Right Vertical Stack: Recenter + Zoom In + Zoom Out) */}
            <div className="absolute bottom-4 right-4 z-30 flex flex-col items-center gap-2">
              <button
                onClick={handleRecenterIndia}
                title="Recenter Map over India"
                className="p-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-teal-400 hover:text-teal-200 border border-slate-700 shadow-2xl transition-all cursor-pointer"
              >
                <LocateFixed className="w-4 h-4" />
              </button>

              <div className="flex flex-col rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl overflow-hidden divide-y divide-slate-800">
                <button
                  onClick={handleZoomIn}
                  title="Zoom In (+)"
                  className="p-2.5 hover:bg-slate-800 text-slate-200 hover:text-white transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <button
                  onClick={handleZoomOut}
                  title="Zoom Out (-)"
                  className="p-2.5 hover:bg-slate-800 text-slate-200 hover:text-white transition-all cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer Attribution */}
          <div className="relative z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-slate-300 border-t border-slate-800/90 pt-3 mt-3 gap-1 bg-slate-950/80 px-3 py-2 rounded-xl backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-teal-300 font-bold">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Maps Mouse Drag: {mapMode === 'google' ? 'Google Maps India High-Definition' : mapMode === 'carto' ? 'Google Satellite Hybrid' : 'OpenStreetMap'}</span>
            </span>

            <span className="text-[11px] text-slate-300 font-mono flex items-center gap-1">
              <span className="font-semibold text-slate-200">OpenStreetMap contributors, CARTO, Google Maps India</span>
              <ExternalLink className="w-3 h-3 text-cyan-400 ml-1" />
            </span>
          </div>
        </div>

        {!isFullscreen && (
          <div className="space-y-4">
            {selectedOutbreak ? (
              <motion.div
                key={selectedOutbreak.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-teal-400 uppercase font-mono">
                      ZONE ID: {selectedOutbreak.id}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-100 light:text-slate-900 mt-0.5">
                      {selectedOutbreak.region}
                    </h3>
                    <p className="text-xs text-slate-400">{selectedOutbreak.state}</p>
                  </div>
                  <span
                    className={clsx(
                      'px-2.5 py-1 rounded-lg text-xs font-bold font-mono border',
                      selectedOutbreak.riskLevel === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    )}
                  >
                    {selectedOutbreak.riskLevel}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-300 light:text-slate-700">Pathogen Agent</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-teal-400">{selectedOutbreak.disease}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block">Active Cases</span>
                    <span className="text-xl font-extrabold text-slate-100 light:text-slate-900">
                      {selectedOutbreak.activeCases.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-rose-400 block mt-1">+{selectedOutbreak.dailyIncrease}% today</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block">Reproduction (R0)</span>
                    <span className="text-xl font-extrabold text-amber-400">{selectedOutbreak.r0Value}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Threshold: 1.0</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block">ICU Occupancy</span>
                    <span className="text-xl font-extrabold text-slate-100 light:text-slate-900">
                      {selectedOutbreak.icuOccupancyPct}%
                    </span>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-rose-500 h-full rounded-full"
                        style={{ width: `${selectedOutbreak.icuOccupancyPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block">O2 Reserve</span>
                    <span className="text-xl font-extrabold text-teal-400">{selectedOutbreak.oxygenReserveDays} Days</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Refill queued</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('triage')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
                >
                  <span>View Patient Triage for {selectedOutbreak.region.split(' ')[0]}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <div className="p-6 text-center text-slate-400 border border-slate-800 rounded-2xl bg-slate-900/60">
                Select a hotspot pin on the map to view detailed outbreak telemetry.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

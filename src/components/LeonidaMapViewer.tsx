import React, { useState } from 'react';
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Compass,
  ExternalLink,
  Info,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { MapPOI } from '../types/forum';
import { soundManager } from '../utils/audio';

interface LeonidaMapViewerProps {
  pois: MapPOI[];
  onOpenThread: (threadId: string) => void;
}

export const LeonidaMapViewer: React.FC<LeonidaMapViewerProps> = ({ pois, onOpenThread }) => {
  const [selectedPoi, setSelectedPoi] = useState<MapPOI | null>(pois[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showGrid, setShowGrid] = useState(true);

  const filteredPois =
    activeCategory === 'all' ? pois : pois.filter((p) => p.category === activeCategory);

  const handleZoomIn = () => {
    soundManager.playBlip();
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.2));
  };

  const handleZoomOut = () => {
    soundManager.playBlip();
    setZoomLevel((prev) => Math.max(prev - 0.3, 1));
  };

  const handleResetZoom = () => {
    soundManager.playBlip();
    setZoomLevel(1);
  };

  const categoryFilters = [
    { id: 'all', label: 'Todos los Puntos' },
    { id: 'city', label: 'Metrópolis y Barrios' },
    { id: 'nature', label: 'Marismas y Glades' },
    { id: 'crime', label: 'Zonas Críticas y Leaks' },
    { id: 'transport', label: 'Transporte y Puentes' },
  ];

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-[#131527] border border-[#21243f]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00f0ff] uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#ff007a]" />
            <span>Cartografía Comunitaria de Leonida · Escala RAGE 9</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Mapa Interactivo de Leonida y Vice City
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Reconstrucción satelital basada en las coordenadas filtradas del código y los hitos del tráiler oficial. Selecciona cualquier punto de interés para consultar secretos y debates.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playBlip();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#ff007a] text-white font-bold'
                  : 'bg-[#181a30] text-slate-300 hover:text-white border border-[#272b4c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Canvas & Details Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Viewport Area (2 columns on large screens) */}
        <div className="lg:col-span-2 relative rounded-xl overflow-hidden bg-[#0a0b14] border border-[#21243f] shadow-2xl min-h-[480px] sm:min-h-[600px] flex items-center justify-center">
          {/* Zoom & Overlay Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-[#121324]/90 backdrop-blur-md p-1.5 rounded-lg border border-[#262a4d] shadow-lg">
            <button
              onClick={handleZoomIn}
              title="Acercar mapa"
              className="p-2 text-slate-300 hover:text-white hover:bg-[#1e213b] rounded transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Alejar mapa"
              className="p-2 text-slate-300 hover:text-white hover:bg-[#1e213b] rounded transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Restablecer vista"
              className="p-2 text-slate-300 hover:text-white hover:bg-[#1e213b] rounded transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-px bg-[#262a4d] my-1" />
            <button
              onClick={() => {
                soundManager.playBlip();
                setShowGrid(!showGrid);
              }}
              title="Alternar cuadrícula de coordenadas"
              className={`p-2 rounded transition-colors ${
                showGrid ? 'text-[#00f0ff] bg-[#00f0ff]/10' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Coordinate Indicator */}
          <div className="absolute bottom-4 left-4 z-20 font-mono text-[11px] text-slate-300 bg-[#121324]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#262a4d]">
            <span className="text-[#00f0ff]">LEONIDA SAT_2026</span>
            <span className="mx-2 text-slate-600">|</span>
            <span>Zoom: {(zoomLevel * 100).toFixed(0)}%</span>
            <span className="mx-2 text-slate-600">|</span>
            <span className="text-[#ff007a]">{filteredPois.length} Marcadores</span>
          </div>

          {/* Zoomable Container */}
          <div
            className="w-full h-full relative flex items-center justify-center transition-transform duration-300 ease-out overflow-hidden"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* The Cartography Satellite Image */}
            <img
              src="/src/assets/images/gta6_leonida_map_preview_1795625162172.jpg"
              alt="Mapa satelital de Leonida"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain pointer-events-none select-none max-h-[700px]"
            />

            {/* Grid overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none grid grid-cols-7 grid-rows-7 border border-[#00f0ff]/20">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div
                    key={i}
                    className="border border-[#00f0ff]/10 text-[9px] font-mono text-[#00f0ff]/30 p-1 select-none"
                  >
                    {String.fromCharCode(65 + (i % 7))}
                    {Math.floor(i / 7) + 1}
                  </div>
                ))}
              </div>
            )}

            {/* POI Markers */}
            {filteredPois.map((poi) => {
              const isSelected = selectedPoi?.id === poi.id;
              return (
                <button
                  key={poi.id}
                  onClick={() => {
                    soundManager.playBlip();
                    setSelectedPoi(poi);
                  }}
                  style={{
                    left: `${poi.coordinates.x}%`,
                    top: `${poi.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-30 focus:outline-none"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring for selected POI */}
                    {isSelected && (
                      <span className="absolute w-8 h-8 rounded-full bg-[#ff007a] animate-ping opacity-60" />
                    )}

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 group-hover:scale-125 shadow-lg ${
                        isSelected
                          ? 'bg-[#ff007a] text-white ring-2 ring-white ring-offset-2 ring-offset-black'
                          : 'bg-[#0f1122] text-[#00f0ff] border-2 border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 rounded bg-[#0f1122] border border-[#2b2f56] text-[11px] font-bold text-white whitespace-nowrap shadow-xl pointer-events-none">
                      {poi.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* POI Details Drawer (1 column) */}
        <div className="space-y-4">
          {selectedPoi ? (
            <div className="p-6 rounded-xl bg-[#131527] border border-[#21243f] space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[#00f0ff] uppercase tracking-wider">
                    {selectedPoi.district}
                  </span>
                  <span className="font-mono tabular-nums text-slate-500">
                    X: {selectedPoi.coordinates.x}% | Y: {selectedPoi.coordinates.y}%
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-white">{selectedPoi.name}</h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPoi.description}
                </p>

                {/* Confirmed features */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Detalles Confirmados en Trailers
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedPoi.confirmedFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Community Speculation */}
                <div className="p-3.5 rounded-lg bg-[#0e101f] border border-[#1e223d] space-y-1">
                  <span className="text-[11px] font-bold text-[#f59e0b] uppercase tracking-wider block">
                    Teoría de la Comunidad
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{selectedPoi.speculation}"
                  </p>
                </div>
              </div>

              {/* Action Button to Forum Debate */}
              {selectedPoi.relatedThreadId && (
                <div className="pt-4 border-t border-[#1c1f38]">
                  <button
                    onClick={() => {
                      soundManager.playBlip();
                      onOpenThread(selectedPoi.relatedThreadId!);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] rounded-lg transition-all"
                  >
                    <span>Ver Debate del Foro sobre esta Zona</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl bg-[#131527] border border-[#21243f] text-slate-400 text-sm flex flex-col items-center justify-center h-full">
              <Navigation className="w-8 h-8 text-slate-500 mb-2" />
              <span>Haz clic en cualquier marcador del mapa para inspeccionar sus coordenadas e información filtrada.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

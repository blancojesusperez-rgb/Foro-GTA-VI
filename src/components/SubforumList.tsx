import React from 'react';
import {
  Megaphone,
  Cpu,
  MapPin,
  Users,
  Car,
  Globe,
  Monitor,
  Coffee,
  MessageSquare,
  FileText,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { SubCategory } from '../types/forum';
import { soundManager } from '../utils/audio';

interface SubforumListProps {
  categories: SubCategory[];
  onSelectCategory: (categoryId: string) => void;
  onNewThreadWithCategory: (categoryId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Megaphone,
  Cpu,
  MapPin,
  Users,
  Car,
  Globe,
  Monitor,
  Coffee,
};

export const SubforumList: React.FC<SubforumListProps> = ({
  categories,
  onSelectCategory,
  onNewThreadWithCategory,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#131527] border border-[#21243f]">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white">
          Directorio Oficial de Subforos · Estado de Leonida
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Navega por las secciones especializadas de la comunidad para debatir sobre la campaña, especificaciones técnicas de consolas, análisis de trailers y teorías de Vice City.
        </p>
      </div>

      {/* Grid of Subforums */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || MessageSquare;

          return (
            <div
              key={cat.id}
              onClick={() => {
                soundManager.playBlip();
                onSelectCategory(cat.id);
              }}
              className="group p-5 rounded-xl bg-[#131527] hover:bg-[#181a30] border border-[#21243f] hover:border-[#383d6a] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${cat.color}15`,
                        color: cat.color,
                        border: `1px solid ${cat.color}35`,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-tight">
                        {cat.title}
                      </h2>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono tabular-nums">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3 text-slate-500" />
                          <span>{cat.threadsCount} debates</span>
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-slate-500" />
                          <span>{cat.postsCount.toLocaleString()} mensajes</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playBlip();
                      onNewThreadWithCategory(cat.id);
                    }}
                    title="Crear debate en esta categoría"
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-[#25284b] rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Latest activity row */}
              <div className="pt-3 mt-3 border-t border-[#1c1f38] flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[280px]">Última actividad: {cat.latestActivity}</span>
                <span className="flex items-center gap-1 text-[#00f0ff] font-medium group-hover:translate-x-1 transition-transform">
                  <span>Explorar</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

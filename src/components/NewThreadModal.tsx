import React, { useState } from 'react';
import { X, Plus, Sparkles, Image, Check, AlertCircle } from 'lucide-react';
import { SubCategory, UserProfile } from '../types/forum';
import { soundManager } from '../utils/audio';

interface NewThreadModalProps {
  categories: SubCategory[];
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newThread: {
    categoryId: string;
    categoryTitle: string;
    title: string;
    summary: string;
    content: string;
    tags: string[];
    imageBanner?: string;
    pollQuestion?: string;
    pollOptions?: string[];
  }) => void;
}

const AVAILABLE_TAGS = [
  'OFICIAL',
  'TEORÍA',
  'FILTRACIÓN',
  'RAGE 9',
  'MAPA',
  'JASON',
  'LUCIA',
  'VEHÍCULOS',
  'ARMAS',
  'GTA ONLINE',
  'MÚSICA',
  'SPOILER',
  'TRAILER 2',
];

export const NewThreadModal: React.FC<NewThreadModalProps> = ({
  categories,
  currentUser,
  isOpen,
  onClose,
  onCreate,
}) => {
  if (!isOpen) return null;

  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['TEORÍA']);
  const [imageBanner, setImageBanner] = useState('');
  const [hasPoll, setHasPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [error, setError] = useState<string | null>(null);

  const toggleTag = (tag: string) => {
    soundManager.playBlip();
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length >= 4) return;
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handleUpdatePollOption = (idx: number, val: string) => {
    const next = [...pollOptions];
    next[idx] = val;
    setPollOptions(next);
  };

  const handleRemovePollOption = (idx: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Por favor indica un título para el debate');
      return;
    }
    if (!content.trim()) {
      setError('El contenido del debate no puede estar vacío');
      return;
    }

    const category = categories.find((c) => c.id === categoryId) || categories[0];

    const cleanPollOptions = pollOptions.map((o) => o.trim()).filter(Boolean);
    if (hasPoll && (!pollQuestion.trim() || cleanPollOptions.length < 2)) {
      setError('Para activar una encuesta debes escribir la pregunta y al menos 2 opciones');
      return;
    }

    soundManager.playUpvote();
    onCreate({
      categoryId: category.id,
      categoryTitle: category.title,
      title: title.trim(),
      summary: summary.trim() || title.slice(0, 140),
      content: content.trim(),
      tags: selectedTags.length > 0 ? selectedTags : ['COMUNIDAD'],
      imageBanner: imageBanner.trim() || undefined,
      pollQuestion: hasPoll ? pollQuestion.trim() : undefined,
      pollOptions: hasPoll ? cleanPollOptions : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#131527] border border-[#262a4d] rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21243f] pb-4">
          <div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">
              Crear Nuevo Debate en Leonida
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Publicando como <strong className="text-[#00f0ff]">{currentUser.username}</strong> ({currentUser.rank})
            </p>
          </div>
          <button
            onClick={() => {
              soundManager.playBlip();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1f223f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Subforum category selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Categoría del subforo</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Título del debate</label>
            <input
              type="text"
              required
              placeholder="Ej: [TEORÍA] La física de los pantanos de The Glades en el motor RAGE 9"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          {/* Tags picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Etiquetas temáticas (máx. 4)</span>
              <span className="text-slate-500 font-mono text-[11px]">{selectedTags.length}/4 seleccionadas</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors ${
                      isSelected
                        ? 'bg-[#ff007a] text-white font-bold'
                        : 'bg-[#181a30] text-slate-400 hover:text-slate-200 border border-[#26294a]'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Short Summary */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Resumen corto (opcional para la vista previa)</label>
            <input
              type="text"
              placeholder="Breve anticipo de 1 o 2 líneas para enganchar a los lectores..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          {/* Detailed Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Cuerpo del debate</label>
            <textarea
              required
              rows={5}
              placeholder="Desarrolla tus argumentos, capturas de pantalla, citas o preguntas a la comunidad..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError(null);
              }}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg p-3.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff] resize-y"
            />
          </div>

          {/* Image Banner URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>URL de imagen de cabecera (opcional)</span>
            </label>
            <input
              type="url"
              placeholder="https://... o ruta de imagen"
              value={imageBanner}
              onChange={(e) => setImageBanner(e.target.value)}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          {/* Poll Toggle & Fields */}
          <div className="pt-2 border-t border-[#1e213b] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">¿Añadir encuesta comunitaria?</span>
              <button
                type="button"
                onClick={() => setHasPoll(!hasPoll)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  hasPoll ? 'bg-[#ff007a]' : 'bg-[#25284b]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    hasPoll ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {hasPoll && (
              <div className="p-3.5 rounded-lg bg-[#0e101f] border border-[#25284b] space-y-2.5">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Pregunta de la encuesta</label>
                  <input
                    type="text"
                    placeholder="Ej: ¿Qué vehículo te hace más ilusión conducir?"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    className="w-full bg-[#141629] text-slate-200 text-xs rounded px-3 py-1.5 border border-[#25284b]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 block">Opciones</label>
                  {pollOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Opción ${idx + 1}`}
                        value={opt}
                        onChange={(e) => handleUpdatePollOption(idx, e.target.value)}
                        className="flex-1 bg-[#141629] text-slate-200 text-xs rounded px-3 py-1.5 border border-[#25284b]"
                      />
                      {pollOptions.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePollOption(idx)}
                          className="text-slate-500 hover:text-rose-400 text-xs px-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  {pollOptions.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddPollOption}
                      className="text-xs text-[#00f0ff] hover:underline pt-1 inline-block"
                    >
                      + Añadir otra opción
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e213b]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publicar Debate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

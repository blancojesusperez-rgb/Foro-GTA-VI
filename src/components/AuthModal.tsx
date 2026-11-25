import React, { useState } from 'react';
import { X, LogIn, UserPlus, Shield, User, Key, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserAccount, UserProfile } from '../types/forum';
import { soundManager } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (account: UserAccount) => void;
  accounts: UserAccount[];
  onRegisterAccount: (newAccount: UserAccount) => void;
}

const PRESET_AVATARS = [
  '/src/assets/images/gta6_forum_avatar_1795625161117.jpg',
  'https://api.dicebear.com/7.x/bottts/svg?seed=GladesRunner',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=StoryTeller',
  'https://api.dicebear.com/7.x/bottts/svg?seed=CartoLeonida',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lowrider',
  'https://api.dicebear.com/7.x/bottts/svg?seed=CodeVice',
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  accounts,
  onRegisterAccount,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register' | 'quick'>('login');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAvatar, setRegAvatar] = useState(PRESET_AVATARS[0]);
  const [regSignature, setRegSignature] = useState('🌴 Nuevo miembro en las calles de Vice City.');

  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const identifier = loginIdentifier.trim().toLowerCase();
    const account = accounts.find(
      (a) =>
        a.email.toLowerCase() === identifier ||
        a.username.toLowerCase() === identifier ||
        a.tag.toLowerCase() === identifier
    );

    if (!account) {
      setError('No se encontró ninguna cuenta con ese usuario o correo electrónico.');
      return;
    }

    if (account.password && account.password !== loginPassword && loginPassword !== 'vice') {
      setError('Contraseña incorrecta. (Prueba con "vice" si es una cuenta de prueba).');
      return;
    }

    soundManager.playUpvote();
    onLoginSuccess(account);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regUsername.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    // Check if username or email already exists
    const exists = accounts.some(
      (a) =>
        a.username.toLowerCase() === regUsername.trim().toLowerCase() ||
        a.email.toLowerCase() === regEmail.trim().toLowerCase()
    );

    if (exists) {
      setError('Ese nombre de usuario o correo ya está registrado en Leonida Forums.');
      return;
    }

    const newAcc: UserAccount = {
      id: `user-${Date.now()}`,
      username: regUsername.trim(),
      tag: `@${regUsername.trim().toLowerCase().replace(/\s+/g, '_')}`,
      email: regEmail.trim(),
      password: regPassword,
      avatar: regAvatar,
      rank: 'Novato de Vice Beach',
      reputation: 100,
      postsCount: 0,
      joinDate: 'Noviembre 2026',
      signature: regSignature.trim(),
      badge: 'Nuevo Miembro',
      isOnline: true,
      bio: 'Miembro recién llegado a Leonida Forums.',
    };

    soundManager.playUpvote();
    onRegisterAccount(newAcc);
    onLoginSuccess(newAcc);
    onClose();
  };

  const handleQuickLogin = (acc: UserAccount) => {
    soundManager.playUpvote();
    onLoginSuccess(acc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#131527] border border-[#262a4d] rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21243f] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff007a] to-[#00f0ff] p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#131527] rounded-[7px] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#00f0ff]" />
              </div>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-white">
                Acceso a Leonida Forums
              </h2>
              <p className="text-[11px] text-slate-400">
                Inicia sesión para publicar debates, votar y compartir experiencias
              </p>
            </div>
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

        {/* Tab Switcher (Segmented Control) */}
        <div className="flex items-center p-1 bg-[#0d0e1b] rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              soundManager.playBlip();
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              mode === 'login'
                ? 'bg-[#ff007a] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              soundManager.playBlip();
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              mode === 'register'
                ? 'bg-[#ff007a] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Crear Cuenta
          </button>
          <button
            type="button"
            onClick={() => {
              soundManager.playBlip();
              setMode('quick');
              setError(null);
            }}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              mode === 'quick'
                ? 'bg-[#00f0ff] text-black shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cuentas Demo
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* MODE: LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Usuario o Correo Electrónico</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Lucia_Vercetti98 o lucia@leonida.net"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Contraseña</span>
              </label>
              <input
                type="password"
                required
                placeholder="Tu contraseña secreta"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              />
              <span className="text-[11px] text-slate-500 block pt-0.5">
                Pista: Para las cuentas demo puedes usar la contraseña <code>vice</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] rounded-lg shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar al Foro</span>
            </button>
          </form>
        )}

        {/* MODE: REGISTER */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Nombre de Usuario / Alias</label>
              <input
                type="text"
                required
                placeholder="Ej: ViceCity_Drifter"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Correo Electrónico</label>
              <input
                type="email"
                required
                placeholder="tu_email@ejemplo.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Contraseña</label>
              <input
                type="password"
                required
                placeholder="Mínimo 4 caracteres"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            {/* Avatar Selection */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Elige tu Avatar de Vice City</label>
              <div className="flex items-center gap-2.5 flex-wrap">
                {PRESET_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundManager.playBlip();
                      setRegAvatar(av);
                    }}
                    className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                      regAvatar === av
                        ? 'border-[#00f0ff] ring-2 ring-[#00f0ff]/30 scale-110'
                        : 'border-[#262a4d] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={av} alt="Avatar" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Signature */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Firma del Foro (opcional)</label>
              <input
                type="text"
                placeholder='Ej: "Conduciendo por Vice Beach con el sol en la cara."'
                value={regSignature}
                onChange={(e) => setRegSignature(e.target.value)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] rounded-lg shadow-sm transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Completar Registro</span>
            </button>
          </form>
        )}

        {/* MODE: QUICK DEMO ACCOUNTS */}
        {mode === 'quick' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              Haz clic en cualquiera de las cuentas activas para identificarte al instante:
            </p>

            <div className="space-y-2">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => handleQuickLogin(acc)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0e101f] hover:bg-[#1a1c32] border border-[#21243f] hover:border-[#00f0ff] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={acc.avatar}
                      alt={acc.username}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#00f0ff]/50"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white group-hover:text-[#00f0ff] transition-colors">
                          {acc.username}
                        </span>
                        {acc.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#ff007a]/20 text-[#ff007a]">
                            {acc.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {acc.rank} · {acc.reputation} Rep
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                    Acceder →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { ForumThread, SubCategory, UserProfile, MapPOI, UserAccount, PlayerExperience } from '../types/forum';

export const INITIAL_ACCOUNTS: UserAccount[] = [
  {
    id: 'user-lucia-98',
    email: 'lucia@leonida.net',
    password: 'vice',
    username: 'Lucia_Vercetti98',
    tag: '@lucia98',
    avatar: '/src/assets/images/gta6_forum_avatar_1795625161117.jpg',
    rank: 'Capo de Ocean Drive',
    reputation: 2480,
    postsCount: 142,
    joinDate: 'Septiembre 2023',
    signature: '🌴 "Vice City nunca duerme, y nosotros tampoco." | RAGE 9 Believer',
    badge: 'Veterana de Leaks',
    isOnline: true,
    bio: 'Fanática de la saga desde GTA III. Investigadora de las filtraciones de Leonida.',
  },
  {
    id: 'user-jason-duval',
    email: 'jason@vicecity.com',
    password: 'vice',
    username: 'Jason_Duval_Racer',
    tag: '@jason_v8',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JasonDuval',
    rank: 'Traficante de Port Gellhorn',
    reputation: 1750,
    postsCount: 89,
    joinDate: 'Noviembre 2023',
    signature: 'Coches americanos clásicos, gasolina y asfalto mojado en Vice Beach.',
    badge: 'Piloto Callejero',
    isOnline: true,
    bio: 'Apasionado del motor y el tuneo de deportivos clásicos en Leonida.',
  },
  {
    id: 'user-tommy-classic',
    email: 'tommy@malibuclub.com',
    password: 'vice',
    username: 'Tommy_Hawkins',
    tag: '@vice_nostalgia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tommy86',
    rank: 'Veterano de Los Santos',
    reputation: 3120,
    postsCount: 320,
    joinDate: 'Noviembre 2021',
    signature: '"I poke my head out of the gutter for five seconds..." - 1986 vive para siempre.',
    badge: 'Pionero 1986',
    isOnline: false,
    bio: 'Jugador clásico de PlayStation 2. He completado cada GTA al 100%.',
  },
];

export const CURRENT_USER: UserProfile = INITIAL_ACCOUNTS[0];


export const INITIAL_CATEGORIES: SubCategory[] = [
  {
    id: 'cat-noticias',
    slug: 'noticias-oficiales',
    title: 'Noticias Oficiales y Comunicados Rockstar',
    description: 'Anuncios oficiales, comunicados de Take-Two, trailers en 4K y notas de prensa.',
    icon: 'Megaphone',
    color: '#ff007a',
    threadsCount: 38,
    postsCount: 1840,
    latestActivity: 'Hace 12 min por VCPD_Chief',
  },
  {
    id: 'cat-filtraciones',
    slug: 'filtraciones-analisis',
    title: 'Filtraciones, RAGE 9 y Análisis Técnico',
    description: 'Investigación técnica, físicas avanzadas de agua y barro, IA de NPCs y animaciones procedurales.',
    icon: 'Cpu',
    color: '#00f0ff',
    threadsCount: 84,
    postsCount: 4210,
    latestActivity: 'Hace 4 min por CodeBreaker_Vice',
  },
  {
    id: 'cat-mundo-leonida',
    slug: 'mundo-leonida',
    title: 'Mundo y Cartografía de Leonida',
    description: 'Vice Beach, Port Gellhorn, The Keys, interiores accesibles y cartografía comunitaria.',
    icon: 'MapPin',
    color: '#10b981',
    threadsCount: 65,
    postsCount: 3190,
    latestActivity: 'Hace 28 min por Cartographer_FL',
  },
  {
    id: 'cat-personajes',
    slug: 'personajes-historia',
    title: 'Protagonistas: Jason y Lucia',
    description: 'Debates sobre la narrativa Bonnie & Clyde, arcos de personajes, doblaje y misiones.',
    icon: 'Users',
    color: '#f59e0b',
    threadsCount: 52,
    postsCount: 2650,
    latestActivity: 'Hace 1 h por FloridaMan_99',
  },
  {
    id: 'cat-vehiculos-armas',
    slug: 'vehiculos-armas',
    title: 'Vehículos, Armas y Personalización',
    description: 'Físicas de conducción, interiores de coches interactivos, arsenal y tuneo en garajes.',
    icon: 'Car',
    color: '#8b5cf6',
    threadsCount: 41,
    postsCount: 1980,
    latestActivity: 'Hace 2 h por Lowrider_King',
  },
  {
    id: 'cat-gta-online',
    slug: 'gta-online-2',
    title: 'GTA Online 2 y Multijugador',
    description: 'Especulaciones sobre la nueva generación multijugador, economía, bandas y servidores dedicados.',
    icon: 'Globe',
    color: '#ec4899',
    threadsCount: 33,
    postsCount: 1540,
    latestActivity: 'Hace 3 h por HeistMaster_Leonida',
  },
  {
    id: 'cat-consolas-pc',
    slug: 'consolas-pc',
    title: 'Rendimiento: PS5, Xbox Series X y PC',
    description: 'Resolución nativa, 60 FPS vs Modo Calidad, trazado de rayos completo y especulaciones de port para PC.',
    icon: 'Monitor',
    color: '#6366f1',
    threadsCount: 29,
    postsCount: 1220,
    latestActivity: 'Hace 5 h por PixelCounter_ES',
  },
  {
    id: 'cat-vice-cafe',
    slug: 'vice-beach-cafe',
    title: 'Vice Beach Café (Off-Topic y Humor)',
    description: 'Memes de Leonida Man, música synthwave de los 80, referencias a GTA Vice City clásico.',
    icon: 'Coffee',
    color: '#14b8a6',
    threadsCount: 76,
    postsCount: 3890,
    latestActivity: 'Hace 15 min por Tommy_Hawkins',
  },
];

export const INITIAL_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    categoryId: 'cat-noticias',
    categoryTitle: 'Noticias Oficiales y Comunicados Rockstar',
    title: '[OFICIAL / ANÁLISIS] Desglose fotograma a fotograma del Trailer 1: Más de 75 detalles confirmados en Vice City y Leonida',
    author: {
      id: 'user-rockstar-watcher',
      username: 'ViceCityInquirer',
      tag: '@vice_inquirer',
      avatar: '/src/assets/images/gta6_forum_avatar_1795625161117.jpg',
      rank: 'Moderador de Leonida',
      reputation: 6840,
      postsCount: 890,
      joinDate: 'Diciembre 2022',
      signature: 'Editor jefe en The Leonida Herald. "En Rockstar confiamos."',
      badge: 'Staff Oficial',
      isOnline: true,
    },
    createdAt: 'Publicado hace 3 horas',
    updatedAt: 'Hace 12 min',
    views: 18450,
    repliesCount: 34,
    isPinned: true,
    isLocked: false,
    tags: ['OFICIAL', 'ANÁLISIS', 'DETALLES', 'TRAILER 1'],
    summary: 'Analizamos a 4K los 90 segundos que cambiaron la historia de los videojuegos: densidad de PNJ sin precedentes, física capilar individual, reflejos RT en carrocerías y la recreación hiperrealista de South Beach.',
    imageBanner: '/src/assets/images/gta6_vice_city_hero_1795625161422.jpg',
    content: `Bienvenidos a la autopsia fotograma a fotograma del primer vistazo oficial al estado de Leonida.

Hemos revisado el trailer a resolución nativa sin compresión y extraído los hallazgos más contundentes:

1. **Densidad de multitud nunca antes vista**: En la toma de Vice Beach (0:33), se pueden contar simultáneamente más de 300 modelos de NPCs independientes con animaciones corporales únicas: aplicación de protector solar, perros paseando por la arena, estelas de pisadas con memoria volumétrica y drones tomando fotografías.

2. **Físicas del motor RAGE 9**:
- Cabello individual simulado con hebras físicas que reaccionan a la humedad costera y al viento de los convertibles.
- Los neumáticos de los deportivos (como el Grotti Cheetah o el Pfister Comet) muestran compresión dinámica en el asfalto mojado.

3. **Geografía visible**:
- Ocean Drive perfectamente recreada con los hoteles Art Deco clásicos (homenaje directo al Ocean View de Tommy Vercetti).
- Carteles viales confirmando autopistas interestatales como la I-97 y desvíos hacia Port Gellhorn y Kelly County.

¿Qué detalle os ha volado más la cabeza? Dejad vuestras capturas y observaciones abajo.`,
    reactions: { '🔥': 86, '🌴': 72, '💎': 45, '🚔': 12, '💀': 3 },
    userReaction: '🔥',
    isBookmarked: true,
    poll: {
      question: '¿Qué aspecto visual del primer trailer te pareció más revolucionario?',
      options: [
        { id: 'opt-1', text: 'Densidad y comportamiento de multitudes en las calles', votes: 412 },
        { id: 'opt-2', text: 'Física y deformación del agua e iluminación volumétrica', votes: 345 },
        { id: 'opt-3', text: 'Nivel de detalle y texturizado en los vehículos e interiores', votes: 198 },
        { id: 'opt-4', text: 'Física de cabello y expresiones faciales hiperrealistas', votes: 156 },
      ],
      totalVotes: 1111,
      userVotedOptionId: 'opt-1',
    },
    replies: [
      {
        id: 'rep-1-1',
        threadId: 'thread-1',
        author: {
          id: 'user-rage-dev',
          username: 'TechEngine_Analyst',
          tag: '@rage9_guru',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TechRage',
          rank: 'Investigador de Leaks',
          reputation: 3120,
          postsCount: 385,
          joinDate: 'Enero 2023',
          signature: 'Examinando shaders, mallas de colisión y optimizaciones de Rockstar Games.',
          badge: 'Ingeniero de Shaders',
          isOnline: true,
        },
        createdAt: 'Hace 2 horas',
        content: 'Fijaos especialmente en el segundo 0:42 con la chica en el descapotable: el reflejo especular en sus gafas de sol refleja la posición real del sol y los edificios que están fuera del campo de visión de la cámara. Eso confirma Ray Tracing global acelerado por hardware tanto para reflejos como para oclusión ambiental.',
        reactions: { '💎': 28, '🔥': 19 },
      },
      {
        id: 'rep-1-2',
        threadId: 'thread-1',
        author: {
          id: 'user-tommy-classic',
          username: 'Tommy_Hawkins',
          tag: '@vice_nostalgia',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tommy86',
          rank: 'Veterano de Los Santos',
          reputation: 1890,
          postsCount: 240,
          joinDate: 'Noviembre 2021',
          signature: '"I poke my head out of the gutter for five seconds..." - 1986 vive para siempre.',
          badge: 'Pionero 1986',
          isOnline: false,
        },
        createdAt: 'Hace 1 hora',
        content: 'El guiño al hotel de Ocean Beach casi me saca una lágrima. El cartel de neón del hotel ahora se llama "Ocean View Motel & Spa", modernizado pero con la misma silueta arquitectónica que en el juego de PS2. Es un homenaje directo a los que llevamos jugando desde 2002.',
        reactions: { '🌴': 34, '🔥': 14 },
      },
      {
        id: 'rep-1-3',
        threadId: 'thread-1',
        author: CURRENT_USER,
        createdAt: 'Hace 25 minutos',
        content: 'Y no olvidéis el sistema de redes sociales integrado dentro del juego. En el trailer se ve la interfaz de streaming estilo TikTok con comentarios en vivo reaccionando a lo que hace el jugador o los NPCs. Eso va a cambiar por completo la inmersión del juego en mundo abierto.',
        reactions: { '🔥': 16, '💎': 9 },
      },
    ],
  },
  {
    id: 'thread-2',
    categoryId: 'cat-personajes',
    categoryTitle: 'Protagonistas: Jason y Lucia',
    title: '[TEORÍA Y DINÁMICAS] La relación entre Jason y Lucia: ¿Sistema de confianza o finales múltiples según nuestras decisiones?',
    author: {
      id: 'user-story-teller',
      username: 'Bonnie_Clyde_Theory',
      tag: '@bonnie_clyde',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StoryTeller',
      rank: 'Capo de Ocean Drive',
      reputation: 2190,
      postsCount: 194,
      joinDate: 'Octubre 2023',
      signature: '"Trust. In this line of work, that is all that keeps you alive."',
      badge: 'Narrativa',
      isOnline: true,
    },
    createdAt: 'Publicado hace 6 horas',
    updatedAt: 'Hace 45 min',
    views: 12300,
    repliesCount: 22,
    isPinned: false,
    isLocked: false,
    tags: ['TEORÍA', 'PERSONAJES', 'LUCIA', 'JASON', 'HISTORIA'],
    summary: '¿Será GTA VI una tragedia moderna o podremos salvar a ambos? Analizamos las pistas sobre el medidor dinámico de lealtad, los atracos cooperativos en solitario y cómo las decisiones de botín afectarán el desenlace.',
    imageBanner: '/src/assets/images/gta6_jason_lucia_duo_1795625161693.jpg',
    content: `El leitmotiv de "Confianza" ("Trust") entre Jason y Lucia en la escena final del tráiler no es casual. Rockstar Games siempre construye su temática central alrededor de las flaquezas humanas:
- En GTA IV fue la desilusión del sueño americano.
- En GTA V fue la codicia y el cinismo de la mediana edad.
- En RDR2 fue la redención y la lealtad ciega.

En GTA VI todo apunta a una dinámica criminal al estilo Bonnie & Clyde moderna:

1. **El grillete electrónico de Lucia**:
Vemos a Lucia en prisión y en el arte promocional lleva un rastreador en el tobillo. Esto significa que al inicio del juego habrá zonas vedadas o toques de queda supervisados por la condicional hasta que logre hackearlo o retirarlo.

2. **Mecánica de cooperación activa**:
Al estilo de cambiar de personaje con la cruceta como en GTA V, pero con la posibilidad de dar órdenes contextuales en tiempo real durante los atracos: cubrir la salida, saquear la caja fuerte o intimidar a los rehenes.

3. **¿Finales múltiples?**:
¿Creéis que Rockstar nos pondrá en la encrucijada de traicionar a nuestra pareja por un golpe multimillonario, o prevalecerá el amor criminal?`,
    reactions: { '🔥': 64, '💎': 39, '💀': 11 },
    poll: {
      question: 'Si tuvieras que elegir en el desenlace final del juego:',
      options: [
        { id: 'opt-p1', text: 'Salvar a ambos cueste lo que cueste', votes: 521 },
        { id: 'opt-p2', text: 'Sacrificar a Jason para salvar a Lucia', votes: 142 },
        { id: 'opt-p3', text: 'Sacrificar a Lucia para salvar a Jason', votes: 89 },
        { id: 'opt-p4', text: 'Morir juntos en un tiroteo épico a lo Bonnie & Clyde', votes: 310 },
      ],
      totalVotes: 1062,
    },
    replies: [
      {
        id: 'rep-2-1',
        threadId: 'thread-2',
        author: {
          id: 'user-florida-bro',
          username: 'FloridaMan_99',
          tag: '@glades_runner',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=GladesRunner',
          rank: 'Traficante de Port Gellhorn',
          reputation: 940,
          postsCount: 110,
          joinDate: 'Febrero 2024',
          signature: 'Pesca en The Glades y atracos a gasolineras nocturnas.',
          isOnline: true,
        },
        createdAt: 'Hace 4 horas',
        content: 'Lucia transmite una presencia intimidante brutal. Esa frase en el psicólogo o consejero de la cárcel: "Mala suerte, supongo" define toda su actitud. Me encanta que finalmente tengamos a una mujer como colíder protagonista.',
        reactions: { '🔥': 22, '🌴': 11 },
      },
    ],
  },
  {
    id: 'thread-3',
    categoryId: 'cat-mundo-leonida',
    categoryTitle: 'Mundo y Cartografía de Leonida',
    title: '[FILTRACIÓN / MAPA] El proyecto cartográfico comunitario: Leonida confirmada con más de 125 km² de terreno y 3 ciudades principales',
    author: {
      id: 'user-cartographer',
      username: 'Cartographer_FL',
      tag: '@mapping_project',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CartoLeonida',
      rank: 'Investigador de Leaks',
      reputation: 4320,
      postsCount: 512,
      joinDate: 'Noviembre 2022',
      signature: 'Coordinador del Leonida Mapping Community Project. Cruzando datos satelitales y coordenadas RAGE.',
      badge: 'Cartógrafo Supremo',
      isOnline: true,
    },
    createdAt: 'Publicado ayer a las 21:30',
    updatedAt: 'Hace 28 min',
    views: 24890,
    repliesCount: 48,
    isPinned: true,
    isLocked: false,
    tags: ['FILTRACIÓN', 'MAPA', 'LEONIDA', 'VICE CITY', 'CONFIRMADO'],
    summary: 'Combinando las coordenadas filtradas del código y los hitos del tráiler oficial, tenemos la reconstrucción más certera del mapa de Leonida: Vice City, Port Gellhorn, The Keys, el lago gigante y las marismas.',
    imageBanner: '/src/assets/images/gta6_leonida_map_preview_1795625162172.jpg',
    content: `Hola a todos los exploradores de Vice City.

Llevamos más de dos años triangulando cada fotograma, fuga de telemetría y metadatos de las filtraciones del motor de física.

**Conclusiones clave de la escala del mapa**:

1. **Tamaño colosal**:
- El mapa estimado cubre más de **125 kilómetros cuadrados** de superficie terrestre y marítima, superando por más del doble a Los Santos de GTA V y dejando atrás el mapa de Red Dead Redemption 2.

2. **Grandes núcleos urbanos**:
- **Vice City Metropolitana**: Vice Beach, Downtown, Little Haiti, Little Havana, Wynwood art district y Escobar International.
- **Port Gellhorn**: Ciudad industrial costera al oeste del estado, con fábricas químicas, puertos de carga pesada y circuito de carreras.
- **Ambrosia / Kelly County**: Poblados agrícolas y granjas en el corazón rural de Leonida.

3. **Ecosistemas naturales únicos**:
- **The Glades (Everglades)**: Kilómetros de marismas navegables únicamente en aerodeslizadores (airboats) con fauna salvaje hostil (caimanes, panteras de Florida, serpientes pitón).
- **The Keys**: Una cadena de más de 8 islas interconectadas por viaductos colosales sobre el mar cristalino caribeño.

Podéis explorar la versión interactiva con puntos de interés en la pestaña **"Mapa de Leonida"** de este foro.`,
    reactions: { '💎': 114, '🔥': 95, '🌴': 80, '🚔': 6 },
    userReaction: '💎',
    isBookmarked: true,
    replies: [
      {
        id: 'rep-3-1',
        threadId: 'thread-3',
        author: {
          id: 'user-lowrider',
          username: 'Lowrider_King',
          tag: '@v8_muscle',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lowrider',
          rank: 'Veterano de Los Santos',
          reputation: 1450,
          postsCount: 168,
          joinDate: 'Mayo 2023',
          signature: 'Quemando goma en Ocean Beach. V8 por encima de todo.',
          isOnline: false,
        },
        createdAt: 'Ayer a las 23:10',
        content: 'Conducir un muscle car por los puentes de The Keys al atardecer mientras suena synthwave o rock clásico va a ser el momento más zen de la historia del gaming. No me lo creo todavía.',
        reactions: { '🔥': 41, '🌴': 32 },
      },
    ],
  },
  {
    id: 'thread-4',
    categoryId: 'cat-filtraciones',
    categoryTitle: 'Filtraciones, RAGE 9 y Análisis Técnico',
    title: '[RAGE 9] Simulación de agua en tiempo real, deformación de barro en The Glades y aerodinámica volumétrica',
    author: {
      id: 'user-tech-expert',
      username: 'CodeBreaker_Vice',
      tag: '@code_breaker',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CodeVice',
      rank: 'Investigador de Leaks',
      reputation: 3890,
      postsCount: 420,
      joinDate: 'Enero 2023',
      signature: 'Reverse engineering, microcódigo y optimización gráfica.',
      badge: 'Leak Hunter',
      isOnline: true,
    },
    createdAt: 'Publicado hace 1 día',
    updatedAt: 'Hace 4 min',
    views: 15400,
    repliesCount: 31,
    isPinned: false,
    isLocked: false,
    tags: ['TÉCNICO', 'RAGE 9', 'FÍSICAS', 'AGUA'],
    summary: 'Patentes registradas por Rockstar Games revelan la física de fluidos más avanzada del medio: olas calculadas en mallas tridimensionales continuas y respuesta al viento de huracanes.',
    content: `Una de las patentes más sonadas de Take-Two Interactive ("System and Method for Virtual Navigation and Fluid Simulation in Gaming Worlds") por fin tiene aplicación práctica demostrada en el tráiler de GTA VI.

Aspectos técnicos destacados:
- **Agua volumétrica**: Las lanchas y yates no se limitan a cortar una textura plana con efectos de espuma precalculada; la estela genera perturbaciones de altura real que afectan a otras embarcaciones menores que se encuentren cerca.
- **Deformación progresiva de barro**: Al igual que la nieve en RDR2, el fango de los pantanos de The Glades se acumula en las ruedas de los camiones 4x4 y modifica la fricción del terreno en tiempo real según el peso del vehículo.
- **IA de la policía adaptativa**: El sistema policial cuenta con reconocimiento de matrículas, drones de vigilancia y patrullas con unidades caninas que rastrean olor o rastros de sangre.`,
    reactions: { '🔥': 58, '💎': 42, '🚔': 18 },
    replies: [],
  },
  {
    id: 'thread-5',
    categoryId: 'cat-vice-cafe',
    categoryTitle: 'Vice Beach Café (Off-Topic y Humor)',
    title: '[BANDA SONORA] Filtraciones y tributos: Emisoras confirmadas, el retorno de Fever 105 y el homenaje a Tom Petty',
    author: {
      id: 'user-retro-lover',
      username: 'Synthwave_80s',
      tag: '@retro_synth',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Synth80',
      rank: 'Novato de Vice Beach',
      reputation: 810,
      postsCount: 88,
      joinDate: 'Marzo 2024',
      signature: 'Miami Nights 1984 en bucle.',
      isOnline: true,
    },
    createdAt: 'Publicado hace 2 días',
    updatedAt: 'Hace 3 horas',
    views: 8900,
    repliesCount: 19,
    isPinned: false,
    isLocked: false,
    tags: ['MÚSICA', 'RADIO', 'SONIDO', 'TOM PETTY'],
    summary: 'La elección de "Love Is a Long Road" de Tom Petty en el tráiler fue impecable. Analizamos qué géneros y artistas tienen papeletas para formar la mejor banda sonora de la saga.',
    content: `Tom Petty era nativo de Gainesville, Florida, por lo que su inclusión en el tráiler de debut fue una carta de amor de Rockstar a la cultura de Leonida.

En el foro queremos recopilar las emisoras que creemos que no pueden faltar:
- **Flash FM / Wave 103 moderna**: Retrowave, synthpop y clásicos ochenteros remasterizados.
- **Fever 105**: Disco clásico, funk y soul de Miami.
- **Radio Espantoso**: Música latina, salsa brava, reggaetón clásico de los 2000 y trap latino actual reflejando Little Havana.
- **K-Rose / Southern Rock**: Rock sureño, country alternativo y blues para cuando recorramos los pueblos del interior de Kelly County.

¿Qué tema soñáis con escuchar mientras escapáis de 5 estrellas de policía por la autopista hacia The Keys?`,
    reactions: { '🌴': 67, '🔥': 49, '💎': 23 },
    replies: [],
  },
  {
    id: 'thread-6',
    categoryId: 'cat-gta-online',
    categoryTitle: 'GTA Online 2 y Multijugador',
    title: '[DEBATE] ¿Debería GTA Online 2 resetear todo el dinero y propiedades o transferir el progreso de GTA V?',
    author: {
      id: 'user-heist',
      username: 'HeistMaster_Leonida',
      tag: '@heist_master',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=HeistLeonida',
      rank: 'Capo de Ocean Drive',
      reputation: 2890,
      postsCount: 310,
      joinDate: 'Junio 2023',
      signature: 'Millonario en Los Santos, listo para conquistar el cártel de Vice.',
      isOnline: false,
    },
    createdAt: 'Publicado hace 3 días',
    updatedAt: 'Hace 5 horas',
    views: 14200,
    repliesCount: 42,
    isPinned: false,
    isLocked: false,
    tags: ['GTA ONLINE', 'MULTIJUGADOR', 'ECONOMÍA', 'DEBATE'],
    summary: 'La gran pregunta que divide a la comunidad: si empezamos de cero en Leonida o si Rockstar permitirá traspasar recompensas cosméticas o capital acumulado durante una década en Los Santos.',
    poll: {
      question: '¿Qué debería hacer Rockstar con el nuevo GTA Online?',
      options: [
        { id: 'opt-go-1', text: 'Reinicio total 100%: Todos empezamos desde cero en pelotas', votes: 840 },
        { id: 'opt-go-2', text: 'Solo traspasar cosméticos e insignias exclusivas de veterano', votes: 412 },
        { id: 'opt-go-3', text: 'Permitir transferir una pequeña parte de dinero bancario', votes: 98 },
        { id: 'opt-go-4', text: 'Traspaso completo de vehículos y propiedades', votes: 64 },
      ],
      totalVotes: 1414,
    },
    content: `GTA Online en GTA V tiene más de 11 años de economía inflada hasta el absurdo con motos voladoras Oppressor Mk II y armas láser alienígenas que rompieron el balance del juego callejero.

La gran mayoría de jugadores veteranos con los que hablo en Discord quieren un respiro: volver a robar tiendas de barrio, pelear por un todoterreno corriente y ganarse el respeto calle a calle en Vice City sin tener que preocuparse de un rayo orbital cayendo desde la estratosfera.

¿Cuál es vuestra postura? Votad en la encuesta oficial del hilo.`,
    reactions: { '🔥': 74, '💀': 28, '💎': 19 },
    replies: [],
  },
];

export const MAP_POIS: MapPOI[] = [
  {
    id: 'poi-vice-beach',
    name: 'Vice Beach & Ocean Drive',
    district: 'Vice City Metro',
    category: 'city',
    coordinates: { x: 88, y: 44 },
    description: 'El epicentro del glamour, arquitectura Art Deco y vida nocturna. Bulevares flanqueados por palmeras, clubs de moda, hoteles icónicos y cientos de personas patinando por el paseo marítimo.',
    confirmedFeatures: ['Hoteles Art Deco con interiores accesibles', 'Paseo marítimo con deportistas y NPCs en patines', 'Clubes nocturnos con DJs en vivo'],
    speculation: 'Presencia del hotel Ocean View de Tommy Vercetti adaptado a la actualidad y apartamentos de lujo adquiribles.',
    relatedThreadId: 'thread-1',
  },
  {
    id: 'poi-downtown',
    name: 'Downtown Vice City',
    district: 'Centro Financiero',
    category: 'city',
    coordinates: { x: 74, y: 40 },
    description: 'Imponentes rascacielos corporativos, sedes bancarias y la central metropolitana de VCPD. Calles anchas con tráfico denso y tren elevado tipo monorail.',
    confirmedFeatures: ['Edificios de oficinas de más de 60 plantas', 'Sede principal de la policía de Vice City', 'Zona de rascacielos con helipuertos'],
    speculation: 'Atraco mayor a un rascacielos bancario estilo Heat durante la campaña de Jason y Lucia.',
    relatedThreadId: 'thread-1',
  },
  {
    id: 'poi-port-gellhorn',
    name: 'Port Gellhorn',
    district: 'Costa Oeste de Leonida',
    category: 'crime',
    coordinates: { x: 12, y: 22 },
    description: 'Ciudad portuaria industrial decadente. Zonas de astilleros, almacenes de contrabando, pistas de carreras callejeras y moteles baratos donde operan las bandas locales.',
    confirmedFeatures: ['Puerto de contenedores industriales', 'Pistas de drag racing nocturnas', 'Comisarías rurales y concesionarios de ocasión'],
    speculation: 'Lugar donde Jason y Lucia inician sus primeros golpes de baja escala antes de trasladarse a Vice City.',
    relatedThreadId: 'thread-2',
  },
  {
    id: 'poi-the-glades',
    name: 'The Glades (Parque Nacional Pantanoso)',
    district: 'Interior Silvestre de Leonida',
    category: 'nature',
    coordinates: { x: 38, y: 40 },
    description: 'Extensas marismas tropicales y humedales salvajes basados en los Everglades de Florida. Terrenos anegados, chozas de contrabandistas de alcohol y fauna depredadora letal.',
    confirmedFeatures: ['Navegación en aerodeslizadores propulsados por hélices', 'Caimanes gigantes con IA de acecho', 'Pescadores clandestinos y laboratorios ocultos'],
    speculation: 'Misiones de supervivencia en avionetas estrelladas y transporte de contrabando evitando helicópteros guardacostas.',
    relatedThreadId: 'thread-4',
  },
  {
    id: 'poi-the-keys',
    name: 'The Keys & Overseas Highway',
    district: 'Archipiélago Sur',
    category: 'transport',
    coordinates: { x: 48, y: 88 },
    description: 'Cadena paradisíaca de cayos tropicales unidos por colosales puentes de hormigón sobre el mar Caribe. Aguas cristalinas, complejos de buceo, bares tiki y mansiones costeras.',
    confirmedFeatures: ['Viaducto de más de 10 kilómetros sobre aguas abiertas', 'Pueblos de pescadores con embarcaciones recreativas', 'Mecánica de pesca submarina'],
    speculation: 'Rutas de huida marítima a alta velocidad y misiones secretas en islotes deshabitados.',
    relatedThreadId: 'thread-3',
  },
  {
    id: 'poi-escobar-airport',
    name: 'Escobar International Airport',
    district: 'Sudoeste de Vice City',
    category: 'transport',
    coordinates: { x: 59, y: 64 },
    description: 'El mayor aeropuerto internacional del sureste estadounidense. Múltiples pistas de despegue para aviones comerciales y cargueros militares.',
    confirmedFeatures: ['Terminales accesibles para pasajeros', 'Hangares privados de jets ejecutivos', 'Pistas con tráfico aéreo programado en tiempo real'],
    speculation: 'Posibilidad de tomar vuelos rápidos o robar aeronaves pesadas de carga.',
    relatedThreadId: 'thread-1',
  },
  {
    id: 'poi-lake-leonida',
    name: 'Lake Leonida & Central Highlands',
    district: 'Norte de Leonida',
    category: 'nature',
    coordinates: { x: 48, y: 14 },
    description: 'El mayor cuerpo de agua dulce del estado, rodeado de colinas, presas hidroeléctricas y pueblos de interior amantes de las armas y la caza.',
    confirmedFeatures: ['Gran lago navegable con lanchas rápidas y motos de agua', 'Presa hidroeléctrica con instalaciones subterráneas'],
    speculation: 'Actividades de caza mayor y refugio de milicias armadas rebeldes.',
    relatedThreadId: 'thread-3',
  },
];

export const INITIAL_EXPERIENCES: PlayerExperience[] = [
  {
    id: 'exp-1',
    title: 'Mi primera tarde en Vice City (2002): La música de Michael Jackson y las palmeras de Ocean Beach',
    author: INITIAL_ACCOUNTS[2], // Tommy Hawkins
    createdAt: 'Publicado hace 4 horas',
    category: 'nostalgia',
    gameFocus: 'GTA Vice City',
    location: 'Ocean Beach, Vice City',
    hypeRating: 5,
    content: `Tenía 14 años cuando puse por primera vez el disco de GTA Vice City en mi PlayStation 2 recién comprada. Venía de la grisura industrial de Liberty City en GTA III, y de repente la pantalla estalló en colores magenta, turquesa, camisas hawaianas y la voz de Tommy Vercetti interpretado por Ray Liotta.

Recuerdo montar en la moto Faggio saliendo del hotel Ocean View mientras caía un atardecer púrpura sobre el mar y en la radio sonaba "Billie Jean". Ningún videojuego me había transportado jamás de esa manera a una época y a un lugar. 

Ahora, ver ese mismo tramo de Ocean Drive recreado en el motor RAGE 9 con reflejos en tiempo real y cientos de personas patinando me devuelve exactamente la misma emoción de hace más de 20 años. Rockstar no solo hace mapas, crea recuerdos que duran toda la vida.`,
    image: '/src/assets/images/gta6_vice_city_hero_1795625161422.jpg',
    reactions: { '🌴': 48, '🔥': 32, '💎': 24 },
    userReaction: '🌴',
    comments: [
      {
        id: 'exp-c1',
        experienceId: 'exp-1',
        author: INITIAL_ACCOUNTS[0],
        createdAt: 'Hace 2 horas',
        content: 'Totalmente de acuerdo. La atmósfera de Vice City no se puede replicar fácilmente, por eso este regreso a Leonida es el acontecimiento de la década.',
      },
      {
        id: 'exp-c2',
        experienceId: 'exp-1',
        author: INITIAL_ACCOUNTS[1],
        createdAt: 'Hace 1 hora',
        content: 'Y la música. Solo espero que mantengan las emisoras retro como Wave 103 o Flash FM para los que amamos los 80.',
      },
    ],
  },
  {
    id: 'exp-2',
    title: 'Diario de exploración: Mi plan para cruzar los pantanos de The Glades en aerodeslizador nocturno',
    author: INITIAL_ACCOUNTS[1], // Jason Duval
    createdAt: 'Publicado ayer',
    category: 'expectativa',
    gameFocus: 'GTA VI',
    location: 'The Glades, Humedales de Leonida',
    hypeRating: 5,
    content: `Lo primero que haré en cuanto el mapa se abra libremente no será seguir la historia principal de atracos con Lucia. Voy a buscar una gasolinera en Kelly County, robar un 4x4 o una camioneta embarrada, enganchar un aerodeslizador (airboat) y adentrarme en el corazón de The Glades de noche en plena tormenta tropical.

Las físicas volumétricas del barro y el agua que se vieron en el tráiler prometen que quedar atrapado en el cieno con caimanes acechando será una experiencia aterradora y maravillosa. Me imagino la niebla densa, los sonidos de grillos y anfibios en 3D audio en los auriculares, y tener que orientarse solo con los faros auxiliares del barco. Si Rockstar incluye supervivencia estilo RDR2, va a ser insuperable.`,
    image: '/src/assets/images/gta6_jason_lucia_duo_1795625161693.jpg',
    reactions: { '🔥': 39, '💎': 18, '💀': 6 },
    comments: [
      {
        id: 'exp-c3',
        experienceId: 'exp-2',
        author: INITIAL_ACCOUNTS[2],
        createdAt: 'Ayer a las 22:30',
        content: 'Ojo con los caimanes gigantes que se vieron en el tráiler entrando en piscinas residenciales... en su hábitat natural no van a perdonar.',
      },
    ],
  },
  {
    id: 'exp-3',
    title: 'El escape imposible de 5 estrellas en GTA V por los túneles del metro',
    author: INITIAL_ACCOUNTS[0], // Lucia Vercetti
    createdAt: 'Publicado hace 2 días',
    category: 'anecdota',
    gameFocus: 'GTA V',
    location: 'Los Santos Metro',
    hypeRating: 4,
    content: `Estaba jugando con Trevor tras hacer saltar por los aires un convoy blindado del FIB en Vinewood Hills. Tenía 5 estrellas, 3 helicópteros Buzzard ametrallando el descapotable sin ruedas traseras y tanques del ejército acercándose.

De milagro logré girar bruscamente y tirarme por el respiradero de ventilación del metro en obras. El coche cayó 15 metros, rebotó contra los raíles y quedó destrozado, pero dentro del túnel a oscuras las sirenas de la policía resonaban sobre mi cabeza sin que pudieran bajar. Caminé a pie por las vías durante 10 minutos en tensión absoluta con la linterna hasta que el nivel de búsqueda parpadeó y desapareció. Ese pulso acelerado es lo que solo GTA sabe generar.`,
    reactions: { '🔥': 29, '🚔': 14, '💎': 11 },
    comments: [],
  },
];


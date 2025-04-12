// Static data for services
// This will be replaced with data from Supabase once the database is set up

export const services = [
  {
    id: 1,
    slug: 'gis',
    name: 'SIG (Système d\'Information Géographique)',
    shortName: 'SIG',
    description: 'Conception et mise en œuvre de systèmes d\'information géographique adaptés à vos besoins spécifiques.',
    details: `
      ## Qu'est-ce que le SIG?
      
      Un Système d'Information Géographique (SIG) est un ensemble d'outils permettant de collecter, stocker, analyser, gérer et présenter des données spatiales et géographiques.
      
      ## Notre expertise en SIG
      
      Notre équipe possède une expertise approfondie dans la mise en place de solutions SIG adaptées aux contextes haïtiens et caribéens. Nous travaillons avec les plateformes leaders du marché, notamment QGIS, ArcGIS et GRASS GIS.
      
      ## Services proposés
      
      - Conception et implémentation de SIG sur mesure
      - Migration et conversion de données géographiques
      - Formation personnalisée aux outils SIG
      - Développement d'applications SIG web et mobiles
      - Intégration SIG avec systèmes existants
      - Maintenance et support technique
      
      ## Secteurs d'application
      
      - Planification urbaine et aménagement du territoire
      - Gestion des ressources naturelles
      - Agriculture et sécurité alimentaire
      - Gestion des risques et catastrophes naturelles
      - Infrastructure et services publics
      - Santé publique et épidémiologie
    `,
    icon: 'map',
    image_url: '/assets/images/services/gis.jpg',
    featured: true,
  },
  {
    id: 2,
    slug: 'cartography',
    name: 'Cartographie & Webmapping',
    shortName: 'Cartographie',
    description: 'Production de cartes thématiques, interactives et personnalisées pour visualiser efficacement vos données géographiques.',
    details: `
      ## Notre approche cartographique
      
      La cartographie est l'art et la science de représenter graphiquement des données spatiales. Chez GCS, nous combinons rigueur technique et design innovant pour créer des cartes qui communiquent efficacement votre message.
      
      ## Types de cartes proposées
      
      - Cartes thématiques (choroplèthes, proportionnelles, etc.)
      - Cartes de référence et topographiques
      - Atlas et séries cartographiques
      - Cartes interactives en ligne (webmapping)
      - Cartes 3D et visualisations avancées
      - Infographies à composante spatiale
      
      ## Technologies utilisées
      
      - QGIS, ArcGIS, Illustrator pour la cartographie traditionnelle
      - Mapbox, Leaflet, OpenLayers pour le webmapping
      - D3.js et Tableau pour les visualisations de données avancées
      
      ## Applications
      
      - Communication de projets et résultats
      - Analyse et aide à la décision
      - Publication scientifique et technique
      - Sensibilisation du public
      - Navigation et orientation terrain
    `,
    icon: 'globe',
    image_url: '/assets/images/services/cartography.jpg',
    featured: true,
  },
  {
    id: 3,
    slug: 'remote-sensing',
    name: 'Télédétection & imagerie satellite',
    shortName: 'Télédétection',
    description: 'Acquisition et traitement d\'images satellite et aériennes pour l\'observation et l\'analyse du territoire.',
    details: `
      ## La puissance de l'observation spatiale
      
      La télédétection permet d'observer et d'analyser le territoire à distance grâce aux capteurs embarqués sur satellites ou avions. Cette technologie offre une vision unique pour comprendre les dynamiques spatiales et temporelles.
      
      ## Nos services de télédétection
      
      - Acquisition et prétraitement d'images satellite
      - Classification d'occupation du sol
      - Détection de changements multi-temporels
      - Analyse de végétation et calcul d'indices (NDVI, etc.)
      - Cartographie de zones inondables
      - Évaluation de dégâts post-catastrophe
      
      ## Sources de données
      
      - Images optiques haute résolution (Pléiades, SPOT, WorldView)
      - Images radar (Sentinel-1, RADARSAT)
      - Images multi/hyperspectrales (Sentinel-2, Landsat)
      - Données historiques et archives
      
      ## Applications sectorielles
      
      - Suivi environnemental et changement climatique
      - Agriculture et sécurité alimentaire
      - Gestion des ressources naturelles
      - Planification urbaine et aménagement
      - Réponse aux catastrophes naturelles
    `,
    icon: 'satellite',
    image_url: '/assets/images/services/remote-sensing.jpg',
    featured: true,
  },
  {
    id: 4,
    slug: 'spatial-analysis',
    name: 'Analyse spatiale',
    shortName: 'Analyse spatiale',
    description: 'Analyse avancée de données géographiques pour extraire des informations stratégiques et soutenir la prise de décision.',
    details: `
      ## L'expertise analytique au service de vos données
      
      L'analyse spatiale est l'ensemble des méthodes permettant d'exploiter les relations géographiques pour comprendre les phénomènes spatiaux. C'est le cœur de notre expertise et la valeur ajoutée que nous apportons à vos projets.
      
      ## Méthodes d'analyse proposées
      
      - Statistiques spatiales et géostatistiques
      - Analyse de proximité et accessibilité
      - Modélisation spatiale prédictive
      - Analyse de réseaux et connectivité
      - Détection de clusters et hot spots
      - Analyse multicritère et aide à la décision
      
      ## Technologies et outils
      
      - Outils SIG avancés (QGIS, ArcGIS, GRASS)
      - Intégration R et Python pour analyses personnalisées
      - Modélisation spatiale avec ESRI ModelBuilder ou QGIS Graphical Modeler
      - Outils statistiques spécialisés (GeoDa, CrimeStat)
      
      ## Applications concrètes
      
      - Optimisation de localisation (services, infrastructure)
      - Évaluation des risques naturels
      - Planification des interventions humanitaires
      - Analyses de marché géo-dépendantes
      - Études d'impact environnemental
      - Modélisation de phénomènes complexes
    `,
    icon: 'chart-bar',
    image_url: '/assets/images/services/spatial-analysis.jpg',
    featured: false,
  },
  {
    id: 5,
    slug: 'drone-imagery',
    name: 'Imagerie par drone',
    shortName: 'Drone',
    description: 'Acquisition et traitement d\'images aériennes par drone pour des applications cartographiques et d\'observation.',
    details: `
      ## La vision aérienne à haute résolution
      
      L'utilisation de drones (UAV) permet d'acquérir des images aériennes à très haute résolution, offrant une perspective unique sur le territoire et les infrastructures. Cette technologie comble l'écart entre les relevés terrain et l'imagerie satellite.
      
      ## Services drone proposés
      
      - Cartographie aérienne haute résolution
      - Modélisation 3D de terrain et bâtiments
      - Suivi temporel et détection de changements
      - Inspection d'infrastructures
      - Orthophotographie et mosaïquage d'images
      - Calcul de volumes et surfaces
      
      ## Notre équipement
      
      - Drones multirotor pour zones complexes
      - Drones à voilure fixe pour grandes surfaces
      - Capteurs RGB haute résolution
      - Capteurs multispectral pour applications agricoles
      - Logiciels spécialisés de traitement photogrammétrique
      
      ## Applications
      
      - Topographie et cartographie détaillée
      - Suivi de chantiers et projets d'infrastructure
      - Agriculture de précision
      - Évaluation post-catastrophe
      - Aménagement urbain et cadastre
      - Conservation et suivi environnemental
    `,
    icon: 'camera',
    image_url: '/assets/images/services/drone-imagery.jpg',
    featured: false,
  },
  {
    id: 6,
    slug: 'meal-gar',
    name: 'Suivi & Évaluation / MEAL / GAR',
    shortName: 'MEAL/GAR',
    description: 'Mise en place de systèmes de suivi et évaluation géographiques pour le pilotage efficace de vos projets et programmes.',
    details: `
      ## Pilotage géographique de vos interventions
      
      Les approches MEAL (Monitoring, Evaluation, Accountability and Learning) et GAR (Gestion Axée sur les Résultats) sont essentielles pour assurer l'efficacité et l'impact des projets de développement. Notre expertise consiste à y intégrer la dimension géographique souvent négligée.
      
      ## Nos services MEAL/GAR
      
      - Conception de cadres de S&E intégrant la dimension spatiale
      - Développement d'indicateurs géographiques pertinents
      - Mise en place de tableaux de bord géospatiaux
      - Collecte de données terrain géoréférencées
      - Analyse d'impact avec dimension spatiale
      - Formation des équipes aux méthodes MEAL/GAR géospatiales
      
      ## Outils et technologies
      
      - Solutions mobiles de collecte (KoboToolbox, ODK, Survey123)
      - Systèmes de visualisation et tableaux de bord (PowerBI, Tableau)
      - Bases de données géospatiales intégrées
      - Plateforme web de suivi personnalisée
      
      ## Bénéfices pour vos projets
      
      - Visualisation claire de la couverture des interventions
      - Identification des disparités géographiques dans les résultats
      - Optimisation de l'allocation des ressources
      - Communication améliorée des résultats et impacts
      - Prise de décision basée sur des données spatiales précises
    `,
    icon: 'chart-line',
    image_url: '/assets/images/services/meal-gar.jpg',
    featured: false,
  },
  {
    id: 7,
    slug: 'data-analytics',
    name: 'Conseils & Data Analytics',
    shortName: 'Conseils',
    description: 'Accompagnement stratégique et analytique pour transformer vos données en connaissances actionnables.',
    details: `
      ## De la donnée à la décision
      
      L'explosion des données disponibles crée des opportunités inédites mais pose également des défis complexes. Notre expertise en conseil et data analytics vous aide à extraire la valeur de vos données pour éclairer vos décisions stratégiques.
      
      ## Notre offre de conseil
      
      - Audit et stratégie de gestion des données géospatiales
      - Conception d'architecture de données spatiales
      - Développement de solutions analytiques sur mesure
      - Formation et transfert de compétences
      - Accompagnement dans la transition numérique
      - Recherche appliquée et innovation
      
      ## Approche data analytics
      
      - Intégration de sources de données multiples
      - Nettoyage et préparation des données
      - Visualisation avancée et exploratoire
      - Analyses statistiques et prédictives
      - Machine learning appliqué aux données spatiales
      - Interprétation et communication des résultats
      
      ## Secteurs d'intervention
      
      - Organisations internationales et ONG
      - Institutions publiques et gouvernementales
      - Entreprises privées et startups
      - Secteur académique et recherche
      - Projets multisectoriels complexes
    `,
    icon: 'lightbulb',
    image_url: '/assets/images/services/data-analytics.jpg',
    featured: false,
  },
];

export default services;
// Static data for initial projects
// This will be replaced with data from Supabase once the database is set up

export const initialProjects = [
  {
    id: 1,
    slug: 'cartographie-vulnerabilite-port-au-prince',
    title: 'Cartographie de vulnérabilité urbaine à Port-au-Prince',
    shortDescription: 'Évaluation et cartographie des risques sismiques et d\'inondation dans les quartiers informels de Port-au-Prince.',
    client: 'Banque Mondiale / PNUD',
    date: '2023-06-15',
    location: {
      lat: 18.5473, 
      lon: -72.3396,
      address: 'Port-au-Prince, Haïti'
    },
    services: ['spatial-analysis', 'gis', 'remote-sensing'],
    description: `
      ## Contexte
      
      Suite aux catastrophes naturelles récentes, la Banque Mondiale et le PNUD ont initié un projet de cartographie des risques pour renforcer la résilience urbaine de Port-au-Prince. Notre équipe a été chargée d'élaborer une cartographie détaillée des vulnérabilités sismiques et d'inondation dans les quartiers informels de la capitale.
      
      ## Notre approche
      
      Notre approche a combiné différentes méthodes et sources de données :
      
      1. **Analyse d'images satellites multi-temporelles** pour identifier les changements dans l'occupation du sol
      2. **Modélisation hydrologique** pour déterminer les zones à risque d'inondation
      3. **Collecte de données sur le terrain** pour valider les modèles et caractériser le bâti
      4. **Intégration des données socio-économiques** pour évaluer la vulnérabilité des populations
      5. **Modélisation des risques sismiques** basée sur les caractéristiques du sol et du bâti
      
      ## Résultats
      
      Le projet a produit :
      
      - Une cartographie détaillée des risques naturels à l'échelle du quartier
      - Un index de vulnérabilité composite intégrant facteurs physiques et socio-économiques
      - Des recommandations spécifiques pour les interventions prioritaires
      - Un système d'information géographique pour le suivi et la mise à jour des données
      - Un programme de formation pour les autorités locales
      
      ## Impact
      
      Cette cartographie sert désormais de référence pour la planification urbaine et les programmes de réduction des risques à Port-au-Prince. Elle a permis d'identifier plus de 200 zones d'intervention prioritaires et de guider l'allocation de plus de 15 millions de dollars de financements internationaux pour des projets de résilience urbaine.
    `,
    image_urls: [
      '/assets/images/projects/vulnerability-mapping-1.jpg',
      '/assets/images/projects/vulnerability-mapping-2.jpg',
      '/assets/images/projects/vulnerability-mapping-3.jpg'
    ],
    featured: true
  },
  {
    id: 2,
    slug: 'suivi-evaluation-programme-agricole',
    title: 'Système de suivi-évaluation spatial pour programme agricole',
    shortDescription: 'Développement d\'un système de suivi-évaluation géoréférencé pour un programme national d\'amélioration de la productivité agricole.',
    client: 'Ministère de l\'Agriculture / FAO',
    date: '2022-11-10',
    location: {
      lat: 19.1399, 
      lon: -72.3428,
      address: 'Artibonite, Haïti'
    },
    services: ['meal-gar', 'gis', 'data-analytics'],
    description: `
      ## Contexte
      
      Le Ministère de l'Agriculture, avec le soutien de la FAO, a lancé un programme national d'amélioration de la productivité agricole dans la vallée de l'Artibonite. Notre mission était de développer un système de suivi-évaluation intégrant la dimension spatiale pour mesurer l'impact et optimiser les interventions.
      
      ## Notre approche
      
      Nous avons conçu une solution complète comprenant :
      
      1. **Une application mobile de collecte** utilisant KoboToolbox pour les données géoréférencées
      2. **Une base de données spatiale** centralisant toutes les informations du programme
      3. **Un tableau de bord interactif** visualisant les indicateurs clés par zone géographique
      4. **Un système d'alerte** basé sur la détection d'anomalies dans les données
      5. **Une plateforme web** permettant l'accès aux cartes et analyses pour toutes les parties prenantes
      
      ## Résultats
      
      Le système a permis :
      
      - La collecte de données géoréférencées sur plus de 12,000 parcelles agricoles
      - Le suivi de la productivité par culture, zone, et saison
      - L'analyse spatiale des facteurs influençant les rendements
      - La visualisation des progrès vers les indicateurs clés du programme
      - L'optimisation des interventions basée sur des données probantes
      
      ## Impact
      
      Grâce à ce système, le ministère a pu identifier des disparités géographiques importantes dans l'efficacité du programme et réorienter les ressources en conséquence. L'approche spatialisée a permis une augmentation de 23% de l'efficacité des interventions et une amélioration de la productivité moyenne de 18% dans les zones ciblées.
    `,
    image_urls: [
      '/assets/images/projects/agricultural-monitoring-1.jpg',
      '/assets/images/projects/agricultural-monitoring-2.jpg',
      '/assets/images/projects/agricultural-monitoring-3.jpg'
    ],
    featured: true
  },
  {
    id: 3,
    slug: 'evaluation-dommages-post-seisme-sud',
    title: 'Évaluation des dommages post-séisme par imagerie drone',
    shortDescription: 'Cartographie rapide des dommages après le séisme de 2021 dans le sud d\'Haïti à l\'aide de drones.',
    client: 'Direction de la Protection Civile / Croix-Rouge',
    date: '2021-08-25',
    location: {
      lat: 18.2000, 
      lon: -73.7500,
      address: 'Département du Sud, Haïti'
    },
    services: ['drone-imagery', 'remote-sensing', 'cartography'],
    description: `
      ## Contexte
      
      Suite au séisme de magnitude 7.2 qui a frappé le sud d'Haïti en août 2021, la Direction de la Protection Civile et la Croix-Rouge avaient besoin d'une évaluation rapide et précise des dommages pour coordonner les efforts de secours et planifier la reconstruction.
      
      ## Notre approche
      
      Notre équipe a été déployée dans les 48 heures suivant le séisme pour :
      
      1. **Réaliser des survols par drone** des zones les plus touchées
      2. **Traiter les images en temps quasi-réel** sur le terrain
      3. **Produire des orthophotos haute résolution** des zones urbaines affectées
      4. **Classifier les bâtiments** selon leur niveau de dommage
      5. **Créer des cartes thématiques** pour les équipes de secours
      
      ## Résultats
      
      L'intervention a permis de :
      
      - Cartographier plus de 30 km² de zones urbaines et péri-urbaines en 5 jours
      - Évaluer l'état de plus de 8,500 bâtiments
      - Identifier les zones d'accès difficile nécessitant une intervention prioritaire
      - Produire des cartes quotidiennes pour les centres de coordination des secours
      - Établir une base de référence pour le suivi de la reconstruction
      
      ## Impact
      
      Les données collectées ont joué un rôle crucial dans la coordination de l'aide d'urgence, permettant une allocation plus efficace des ressources et une meilleure priorisation des interventions. Elles servent aujourd'hui de référence pour les projets de reconstruction et de réduction des risques dans la région.
    `,
    image_urls: [
      '/assets/images/projects/earthquake-assessment-1.jpg',
      '/assets/images/projects/earthquake-assessment-2.jpg',
      '/assets/images/projects/earthquake-assessment-3.jpg'
    ],
    featured: true
  },
  {
    id: 4,
    slug: 'analyse-accessibilite-services-sante',
    title: 'Analyse d\'accessibilité aux services de santé',
    shortDescription: 'Cartographie et analyse de l\'accessibilité géographique aux services de santé dans le Nord-Est d\'Haïti.',
    client: 'Ministère de la Santé Publique / OMS',
    date: '2022-04-18',
    location: {
      lat: 19.6700, 
      lon: -71.8300,
      address: 'Département du Nord-Est, Haïti'
    },
    services: ['spatial-analysis', 'gis', 'cartography'],
    description: `
      ## Contexte
      
      Le Ministère de la Santé Publique et l'OMS cherchaient à optimiser la couverture des services de santé dans le département du Nord-Est, une région montagneuse où l'accès aux soins reste difficile pour de nombreuses communautés.
      
      ## Notre approche
      
      Nous avons réalisé une analyse complète combinant :
      
      1. **Modélisation des temps de trajet** tenant compte du relief, des routes et des modes de transport
      2. **Cartographie des installations sanitaires** avec leurs capacités et services
      3. **Analyse de la distribution démographique** par densité et caractéristiques
      4. **Identification des zones mal desservies** par type de service
      5. **Simulation de scénarios d'implantation** pour optimiser la couverture
      
      ## Résultats
      
      L'étude a permis de :
      
      - Produire des cartes d'isochrones (temps d'accès) pour chaque type de service de santé
      - Identifier que 37% de la population se trouve à plus de 2 heures d'un service obstétrique d'urgence
      - Proposer 12 sites optimaux pour de nouvelles installations ou cliniques mobiles
      - Modéliser l'impact de l'amélioration de certaines routes sur l'accessibilité
      - Développer un outil interactif pour la planification sanitaire
      
      ## Impact
      
      Les résultats de cette analyse ont été intégrés au plan stratégique quinquennal du Ministère de la Santé. Trois nouvelles cliniques ont déjà été construites suivant nos recommandations, réduisant de 22% la population sans accès à des soins de base en moins d'une heure.
    `,
    image_urls: [
      '/assets/images/projects/health-access-1.jpg',
      '/assets/images/projects/health-access-2.jpg',
      '/assets/images/projects/health-access-3.jpg'
    ],
    featured: false
  },
  {
    id: 5,
    slug: 'analyse-potentiel-energie-solaire',
    title: 'Cartographie du potentiel d\'énergie solaire',
    shortDescription: 'Évaluation et cartographie du potentiel photovoltaïque à l\'échelle nationale pour guider les investissements en énergie renouvelable.',
    client: 'Ministère des Travaux Publics / Banque Interaméricaine de Développement',
    date: '2023-02-10',
    location: {
      lat: 19.0000, 
      lon: -72.5000,
      address: 'Haïti (national)'
    },
    services: ['remote-sensing', 'spatial-analysis', 'gis'],
    description: `
      ## Contexte
      
      Face aux défis énergétiques d'Haïti, le Ministère des Travaux Publics et la BID ont souhaité disposer d'une cartographie précise du potentiel solaire pour orienter les investissements dans ce secteur prioritaire.
      
      ## Notre approche
      
      Notre équipe a développé une méthodologie combinant :
      
      1. **Analyse de données satellitaires** sur le rayonnement solaire (NASA, EUMETSAT)
      2. **Modélisation topographique** de l'inclinaison et de l'orientation des terrains
      3. **Intégration des données climatiques** (nébulosité, précipitations)
      4. **Cartographie des contraintes** (zones protégées, risques naturels, occupation du sol)
      5. **Analyse multicritère** pour identifier les zones optimales
      
      ## Résultats
      
      Le projet a produit :
      
      - Une carte nationale du potentiel solaire à résolution de 100m
      - Une classification des zones selon leur rendement potentiel
      - L'identification des 50 sites les plus prometteurs pour des fermes photovoltaïques
      - Une évaluation du potentiel par commune et département
      - Des fiches détaillées pour chaque site prioritaire
      
      ## Impact
      
      Cette cartographie est devenue un outil de référence pour la planification énergétique en Haïti. Elle a déjà contribué à l'obtention de financements pour trois projets majeurs représentant plus de 45MW de capacité installée, et sert de base au nouveau plan directeur de l'énergie solaire du pays.
    `,
    image_urls: [
      '/assets/images/projects/solar-mapping-1.jpg',
      '/assets/images/projects/solar-mapping-2.jpg',
      '/assets/images/projects/solar-mapping-3.jpg'
    ],
    featured: false
  },
  {
    id: 6,
    slug: 'atlas-numerique-biodiversite',
    title: 'Atlas numérique de la biodiversité haïtienne',
    shortDescription: 'Développement d\'une plateforme web interactive cartographiant la biodiversité nationale et les zones de conservation prioritaires.',
    client: 'Ministère de l\'Environnement / PNUE',
    date: '2022-07-22',
    location: {
      lat: 19.0000, 
      lon: -72.5000,
      address: 'Haïti (national)'
    },
    services: ['gis', 'cartography', 'remote-sensing'],
    description: `
      ## Contexte
      
      La biodiversité exceptionnelle d'Haïti fait face à de nombreuses menaces. Le Ministère de l'Environnement et le PNUE ont souhaité développer un outil de référence pour la conservation, l'éducation et la sensibilisation.
      
      ## Notre approche
      
      Nous avons conçu et développé :
      
      1. **Une base de données géographique** intégrant toutes les données existantes sur la biodiversité
      2. **Une méthodologie de cartographie** des habitats et écosystèmes
      3. **Un système de visualisation interactive** des données spatiales
      4. **Une plateforme web bilingue** (français/créole) accessible au grand public
      5. **Des outils pédagogiques** pour les écoles et universités
      
      ## Résultats
      
      L'atlas numérique comprend :
      
      - Des cartes détaillées de 12 écosystèmes majeurs et leur état de conservation
      - La distribution spatiale de plus de 300 espèces endémiques et menacées
      - Un système de superposition permettant d'analyser les pressions et menaces
      - Des fiches descriptives pour chaque aire protégée
      - Un module de science participative pour signaler des observations
      
      ## Impact
      
      Cet atlas est devenu un outil essentiel pour la conservation en Haïti. Il a permis d'identifier 15 nouvelles zones de conservation prioritaires, sert de support à plusieurs programmes éducatifs et facilite la communication sur l'importance de la biodiversité haïtienne à l'échelle nationale et internationale.
    `,
    image_urls: [
      '/assets/images/projects/biodiversity-atlas-1.jpg',
      '/assets/images/projects/biodiversity-atlas-2.jpg',
      '/assets/images/projects/biodiversity-atlas-3.jpg'
    ],
    featured: false
  }
];

export default initialProjects;
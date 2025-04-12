const mockServices = [
  {
    id: 1,
    slug: 'gis',
    name: 'Système d\'Information Géographique (SIG)',
    description: 'Conception, implémentation et gestion de systèmes d\'information géographique pour des projets variés.',
    icon: '🌍',
    details: `<h2>Nos solutions SIG complètes</h2>
    <p>Notre équipe d'experts en SIG offre une gamme complète de services allant de la conception à l'implémentation et la maintenance de systèmes d'information géographique adaptés à vos besoins spécifiques.</p>
    <p>Nous travaillons avec les technologies les plus récentes et les logiciels les plus performants comme ArcGIS, QGIS et autres plateformes open-source pour vous fournir des solutions robustes et évolutives.</p>`,
    benefits: [
      'Prise de décision basée sur des données géospatiales précises',
      'Visualisation intuitive des données complexes',
      'Analyses spatiales avancées',
      'Compatibilité avec les plateformes SIG existantes',
      'Formation et support continu'
    ],
    process: [
      {
        title: 'Consultation initiale',
        description: 'Nous évaluons vos besoins et objectifs spécifiques'
      },
      {
        title: 'Collecte et préparation des données',
        description: 'Acquisition, validation et structuration des données géospatiales'
      },
      {
        title: 'Développement SIG',
        description: 'Configuration et personnalisation des outils et interfaces'
      },
      {
        title: 'Test et validation',
        description: 'Vérification rigoureuse des fonctionnalités et de la précision'
      },
      {
        title: 'Déploiement et formation',
        description: 'Mise en production et formation des utilisateurs'
      }
    ],
    faqs: [
      {
        question: 'Quels logiciels SIG utilisez-vous?',
        answer: 'Nous travaillons principalement avec ArcGIS, QGIS et d\'autres plateformes open-source selon les besoins du projet et les préférences du client.'
      },
      {
        question: 'Pouvez-vous intégrer des données SIG existantes?',
        answer: 'Absolument. Nous pouvons migrer et intégrer vos données existantes dans le nouveau système tout en assurant leur intégrité et leur précision.'
      },
      {
        question: 'Offrez-vous des formations sur les systèmes SIG?',
        answer: 'Oui, nous proposons des formations personnalisées pour permettre à votre équipe de tirer le maximum de votre système SIG.'
      }
    ]
  },
  {
    id: 2,
    slug: 'cartography',
    name: 'Cartographie et Webmapping',
    description: 'Création de cartes professionnelles et de solutions de cartographie web interactive.',
    icon: '🗺️',
    details: `<h2>Une cartographie de haute qualité pour tous vos besoins</h2>
    <p>Notre expertise en cartographie nous permet de transformer des données complexes en cartes claires, précises et visuellement attrayantes, qu'il s'agisse de cartes statiques ou de solutions interactives en ligne.</p>
    <p>Nous travaillons avec vous pour créer des produits cartographiques qui répondent exactement à vos besoins et qui communiquent efficacement vos messages et analyses spatiales.</p>`,
    benefits: [
      'Cartes sur mesure adaptées à vos besoins spécifiques',
      'Conception graphique de qualité professionnelle',
      'Solutions interactives pour web et mobile',
      'Formats variés pour tous types d\'utilisation',
      'Intégration facile dans vos rapports et présentations'
    ],
    process: [
      {
        title: 'Définition des objectifs',
        description: 'Nous clarifions le but, l\'audience et les usages de la carte'
      },
      {
        title: 'Collecte et préparation des données',
        description: 'Rassemblement et traitement des données géographiques nécessaires'
      },
      {
        title: 'Design cartographique',
        description: 'Création d\'une maquette et choix des éléments de style'
      },
      {
        title: 'Production',
        description: 'Réalisation de la carte selon les spécifications convenues'
      },
      {
        title: 'Révision et finalisation',
        description: 'Ajustements selon vos retours pour un résultat parfait'
      }
    ],
    faqs: [
      {
        question: 'Quels types de cartes pouvez-vous produire?',
        answer: 'Nous créons une large gamme de cartes: thématiques, topographiques, choroplèthes, infographiques, cartes web interactives, et bien plus encore.'
      },
      {
        question: 'Comment puis-je utiliser les cartes que vous créez?',
        answer: 'Nos cartes peuvent être utilisées dans des rapports, présentations, publications, sites web, applications mobiles, ou imprimées en grand format.'
      },
      {
        question: 'Dans quels formats fournissez-vous les cartes?',
        answer: 'Nous fournissons les cartes dans divers formats selon vos besoins: PDF, PNG, JPG, SVG pour les cartes statiques, et solutions HTML/JavaScript pour les cartes interactives.'
      }
    ]
  },
  {
    id: 3,
    slug: 'remote-sensing',
    name: 'Télédétection et Imagerie Satellite',
    description: 'Acquisition et analyse d\'images satellitaires pour l\'observation et le suivi du territoire.',
    icon: '📡',
    details: `<h2>Exploitez la puissance de l'observation terrestre</h2>
    <p>Notre expertise en télédétection vous permet d'accéder à des données d'observation de la Terre précises et actuelles pour surveiller, analyser et comprendre les changements environnementaux et territoriaux.</p>
    <p>Nous travaillons avec les principaux fournisseurs d'imagerie satellite et utilisons des techniques d'analyse avancées pour extraire des informations pertinentes à partir de ces données.</p>`,
    benefits: [
      'Accès à des données d\'observation récentes et historiques',
      'Analyses multitemporelles pour détecter les changements',
      'Cartographie précise de l\'occupation des sols',
      'Suivi environnemental et gestion des ressources',
      'Évaluations rapides post-catastrophe'
    ],
    process: [
      {
        title: 'Définition des besoins',
        description: 'Identification des objectifs et des paramètres d\'acquisition'
      },
      {
        title: 'Acquisition des images',
        description: 'Sélection et obtention des données satellitaires appropriées'
      },
      {
        title: 'Prétraitement',
        description: 'Correction géométrique, radiométrique et atmosphérique'
      },
      {
        title: 'Analyse et traitement',
        description: 'Extraction d\'informations et classification des images'
      },
      {
        title: 'Production de livrables',
        description: 'Création de cartes, rapports et données dérivées'
      }
    ],
    faqs: [
      {
        question: 'Quelle résolution d\'images satellitaires proposez-vous?',
        answer: 'Nous travaillons avec diverses résolutions, de 30cm à plusieurs mètres, selon vos besoins et votre budget.'
      },
      {
        question: 'Combien de temps faut-il pour obtenir des images récentes?',
        answer: 'Cela dépend de plusieurs facteurs, mais nous pouvons généralement fournir des images récentes en quelques jours à quelques semaines.'
      },
      {
        question: 'Pouvez-vous analyser des séries temporelles d\'images?',
        answer: 'Oui, nous spécialisons dans l\'analyse multitemporelle pour détecter et quantifier les changements sur une période donnée.'
      }
    ]
  },
  {
    id: 4,
    slug: 'spatial-analysis',
    name: 'Analyse Spatiale',
    description: 'Analyse avancée de données géospatiales pour extraire des informations stratégiques.',
    icon: '📊',
    details: `<h2>Transformez vos données géographiques en connaissances actionnables</h2>
    <p>Notre équipe d'analystes spatiaux utilise des techniques avancées pour explorer et interpréter vos données géographiques, révélant des modèles, des tendances et des relations qui ne seraient pas évidents autrement.</p>
    <p>Nous combinons expertise technique et compréhension approfondie du contexte local pour produire des analyses pertinentes et utiles à la prise de décision.</p>`,
    benefits: [
      'Identification de tendances et modèles spatiaux cachés',
      'Optimisation de l\'allocation des ressources',
      'Analyse des marchés et ciblage géographique',
      'Évaluation des risques environnementaux',
      'Support à la planification stratégique'
    ],
    process: [
      {
        title: 'Définition de la problématique',
        description: 'Clarification des questions auxquelles l\'analyse doit répondre'
      },
      {
        title: 'Collecte et préparation des données',
        description: 'Rassemblement et structuration des données nécessaires'
      },
      {
        title: 'Modélisation spatiale',
        description: 'Application des méthodes d\'analyse appropriées'
      },
      {
        title: 'Interprétation des résultats',
        description: 'Extraction des conclusions et recommandations'
      },
      {
        title: 'Présentation et visualisation',
        description: 'Communication claire et efficace des résultats'
      }
    ],
    faqs: [
      {
        question: 'Quels types d\'analyses spatiales proposez-vous?',
        answer: 'Nous offrons un large éventail d\'analyses: proximité, densité, connectivité, réseaux, clustering, interpolation, et bien d\'autres selon vos besoins.'
      },
      {
        question: 'Faut-il avoir des données SIG préexistantes pour ce service?',
        answer: 'Non, nous pouvons vous aider à acquérir ou à créer les données nécessaires pour votre analyse.'
      },
      {
        question: 'Comment présentez-vous les résultats d\'analyse?',
        answer: 'Nous proposons différents formats: rapports détaillés, présentations exécutives, cartes thématiques, tableaux de bord interactifs, selon vos préférences.'
      }
    ]
  },
  {
    id: 5,
    slug: 'drone-imagery',
    name: 'Imagerie par Drone',
    description: 'Acquisition et traitement d\'images aériennes à haute résolution par drone.',
    icon: '🚁',
    details: `<h2>Une perspective aérienne détaillée de votre territoire</h2>
    <p>Notre service d'imagerie par drone offre une solution flexible et économique pour obtenir des données géospatiales à très haute résolution pour des zones ciblées.</p>
    <p>Nous utilisons des drones professionnels équipés de caméras haute performance pour capturer des images aériennes détaillées qui peuvent être traitées pour générer divers produits géospatiaux.</p>`,
    benefits: [
      'Imagerie à très haute résolution (jusqu\'à 2-3 cm/pixel)',
      'Acquisition rapide et flexible',
      'Coût inférieur aux méthodes traditionnelles',
      'Possibilité de captures régulières pour suivi temporel',
      'Accès à des zones difficiles ou dangereuses'
    ],
    process: [
      {
        title: 'Planification de mission',
        description: 'Définition de la zone, résolution et paramètres de vol'
      },
      {
        title: 'Autorisations',
        description: 'Obtention des permis nécessaires pour les opérations de drone'
      },
      {
        title: 'Acquisition',
        description: 'Exécution du vol et capture des images'
      },
      {
        title: 'Traitement photogrammétrique',
        description: 'Création d\'orthomosaïques, modèles 3D et autres produits'
      },
      {
        title: 'Analyse et livraison',
        description: 'Interprétation des données et préparation des livrables'
      }
    ],
    faqs: [
      {
        question: 'Quelle superficie pouvez-vous couvrir par drone?',
        answer: 'Nous pouvons couvrir jusqu\'à plusieurs kilomètres carrés par jour, selon la résolution requise et les conditions de vol.'
      },
      {
        question: 'Quels types de capteurs utilisez-vous?',
        answer: 'Nous disposons de capteurs RVB haute résolution, multispectraux et thermiques selon les besoins de votre projet.'
      },
      {
        question: 'Pouvez-vous opérer dans toutes les régions d\'Haïti?',
        answer: 'Nous pouvons opérer dans la plupart des régions, sous réserve d\'autorisations locales et de conditions de sécurité appropriées.'
      }
    ]
  }
];

export default mockServices;
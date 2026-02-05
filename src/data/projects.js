export const projects = [
  {
    id: 'food-insecurity-early-warning',
    title: 'Food Insecurity Early Warning System',
    description: 'Predicting food insecurity in Ethiopia using climate, agricultural, socio-economic, and conflict data to enable proactive humanitarian response.',
    longDescription: `This ongoing project aims to develop a comprehensive early warning system for food insecurity in Ethiopia. By combining multiple data sources including climate patterns, agricultural yields, socio-economic indicators, and conflict data, the model provides predictive insights that can help humanitarian organizations and governments respond proactively.

The system leverages machine learning techniques to identify patterns and correlations across diverse datasets, enabling early detection of regions at risk of food insecurity. This approach moves beyond reactive humanitarian aid to a more proactive, data-driven intervention strategy.`,
    sustainability: 'Zero Hunger',
    technologies: ['Python', 'Machine Learning', 'Data Science', 'Time Series Analysis'],
    github: null,
    demo: null,
    image: new URL('../assets/projects/FEWSNET.webp', import.meta.url).href,
    ongoing: true,
    highlights: [
      'Multi-source data integration (climate, agricultural, socio-economic, conflict)',
      'Predictive modeling for early intervention',
      'Focus on Ethiopia\'s unique regional challenges',
      'Collaboration with humanitarian organizations'
    ]
  },
  {
    id: 'deforestation-detection-indonesia',
    title: 'Deforestation Detection in Indonesia',
    description: 'Gathered real-world data from open-source satellites to create a computer vision model which detects deforestation patterns.',
    longDescription: `This project tackles the critical environmental challenge of deforestation in Indonesia through the application of computer vision and satellite imagery analysis. By leveraging open-source satellite data, I built a deep learning model capable of detecting and monitoring deforestation in near real-time.

The model was trained on labeled satellite imagery to identify changes in forest cover, distinguishing between natural forest loss and human-driven deforestation. This technology can support conservation efforts by providing automated, scalable monitoring of Indonesia's vast forest regions.`,
    sustainability: 'Forest Conservation',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'Matplotlib', 'Computer Vision'],
    github: null,
    demo: null,
    image: new URL('../assets/projects/deforestation-detection-indonesia.webp', import.meta.url).href,
    ongoing: false,
    highlights: [
      'Open-source satellite data collection and processing',
      'Deep learning model for change detection',
      'Scalable approach for large geographic areas',
      'Support for conservation monitoring efforts'
    ]
  },
  {
    id: 'agents-of-change',
    title: 'Agents of Change',
    description: 'An AI Agent built at a hackathon that takes a project summary as input and returns a dashboard showing how it applies to the UN Sustainable Development Goals.',
    longDescription: `Agents of Change is an innovative AI system developed during a hackathon that analyzes projects against the UN Sustainable Development Goals (SDGs). The system accepts a project summary as input and generates a comprehensive dashboard visualizing how the project aligns with or contributes to each of the 17 SDGs.

My primary contribution was building the RAG (Retrieval-Augmented Generation) functionality, which enables the AI agent to retrieve relevant SDG documentation and guidelines to provide accurate, context-aware assessments of project alignment.`,
    sustainability: 'UN SDGs',
    technologies: ['Python', 'RAG', 'AI Agents', 'LLMs', 'APIs'],
    github: null,
    demo: null,
    image: new URL('../assets/projects/agents-of-change.webp', import.meta.url).href,
    ongoing: false,
    highlights: [
      'Built RAG functionality for accurate SDG matching',
      'AI agent architecture for automated analysis',
      'Interactive dashboard for visualizing SDG alignment',
      'Hackathon project demonstrating rapid prototyping'
    ]
  }
];

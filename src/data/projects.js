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
    subtitle: 'An Attention U-Net trained on Sentinel-2 satellite imagery to classify forest vs. non-forest cover across the Indonesian islands of Sumatra and Kalimantan, built to help governments monitor and govern large-scale deforestation at scale.',
    description: 'An Attention U-Net model trained on Sentinel-2 satellite imagery to classify forest vs. non-forest cover, enabling governments to monitor deforestation at scale.',
    tags: ['Computer Vision', 'Deep Learning', 'Remote Sensing'],
    longDescription: `This project tackles forest monitoring across Indonesia using deep learning and satellite imagery. The model adapts the Attention U-Net architecture for binary forest classification from satellite data.

**How It Works**

![Attention U-Net Architecture](ATTENTION_UNET_IMAGE)

Attention gates allow the network to focus on relevant forest regions and suppress noise from urban areas, water, and cloud artifacts. The model was trained on two open-source datasets: Sentinel-2 4-band composites (10m/pixel: Red, Green, Blue, NIR) and MapBiomas Indonesia land-cover masks for 2022.

A key challenge was Indonesia's tropical cloud cover, some regions had no cloud-free imagery below 30% cover. This required assembling cloud-free pixel composites across the full calendar year. The final dataset covered Sumatra and Kalimantan with approximately 1,250 512×512 image patches and balanced class distribution.

**Model Training**

Four distinct models were trained to evaluate the effectiveness of regularization techniques and regional generalization:

1. **Sumatra + Attention U-Net**: Classic Attention U-Net architecture trained on Sumatra imagery
2. **Sumatra + Attention U-Net + L2 + Dropout**: Classic architecture with L2 regularisation and dropout applied, trained on Sumatra data
3. **Kalimantan + Attention U-Net**: Classic Attention U-Net architecture trained on Kalimantan imagery
4. **Kalimantan + Attention U-Net + L2 + Dropout**: Classic architecture with L2 regularisation and dropout applied, trained on Kalimantan data

The models were then cross-evaluated on unseen data from the other region to assess generalization performance.
No cross-evaluation was performed for the Sumatra model with L2 + dropout due to training instability.

**Results**

![RESULTS_CHART](RESULTS_VISUALIZATION)

**Key Findings:**

Dropout regularisation hurt performance on Sumatra but improved it on Kalimantan. The Kalimantan-trained model generalised best to unseen data, suggesting it learned forest features rather than memorising the training set. Overall, the model performs well considering the ground truth masks are approximately 85% accurate and the heavier cloud cover in Indonesia.`,
    architectureImage: new URL('../assets/AttentionUNet.png', import.meta.url).href,
    sustainability: 'Environmental Protection',
    technologies: ['Python', 'TensorFlow 2.15', 'Attention U-Net', 'Sentinel-2', 'OpenEO', 'MapBiomas', 'Geospatial Data (Rasterio)', 'Image Segmentation', 'Regularisation & Ablation', 'Cloud Compositing'],
    github: "https://github.com/Shadyabu/deforestation_indonesia",
    demo: null,
    image: new URL('../assets/projects/deforestation-detection-indonesia.webp', import.meta.url).href,
    ongoing: false,
    highlights: [
      'Attention U-Net architecture for binary forest classification',
      'Addressed tropical cloud cover through year-long compositing',
      'Cross-region model generalisation to assess real-world performance',
      'Trained on open-source Sentinel-2 and MapBiomas datasets'
    ]
  },
  {
    id: 'agents-of-change',
    title: 'Agents of Change',
    subtitle: "Agents of Change is an innovative SDG Impact Monitor that enables users to describe projects or ideas in plain language, the platform's agents then analyze the description to identify the most relevant SDGs, retrieve real-world evidence from reports and datasets, and visualize impact pathways to help users strengthen their sustainability value proposition, in their given context, even giving country specific analysis. Agent for UN Sustainable Development Goals Impact Analysis",
    description: 'An AI Agent built at a hackathon that takes a project summary as input and returns a dashboard showing how it applies to the UN Sustainable Development Goals.',
    longDescription: `
**What It Does**

Users input a project description and the system automatically:
- Analyzes content to identify the most relevant SDGs
- Retrieves real-world evidence from reports, datasets, and news sources
- Visualizes impact pathways and SDG relationships
- Generates a comprehensive impact dashboard

![AGENTS_OF_CHANGE_VIDEO](AGENTS_OF_CHANGE_VIDEO)

**How We Built It**

We architected a modular multi-agent system combining both local and API-based LLMs (Qwen 3 4B and OpenAI GPT models). The Knowledge Base Agent handles document embeddings and retrieval using nomic-embed for efficient vector search. The Critical Thinking Agent synthesizes findings and maps relationships between SDGs, returning structured JSON data embedded in the frontend. The frontend (Next.js + Tailwind) enables users to upload project data and view AI-generated dashboards, with all components containerized in Docker for fast local deployment.

**Architectural Decision: SLM + LLM Hybrid Approach**

We chose to combine a Small Language Model (Qwen 3 4B) with larger LLMs (OpenAI GPT) for strategic reasons:

1. Cost-Efficiency and Latency: Qwen 3 4B runs locally with minimal computational overhead, enabling sub-second inference for tasks like initial SDG classification and content parsing. This contrasts with API-based models which incur per-request costs and network latency.

2. Task-Specific Optimization: Qwen excels at structured classification and semantic understanding needed for rapid SDG mapping, while larger models handle nuanced synthesis and evidence correlation in the Critical Thinking Agent.

This hybrid approach enabled us to build a production-ready system within hackathon constraints, balancing speed, cost, reliability, and result quality.

**Key Technical Contributions**

My primary responsibilities included:
- Building the RAG (Retrieval-Augmented Generation) functionality for accurate SDG document retrieval
- Architecting the Knowledge Base Agent with vector embeddings and semantic search
- Integrating multiple LLM providers with fallback mechanisms for reliability
- Designing the multi-agent communication pipeline to maintain coherence and traceability

**Challenges Overcome**

- Balancing LLM quality vs. latency across open-source and API-based models
- Structuring multi-agent communication so insights remained coherent and traceable
- Orchestrating complex component integration from embeddings to frontend visualization`,
    sustainability: 'UN SDGs',
    technologies: ['Python', 'RAG', 'AI Agents', 'LLMs', 'Vector DB', 'nomic-embed', 'Docker', 'Qwen 3.4B', 'OpenAI API', 'Vector Search'],
    github: null,
    demo: null,
    image: new URL('../assets/projects/agents-of-change.webp', import.meta.url).href,
    video: new URL('../assets/Agents of Change Demo.mp4', import.meta.url).href,
    ongoing: false,
    highlights: [
      'Architected RAG pipeline with a vector database for document retrieval',
      'Designed multi-agent system combining open-source and API-based LLMs',
      'Built Knowledge Base Agent with semantic search and embeddings',
      'Created Critical Thinking Agent for SDG relationship mapping and synthesis',
      'Full-stack implementation: Python backends, Next.js frontend, Docker deployment'
    ]
  }
];

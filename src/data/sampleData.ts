import { Contributor, NewsItem, Publication, Partner } from '../types';

export const contributors: Contributor[] = [
  {
    id: 'raul-fernandez-rojas',
    name: 'Dr. Raul Fernandez Rojas',
    role: 'Associate Professor',
    bio: "Dr Raul Fernandez Rojas (Member, IEEE) received a Ph.D. degree from the University of Canberra, Australia, in 2018, with a focus on biomarker identification using computational methods. He is currently an Associate Professor with the Faculty of Science and Technology. His research interests includes Signal Processing, fNIRS, Machine Learning, EEG, Multimodal Sensing. He published several papers in the above mentioned domains.",
    imageUrl: '/images/contributors/raul-fernandez-rojas.png',
    contributorApiId: '',
  },
  {
    id: 'maryam-ghahramani',
    name: 'Dr. Maryam Ghahramani',
    role: 'Senior Lecturer',
    bio: "Dr Maryam Ghahramani received her B.Sc. degree in Electrical Engineering from Shiraz University, Iran. She completed her Ph.D. at the University of Wollongong, Australia, with a focus on biometric gait and motion analysis and fall risk assessment in older adults. She is currently a Senior Lecturer in Engineering with the Faculty of Science and Technology at the University of Canberra. Her research interests include human motion analysis, machine learning, and rehabilitation-focused sensing technologies.",
    imageUrl: '/images/contributors/maryam-ghahramani.png',
    contributorApiId: '',
  },
  {
    id: 'sumair-aziz',
    name: 'Sumair Aziz',
    role: 'PhD Candidate',
    bio: 'Sumair Aziz is currently pursuing a Ph.D. at the University of Canberra, focusing on the design of reliable embedded systems for objective pain assessment using bio signal analysis. With a Master\'s degree in Electrical Engineering from COMSATS University Islamabad, Pakistan, and over a decade of research and development experience, Sumair has worked with numerous academic and research organisations. He has also served as an instructor for embedded systems at the University of Engineering and Technology Taxila, Pakistan. His research interests are intelligent embedded systems, signal processing, machine learning, and pattern recognition.',
    imageUrl: '/images/contributors/sumair-aziz.png',
    contributorApiId: '27005482',
  },
  {
    id: 'umar-khan',
    name: 'Muhammad Umar Khan',
    role: 'PhD Candidate',
    bio: "Muhammad Umar Khan is currently pursuing a PhD at the University of Canberra (UC), Australia, since 2023. He holds a Bachelor's degree in Electronics Engineering from COMSATS University Islamabad (CUI), Pakistan. Prior to joining UC, Umar taught at the University of Engineering and Technology (UET) Taxila for nearly ten years. Alongside his teaching role, he served as the Team Lead for Signal and Image Processing at the Syndicate of Embedded and Electronics Design (SEED) at UET for almost five years. His research interests lie in the development of cutting-edge algorithms that integrate signal/image processing, feature engineering, and advanced machine/deep learning techniques for computer-aided diagnosis and healthcare. Most of his research focuses on the detection of cardiac, pulmonary, and neurological disorders, as well as the assessment of pain. Additionally, his work extends to diverse domains, including machine fault diagnosis, biometric authentication, emotion recognition, and acoustic analysis.",
    imageUrl: '/images/contributors/umar-khan.png',
    contributorApiId: '120685296',
  },
  {
    id: 'zongyi-jiang',
    name: 'Zongyi Jiang',
    role: 'PhD Candidate',
    bio: "Zongyi Jiang is currently pursuing his PhD at the University of Canberra, focusing on young-onset dementia detection through sensor technology and machine learning. He received his Bachelor of Electrical Engineering at RMIT University in Australia in 2012 and earned his Master of Engineering in Electrical and Electronics from the Institute for NanoScale Science and Technology at Flinders University in Australia in 2024. His research encompasses dementia detection, flexible sensors, nanogenerators, signal processing, and the application of machine learning in healthcare, with a particular emphasis on neurodegenerative disorders.",
    imageUrl: '/images/contributors/zongyi-Jiang.png',
    contributorApiId: '',
  },
  {
    id: 'abishek-shrestha',
    name: 'Abishek Shrestha',
    role: 'PhD Candidate',
    bio: "Abishek is currently pursuing a PhD under the supervision of Dr. Maryam Ghahramani, Professor Damith Herath, and Associate Professor Angie Fearon. His research centres on the comprehensive validation of an optical-fibre Balance Mat for postural sway measurement and fall risk assessment in older adults. With a background in electronics and software engineering, Abishek brings strong technical expertise to this multidisciplinary work, which bridges engineering innovation with clinical application. His research interests include examining the complex variables influencing balance, validating technological devices against gold-standard methods, and advancing their transition into practical clinical tools. He is particularly focused on leveraging machine learning techniques to automate fall risk classification and enhance the usability and accuracy of balance assessment technologies.",
    imageUrl: '/images/contributors/abishek-shrestha.png',
    contributorApiId: '',
  },
  {
    id: 'farhan-rashid',
    name: 'Farhan Ahnaf Rashid',
    role: 'PhD Candidate',
    bio: "Farhan Ahnaf Rashid received a Master of Engineering (Research) in Electrical and Data Engineering from the University of Technology Sydney, where his thesis was working on developing a machine learning-based fall detection system for the elderly and disabled. His work utilised datasets such as SisFall and MobiFall, evaluating over 24 classification algorithms to determine the accuracy in fall detection. He also holds a Bachelor of Engineering (Honours) in Electrical and Electronic Engineering from Heriot-Watt University, having completed foundational years at the University of Manchester. Farhan has worked a lecturer and tutor at the Melbourne Institute of Technology Sydney Campus, where he taught operating systems courses and tutored courses in ethical hacking, networking, and web development. As a research assistant, he contributed to machine learning projects involving image labelling for environmental detection tasks. At the University of Canberra, he is currently working as a mentor and tutor on capstone projects, database design and information security.  He is currently pursuing a PhD in the field of biomedical signal processing, focusing on Parkinson’s disease detection through multimodal data analysis.",
    imageUrl: '/images/contributors/farhan-rashid.png',
    contributorApiId: '',
  },
  {
    id: 'hamza-shabbir-minhas',
    name: 'Hamza Shabbir Minhas',
    role: 'PhD Candidate',
    bio: "Hamza Shabbir Minhas is currently pursuing his Ph.D. at the University of Canberra, where his research explores the integration of neuroimaging and machine learning for the early detection of young-onset dementia. He holds a master’s degree in mechatronics engineering and a bachelor’s degree in mechanical engineering.  His research interests include brain–computer interface, artificial intelligence, machine learning, and rehabilitation. Through his research, Hamza aims to advance diagnostic methodologies and contribute to the development of personalised interventions for individuals affected by dementia.",
    imageUrl: '/images/contributors/hamza-shabbir-minhas.png',
    contributorApiId: '',
  },
  {
    id: 'maryam-sousani',
    name: 'Maryam Sousani',
    role: 'PhD Candidate',
    bio: "Maryam Sousani is a Ph.D. student at the University of Canberra, with a research focus on the assessment of brain activity patterns and body motion in individuals with Parkinson’s disease. She holds a master’s degree in communications systems engineering and a bachelor’s degree in electronics engineering. Maryam’s research interests include brain signal processing, electrical stimulation, brain-computer interfaces, and machine learning. Through her current Ph.D. work, she combines functional near-infrared spectroscopy (fNIRS) and inertial measurement units (IMU) to uncover subtle neural and motor changes that may not be visible through traditional clinical assessments. Her work aims to improve the early detection and monitoring of Parkinson’s disease, ultimately contributing to more personalised and effective management strategies for those affected.",
    imageUrl: '/images/contributors/maryam-sousani.png',
    contributorApiId: '',
  },
  {
    id: 'david-kalina',
    name: 'David Kalina',
    role: 'PhD Candidate',
    bio: "David Kalina is a PhD candidate at the University of Canberra, Australia. He holds a Bachelor of Engineering (Honours) in Network and Software Engineering from the University of Canberra. His research explores Virtual Reality–based acute pain management and the integration of biosensors to develop predictive, personalised approaches to drug-free pain relief.\n\nBefore commencing his PhD, David worked as a nurse call systems programmer, deploying custom solutions for Advanced Care and Vitalcall systems across rural hospitals and aged care facilities. Working closely with clinical staff and diverse patient populations shaped his interest in building practical, patient-focused healthcare technologies.",
    imageUrl: '',
    contributorApiId: '',
  },
  {
    id: 'adam-smith',
    name: 'Dr. Adam Smith',
    role: 'External Collaborator',
    bio: '',
    imageUrl: '',
    contributorApiId: '',
  },
  {
    id: 'test',
    name: 'Test Researcher',
    role: 'Test Scientist',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus vehicula sodales. Nulla aliquam ligula enim, et vehicula sapien tempor eu. Donec euismod tempus diam ut mollis. Nullam sit amet nisi in quam porta rhoncus id vel ante. Aliquam gravida nisi ut risus iaculis egestas. Etiam consequat ut mauris et interdum. Fusce justo massa, dictum vel faucibus vel, finibus eu justo. Mauris vel nunc ac justo laoreet fermentum. Fusce id euismod mi, a sollicitudin felis. Donec sed venenatis libero. Nam imperdiet ac mi non ullamcorper. Etiam eget mauris sed felis dignissim dictum sed eu metus. Donec consequat, sem vitae tempus fringilla, nibh dolor fermentum tellus, id pellentesque augue metus ac risus.',
    imageUrl: '/images/contributors/maria-rodriguez.jpg',
  },
];

export const projects: any[] = [
  {
    id: 'ai-pain-detection',
    title: 'Multimodal Signal Processing for Objective Human Pain Assessment',
    shortDescription: 'Objective pain assessment using bio-signal analysis and AI.',
    fullDescription: 'Pain is an essential biological signal, yet its assessment in clinical practice remains largely subjective and dependent on self-report or behavioural observation. This approach becomes particularly unreliable in individuals who are unable to communicate effectively, including stroke survivors, infants, patients with neurological disorders, or those under sedation. The aim of this project is to develop an accurate and objective framework for pain assessment by analysing multiple physiological signals that reflect the body’s automatic response to painful stimuli. These signals originate from the skin, heart, and brain, each capturing a distinct dimension of the pain response. By integrating these complementary sources of information, the project seeks to provide a more comprehensive and reliable assessment than any single modality alone.\n\nThis research focuses on multimodal signal processing and advanced artificial intelligence models to identify robust and generalisable biomarkers of pain across individuals. By integrating information from the skin, heart, and brain, the project aims to improve classification accuracy while reducing reliance on behavioural cues. Controlled laboratory-induced pain is used for systematic evaluation and model development, with the long-term objective of facilitating clinical validation. The work contributes to the development of accurate, data-driven, and physiologically grounded tools for objective human pain assessment.',
    imageUrl: '/images/projects/ai_pain_detection.png',
    bannerUrl: '/images/projects/ai_pain_detection_banner.png',
    contributors: ['umar-khan'],
  },
  {
    id: 'dementia-detection',
    title: 'Detection of dementia using neuroimaging and machine learning',
    shortDescription: 'Early detection of dementia using neuroimaging and machine learning.',
    fullDescription: 'Dementia is a major global health problem. According to the World Alzheimer Report 2024, more than 55 million people were living with dementia worldwide in 2020. In Australia alone, around 425,000 people were living with dementia in 2024. These numbers show how important early and accurate detection is.\n\nIn this study, we are using fNIRS, a safe, non-invasive, and portable brain imaging technique. It measures changes in blood oxygen levels in the brain, which reflect brain activity. Data is acquired primarily from the prefrontal cortex during structured cognitive and motor paradigms. After collecting the data, the signals undergo systematic preprocessing followed by extraction of discriminative features and utilisation machine learning algorithms to distinguish between healthy individuals and people with dementia.\n\nThe aim of this research is to explore how neuroimaging data can be used for the automated detection of dementia using machine learning. It investigates which cognitive or motor tasks are most effective in revealing differences between healthy individuals and people with dementia. The study also focuses on identifying the most useful features from brain signals that can improve classification accuracy and support reliable, early detection.',
    imageUrl: '/images/projects/dementia_detection.png',
    bannerUrl: '/images/projects/dementia_detection_banner.png',
    contributors: ['hamza-shabbir-minhas'],
  },
  {
    id: 'vr-pain-management',
    title: 'Virtual Reality for Acute Pain Management',
    shortDescription: 'Integrating VR and biosensors for predictive, drug-free pain relief.',
    fullDescription: 'This research explores Virtual Reality–based acute pain management and the integration of biosensors to develop predictive, personalised approaches to drug-free pain relief. By immersing patients in controlled virtual environments while monitoring physiological responses, we aim to reduce the reliance on pharmaceutical interventions for acute pain and improve patient outcomes in clinical settings.',
    imageUrl: '/images/projects/vr_pain.png',
    bannerUrl: '/images/projects/vr_pain_banner.png',
    contributors: ['david-kalina'],
  },
];

export const latestNews: NewsItem[] = [
  {
    id: '1',
    date: '2025-11-15',
    title: 'Advancements in AI Pain Detection',
    summary:
      'Our team has made significant strides in objective pain assessment using bio-signal analysis.',
    link: '/project/ai-pain-detection',
    category: 'Research',
  },
  {
    id: '2',
    date: '2025-10-20',
    title: 'New Study on Dementia Detection',
    summary:
      'Exploring the integration of neuroimaging and machine learning for early diagnosis.',
    link: '/project/dementia-detection',
    category: 'Research',
  },
  {
    id: '3',
    date: '2025-09-30',
    title: 'Welcome New PhD Candidate, Umar Khan',
    summary:
      'We are thrilled to welcome Umar Khan to the team, who will be focusing on AI pain detection.',
    link: '/contributor/umar-khan/bio',
    category: 'Team',
  },
];

// New data for publications
export const publications: Publication[] = [
  {
    id: 'p1',
    title: 'A Novel Framework for Objective Pain Assessment Using Deep Learning',
    authors: ['Sumair Aziz', 'Muhammad Umar Khan', 'Maryam Sousani'],
    journal: 'IEEE Transactions on Biomedical Engineering',
    year: 2025,
    url: 'https://ieeexplore.ieee.org',
    doi: '10.1109/TBME.2025.123456',
  },
  {
    id: 'p2',
    title:
      'Early Detection of Young-Onset Dementia via Gait and fNIRS Data',
    authors: ['Zongyi Jiang', 'Hamza Shabbir Minhas', 'Farhan Ahnaf Rashid'],
    journal: 'Journal of Neuroengineering and Rehabilitation',
    year: 2024,
    url: 'https://example.com/publication-link',
    doi: '10.1186/s12984-024-01234-5',
  },
];

// New data for partners
export const partners: Partner[] = [
  {
    id: 'uc',
    name: 'University of Canberra',
    websiteUrl: 'https://www.canberra.edu.au',
  },
  {
    id: 'nch',
    name: 'North Canberra Hospital',
    websiteUrl: 'https://www.canberrahealthservices.act.gov.au/locations-and-directions/north-canberra-hospital',
  },
];
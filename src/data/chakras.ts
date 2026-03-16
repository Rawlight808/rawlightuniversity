export type ChakraId =
  | 'root'
  | 'sacral'
  | 'solar_plexus'
  | 'heart'
  | 'throat'
  | 'third_eye'
  | 'crown'

export type ChakraConfig = {
  id: ChakraId
  index: number
  name: string
  sanskritName: string
  note: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
  frequencyHz: number
  color: string
  gradientFrom: string
  gradientTo: string
  images: string[]
  location: string
  themes: string[]
  shortAffirmation: string
  shortDescription: string
  recommendedDurationSeconds: number
}

export const chakras: ChakraConfig[] = [
  {
    id: 'root',
    index: 0,
    name: 'Root Chakra',
    sanskritName: 'Muladhara',
    note: 'C',
    frequencyHz: 256,
    color: '#E53935',
    gradientFrom: '#4A0D0A',
    gradientTo: '#E53935',
    images: ['/images/chakras/root-earth.jpg', '/images/chakras/root-mountains.jpg'],
    location: 'Base of the spine, perineum',
    themes: ['grounding', 'safety', 'stability', 'belonging'],
    shortAffirmation: 'I am safe. I am supported by the earth.',
    shortDescription:
      'Connect with the solid support beneath you. Feel your body heavy, rooted, and held by the earth.',
    recommendedDurationSeconds: 90,
  },
  {
    id: 'sacral',
    index: 1,
    name: 'Sacral Chakra',
    sanskritName: 'Svadhisthana',
    note: 'D',
    frequencyHz: 288,
    color: '#FB8C00',
    gradientFrom: '#4A2304',
    gradientTo: '#FB8C00',
    images: ['/images/chakras/sacral-water.jpg', '/images/chakras/sacral-creative.jpg'],
    location: 'Lower belly, below the navel',
    themes: ['flow', 'pleasure', 'creativity', 'emotions'],
    shortAffirmation: 'I honor my feelings and creative flow.',
    shortDescription:
      'Invite gentle movement through your hips and belly. Let emotions and creative energy flow like water.',
    recommendedDurationSeconds: 90,
  },
  {
    id: 'solar_plexus',
    index: 2,
    name: 'Solar Plexus Chakra',
    sanskritName: 'Manipura',
    note: 'E',
    frequencyHz: 324,
    color: '#FBC02D',
    gradientFrom: '#4A3604',
    gradientTo: '#FBC02D',
    images: ['/images/chakras/solar-sun.jpg', '/images/chakras/solar-fire.jpg'],
    location: 'Upper abdomen, above the navel',
    themes: ['confidence', 'willpower', 'inner fire'],
    shortAffirmation: 'I stand in my power with warmth and clarity.',
    shortDescription:
      'Feel a warm sun in your center, radiating courage, clarity, and gentle strength outward.',
    recommendedDurationSeconds: 90,
  },
  {
    id: 'heart',
    index: 3,
    name: 'Heart Chakra',
    sanskritName: 'Anahata',
    note: 'F',
    frequencyHz: 341,
    color: '#43A047',
    gradientFrom: '#073D1A',
    gradientTo: '#43A047',
    images: ['/images/chakras/heart-forest.jpg', '/images/chakras/heart-sky.jpg'],
    location: 'Center of the chest',
    themes: ['love', 'compassion', 'connection', 'forgiveness'],
    shortAffirmation: 'I give and receive love with ease.',
    shortDescription:
      'Breathe softly into your heart center. Invite tenderness, gratitude, and kindness toward yourself and others.',
    recommendedDurationSeconds: 90,
  },
  {
    id: 'throat',
    index: 4,
    name: 'Throat Chakra',
    sanskritName: 'Vishuddha',
    note: 'G',
    frequencyHz: 384,
    color: '#1E88E5',
    gradientFrom: '#062642',
    gradientTo: '#1E88E5',
    images: ['/images/chakras/throat-sky.jpg', '/images/chakras/throat-sound.jpg'],
    location: 'Throat and neck',
    themes: ['expression', 'truth', 'listening'],
    shortAffirmation: 'My truth flows clear and kind.',
    shortDescription:
      'Relax your jaw and throat. Feel a clear channel for your authentic voice and deep listening.',
    recommendedDurationSeconds: 90,
  },
  {
    id: 'third_eye',
    index: 5,
    name: 'Third Eye Chakra',
    sanskritName: 'Ajna',
    note: 'A',
    frequencyHz: 432,
    color: '#5E35B1',
    gradientFrom: '#1B1238',
    gradientTo: '#5E35B1',
    images: ['/images/chakras/third-eye-night-sky.jpg', '/images/chakras/third-eye-meditation.jpg'],
    location: 'Between the eyebrows',
    themes: ['intuition', 'insight', 'clarity'],
    shortAffirmation: 'I trust my inner vision and wisdom.',
    shortDescription:
      'Soften your gaze inward. Notice subtle impressions, images, and knowing arising from within.',
    recommendedDurationSeconds: 90,
  },
  {
    id: 'crown',
    index: 6,
    name: 'Crown Chakra',
    sanskritName: 'Sahasrara',
    note: 'B',
    frequencyHz: 480,
    color: '#AB47BC',
    gradientFrom: '#2B0A3A',
    gradientTo: '#AB47BC',
    images: ['/images/chakras/crown-light.jpg', '/images/chakras/crown-stars.jpg'],
    location: 'Top of the head',
    themes: ['connection', 'spirit', 'wholeness'],
    shortAffirmation: 'I am connected to something greater than myself.',
    shortDescription:
      'Sense a gentle light above you and flowing through you, reminding you of your wholeness and connection.',
    recommendedDurationSeconds: 120,
  },
]

export const chakraCount = chakras.length


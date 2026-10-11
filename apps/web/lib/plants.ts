export type PlantProfile = {
  slug: string;
  name: string;
  scientificName: string;
  emoji: string;
  difficulty: string;
  summary: string;
  sunlight: string;
  watering: string;
  notes: string[];
};

export const plants: PlantProfile[] = [
  {
    slug: "tomato",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    emoji: "🍅",
    difficulty: "MODERATE",
    summary: "A rewarding container or garden crop that generally needs strong light, support, and consistent care.",
    sunlight: "Typically performs best with around 6–8 hours of direct sunlight, depending on climate and cultivar.",
    watering: "Aim for consistent soil moisture. Check the soil and container drainage instead of following a rigid daily schedule.",
    notes: ["Choose a container large enough for the variety and root system.", "Provide a stake or cage when the plant needs support.", "Avoid wetting foliage unnecessarily and monitor for pests or disease.", "Local seasons and heat can strongly affect flowering and fruit set."]
  },
  {
    slug: "coriander",
    name: "Coriander",
    scientificName: "Coriandrum sativum",
    emoji: "🌿",
    difficulty: "BEGINNER",
    summary: "A useful culinary herb. It can be grown in containers, though heat and day length can affect how quickly it flowers.",
    sunlight: "Often grows well with sun to partial shade; protect young plants from harsh heat where needed.",
    watering: "Keep the growing medium lightly and evenly moist while seedlings establish, with good drainage.",
    notes: ["Use a container with drainage holes.", "Sow in intervals if you want a more continuous harvest.", "Hot conditions can encourage early flowering.", "Harvest outer leaves carefully so the plant can continue growing."]
  },
  {
    slug: "chilli",
    name: "Chilli pepper",
    scientificName: "Capsicum annuum",
    emoji: "🌶️",
    difficulty: "BEGINNER",
    summary: "A popular warm-season crop that can thrive in pots with suitable light, warmth, and drainage.",
    sunlight: "Generally prefers several hours of direct sunlight; extreme heat may require extra attention.",
    watering: "Water thoroughly when needed, allowing excess water to drain. Avoid leaving roots waterlogged.",
    notes: ["Choose a pot sized for the variety.", "Use a well-draining growing medium.", "Watch for aphids and other pests on new growth.", "Local climate and variety determine the best planting window."]
  },
  {
    slug: "basil",
    name: "Basil",
    scientificName: "Ocimum basilicum",
    emoji: "🌱",
    difficulty: "BEGINNER",
    summary: "An aromatic herb that is well suited to containers when warmth, light, and moisture are balanced.",
    sunlight: "Usually prefers bright light and several hours of sun, with protection from severe heat.",
    watering: "Check the soil regularly and water when needed; avoid both prolonged dryness and waterlogged roots.",
    notes: ["Pinch growing tips to encourage bushier growth.", "Harvest a little at a time rather than stripping the plant.", "Remove flower spikes if you want to encourage leafy growth.", "Requirements vary across basil varieties."]
  },
  {
    slug: "mint",
    name: "Mint",
    scientificName: "Mentha",
    emoji: "🍃",
    difficulty: "BEGINNER",
    summary: "A vigorous herb that is easy to grow in many settings and is best kept in its own container.",
    sunlight: "Can grow in sun or partial shade, depending on climate and variety.",
    watering: "Prefers evenly moist soil but still needs drainage.",
    notes: ["Use a separate pot because mint spreads vigorously.", "Trim stems regularly to encourage fresh growth.", "Avoid letting the pot dry out completely for long periods.", "Choose a variety suited to your intended use."]
  },
  {
    slug: "spinach",
    name: "Spinach",
    scientificName: "Spinacia oleracea",
    emoji: "🥬",
    difficulty: "BEGINNER",
    summary: "A leafy crop that often prefers cooler growing conditions and can be grown in containers or beds.",
    sunlight: "Sun to partial shade depending on temperature; afternoon shade can help in warmer conditions.",
    watering: "Maintain even moisture and ensure the container or bed drains well.",
    notes: ["Heat can cause early bolting.", "Harvest outer leaves when plants are established.", "Choose a locally suitable variety and season.", "Do not use this generic profile as a location-specific planting calendar."]
  }
];

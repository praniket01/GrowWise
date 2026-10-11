export type MissionCategory = "Observe" | "Care" | "Create" | "Biodiversity";
export type GardenMission = {
  id: string;
  title: string;
  description: string;
  why: string;
  minutes: number;
  difficulty: "Easy" | "Medium";
  category: MissionCategory;
  steps: string[];
};

export type MissionCompletion = {
  missionId: string;
  completedAt: string;
  reflection: string;
};

export const GARDEN_MISSIONS: GardenMission[] = [
  { id: "soil-check", title: "Check before you water", description: "Check the soil in one pot before reaching for the watering can.", why: "A quick soil check can prevent unnecessary watering and help you learn your plant's rhythm.", minutes: 5, difficulty: "Easy", category: "Observe", steps: ["Touch the top few centimeters of soil.", "Check a little deeper if the pot and plant allow it.", "Water only if the plant's needs and soil condition indicate it is time."] },
  { id: "leaf-observer", title: "Become a leaf detective", description: "Inspect the top and underside of three leaves on one plant.", why: "Regular observation helps you notice changes before they become harder to manage.", minutes: 8, difficulty: "Easy", category: "Observe", steps: ["Choose three leaves at different heights.", "Look for spots, webbing, holes, or color changes.", "Record what you see without jumping to a diagnosis."] },
  { id: "clear-debris", title: "Give one plant some space", description: "Remove fallen debris around a plant and check that air can move around it.", why: "A tidy growing area makes it easier to spot problems and keep an eye on plant health.", minutes: 7, difficulty: "Easy", category: "Care", steps: ["Pick up fallen leaves from the soil surface.", "Check that the pot's drainage holes are not blocked.", "Avoid removing healthy leaves just for appearance."] },
  { id: "sunlight-map", title: "Map your sunlight", description: "Observe which part of your growing space gets sun at different times.", why: "Light changes through the day, and this simple map helps you place plants more thoughtfully.", minutes: 10, difficulty: "Easy", category: "Observe", steps: ["Note the time and where direct sun falls.", "Repeat later in the day if possible.", "Compare the pattern with the light needs of your plants."] },
  { id: "seed-start", title: "Start a tiny growing experiment", description: "Choose a suitable seed and prepare one clean container with drainage.", why: "A small experiment makes it easier to learn what works in your space.", minutes: 15, difficulty: "Medium", category: "Create", steps: ["Choose a plant suited to your climate and available light.", "Use a clean container with drainage and an appropriate growing medium.", "Label the seed and date so you can track what happens."] },
  { id: "pollinator-watch", title: "Pause for a pollinator", description: "Spend a few quiet minutes noticing insects visiting flowers, if any are present.", why: "Noticing local biodiversity can help you understand the life around your garden.", minutes: 8, difficulty: "Easy", category: "Biodiversity", steps: ["Observe from a comfortable distance.", "Notice which flowers or plants attract visitors.", "Do not handle insects or disturb nests; simply record what you saw."] },
  { id: "tool-clean", title: "Clean one gardening tool", description: "Clean a small hand tool before your next gardening session.", why: "Basic tool care makes gardening more pleasant and can reduce the transfer of soil and plant residue.", minutes: 6, difficulty: "Easy", category: "Care", steps: ["Remove soil and plant residue safely.", "Dry the tool before storing it.", "Keep sharp edges away from children and pets."] },
  { id: "plant-label", title: "Give a plant its name tag", description: "Label one plant with its name and, if known, the date you planted it.", why: "Labels make it easier to remember what you planted and compare growth over time.", minutes: 5, difficulty: "Easy", category: "Create", steps: ["Write the plant name clearly.", "Add the planting date if you know it.", "Place the label where it will not damage stems or roots."] }
];

export type JournalEntry = {
  id: string;
  plantName: string;
  observedAt: string;
  health: "Thriving" | "Okay" | "Needs attention";
  note: string;
  createdAt: string;
};

export const MISSIONS_STORAGE_KEY = "growwise.missions.v1";
export const JOURNAL_STORAGE_KEY = "growwise.journal.v1";

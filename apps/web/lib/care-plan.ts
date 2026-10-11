export type GardenInput = {
  name: string;
  city: string;
  space: "BALCONY" | "WINDOWSILL" | "BACKYARD" | "COMMUNITY";
  sunlight: "FULL_SUN" | "PARTIAL_SUN" | "SHADE" | "UNKNOWN";
  experience: "BEGINNER" | "SOME" | "EXPERIENCED";
  interests: string;
};

export type CareTask = { id: string; title: string; description: string; category: string };

export function buildCarePlan(garden: GardenInput): CareTask[] {
  const tasks: CareTask[] = [
    {
      id: "soil-check",
      title: "Check soil before watering",
      description: "Feel the top layer of soil in each container. Water only when the plant and soil need it; avoid leaving pots sitting in standing water.",
      category: "WATER"
    },
    {
      id: "light-check",
      title: "Observe your sunlight",
      description: "Notice how many hours of direct sunlight your growing area receives. Recheck this as the sun angle and season change.",
      category: "OBSERVE"
    },
    {
      id: "leaf-check",
      title: "Inspect leaves and stems",
      description: "Look at both sides of a few leaves for discoloration, spots, wilting, or pests. Record what you see before deciding on a treatment.",
      category: "HEALTH"
    },
    {
      id: "drainage",
      title: "Check container drainage",
      description: "Make sure excess water can escape from pots and that containers are suitable for the roots of your chosen plants.",
      category: "SETUP"
    }
  ];

  if (garden.sunlight === "SHADE") {
    tasks.push({
      id: "shade-plants",
      title: "Prioritize shade-tolerant options",
      description: "Compare your available light with the requirements of each plant. Fruiting crops such as tomatoes often need more direct sun than leafy herbs.",
      category: "PLANNING"
    });
  } else {
    tasks.push({
      id: "plant-labels",
      title: "Label your plants",
      description: `Make a simple label for each plant you grow${garden.interests.trim() ? `, including ${garden.interests.trim()}` : ""}. Add the planting date if you know it.`,
      category: "PLANNING"
    });
  }

  if (garden.space === "WINDOWSILL") {
    tasks.push({
      id: "windowsill-heat",
      title: "Check for window heat",
      description: "Observe whether direct sun through glass overheats or dries the plants. Move containers if leaves show heat stress.",
      category: "ENVIRONMENT"
    });
  }

  return tasks;
}

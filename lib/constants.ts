import { FoodOption, ActivityOption, PlannerData } from "@/types/planner";

export const SESSION_STORAGE_KEY = "datePlannerSession";

export const INITIAL_PLANNER_DATA: PlannerData = {
  name: "",
  date: "",
  time: "",
  food: "",
  activity: "",
  note: "",
};

export const TIME_SLOTS: string[] = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export const FOOD_OPTIONS: FoodOption[] = [
  {
    id: "Cafe",
    title: "Cozy Cafe",
    description: "Artisan coffee, brunch, and warm ambience",
    iconPath: "/icons/coffee.svg",
  },
  {
    id: "Sushi",
    title: "Sushi & Japanese",
    description: "Fresh nigiri, rolls, and delicate flavors",
    iconPath: "/icons/sushi.svg",
  },
  {
    id: "Steak",
    title: "Steakhouse",
    description: "Sizzling cuts, wine, and romantic candlelight",
    iconPath: "/icons/steak.svg",
  },
  {
    id: "Dessert",
    title: "Sweet Desserts",
    description: "Patisserie, soufflés, and decadent pastries",
    iconPath: "/icons/dessert.svg",
  },
  {
    id: "Street Food",
    title: "Street Food",
    description: "Bustling night market snacks and authentic bites",
    iconPath: "/icons/street-food.svg",
  },
  {
    id: "Surprise Me",
    title: "Surprise Me 🎁",
    description: "Let Iqbal pick something unforgettable",
    iconPath: "/icons/sparkles.svg",
  },
];

export const ACTIVITY_OPTIONS: ActivityOption[] = [
  {
    id: "Coffee Date",
    title: "Coffee & Chats",
    description: "Slow conversations over aromatic brews",
    iconPath: "/icons/coffee.svg",
  },
  {
    id: "Movie",
    title: "Cinema Night",
    description: "Popcorn, recliner seats, and cinematic magic",
    iconPath: "/icons/movie-ticket.svg",
  },
  {
    id: "Picnic",
    title: "Park Picnic",
    description: "Lush grass, picnic mat, and sweet breeze",
    iconPath: "/icons/picnic-basket.svg",
  },
  {
    id: "Arcade",
    title: "Arcade Games",
    description: "Claw machines, air hockey, and playful rivalry",
    iconPath: "/icons/arcade-controller.svg",
  },
  {
    id: "Sunset Walk",
    title: "Sunset Stroll",
    description: "Golden hour sky, cool breeze, and held hands",
    iconPath: "/illustrations/sunset.svg",
  },
  {
    id: "Surprise Me",
    title: "Surprise Me ✨",
    description: "Keep it a secret until our magical day",
    iconPath: "/icons/sparkles.svg",
  },
];

export const DEFAULT_PHONE_NUMBER = "6281511471100";

export const TARGET_PHONE_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER?.trim() || DEFAULT_PHONE_NUMBER;

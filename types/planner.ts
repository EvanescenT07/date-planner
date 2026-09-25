export interface PlannerData {
  name: string;
  date: string;
  time: string;
  food: string;
  activity: string;
  note: string;
}

export type PlannerStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface FoodOption {
  id: string;
  title: string;
  description: string;
  iconPath: string;
}

export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  iconPath: string;
}

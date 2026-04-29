export interface AnimeDriver {
  id: number;
  name: string;
  animeSeries: string;
  imageUrl: string;
  cost: number;
  speed: number;
  cornering: number;
  overtaking: number;
  reliability: number;
  specialAbility: string;
}

export interface Race {
  id: number;
  name: string;
  circuit: string;
  scheduledTime: string;
  completed: boolean;
}

export interface RaceResult {
  id: number;
  driver: AnimeDriver;
  position: number;
  pointsEarned: number;
  remark: string;
}

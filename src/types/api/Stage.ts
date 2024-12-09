export interface Stage {
  id: number;
  matricule: string;
  hopital: number;
  service: number;
}

export type StageRequest = Omit<Stage, "id">;

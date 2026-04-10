export interface GameState {
  winner: string | null;
  losers: string[];
  allNames: string[];
  isScrollThrottled: boolean;
}

export interface PickNamePayload {
  names: string[];
}

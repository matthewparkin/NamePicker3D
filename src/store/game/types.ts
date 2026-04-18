export interface GameState {
  winner: string | null;
  losers: string[];
  allNames: string[];
  isScrollThrottled: boolean;
  currentThemeId: string;
  currentRevealStrategy: string;
  currentAnimationPackageId: string;
}

export interface PickNamePayload {
  names: string[];
}

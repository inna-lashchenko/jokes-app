export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
  comment?: string;
  favorite?: boolean;
  isRandom?: boolean;
}

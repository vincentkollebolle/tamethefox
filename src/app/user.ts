export class User {
  timestamp;
  mood: string;
  email: string;

  constructor(email: string, ts, mood: string) {
    this.timestamp = ts;
    this.mood = mood;
    this.email = email;
  }
}

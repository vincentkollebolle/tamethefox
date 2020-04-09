export class User {
  id;
  timestamp;
  mood: string;
  email: string;

  constructor(id, email: string, ts, mood: string) {
    this.id = id;
    this.timestamp = ts;
    this.mood = mood;
    this.email = email;
  }
}

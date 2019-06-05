export class Activity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public tags: string[],
    public geolocation: { latitude: number; longitude: number }
  ) {}
}

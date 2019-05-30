interface IActivity {
  id: Number;
  title: String;
  description: String;
  tags: String[];
  geolocation: {
    latitude: Number;
    longitude: Number;
  };
}

export default IActivity;

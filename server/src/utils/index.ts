const getDbUri = (): string => {
  const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DB,
    MONGO_HOST,
    MONGO_PORT
  } = process.env;

  const mongoPath = `${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
  const mongoCredentials = `${MONGO_USER}:${MONGO_PASSWORD}`;
  const uri = `mongodb://${mongoCredentials}@${mongoPath}?authSource=admin`;
  return uri;
};

export { getDbUri };

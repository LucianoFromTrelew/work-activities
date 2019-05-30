"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDbUri = () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DB, MONGO_HOST, MONGO_PORT } = process.env;
    const mongoPath = `${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
    const mongoCredentials = `${MONGO_USER}:${MONGO_PASSWORD}`;
    const uri = `mongodb://${mongoCredentials}@${mongoPath}?authSource=admin`;
    return uri;
};
exports.getDbUri = getDbUri;
//# sourceMappingURL=index.js.map
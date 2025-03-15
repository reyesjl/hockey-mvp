import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('../config/serviceFile.json');

// Initalize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export default admin;
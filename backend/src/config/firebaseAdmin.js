import admin from 'firebase-admin';

// Initalize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('file_path_idiot.json'),
})

// Set custom 'admin' claim for a user
const setAdminClaim = async (uid) => {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(`Custom claim set for user ${uid}`);
};

setAdminClaim('uuid').then(() => process.exit());
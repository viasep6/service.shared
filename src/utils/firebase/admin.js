const admin = require('firebase-admin');

const serviceAccount = {
  type: process.env["FirebaseAdminType"],
  project_id: process.env["FirebaseProject_id"],
  private_key_id: process.env["FirebaseAdminPrivate_key_id"],
  private_key: process.env["FirebaseAdminPrivate_key"],
  client_email: process.env["FirebaseAdminClient_email"],
  client_id: process.env["FirebaseAdminClient_id"],
  auth_uri: process.env["FirebaseAdminAuth_uri"],
  token_uri: process.env["FirebaseAdminToken_uri"],
  auth_provider_x509_cert_url: process.env["FirebaseAdminAuth_provider_x509_cert_url"],
  client_x509_cert_url: process.env["FirebaseAdminClient_x509_cert_url"]
}


if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = { admin, db };
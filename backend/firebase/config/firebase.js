// // Import the entire firebase-admin module
// import * as admin from 'firebase-admin';

// // Import the initializeApp function from firebase-admin/app
// import { initializeApp } from 'firebase-admin/app';

// // Import the cert function from firebase-admin/credential
// import { cert } from 'firebase-admin/credential';

// // Import your service account JSON
// import serviceAccount from './skip-qu-firebase-adminsdk-fbsvc-23800b86b4.json' with { type: 'json' };

// // Initialize the app with the service account
// initializeApp({
//   credential: cert(serviceAccount)
// });

// // Export the admin namespace for use in other parts of your application
// export default admin;

import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from './skip-qu-firebase-adminsdk-fbsvc-23800b86b4.json' with { type: 'json' };

initializeApp({
  credential: cert(serviceAccount)
});

export default admin;
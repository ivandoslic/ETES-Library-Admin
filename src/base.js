import * as Firebase from 'firebase/app';
import "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const app = Firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const storage = getStorage(app);
const firestoreDB = getFirestore(app);

async function sendMessageToUser(userFCMtoken, title, message) {
    console.log("sending request!");
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
            'Authorization': "key=" + process.env.REACT_APP_SERVER_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "to": userFCMtoken,
            "notification": {
                "body": message,
                "title": title,
            }
        })
    });

    console.log(response.json());
}

async function sendGlobalNotificationMessage(title, message) {
    console.log("sending request!");
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
            'Authorization': "key=" + process.env.REACT_APP_SERVER_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "to": "eEMqssdMQ7mh6--72EpUSb:APA91bH0sR_JT0vVSCRn85kxBbP23imKq4ujML4ximK7QSGsOCPiv6TqxRONAKsEEWq06KEjrJ6r-g9KiJIfqxWuL_nx3GbPNsdmfVY_esSP2Zjn4WnHtKM57uIKf2wQ-Xq89nvHVJ62",
            "notification": {
                "body": message,
                "title": title,
            }
        })
    });

    console.log(response.json());
}

export default { app, storage, firestoreDB, sendMessageToUser, sendGlobalNotificationMessage };
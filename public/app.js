import { initializeApp } from 'https://cdn.skypack.dev/firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from 'https://cdn.skypack.dev/firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch data from API and store in Firestore if not already present
async function fetchDataAndStoreInFirestore() {
  const querySnapshot = await getDocs(collection(db, "launches"));
  if (querySnapshot.empty) {
    const data = await fetchLaunchDataFromAPI();
    if (data) {
      data.result.forEach(async launch => {
        try {
          const docRef = await addDoc(collection(db, "launches"), launch);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
    }
  }
}

async function fetchLaunchDataFromAPI() {
  try {
    const response = await fetch('https://fdo.rocketlaunch.live/json/launches?limit=5&key=b2de71bb-8c37-4692-bec7-2ec19c39947a');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

fetchDataAndStoreInFirestore();

// Update launch data in Firestore periodically
async function updateLaunchDataPeriodically() {
  const querySnapshot = await getDocs(collection(db, "launches"));
  const data = await fetchLaunchDataFromAPI();
  if (data) {
    data.result.forEach(async launch => {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().id === launch.id) {
          try {
            await updateDoc(docRef(db, "launches", doc.id), launch);
            console.log("Document updated with ID: ", doc.id);
          } catch (e) {
            console.error("Error updating document: ", e);
          }
        }
      });
    });
  }
}

setInterval(updateLaunchDataPeriodically, 60000); // update every minute

// Fetch data from Firestore and display on webpage
async function displayLaunches() {
  const querySnapshot = await getDocs(collection(db, "launches"));
  const launchesDiv = document.getElementById('launches');
  querySnapshot.forEach((doc) => {
    const launchData = doc.data();
    const launchDiv = document.createElement('div');
    launchDiv.textContent = launchData.name;
    launchesDiv.appendChild(launchDiv);
  });
}

displayLaunches();

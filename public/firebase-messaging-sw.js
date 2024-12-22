// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDyN5895Fqyih8C6TT_SEXQ-l_ZQ3tKpfs",
  authDomain: "ohanadoc-aa4ff.firebaseapp.com",
  projectId: "ohanadoc-aa4ff",
  storageBucket: "ohanadoc-aa4ff.appspot.com",
  messagingSenderId: "569400077496",
  appId: "1:569400077496:web:0f32a9eaef5fb526f2984d",
  measurementId: "G-GXQ38PTERB",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// const messaging = firebase.messaging();
function messaging() {
  console.log("object")
}
const messaging = messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
// messaging.onBackgroundMessage(function (payload) {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: './Favicon.svg', // Set the path to your notification icon
//     data: { click_action: `/admin` }
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener('notificationclick', function (event) {
  const clickAction = event.notification.data.click_action;

  event.notification.close();

  if (clickAction) {
    clients.openWindow(clickAction);
  }
});
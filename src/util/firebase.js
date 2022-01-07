import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	// apiKey: "AIzaSyC7g3hyfTOV3Qt1_y0FLcDpJRcd6Nu7hCs",
	// authDomain: "socialproject2-59600.firebaseapp.com",
	// projectId: "socialproject2-59600",
	// storageBucket: "socialproject2-59600.appspot.com",
	// messagingSenderId: "440536491946",
	// appId: "1:440536491946:web:416c2276c898f442ed2dd3",
	apiKey: "AIzaSyCdBUZZ03BKJANqj7CKj9AnkX5tFofPbg8",
	authDomain: "reactsocialapp-dc29c.firebaseapp.com",
	databaseURL: "https://reactsocialapp-dc29c-default-rtdb.firebaseio.com",
	projectId: "reactsocialapp-dc29c",
	storageBucket: "reactsocialapp-dc29c.appspot.com",
	messagingSenderId: "513895322607",
	appId: "1:513895322607:web:c5fac84686b3da3d951c1a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storageRef = firebase.storage();


// import firebase from "firebase";

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyDx42XAZirzX5bDfdvq_KXaLvORRV-1rKY",
//   authDomain: "whatsapp-link-generator-5376e.firebaseapp.com",
//   databaseURL: "https://whatsapp-link-generator-5376e.firebaseio.com",
//   projectId: "whatsapp-link-generator-5376e",
//   storageBucket: "whatsapp-link-generator-5376e.appspot.com",
//   messagingSenderId: "126870058992",
//   appId: "1:126870058992:web:217d70e57ce93341568f35",
// });

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storageRef = firebase.storage();

// export { db, auth, storageRef }
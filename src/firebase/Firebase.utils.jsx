import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyC58L0WIQ1Lt09O_xbLHVxebq-8Xh2tWGQ",
    authDomain: "dailygo-8faa9.firebaseapp.com",
    projectId: "dailygo-8faa9",
    storageBucket: "dailygo-8faa9.appspot.com",
    messagingSenderId: "143682741381",
    appId: "1:143682741381:web:19b74054b56e0e720b75ec"
}

export const createUserProfile = async (userAuth, additionalData) =>{
	if(!userAuth) return;
	const userRef = await firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	if(!snapShot.exists)
	{
		const {displayName, email} = userAuth;
		const createdAt = new Date();
		const bingos = 0;
		const tasks = [{
			"task" : '',
			"completed" : "false"
		}];

		try{
			await userRef.set({
				displayName,
				email,
				createdAt,
				bingos,
				tasks,
				...additionalData
			})
		}catch (e){
			console.log(e);
		}
	}
	return userRef;
}

if(!firebase.apps.length){
	firebase.initializeApp(config);
}else{
	firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
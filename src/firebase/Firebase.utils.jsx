import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyCh1bxSYvZxT4u_obnIYAp6jknOx3YfYAM",
    authDomain: "civic-eye-240516.firebaseapp.com",
    projectId: "civic-eye-240516",
    storageBucket: "civic-eye-240516.appspot.com",
    messagingSenderId: "214569337984",
    appId: "1:214569337984:web:b416bcd09c4560b2361265",
    measurementId: "G-L3W7K2W96N"
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
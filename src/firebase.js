import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// 認証用の機能をインポート
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-huhaJiblN3fa6RQVSyLAZtLwC1ux1Es",
  authDomain: "life-quest-25ba2.firebaseapp.com",
  projectId: "life-quest-25ba2",
  storageBucket: "life-quest-25ba2.firebasestorage.app",
  messagingSenderId: "860645806398",
  appId: "1:860645806398:web:75926b62b8c4ab1394dc6f",
  measurementId: "G-HNT4YGD38V"
};

const app = initializeApp(firebaseConfig);

// データベース
export const db = getFirestore(app);
// 認証(Auth)本体
export const auth = getAuth(app);
// Googleログインのプロバイダー
export const googleProvider = new GoogleAuthProvider();

// ログイン・ログアウト用の関数もここで作っておくと楽です
export { signInWithPopup, signOut };
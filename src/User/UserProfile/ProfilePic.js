import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { collection, getFirestore, getDocs, query, where, updateDoc, onSnapshot } from "firebase/firestore";
import { app } from "../../FireBase/FireBase";
import './ProfilePic.css'

const storage = getStorage(app);
const db = getFirestore(app);

const ProfilePic = ({ currentUserEmail }) => {
  const [fileUrl, setFileUrl] = useState(null);

  const handleAvatarUpload = async (e) => {
    handleAvatarDelete();
    const file = e.target.files[0];
    if (!file) {
       return;
    }
    const storageRef = ref(storage, `ProfilePic/${currentUserEmail}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    const userCollectionRef = collection(db, "users");
    const userQueryRef = query(userCollectionRef, where("currentUserEmail", "==", currentUserEmail));
    const userQuerySnapshot = await getDocs(userQueryRef);
    userQuerySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, { avatarPhotoUrl: downloadUrl });
      setFileUrl(downloadUrl);
    });
  };

  const handleAvatarDelete = async () => {
    if (!fileUrl) { 
      return;
    }
    const avatarRef = ref(storage, fileUrl);
    await deleteObject(avatarRef);
    const userCollectionRef = collection(db, "users");
    const userQueryRef = query(userCollectionRef, where("currentUserEmail", "==", currentUserEmail));
    const userQuerySnapshot = await getDocs(userQueryRef);
    userQuerySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, { avatarPhotoUrl: null });
      setFileUrl(null);
    });
  };

  useEffect(() => {
    const postCollectionRef = collection(db, "users");
    const postQueryRef = query(postCollectionRef, where("currentUserEmail", "==", currentUserEmail));
    const unsubscribe = onSnapshot(postQueryRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setFileUrl(data.avatarPhotoUrl);
      });
    });
    return () => unsubscribe();
  }, [currentUserEmail]);

  return (
    <div>
      <label htmlFor="avatar-upload" className="avatar-container">
        {fileUrl ? (
          <img src={fileUrl} alt="Avatar" className="avatar-image" />
        ) : (
          <div className="avatar-placeholder" style={{ color: 'white', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            +
          </div>
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id="avatar-upload"
        style={{ display: "none" }}
        onChange={handleAvatarUpload}
      />
    </div>
  );
};

export default ProfilePic;
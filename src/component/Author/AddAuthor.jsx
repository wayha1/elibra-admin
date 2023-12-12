import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db, imgDB } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { LoadingProcess } from "../LoadingProcess/LoadingProcess";
import { FcAddImage } from "react-icons/fc";

export const AddAuthor = () => {
  const [authName, setAuthName] = useState("");
  const [authDecs, setAuthDecs] = useState("");
  const [authGender, setAuthGender] = useState("");
  const [authDOB, setAuthDOB] = useState("");
  const [authImage, setAuthImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const value = collection(db, "Author");

  const handleCreate = async () => {
    if (!authImage || loading) return;
    setLoading(true);
    const imgRef = ref(imgDB, `WebsiteProject/AboutUs/${authImage.name + uuidv4()}`);
    try {
      await uploadBytes(imgRef, authImage);
      const url = await getDownloadURL(imgRef);
      setImageUrl(url);

      await addDoc(value, {
        authName,
        Decs: authDecs,
        Gender: authGender,
        DOB: authDOB,
        imgAuth: url,
      });

      setSuccessPopup(true);
    } catch (error) {
      console.error("Error uploading image or adding document:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, [loading]);

  return (
    <div className="container flex flex-col m-2 space-y-5">
      <input
        value={authName}
        onChange={(e) => setAuthName(e.target.value)}
        placeholder="Author's Name"
        className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <textarea
        value={authDecs}
        onChange={(e) => setAuthDecs(e.target.value)}
        placeholder="Author's Description"
        className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        value={authGender}
        onChange={(e) => setAuthGender(e.target.value)}
        placeholder="Gender"
        className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        value={authDOB}
        onChange={(e) => setAuthDOB(e.target.value)}
        placeholder="Date of Birth"
        className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <div className="relative mt-2">
        <label
          htmlFor="imageInput"
          className="inline-block bg-white px-4 py-2 rounded-md border border-gray-300 cursor-pointer"
        >
          <span className="flex items-center">
            <FcAddImage className="mr-2" /> {authImage ? authImage.name : "Upload Image (4 x 6)"}
          </span>
        </label>
        <input
          id="imageInput"
          type="file"
          onChange={(e) => setAuthImage(e.target.files[0])}
          accept="image/*"
          className="hidden"
        />
        {authImage && <div className="absolute top-0 right-0 mt-2 mr-10 text-sky-500">Image uploaded!</div>}
      </div>
      {loading ? (
        <LoadingProcess />
      ) : (
        
        <button
          onClick={handleCreate}
          className={`${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } w-32 rounded-lg p-2 text-white focus:outline-none`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      )}

      {successPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={() => setSuccessPopup(false)}
          ></div>
          <div className="bg-white p-4 rounded-xl z-10">
            <p className="text-lg font-semibold mb-4">Upload Successful</p>
            <button
              className="flex bg-blue-500 text-white p-2 rounded-xl"
              onClick={() => setSuccessPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

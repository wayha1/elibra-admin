import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db, imgDB } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";
import Modal from "./Modal";

export const AuthorList = () => {
  const [authorList, setAuthorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedAuthor, setUpdatedAuthor] = useState({
    authName: "",
    decs: "",
    Gender: "",
    authDOB: "",
    imgAuth: "",
  });

  const handleDelete = async (authorId, imageUrl) => {
    if (loading) return;
    setSelectedAuthor({ authorId, imageUrl });
    setDeleteSuccess(false);
    setShowModal(true);
  };
  const confirmDelete = async () => {
    setLoading(true);
    try {
      const authorRef = doc(db, "Author", selectedAuthor.authorId);
      const imgRef = ref(imgDB, selectedAuthor.imageUrl);

      await deleteDoc(authorRef);
      await deleteObject(imgRef);
      setDeleteSuccess(true);
      alert("Delete success!");
    } catch (error) {
      console.error("Error deleting document or image:", error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleUpdate = (author) => {
    setUpdatedAuthor(author);
    setUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const authorRef = doc(db, "Author", selectedAuthor.authorId);
      const imgRef = ref(imgDB, selectedAuthor.imageUrl);

      if (authImage) {
        // Upload the new image
        const newImgRef = ref(imgDB, `WebsiteProject/AboutUs/${authImage.name + uuidv4()}`);
        await uploadBytes(newImgRef, authImage);
        const newImgUrl = await getDownloadURL(newImgRef);

        // Delete the old image
        await deleteObject(imgRef);
        await updateDoc(authorRef, {
          authName: updatedAuthor.authName,
          Gender: updatedAuthor.Gender,
          decs: updatedAuthor.decs,
          authDOB: updatedAuthor.authDOB,
          imgAuth: newImgUrl,
        });
      } else {
        // Update the document without changing the image
        await updateDoc(authorRef, {
          authName: updatedAuthor.authName,
          Gender: updatedAuthor.Gender,
          decs: updatedAuthor.decs,
          authDOB: updatedAuthor.authDOB,
        });
      }

      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error updating document or image:", error.message);
    } finally {
      setLoading(false);
      setUpdateModalOpen(false);
    }
  };
  useEffect(() => {
    const value = collection(db, "Author");
    const getAuthors = async () => {
      const authVal = await getDocs(value);
      setAuthorList(authVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAuthors();
  }, [deleteSuccess, updateModalOpen]);

  return (
    <div className="container w-auto">
      {authorList.map((author) => (
        <div key={author.id} className="flex w-full items-center mb-4 p-4 bg-white rounded-lg">
          <img src={author.imgAuth} alt={author.authName} className="w-40 h-50" />
          <div className="ml-4">
            <p className="text-lg font-bold">{author.authName}</p>
            <p>{author.Gender}</p>
            <p>{author.decs}</p>
            <p>{author.DOB}</p>
          </div>
          <div className="ml-auto flex">
            <button
              className="mr-2 bg-red-500 text-white active:bg-blue-500 p-2 rounded-lg"
              onClick={() => handleDelete(author.id, author.imgAuth)}
            >
              Delete
            </button>

            <button
              className="mr-2 bg-green-500 text-white p-2 active:bg-blue-500 rounded-lg"
              onClick={() => handleUpdate(author)}
            >
              Update
            </button>
            <button
              className="mr-2 bg-gray-900 text-white p-2 active:bg-blue-500 rounded-lg"
              onClick={() => handleUpdate(author)}
            >
             Author Detail
            </button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        onConfirm={confirmDelete}
        loading={loading}
        deleteSuccess={deleteSuccess}
      />

      {/* Update Modal */}
      <div
        className={`fixed inset-0 z-50 ${updateModalOpen ? "block" : "hidden"}`}
        // onClick={() => setUpdateModalOpen(false)}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Update Author</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Image (leave empty to keep the existing image)
              </label>
              <input
                type="file"
                onChange={(e) => setAuthImage(e.target.files[0])}
                accept="image/*"
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={updatedAuthor.Gender}
                onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, Gender: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={updatedAuthor.decs}
                onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, decs: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={updatedAuthor.authDOB}
                onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, authDOB: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={updatedAuthor.imgAuth}
                onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, imgAuth: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <button className="mr-2 bg-green-500 text-white p-2 rounded" onClick={() => confirmUpdate()}>
                Update
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={() => setUpdateModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

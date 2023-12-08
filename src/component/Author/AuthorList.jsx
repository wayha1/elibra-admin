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
    Gender: "",
    decs: "",
    DOB: "",
    imgAuth: "",
  });

  const handleDelete = async (authorId, imageUrl) => {
    if (loading) return;
    setSelectedAuthor({ authorId, imageUrl });
    setDeleteSuccess(false);
    setShowModal(true);
  };

  const handleUpdate = (author) => {
    setUpdatedAuthor(author);
    setUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const authorRef = doc(db, "Author", selectedAuthor.authorId);

      // Update the document with the new data
      await setDoc(authorRef, updatedAuthor);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error updating document:", error.message);
    } finally {
      setLoading(false);
      setUpdateModalOpen(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const authorRef = doc(db, "Author", selectedAuthor.authorId);
      const imgRef = ref(imgDB, selectedAuthor.imageUrl);

      await deleteDoc(authorRef);
      await deleteObject(imgRef);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting document or image:", error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
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
              className="mr-2 bg-red-500 text-white active:bg-blue-500 p-2 rounded"
              onClick={() => handleDelete(author.id, author.imgAuth)}
            >
              Delete
            </button>
            <button
              className="bg-green-500 text-white p-2 active:bg-blue-500 rounded"
              onClick={() => handleUpdate(author)}
            >
              Update
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
      <Modal
        isOpen={updateModalOpen}
        closeModal={() => setUpdateModalOpen(false)}
        onConfirm={confirmUpdate}
        loading={loading}
      >
        <input
          type="text"
          value={updatedAuthor.authName}
          onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, authName: e.target.value })}
        />
        <button onClick={confirmUpdate}>Update Author</button>
      </Modal>
    </div>
  );
};

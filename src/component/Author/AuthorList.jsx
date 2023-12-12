import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db, imgDB } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";
import Modal from "./Modal";
import { LoadingProcess } from "../LoadingProcess/LoadingProcess";

export const AuthorList = () => {
  const [authorList, setAuthorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authImage, setAuthImage] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [authorDetailModalOpen, setAuthorDetailModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedAuthor, setUpdatedAuthor] = useState({
    authName: "",
    Decs: "",
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
    } catch (error) {
      console.error("Error deleting document or image:", error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleUpdate = (author) => {
    setUpdatedAuthor(author);
    setSelectedAuthor({
      id: author.id,
      authName: author.authName,
      Gender: author.Gender,
      Decs: author.Decs,
      authDOB: author.DOB,
      imgAuth: author.imgAuth,
    });
    setUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const authorRef = doc(db, "Author", selectedAuthor.id);
      console.log(selectedAuthor.id);
      const imgRef = ref(imgDB, selectedAuthor.imgAuth);

      if (authImage) {
        // Upload the new image
        const newImgRef = ref(imgDB, `WebsiteProject/AboutUs/${authImage.name + uuidv4()}`);
        await uploadBytes(newImgRef, authImage);
        const newImgUrl = await getDownloadURL(newImgRef);
        await deleteObject(imgRef);
        await updateDoc(authorRef, {
          authName: updatedAuthor.authName,
          Gender: updatedAuthor.Gender,
          Decs: updatedAuthor.Decs,
          authDOB: updatedAuthor.authDOB,
          imgAuth: newImgUrl,
        });
      } else {
        // Update the document without changing the image
        await updateDoc(authorRef, {
          authName: updatedAuthor.authName,
          Gender: updatedAuthor.Gender,
          Decs: updatedAuthor.Decs,
          authDOB: updatedAuthor.authDOB,
        });
      }
      setDeleteSuccess(true);
      alert("Update success");
    } catch (error) {
      console.error("Error updating document or image:", error.message);
    } finally {
      setLoading(false);
      setUpdateModalOpen(false);
    }
  };

  const handleAuthorDetail = (author) => {
    setUpdatedAuthor(author);
    setAuthorDetailModalOpen(true);
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
            <p>{author.DOB}</p>
          </div>
          <div className="ml-auto flex">
            <button
              className="mr-2 bg-green-500 text-white p-2 active:bg-blue-500 rounded-lg"
              onClick={() => handleUpdate(author)}
            >
              Update
            </button>
            <button
              className="mr-2 bg-red-500 text-white active:bg-blue-500 p-2 rounded-lg"
              onClick={() => handleDelete(author.id, author.imgAuth)}
            >
              Delete
            </button>
            <button
              className="mr-2 bg-gray-900 text-white p-2 active:bg-blue-500 rounded-lg"
              onClick={() => handleAuthorDetail(author)}
            >
              Author Detail
            </button>
          </div>
        </div>
      ))}
      {/* Delete Modal */}
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        onConfirm={confirmDelete}
        loading={loading}
        deleteSuccess={deleteSuccess}
      />
      {loading && <LoadingProcess />}

      {/* Update Modal */}
      <div className={`fixed inset-0 z-50 ${updateModalOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Update Author</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name :</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={updatedAuthor.authName}
                onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, authName: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Gender :</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={updatedAuthor.Gender}
                onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, Gender: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description :</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={updatedAuthor.Decs}
                onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, Decs: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={updatedAuthor.DOB}
                onChange={(e) => setUpdatedAuthor({ ...updatedAuthor, DOB: e.target.value })}
              />
            </div>
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

      {/* Author Detail Modal */}
      <div
        className={`fixed inset-0 z-50 ${authorDetailModalOpen ? "block" : "hidden"}`}
        // onClick={() => setAuthorDetailModalOpen(false)}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-xl mb-2">
            <h2 className="text-2xl font-bold mb-4">Author Detail</h2>
            <p className="flex text-xl font-bold ">
              Name:
              <p className="flex ml-4 text-gray-700 hover:text-sky-800">{updatedAuthor.authName}</p>
            </p>
            <p className="flex text-xl font-bold ">
              Gender: <p className="flex ml-4 text-gray-700">{updatedAuthor.Gender}</p>
            </p>
            <p className="flex text-xl font-bold ">
              Description:{" "}
              <p className="flex ml-4 text-gray-700 text-lg subpixel-antialiased	">{updatedAuthor.Decs}</p>
            </p>
            <p className="flex text-xl font-bold ">
              Date of Birth: <p className="flex ml-4 text-gray-700">{updatedAuthor.authDOB}</p>
            </p>
            <div className="flex w-full items-center justify-center ">
              <img src={updatedAuthor.imgAuth} className="w-[500px] h-[500px] border-4 " />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={() => setAuthorDetailModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

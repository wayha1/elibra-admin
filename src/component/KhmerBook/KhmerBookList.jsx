import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, imgDB } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { LoadingProcess } from "../LoadingProcess/LoadingProcess";

const KhmerBookList = () => {
  const [bacData, setBacData] = useState([]);
  const [NovelBook, setNovelBook] = useState([]);
  const [selectBook, setSelectBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [bookImage, setBookImage] = useState(null);
  const [bookDetailModalOpen, setBookDetailModalOpen] = useState(false);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    price: "",
    authorId: "",
    img: "",
  });
  const handleDelete = (bookId) => {
    if (loading) return;
    setSelectBook({ bookId });
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const bookRef = doc(db, "Books", "All_Genre", "Novel", selectBook.bookId);
      await deleteDoc(bookRef);
      setDeleteSuccess(true);
      alert("Delete Successful!!");
    } catch (error) {
      console.error("Error deleting document or image:", error.message);
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
    }
  };
  const handleUpdate = (book) => {
    setUpdatedBook(book);
    setUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const bookRef = doc(db, "Books", "All_Genre", "Novel", updatedBook.id);
      const newData = {
        title: updatedBook.title,
        price: updatedBook.price,
        authorId: updatedBook.authorId,
        img: updatedBook.img,
      };

      if (bookImage) {
        const newImgRef = ref(imgDB, `WebsiteProject/Books/${bookImage.name + uuidv4()}`);
        await uploadBytes(newImgRef, bookImage);
        const newImgUrl = await getDownloadURL(newImgRef);
        newData.img = newImgUrl;
      }

      await updateDoc(bookRef, newData);
      setUpdateSuccess(true); // Set updateSuccess to true on successful update
    } catch (error) {
      console.error("Error updating document or image:", error.message);
    } finally {
      setLoading(false);
      setUpdateModalOpen(false);
    }
  };

  const handleBookDetail = (bookId) => {
    setUpdatedBook(bookId);
    setBookDetailModalOpen(true);
  };

  useEffect(() => {
    const getBacData = async () => {
      try {
        const contain = collection(db, "Books");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val) => ({ ...val.data(), id: val.id }));
        setBacData(data);
        const bookDataPromises = data.map(async (elem) => {
          try {
            const BookPop = collection(db, `Books/${elem.id}/KhmerBook`);
            const DataBooks = await getDocs(BookPop);
            const BookData = DataBooks.docs.map((bookDoc) => ({
              ...bookDoc.data(),
              id: bookDoc.id,
            }));
            return BookData;
          } catch (error) {
            console.error(`Error fetching book data for ${elem.id}:`, error);
            return null;
          }
        });

        const bookData = (await Promise.all(bookDataPromises)).flatMap((data) => data || []);
        setNovelBook(bookData);
      } catch (error) {
        console.error("Error fetching popular section data:", error);
      }
    };
    getBacData();
  }, [deleteSuccess, selectBook.authorId]);
  return (
    <section>
      <div className="container w-auto">
        {NovelBook.map((item, index) => (
          <div key={index} className="flex items-center mb-4 p-4 bg-white rounded-lg ">
            <img src={item.img} alt={`Novel-${index}`} className="w-40 h-50" />
            <div className="flex ml-4 w-full">
              <div className="text-lg font-bold">
                <h1 className="">{item.title}</h1>
                <h3 className="">{item.price}</h3>
                <span>{item.authorId}</span>
              </div>
              <div className="ml-auto flex">
                <button
                  className="mr-2 bg-red-500 text-white active:bg-blue-500 p-2 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white p-2 active:bg-blue-500 rounded"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button
                  className="mr-2 bg-gray-900 text-white p-2 active:bg-blue-500 rounded-lg"
                  onClick={() => handleBookDetail(item.id)}
                >
                  Author Detail
                </button>
              </div>
            </div>
          </div>
        ))}
        {openDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={() => setOpenDeleteModal(false)}
            ></div>
            <div className="bg-white p-4 rounded-lg z-10">
              <p className="text-lg font-semibold mb-4">Confirm Delete</p>
              <p>Are you sure you want to delete this book?</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="mr-2 bg-red-500 text-white p-2 rounded"
                  onClick={() => {
                    confirmDelete();
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default KhmerBookList;

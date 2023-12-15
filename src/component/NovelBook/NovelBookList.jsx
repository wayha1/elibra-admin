import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const NovelBookList = () => {
  const [bacData, setBacData] = useState([]);
  const [NovelBook, setNovelBook] = useState([]);
  const [selectBook, setSelectBook] = useState({});
  // const [authorData, setAuthorData] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  useEffect(() => {
    const getBacData = async () => {
      try {
        const contain = collection(db, "Books");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val) => ({ ...val.data(), id: val.id }));
        setBacData(data);
        const bookDataPromises = data.map(async (elem) => {
          try {
            const BookPop = collection(db, `Books/${elem.id}/Novel`);
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
        console.log(NovelBook);
      } catch (error) {
        console.error("Error fetching popular section data:", error);
      }
    };
    getBacData();

    // // Moved fetchAuthorData outside of getBacData
    // const fetchAuthorData = async () => {
    //   try {
    //     const authorId = selectBook.authorId;
    //     const authorDoc = doc(db, "Authors", authorId);
    //     const authorSnapshot = await getDocs(authorDoc);
    //     const author = authorSnapshot.data();
    //     setAuthorData(author);
    //     console.log(authorData);
    //     console.log(authorId)
    //   } catch (error) {
    //     console.error("Error fetching author data:", error);
    //   }
    // };

    // Call fetchAuthorData if selectBook.authorId is defined
    // if (selectBook.authorId) {
    //   fetchAuthorData();
    // }
  }, [deleteSuccess, selectBook.authorId]);

  return (
    <section>
      <div className="container w-auto">
        {NovelBook.map((item, index) => (
          <div key={index} className="flex items-center mb-4 p-4 bg-white rounded-lg ">
            <img src={item.img} alt={`Novel-${index}`} className="w-40 h-50" />
            <div className="flex ml-4 w-full">
              <div className="text-lg font-bold">
                <h3 className="">{item.title}</h3>
                <p className="">{item.price}</p>
                <p>{item.authorId}</p>
              </div>
              <div className="ml-auto flex">
                <button
                  className="mr-2 bg-red-500 text-white active:bg-blue-500 p-2 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button className="bg-green-500 text-white p-2 active:bg-blue-500 rounded" onClick={() => {}}>
                  Update
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

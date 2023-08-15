import React, { useState, useEffect } from "react";
import { noCollections } from "../assets";
import { styles } from "../constants/index";
import axios from "axios";
import {
  deleteCollection,
} from "../services/services";
import Cookies from "js-cookie";
import { BASE_URL } from "../services/services";
import Modal from "./Modal";
import Orders from "./Orders";
import { TableCell } from "@mui/material";

const details = ["ID", "Collection name", "Product", "Action"];
const Collections = () => {
  // State to store the collections gotten from the API
  const [collections, setCollections] = useState([]);
  const [isVisible, setVisisble] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCollectionInfo, setCollectionInfo] = useState({
    collectionName: "",
    collectionImage: "",
  });
  const [reRender, setRender] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const token = Cookies.get("_tksr");
  const isVerified = Cookies.get("emailVerify");

  // Function to update the state to the next five or so collection details gotten from the API.
  const handleNext = () => {
    setCollections((prev) => {
      return (prev = [0, 2, 3]);
    });
  };

  const fetchCollections = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(`${BASE_URL}product/collections/list`, config);;
      
      setCollections(response.data.data);
      if (!response.statusText === "OK") return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [isVisible, reRender]);
  

  const handleCollectionSearch = (searchValue) => {
    // Logic for searching for a specific transaction history by setting the transaction history state to the data gotten from the API following the users prompt.
    // alert(searchValue);
  };

  // To add the collections to the backend
  async function handleAddCollection(event) {
    event.preventDefault();

    if(isVerified === false) {
      window.alert("You must verify your email before you can perform this action!");

      setModalContent("You must verify your email before you can perform this action!");
      setShowModal(true);
      // setFormData(initialState);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);

      return;
    }
    
    let collection = {
      name: newCollectionInfo.collectionName,
      image: newCollectionInfo.collectionImage,
    };

    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}product/collection`, collection, 
      { headers: { Authorization: `Bearer ${token}`} });
      console.log(res);
      if (!res.statusText === "OK") return;
      setCollectionInfo((prev) => {
        return (prev = { collectionName: "", collectionImage: "" });
      });
      setVisisble((prev) => !prev);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const toggleAddCollection = () => {
    if (isVisible === true) {
      setCollectionInfo((prev) => {
        return {
          collectionName: "",
          collectionImage: "",
        };
      });
    }

    setVisisble((prev) => {
      return (prev = !prev);
    });
  };

  const onImageSelected = (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images");
    let reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    async function uploadImg() {
      try {
        const res = await axios.post(
          "https://api.Cloudinary.com/v1_1/doqnvybu5/upload",
          formData
        );
        if (!res) {
          setLoading(true);
          return;
        } else {
          setLoading(false);
          const imageUri = res.data.secure_url;
          setCollectionInfo((prev) => {
            return {
              ...prev,
              collectionImage: imageUri,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    uploadImg();
  };

  const handleChange = (event) => {
    setCollectionInfo((prev) => {
      return {
        ...prev,
        collectionName: event.target.value,
      };
    });
  };

  const Children = ({ id, collectionName, product, no }) => {
    const deleteCollections = async () => {
      console.log(id);
      try {
        const res = await deleteCollection(id);
        console.log(res);
        setRender((prev) => (prev = !prev));
      } catch (err) {
        console.log(err);
      }
    };

    return ( 
      <>
        <TableCell>{no}</TableCell>
        <TableCell>{collectionName}</TableCell>
        <TableCell>
          <img src={product} alt="product" className="w-8 rounded h-8"/>
        </TableCell>
        <TableCell>
          <div
            className="flex h-auto mt-2 group hover:cursor-pointer "
            onClick={deleteCollections}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-3 mt-1 align-middle mr-1 fill-slate-300 group-hover:fill-slate-100"
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
            <p className="text-red-600 group-hover:text-red-200 text-sm">
              Delete collection
            </p>
          </div>
        </TableCell>
      </>
    );
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between mx-auto w-full mb-8">
        <p className="text-2xl text-black-800 font-bold my-auto">Collections</p>
        <span
          className="flex justify-between hover:opacity-50 cursor-pointer"
          onClick={toggleAddCollection}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="fill-blue-400 w-4 mx-1 h-4 my-auto"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <p className="text-blue-400 text-sm my-auto mx-1">
            Add new Collection
          </p>
        </span>
      </div>

      <Orders image={noCollections} infoHead={details} children={Children} data={collections} type={"Collections"} />

      <div
        className={
          isVisible
            ? "h-full w-full bg-red absolute top-0 right-0 "
            : "h-full w-full bg-red border -translate-x-full bg-slate-100 border-red-400 absolute top-0 right-0"
        }
      >
        <div className="h-full lg:w-1/3 w-3/4 bg-red shadow-2xl bg-white  absolute top-0 px-5 py-4 right-0">
          <span
            className="cursor-pointer text-2xl float-right block text-slate-300"
            onClick={toggleAddCollection}
          >
            x
          </span>

          <div className="mt-10 mx-auto align-center px-5">
            <p>Add new Collection</p>

            <h4 className="mt-5 text-sm">Collection Name</h4>
            <input
              className={`${styles.inputBox} w-full mt-1 px-3`}
              value={newCollectionInfo.collectionName}
              placeholder="Eg. Boots, Shoes..."
              type="text"
              onChange={handleChange}
            />

            <h4 className="mt-7 text-sm">Collection Image</h4>
            <input
              type="file"
              className="hidden"
              id="chooseImage"
              onChange={onImageSelected}
            />
            <label
              htmlFor="chooseImage"
              className={
                newCollectionInfo.collectionImage != ""
                  ? "invisible"
                  : "border border-slate-400 border-dotted text-blue-600 block w-full py-12 mt-1 text-center rounded text-sm"
              }
            >
              <span className="flex justify-between hover:opacity-50 cursor-pointer w-1/3 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="fill-blue-400 w-4 mx-1 h-4 my-auto"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                <p className="text-blue-400 text-sm my-auto mx-1">Add Image</p>
              </span>
            </label>

            <img
              alt="Image Chosen"
              className={
                newCollectionInfo.collectionImage === ""
                  ? "invisible"
                  : "block w-full h-30 rounded"
              }
              id="selected-image"
              src={newCollectionInfo.collectionImage}
            />

            <button
              className={`${
                loading ? "border p-4" : styles.button
              } mt-7 w-full ${
                newCollectionInfo.collectionName === ""
                  ? "opacity-50"
                  : "opacity-100"
              }`}
              onClick={handleAddCollection}
              disabled={loading}
            >
              {loading ? "Adding collection..." : "Add new collection"}
            </button>
          </div>
        </div>
      </div>
      {showModal && <Modal text={modalContent} showModal={true} />}
    </div>
  );
};

export default Collections;

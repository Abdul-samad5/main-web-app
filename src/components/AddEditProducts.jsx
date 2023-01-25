import React, { useState } from "react";
import { addProduct, updateProduct } from "../services/services";
import axios from "axios";

function AddEditProduct() {
  // Records if the user has clicked the toggle button in the last form element and accordingly records it
  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(false);

  const itemUnits = [
    "Box",
    "Pair",
    "Kg",
    "Pc",
    "Yard",
    "Cm",
    "Pack",
    "Dz",
    "G",
    "Ft",
    "lb",
    "Km",
    "In",
    "Mg",
  ];

  const [formData, setFormData] = useState({
    productTitle: "",
    productDesc: "",
    productImg: "",
    price: "",
    discountedPrice: "",
    costPrice: "",
    stockCount: 0,
    stockUnit: "",
    itemUnit: "",
    productCollections: 0,
    productStatus: "",
    storeTheme: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Method sets the isToggled state to the opposite of its current value
  const handleToggle = () => {
    setIsToggled((prevValue) => !prevValue);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    let product = {
      description: formData.productDesc,
      title: formData.productTitle,
      media: formData.productImg,
      price: formData.price,
      theme: formData.storeTheme,
      status: formData.status,
      collection: formData.status,
      color: formData.status,
      size: formData.size,
      item_unit: formData.itemUnit,
      stock_count: formData.stockCount,
      stock_keeping_unit: formData.stockUnit,
      cost_price: formData.costPrice,
      discounted_price: formData.discountedPrice,
    };

    try {
      const res = await addProduct(product);
      console.log(res);
      if (!res.statusText === "OK") return;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateProduct(event, id) {
    event.preventDefault();
    try {
      const res = await updateProduct(id);
      if (!res.statusText === "OK") return;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  // Gets Image selected by user and updates the selectedImage state to the url of the image selected.
  const onImageSelected = (event) => {
    const file = event.target.files[0];
    const formInfo = new FormData();
    formInfo.append("file", file);
    formInfo.append("upload_preset", "ktjtewmf");
    let reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    async function uploadImg() {
      try {
        const res = await axios.post(
          "https://api.Cloudinary.com/v1_1/doqnvybu5/upload",
          formInfo
        );
        if (!res) {
          setLoading(true);
          return;
        } else {
          setLoading(false);
          const imageUri = res.data.secure_url;
          setFormData((prev) => {
            return {
              ...prev,
              productImg: imageUri,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    uploadImg();
  };
  const deleteImage = () => {
    setFormData((prev) => {
      return {
        ...prev,
        productImg: "",
      };
    });
  };

  return (
    <div className="py-2 w-full">
      <div className="flex justify-between pl-3">
        <h1 className="lg:text-xl text-xl font-bold leading-7 text-black lg:text-left mt-2">
          Add/Edit Product
        </h1>

        <span>
          <button className="border border-blue-300 rounded-lg lg:px-8 py-2 px-4 mx-1 text-blue-300 bg-white">
            Preview
          </button>
          <button
            className="bg-blue-400 text-white rounded-lg lg:px-8 px-4 py-2.5 mx-1 text-sm"
            onClick={handleUpdateProduct}
          >
            Save Changes
          </button>
        </span>
      </div>

      {/* Contains the entire form the user has to fill to enter/edit a product. */}
      <form className="flex justify-between flex-col mt-4 lg:flex-row">
        <div className="lg:w-3/5 mx-3 w-full">
          <div className="px-3 py-5 bg-white-900 w-full h-auto shadow-lg mt-15 rounded-lg mb-4">
            <div>
              <h3 className="text-black opacity-50">Product title</h3>
              <input
                type="text"
                placeholder="Short dress"
                value={formData.productTitle}
                onChange={handleChange}
                name="productTitle"
                className="border w-full mt-1 lg:mt-2 border-slate-700 border-opacity-50 rounded-lg text-sm shadow-sm px-3 py-3 placeholder-slate-300"
              ></input>
            </div>

            <div className="mt-3 h-auto">
              <h3 className="text-black opacity-50 mb-2">
                Product Description
              </h3>
              <textarea
                placeholder="Black Shoulder"
                className="border border-slate-400 rounded w-full px-3 py-3 h-40 resize-none placeholder-slate-300"
                name="productDesc"
                onChange={handleChange}
                value={formData.productDesc}
              />
            </div>
          </div>

          <div className="px-3 pt-7 pb-10 bg-white-900 w-4/4 shadow-lg rounded-lg mb-4 ">
            <h3 className="text-black opacity-50 mb-5">Product media</h3>

            {/* For selecting and adding images of products */}
            <span className="flex justify-between lg:flex-row flex-col">
              <span>
                <img
                  alt="Image Chosen"
                  className={
                    formData.productImg === ""
                      ? "block w-1/2 invisible"
                      : "block w-1/2 h-full"
                  }
                  id="selected-image"
                  src={formData.productImg === "" ? "" : formData.productImg}
                />

                {/* Displays when an image is selected and enable the user to delete already selected image */}
                <div
                  className={
                    formData.productImg === ""
                      ? "flex invisible"
                      : "flex h-auto mt-2 group hover:cursor-pointer w-auto"
                  }
                  onClick={deleteImage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-3 mt-1 align-middle mr-1"
                  >
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                  </svg>
                  <p className="text-red-600 group-hover:text-red-200 text-sm">
                    Delete Image
                  </p>
                </div>
              </span>

              <input
                type="file"
                id="image-selector"
                className="invisible border-dashed border-blue-500 border-2 rounded-md block border-black-500 bg-white"
                accept="image/*"
                onChange={onImageSelected}
              ></input>
              <label
                htmlFor="image-selector"
                className="border-2 border-dotted border-blue-600 text-blue-600 py-10 w-1/2 text-center rounded text-sm"
              >
                Add Image
              </label>
            </span>

            {/* Drag files to upload.*/}
            {/* <div 
                className='w-full h-full border-2 py-12 border-dotted border-black-200 rounded'>
                <p className='text-center text-black-black-200'>Drag files here to upload</p>
            </div> */}
          </div>

          <div className="px-3 py-6 bg-white-900 w-full h-auto shadow-lg mt-15 rounded-lg mb-4">
            <h3 className="text-black opacity-50 mb-5">Product pricing</h3>

            <div className="flex jusify-between flex-col lg:flex-row w-full mt-2">
              <span className="flex flex-col lg:w-1/2 w-full">
                <label className="lg:text-base text-sm">Price</label>
                <input
                  type="text"
                  placeholder="2000.00"
                  value={formData.price}
                  name="price"
                  onChange={handleChange}
                  className=" border border-slate-700 border-opacity-50 lg:mr-2 rounded-lg text-sm shadow-sm pl-8 pr-3 py-3 placeholder-slate-300"
                ></input>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 relative bottom-8 left-2 fill-gray-500"
                >
                  <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
                </svg>
              </span>

              <span className="flex-col flex w-full block lg:w-1/2 mt-3 lg:mt-0">
                <label className="lg:text-base text-sm lg:ml-3">
                  Discounted Price
                </label>
                <input
                  type="text"
                  placeholder="1500.00"
                  value={formData.discountedPrice}
                  name="discountedPrice"
                  onChange={handleChange}
                  className="border border-slate-700 border-opacity-50 lg:ml-2 rounded-lg text-sm shadow-sm pl-8 pr-3  py-3 placeholder-slate-300"
                ></input>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 fill-gray-500 hidden lg:block relative left-20 translate-x-60 lg:translate-x-56 lg:left-5 bottom-8 peer"
                >
                  <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 left-3 relative lg:bottom-12 bottom-8 lg:left-4 fill-gray-500 right-10"
                >
                  <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
                </svg>

                <div className="absolute peer-hover:block hidden lg:top-[740px] w-1/2 lg:left-[390px] z-10 w-64 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-slate-600 text-sm py-3 px-3">
                    Discounted price is required only when there is an ongoing
                    sale or a discount to be given to your customers.
                  </p>
                </div>
              </span>
            </div>

            <div className="flex flex-col w-full mt-4 lg:mt-0">
              <label className="lg:text-base text-sm">Cost Price</label>
              <input
                type="text"
                placeholder="1500.00"
                value={formData.costPrice}
                name="costPrice"
                onChange={handleChange}
                className="border border-slate-700 border-opacity-50 rounded-lg text-sm shadow-sm pl-8 pr-3 py-3 placeholder-slate-300"
              ></input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4 relative bottom-8 left-2 fill-gray-500"
              >
                <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
              </svg>
            </div>
          </div>

          <div className="px-3 py-6 bg-white-900 w-full h-auto shadow-lg mt-15 rounded-lg mb-4">
            <h3 className="text-black opacity-50 mb-5">Product Inventory</h3>

            <div className="flex jusify-between flex-col lg:flex-row w-full mt-2">
              <span className="flex flex-col w-full lg:w-1/2">
                <label className="lg:text-base text-sm">Stock Count</label>
                <input
                  type="text"
                  placeholder="E.g. 15"
                  value={formData.stockCount}
                  name="stockCount"
                  onChange={handleChange}
                  className=" border border-slate-700 lg:mr-2 border-opacity-50 rounded-lg text-sm shadow-sm px-3 py-3 placeholder-slate-300"
                ></input>
              </span>

              <span className="flex flex-col w-full lg:w-1/2 mt-3 lg:mt-0">
                <label className="lg:text-base text-sm">
                  Stock Keeping Unit (SKU)
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="stockUnit"
                  value={formData.stockUnit}
                  className="border border-slate-700 lg:ml-2 border-opacity-50 rounded-lg text-sm shadow-sm px-3 py-3 placeholder-slate-300"
                ></input>
              </span>
            </div>

            <div className="flex flex-col w-full mt-4">
              <label className="lg:text-base text-sm">Item Unit</label>
              <select
                name="itemUnit"
                value={formData.itemUnit}
                onChange={handleChange}
                className="border border-slate-700 border-opacity-50 rounded-lg text-sm shadow-sm px-3 py-3 placeholder-slate-300"
              >
                {itemUnits.map((item, index) => (
                  <option
                    key={index}
                    className="hover:bg-red-700 list-none"
                    value={index + 1}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="px-3 py-6 bg-white-900 w-full h-auto shadow-lg mt-15 rounded-lg mb-4">
            <h3 className="text-black opacity-50 mb-2">Product Options</h3>

            <div className="flex jusify-between w-full">
              <p className="text-sm opacity-50 w-1/2">
                This product has of size, color, etc.
              </p>
              <span className="w-1/2 align-right flex justify-end">
                <div
                  className={
                    isToggled
                      ? "w-10 h-5 bg-yellow-100 rounded-2xl"
                      : "w-10 h-5 bg-gray-100 rounded-2xl"
                  }
                  onClick={handleToggle}
                >
                  <div
                    className={
                      isToggled
                        ? "rounded-full bg-yellow-800 h-full w-1/2 opacity-100 translate-x-full"
                        : "rounded-full bg-gray-800 h-full w-1/2 opacity-100"
                    }
                  ></div>
                </div>
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-2/5 mx-3 w-full">
          {/* Product Collections Input Box */}
          <div className="px-4 py-7 bg-white-900 w-full shadow-xl rounded-lg mb-4">
            <h3 className="text-black opacity-50 mb-5">Product Collections</h3>
            <input
              type="text"
              name="productCollections"
              value={formData.productCollections}
              onChange={handleChange}
              placeholder="E.g. Shoes, Boots..."
              className="border border-slate-700 border-opacity-50 mr-2 w-full rounded-lg text-sm shadow-sm px-3 py-3 placeholder-slate-300"
            ></input>
          </div>

          {/* Product Status Input Box */}
          <div className="px-4 py-7 bg-white-900 w-full shadow-xl rounded-lg mb-4">
            <h3 className="text-black opacity-50 mb-5">Product Status</h3>
            <select
              name="productStatus"
              onChange={handleChange}
              value={formData.productStatus}
              className="border border-slate-700 border-opacity-50 w-full rounded-lg text-sm shadow-sm px-3 py-3 placeholder-slate-300"
            >
              <option>Active</option>
              <option>Draft</option>
              <option>Archive</option>
            </select>
            <p className="mt-2 opacity-50">
              Your product status would show if your product is live or in draft
            </p>
          </div>

          {/* Store Theme Input Box */}
          <div className="px-4 py-7 bg-white-900 w-full shadow-xl rounded-lg mb-4">
            <h3 className="text-black opacity-50 mb-5">Store Theme</h3>
            <select
              name="storeTheme"
              onChange={handleChange}
              value={formData.storeTheme}
              className="border border-slate-700 border-opacity-50 w-full rounded-lg text-sm shadow-sm px-3 py-3 placeholder-slate-300"
            >
              <option>Default Theme</option>
              <option>Go to theme settings</option>
            </select>
            <p className="mt-2 opacity-50">
              Choose any template you would love to be displayed on your store
            </p>
          </div>
        </div>
      </form>

      {/* Submit button of the entire form. */}
      <div className="w-full flex justify-center">
        <input
          type="button"
          value="Save"
          disabled={loading ? true : false}
          className="bg-blue-400 rounded-lg px-9 text-white text-sm py-2"
          onClick={handleSubmit}
        ></input>
      </div>
    </div>
  );
}

export default AddEditProduct;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "../constants/index";
import { BASE_URL, getStoreInfo } from "../services/services";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";

const StoreDetails = () => {
  const [storeDetails, setStoreDetails] = useState({
    storeName: "",
    tagLine: "",
    storeDesc: "",
    storeLogo: "",
    storeCurrency: "Naira",
    storeEmail: "",
    storeContactNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const tk = Cookies.get("_tksr");
  const id = Cookies.get("_id");

  const saveSettings = async () => {
    let formDetails = {
      store_name: storeDetails.storeName,
      tag_line: storeDetails.tagLine,
      store_description: storeDetails.storeDesc,
      store_logo: storeDetails.storeLogo,
      store_currency: storeDetails.storeCurrency,
      store_email: storeDetails.storeEmail,
      store_phone_number: storeDetails.storeContactNumber,
    };

    try {
      const res = await axios.put(
        `${BASE_URL}store_settings/store/update/${id}/`,
        formDetails,
        { headers: { Authorization: `Bearer ${tk}` } }
      );
      if (!res.statusText === "OK") return;
      console.log(res);
      makeEmpty();
    } catch (error) {
      console.log(error);
    }
  };

  function makeEmpty() {
      setStoreDetails((prev) => {
        return { ...prev, 
          store_name: "",
          tag_line: "",
          store_description: "",
          store_logo: "",
          store_currency: "Naira",
          store_email: prev.storeEmail,
          store_phone_number: "" };
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStoreDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectedImage = (event) => {
    const file = event.target.files[0];
    const formInfo = new FormData();
    formInfo.append("file", file);
    formInfo.append('upload_preset', 'images');

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
          setStoreDetails((prev) => {
            return {
              ...prev,
              storeLogo: imageUri,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    uploadImg();
    // setStoreDetails((prev) => {
    //   return {
    //     ...prev,
    //     storeLogo: imageUri,
    //   };
    // });
  };

  function handleSubmit(event) {
    event.preventDefault();
    saveSettings();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}store_settings/store/${id}`, { headers: { Authorization: `Bearer ${tk}`} });
        if (response) {
          const data = response.data.data;
          // const store_name = response.data["Store Details"].length === 0 ? "" : response.data["Store Details"][0].store_name;
          // const store_email = response.data["Email"];
          setStoreDetails((prev) => {
            return { ...prev, 
              storeName: data.store_name, 
              storeEmail: data.store_email,
              tagLine: data.tag_line,
              storeDesc: data.store_description,
              storeLogo: data.store_logo,
              storeCurrency: "Naira",
              storeContactNumber: data.store_phone_number
            };
          });
        }
        // console.log(response);
        if(!response.statusText === "OK") return;
      } catch(err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <p className={`${styles.componentHeader}`}>Store Settings</p>
      <div className="overflow-hidden w-full shadow-2xl">
        <form
          className="rounded shadow-2xl w-full pl-10 pr-3 py-3 mx-auto my-auto h-auto"
          onSubmit={handleSubmit}
        >
          <p className="text-sm text-brand-primary">Store details</p>

          <div className="my-5 flex jusfity-between">
            <span className="w-1/2">
              <p className="mb-1">Store name</p>
              <input
                placeholder="Michelline"
                onChange={handleChange}
                value={storeDetails?.storeName}
                className={`${styles.inputBox} px-3 w-11/12`}
                type="text"
                name="storeName"
              />
            </span>

            <span className="w-1/2">
              <p className="mb-1">Tag line</p>
              <input
                className={`${styles.inputBox} px-3 w-11/12`}
                onChange={handleChange}
                value={storeDetails.tagLine}
                type="text"
                name="tagLine"
              />
            </span>
          </div>

          <div className="my-6 flex jusfity-between">
            <span className="w-1/2">
              <p className="mb-1">Short description</p>
              <textarea
                placeholder="Enter your business description here..."
                maxLength="100"
                className="border border-slate-200 rounded-lg w-11/12 px-5 py-3 h-40 resize-none placeholder-slate-300"
                name="storeDesc"
                value={storeDetails.storeDesc}
                onChange={handleChange}
              />

              <div className="relative flex left-3/4 bottom-10">
                <span className="text-xs text-slate-300">
                  {storeDetails.storeDesc === null ? 0 : storeDetails.storeDesc?.length }
                </span>
                <span className="text-xs text-slate-300">/100</span>
              </div>
            </span>

            <span className="w-1/2">
              <p className="mb-1">Store logo</p>
              <input
                type="file"
                id="image-selector"
                className="invisible hidden"
                accept="image/*"
                onChange={handleSelectedImage}
              ></input>
              <label
                htmlFor="image-selector"
                className={
                  storeDetails.storeLogo === ""
                    ? "border border-dotted border-slate-300 text-slate-300 h-40 pt-16 block w-11/12 text-center rounded-lg text-sm"
                    : "hidden"
                }
              >
                Choose Image
              </label>

              <img
                src={storeDetails.storeLogo}
                className={
                  storeDetails.storeLogo === ""
                    ? "hidden"
                    : "border border-dotted border-slate-300 text-slate-300 h-40 block w-11/12 text-center rounded-lg text-sm"
                }
              />
            </span>
          </div>

          <div className="flex justify-between my-6">
            <span className="w-1/3">
              <p className="mb-1">Store currency</p>
              {/* <select
                name="storeCurrency"
                className={`${styles.inputBox} px-3 w-11/12`}
                value={storeDetails.storeCurrency}
                onChange={handleChange}
              >
                <option>Nigerian naira</option>
              </select> */}
              <input
                // placeholder="Nigerian"
                onChange={handleChange}
                disabled={true}
                value={storeDetails.storeCurrency}
                className={`${styles.inputBox} px-3 w-11/12`}
                type="text"
                name="storeCurrency"
              />
            </span>

            <span className="w-1/3">
              <p className="mb-1">Store email</p>
              <input
                placeholder="Enter store email"
                name="storeEmail"
                disabled={storeDetails.storeEmail ? true : false}
                className={`${styles.inputBox} px-3 w-11/12`}
                value={storeDetails.storeEmail}
                onChange={handleChange}
                type="text"
              />
            </span>

            <span className="w-1/3">
              <p className="mb-1">Store contact number</p>
              <input
                placeholder="Enter store contact number"
                name="storeContactNumber"
                className={`${styles.inputBox} px-3 w-11/12`}
                type="text"
                value={storeDetails.storeContactNumber}
                onChange={handleChange}
              />
            </span>
          </div>

          <div className="w-full flex justify-end">
            <input
              type="submit"
              className={`${styles.button} mr-6`}
              value="Save settings"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default StoreDetails;

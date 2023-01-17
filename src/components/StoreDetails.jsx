import axios from "axios";
import React, { useContext } from "react";
import { styles } from "../constants/index";
import { BASE_URL } from "../services/services";
import { UserContext } from "../context/UserContext";

const StoreDetails = () => {
  const str = localStorage.getItem("data");
  const data = JSON.parse(str);
  const [storeDetails, setStoreDetails] = React.useState({
    storeName: "",
    tagLine: "",
    storeDesc: "",
    storeLogo: "",
    storeCurrency: "",
    storeEmail: data.email,
    storeContactNumber: "",
  });

  const { userData } = useContext(UserContext);

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
      const res = await axios.post(
        `${BASE_URL}store_settings/store`,
        formDetails,
        { headers: { Authorization: `Bearer ${userData.access}` } }
      );
      if (!res.statusText === "OK") return;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
    const selectedFilesArray = Array.from(event.target.files);

    const imageUri = URL.createObjectURL(selectedFilesArray[0]);
    setStoreDetails((prev) => {
      return {
        ...prev,
        storeLogo: imageUri,
      };
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    saveSettings();
  }

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
                value={storeDetails.storeName}
                className={`${styles.inputBox} px-3 w-11/12`}
                type="text"
              />
            </span>

            <span className="w-1/2">
              <p className="mb-1">Tag line</p>
              <input
                className={`${styles.inputBox} px-3 w-11/12`}
                onChange={handleChange}
                value={storeDetails.tagLine}
                type="text"
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
                  {storeDetails.storeDesc.length}
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
              <select
                name="storeCurrency"
                className={`${styles.inputBox} px-3 w-11/12`}
                value={storeDetails.storeCurrency}
                onChange={handleChange}
              >
                <option>Nigerian naira</option>
              </select>
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

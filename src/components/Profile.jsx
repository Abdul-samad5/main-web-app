import React, { useState } from "react";
import { styles } from "../constants";
import { camera } from "../assets";
import usePostImg from "../hooks/usePostImage";
import { getStoreInfo } from "../services/services";
import { useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import Cookies from "js-cookie";
import { BASE_URL } from "../services/services";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showButton, setShowButton] = useState(null);
  const tk = Cookies.get("_tksr");
  const id = Cookies.get("_id");
  const [profileData, setProfileData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    profileImage: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function changeMessage(status) {
    if (status === 200 || status === 201) {
      setModalContent("Settings saved!");
    }
    if (status === 401) {
      setModalContent("Email or Password Incorrect!");
    }
    if (status >= 400) {
      setModalContent(
        "There might be a problem with your Internet Connection! Please try again"
      );
    }
  }

  const saveSettings = async () => {
    // let formDetails = {
    //   store_name: storeDetails.storeName,
    //   tag_line: storeDetails.tagLine,
    //   store_description: storeDetails.storeDesc,
    //   store_logo: storeDetails.storeLogo,
    //   store_currency: storeDetails.storeCurrency,
    //   store_email: storeDetails.storeEmail,
    //   store_phone_number: storeDetails.storeContactNumber,
    // };

    // try {
    //   const res = await axios.put(
    //     `${BASE_URL}store_settings/store/update/${id}/`,
    //     formDetails,
    //     { headers: { Authorization: `Bearer ${tk}` } }
    //   );
    //   if (!res.statusText === "OK") return;
    //   console.log(res);
    //   changeMessage(res.status);
       
    //   setShowModal(true);
    //   setTimeout(() => {
    //     setShowModal(false);
    //   }, 1500);
    //   makeEmpty();
    // } catch (error) {
    //   console.log(error);
    //   changeMessage(res.status);
       
    //   setShowModal(true);
    //   setTimeout(() => {
    //     setShowModal(false);
    //   }, 1500);
    //   makeEmpty();
    // }
  };

  function makeEmpty() {
      setStoreDetails((prev) => {
        return { ...prev, 
                fullName: "",
                emailAddress: "",
                phoneNumber: "",
                profileImage: "",};
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    saveSettings();
  };

  //   const { loading, data, postImg } = usePostImg();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];

    async function postImg() {
      const formInfo = new FormData();
      formInfo.append("file", file);
      formInfo.append("upload_preset", "images");

      try {
        const res = await axios.post(
          "https://api.Cloudinary.com/v1_1/doqnvybu5/upload",
          formInfo
        );
        if (!res) {
          setLoading(false);
          return;
        } else {
          // setLoading(false);
          const imageUri = res.data.secure_url;
          setProfileData((prev) => {
            return { ...prev, profileImage: imageUri };
          });
          // setData(imageUri);
        }
      } catch (error) {
        console.log(error);
      }
    }
    postImg();
  };

  useEffect(() => {
    async function fetchData() {
      // const response = await getStoreInfo();
      const response = await axios.get(`${BASE_URL}store_settings/store_details`, { headers: { Authorization: `Bearer ${tk}`} });
      const full_name = response.data.data["store_name"];
      const email = response.data.data["store_email"];
      const profileLogo = response.data.data["store_logo"];
      const phone = response.data.data["store_phone_number"];

      console.log(response);

      setProfileData((...prev) => {
        return { ...prev, fullName: full_name, emailAddress: email, profileImage: profileLogo, phoneNumber: phone };
      });
    }
    fetchData();
  }, []);
  
  return (
    <div className="px-6 py-4">
      <p className="text-sm opacity-50">
        Setup, view, and edit your personal information.
      </p>

      <form className="mt-8" onSubmit={handleSubmit}>
        <span className="my-5 block">
          <div
            className={
              profileData.profileImage === ""
                ? "rounded-full w-[150px] h-[150px] bg-gray-600 "
                : "hidden"
            }
          ></div>
          <img
            src={
              profileData.profileImage === "" ? "" : profileData.profileImage
            }
            alt=""
            className={
              profileData.profileImage === ""
                ? "hidden"
                : "rounded-full w-[150px] h-[150px]"
            }
          />
          <input
            type="file"
            accept="image/*"
            id="image-selector"
            className="hidden"
            onChange={handleImageSelect}
          />
          <label
            htmlFor="image-selector"
            className="flex item-center px-2 py-2 rounded-full block w-fit bottom-9 left-[100px] bg-white relative"
          >
            <img src={camera} alt="" className="w-4 h-4" />
          </label>
        </span>

        <span className="my-5 block">
          <label htmlFor="fullName" className="text-sm block mb-2">
            Full name
          </label>
          <input
            type="text"
            className={`${styles.inputBox} w-3/4 px-3`}
            name="fullName"
            placeholder="Enter your full name"
            value={profileData.fullName}
            onChange={handleChange}
          />
        </span>

        <span className="my-5 block">
          <label htmlFor="emailAddress" className="text-sm block mb-2">
            Email Address
          </label>
          <input
            type="text"
            className={`${styles.inputBox} w-3/4 px-3`}
            name="emailAddress"
            placeholder="Enter new password"
            value={profileData.emailAddress}
            onChange={handleChange}
          />
        </span>

        <span className="my-5 block">
          <label htmlFor="phoneNumber" className="text-sm block mb-2">
            Phone Number
          </label>
          <input
            type="text"
            className={`${styles.inputBox} w-3/4 px-3`}
            name="phoneNumber"
            placeholder="Enter phone number"
            value={profileData.phoneNumber}
            onChange={handleChange}
          />
        </span>

        <div className="flex justify-end w-3/4">
          <input
            type="submit"
            className={`${styles.button}`}
            value="Save Changes"
            // disabled={loading ? true : false}
          />
        </div>
      </form>
      {showModal && <Modal text={modalContent} showButton={showButton} />}
    </div>
  );
};

export default Profile;

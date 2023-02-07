import React, { useContext, useEffect } from "react";
import { styles } from "../constants/index";
import axios from "axios";
import { facebook, instagram } from "../assets";
import { BASE_URL, getStoreInfo } from "../services/services";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";

const WebsiteSettings = () => {
  const [websiteSettings, setWebsiteSettings] = React.useState({
    storeURL: "",
    facebookUsername: "",
    instagramUsername: "",
  });

  const tk = Cookies.get("_tksr");
  const id = Cookies.get("_id");

  async function handleSubmit(event) {
    event.preventDefault();

    let formDetails = {
      store_url: websiteSettings.storeURL,
      facebook_url: websiteSettings.facebookUsername,
      instagram_url: websiteSettings.instagramUsername,
    };

    try {
      // const res = await axios.put(
      //   `${BASE_URL}store_settings/website/update/${id}/`,
      //   formDetails,
      //   { headers: { Authorization: `Bearer ${tk}` } }
      // );
      const res = await axios.post(
        `${BASE_URL}store_settings/website/`,
        formDetails,
        { headers: { Authorization: `Bearer ${tk}` } }
      );
      if (!res.statusText === "OK") return;
      console.log(res);
      setWebsiteSettings((prev) => {
        return {
          ...prev,
          storeURL: "",
          facebookUsername: "",
          instagramUsername: "",
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setWebsiteSettings((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}store_settings/website/${id}`, { headers: { Authorization: `Bearer ${tk}`} });
        console.log(response);

        setWebsiteSettings((prev) => {
          return { ...prev, 
            storeURL: response.data.store_url, 
            facebookUsername: response.data.facebook_url, 
            instagramUsername: response.data.instagram_url 
          };
        });
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
          className="rounded shadow-2xl w-full px-4 py-4 h-auto"
          onSubmit={handleSubmit}
        >
          <p className="text-sm text-brand-primary">Website settings</p>

          <div className="my-8">
            <p>Store URL</p>
            <input
              disabled={websiteSettings.storeURL === "" ? false : true}
              type="text"
              className={`${styles.inputBox} w-full mt-1 px-3`}
              onChange={handleChange}
              value={websiteSettings.storeURL}
              name="storeURL"
            />
          </div>

          <div className="my-8">
            <p>Facebook username</p>
            <input
              type="text"
              className={`${styles.inputBox} w-full mt-1 pl-10 pr-3`}
              onChange={handleChange}
              value={websiteSettings.facebookUsername}
              name="facebookUsername"
            />
            <img
              src={facebook}
              alt=""
              className="relative w-4 h-4 bottom-8 left-3"
            />
          </div>

          <div className="my-8">
            <p>Instagram username</p>
            <input
              type="text"
              className={`${styles.inputBox} w-full mt-1 pl-10 pr-3`}
              onChange={handleChange}
              value={websiteSettings.instagramUsername}
              name="instagramUsername"
            />
            <img
              src={instagram}
              alt=""
              className="relative w-4 h-4 bottom-8 left-3"
            />
          </div>

          <div className="w-full flex justify-end">
            <input type="submit" className={`${styles.button}`} value="Save" />
          </div>
        </form>
      </div>
    </>
  );
};

export default WebsiteSettings;

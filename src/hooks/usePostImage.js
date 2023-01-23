import { useState, useEffect } from "react";
import axios from "axios";

const usePostImg = () => {
  // Stores a boolean as axios tries to retrieve the data from the API endpoint.
  const [loading, setLoading] = useState(true);

  // Stores the the data - products in this case - axios gets from the database.
  const [data, setData] = useState("");

  async function postImg(file) {
    const formInfo = new FormData();
    formInfo.append("file", file);
    formInfo.append("upload_preset", "images");

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
        setData(imageUri);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { loading, data, postImg };
};

export default usePostImg;

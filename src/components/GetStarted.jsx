import { useState, useEffect } from "react";
import { styles } from "../constants";

const GetStarted = ({ handleClick }) => {
  const [formData, setFormData] = useState({
    bestDescription: "",
    industry: "",
  });

  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    console.dir(e.target);
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "radio" ? checked : value,
      };
    });
  }

  return (
    <div className="w-full mb-20">
      <form>
        {/* {Slide 0} */}
        <div className="text-center max-w-[700px] mx-auto">
          <h1 className="text-[36px] font-bold mb-8">Let's help create your store beautifully</h1>
          <p className="leading-[1.3] text-[20px] mb-8">
            Answer a few questions to get started on your store creation/customization with our
            tools specially made for you.
          </p>
          <button type="button" className={`${styles.button}`}>
            Get started now
          </button>
        </div>

        {/* {Slide 1} */}
        <div className="text-center">
          <p className="font-normal text-[14px] mb-4">Step 1 of 4</p>
          <h2 className={`${styles.stepFormHeading}`}>Which best describes you?</h2>
          <div className={`${styles.stepFormHBox}`}>
            <div className={`${styles.radioLabel}`}>
              <input
                type="radio"
                name="bestDescription"
                id="newBusiness"
                onChange={handleChange}
                checked={formData.bestDescription}
                value="New business"
              />
              <label htmlFor="newBusiness" className="font-normal text-[16px]">
                I am a new business owner
              </label>
            </div>
            <div className={`${styles.radioLabel2}`}>
              <input
                type="radio"
                name="bestDescription"
                id="existingBusiness"
                onChange={handleChange}
                checked={formData.bestDescription}
                value="Exisitig business"
              />
              <label htmlFor="existingBusiness" className="font-normal text-[16px]">
                I have a business already
              </label>
            </div>
          </div>
          <div className={`${styles.skipNext}`}>
            <button type="button" className="text-brand-gray text-[14px] font-normal">
              Skip
            </button>
            <button type="button" className={`${styles.button}`}>
              Next
            </button>
          </div>
        </div>

        {/* {Slide 2} */}
        <div className="text-center">
          <p className="font-normal text-[14px] mb-4">Step 2 of 4</p>
          <h2 className={`${styles.stepFormHeading}`}>What industry are you in?</h2>
          <div className={`${styles.stepFormVBox}`}>
            <div className={`${styles.radioGroup}`}>
              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="artsPhotography"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Arts and Photography"
                />
                <label htmlFor="artsPhotography" className="font-normal text-[16px]">
                  Arts and Photography
                </label>
              </div>
              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="automobile"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Automobile"
                />
                <label htmlFor="automobile" className="font-normal text-[16px]">
                  Automobile
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="booksMagazines"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Books and Magazines"
                />
                <label htmlFor="booksMagazines" className="font-normal text-[16px]">
                  Books and Magazines
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="charityCause"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Charities and Cause"
                />
                <label htmlFor="charityCause" className="font-normal text-[16px]">
                  Charities and Cause
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="constructionIndustrial"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Construction and Industrial"
                />
                <label htmlFor="constructionIndustrial" className="font-normal text-[16px]">
                  Construction and Industrial
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="crafts"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Crafts"
                />
                <label htmlFor="crafts" className="font-normal text-[16px]">
                  Crafts
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="designMarketing"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Design and Marketing"
                />
                <label htmlFor="designMarketing" className="font-normal text-[16px]">
                  Design and Marketing
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="educationLearning"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Education and Learning"
                />
                <label htmlFor="educationLearning" className="font-normal text-[16px]">
                  Education and Learning
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="fashionApparel"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Fashion and Apparel"
                />
                <label htmlFor="fashionApparel" className="font-normal text-[16px]">
                  Fashion and Apparel
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="flowersCollectibles"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Flowers, Gifts and Collectibles"
                />
                <label htmlFor="flowersCollectibles" className="font-normal text-[16px]">
                  Flowers, Gifts and Collectibles
                </label>
              </div>
            </div>

            {/* {Second Half} */}
            <div className={`${styles.radioGroup2}`}>
              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="home"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="home and furniture"
                />
                <label htmlFor="home" className="font-normal text-[16px]">
                  Home and Furniture
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="jewelry"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Jewelry"
                />
                <label htmlFor="jewelry" className="font-normal text-[16px]">
                  Jewelry
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="music"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Music"
                />
                <label htmlFor="music" className="font-normal text-[16px]">
                  Music
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="petsCare"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Pets and Pet care"
                />
                <label htmlFor="petsCare" className="font-normal text-[16px]">
                  Pets and Pet care
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="softwareTechnology"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Software and Technology"
                />
                <label htmlFor="softwareTechnology" className="font-normal text-[16px]">
                  Software and Technology
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="sportsRecreations"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Sports and Recreations"
                />
                <label htmlFor="sportsRecreations" className="font-normal text-[16px]">
                  Sports and Recreations
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="stationerySupplies"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Stationery and Office supplies"
                />
                <label htmlFor="stationerySupplies" className="font-normal text-[16px]">
                  Stationery and Office supplies
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="templatesPrintables"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Templates and Printables"
                />
                <label htmlFor="templatesPrintables" className="font-normal text-[16px]">
                  Templates and Printables
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="travelLeisure"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Travel and Leisure"
                />
                <label htmlFor="travelLeisure" className="font-normal text-[16px]">
                  Travel and Leisure
                </label>
              </div>

              <div className={`${styles.radioLabel3}`}>
                <input
                  type="radio"
                  name="industry"
                  id="healthBeauty"
                  onChange={handleChange}
                  checked={formData.industry}
                  value="Health and Beauty"
                />
                <label htmlFor="healthBeauty" className="font-normal text-[16px]">
                  Health and Beauty
                </label>
              </div>
            </div>
          </div>
          <div className={`${styles.skipNext}`}>
            <button type="button" className="text-brand-gray text-[14px] font-normal">
              Skip
            </button>
            <button type="button" className={`${styles.button}`}>
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetStarted;

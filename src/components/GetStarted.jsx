import { useState, useEffect } from "react";
import { styles } from "../constants";

function DescRadio({ id, value, handleChange, formData }) {
  return (
    <div className={`${styles.radioLabel3}`}>
      <input
        type="radio"
        name="industry"
        id={id}
        onChange={handleChange}
        checked={formData.industry}
        value={value}
      />
      <label htmlFor={id} className="font-normal text-[16px]">
        {value}
      </label>
    </div>
  );
}

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
              <DescRadio
                id="artsPhotography"
                value="Arts and Photography"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="automobile"
                value="Automobile"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="booksMagazines"
                value="Books and Magazines"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="charitiesCause"
                value="Charities and Cause"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="constructionIndustrial"
                value="Construction and Industrial"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="crafts"
                value="Crafts"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="designMarketing"
                value="Design and Marketing"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="educationLearning"
                value="Education and Learning"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="fashionApparel"
                value="Fashion and Apparel"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="flowersCollectibles"
                value="Flowers, Gifts and Collectibles"
                formData={formData}
                handleChange={handleChange}
              />
            </div>

            {/* {Second Half} */}
            <div className={`${styles.radioGroup2}`}>
              <DescRadio
                id="homeFurniture"
                value="Home and Furniture"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="jewelry"
                value="Jewelry"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio id="music" value="Music" formData={formData} handleChange={handleChange} />
              <DescRadio
                id="petsCare"
                value="Pets and Pet care"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="softwareTechnology"
                value="Software and Technology"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="sportsRecreations"
                value="Sports and Recreations"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="stationerySupplies"
                value="Stationery and Office supplies"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="templatesPrintables"
                value="Templates and Printables"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="travelLeisure"
                value="Travel and Leisure"
                formData={formData}
                handleChange={handleChange}
              />
              <DescRadio
                id="healthBeauty"
                value="Health and Beauty"
                formData={formData}
                handleChange={handleChange}
              />
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

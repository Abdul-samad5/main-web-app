import { useState, useEffect } from "react";
import { styles } from "../constants";

function Radio({ name, id, value, handleChange, formData }) {
  return (
    <div className={`${styles.radioLabel3}`}>
      <input
        type="radio"
        name={name}
        id={id}
        onChange={handleChange}
        checked={formData.name}
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
    description: "",
    industry: "",
    products: "",
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
                name="description"
                id="newBusiness"
                onChange={handleChange}
                checked={formData.description}
                value="New business"
              />
              <label htmlFor="newBusiness" className="font-normal text-[16px]">
                I am a new business owner
              </label>
            </div>
            <div className={`${styles.radioLabel2}`}>
              <input
                type="radio"
                name="description"
                id="existingBusiness"
                onChange={handleChange}
                checked={formData.description}
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
              <Radio
                id="artsPhotography"
                value="Arts and Photography"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="automobile"
                value="Automobile"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="booksMagazines"
                value="Books and Magazines"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="charitiesCause"
                value="Charities and Cause"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="constructionIndustrial"
                value="Construction and Industrial"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="crafts"
                value="Crafts"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="designMarketing"
                value="Design and Marketing"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="educationLearning"
                value="Education and Learning"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="fashionApparel"
                value="Fashion and Apparel"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="flowersCollectibles"
                value="Flowers, Gifts and Collectibles"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
            </div>

            {/* {Second Half} */}
            <div className={`${styles.radioGroup2}`}>
              <Radio
                id="homeFurniture"
                value="Home and Furniture"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="jewelry"
                value="Jewelry"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="music"
                value="Music"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="petsCare"
                value="Pets and Pet care"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="softwareTechnology"
                value="Software and Technology"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="sportsRecreations"
                value="Sports and Recreations"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="stationerySupplies"
                value="Stationery and Office supplies"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="templatesPrintables"
                value="Templates and Printables"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="travelLeisure"
                value="Travel and Leisure"
                name="industry"
                formData={formData}
                handleChange={handleChange}
              />
              <Radio
                id="healthBeauty"
                value="Health and Beauty"
                name="industry"
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

        {/* {Slide 3} */}
        <div className="text-center">
          <p className="font-normal text-[14px] mb-4">Step 3 of 4</p>
          <h2 className={`${styles.stepFormHeading}`}>
            What kind of products do or would you sell?
          </h2>
          <div className={`${styles.stepFormHBox}`}>
            <Radio
              id="physicalProducts"
              value="Physical Products"
              name="products"
              formData={formData}
              handleChange={handleChange}
            />
            <Radio
              id="digitalProducts"
              value="Digital Products"
              name="products"
              formData={formData}
              handleChange={handleChange}
            />
            <Radio
              id="services"
              value="Services"
              name="products"
              formData={formData}
              handleChange={handleChange}
            />
            <Radio
              id="tickets"
              value="Tickets"
              name="products"
              formData={formData}
              handleChange={handleChange}
            />
            <Radio
              id="memberships"
              value="Memberships"
              name="products"
              formData={formData}
              handleChange={handleChange}
            />
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

        {/* {Slide 4} */}
        <div className="text-center">
          <p className="font-normal text-[14px] mb-4">Step 4 of 4</p>
          <h2 className={`${styles.stepFormHeading}`}>Where will your business be located??</h2>
          <div className={`${styles.stepFormHBox}`}></div>
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

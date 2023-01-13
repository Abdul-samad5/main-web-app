import { useState, useEffect, useRef } from "react";
import { styles } from "../constants";
import { countries } from "../services/services";
import { arrow_left, my_store } from "../assets";

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
  // Slider
  const [count, setCount] = useState(0);
  const size = 100 / document.querySelectorAll(".gs_slide").length;

  useEffect(() => {
    let form = document.querySelector("form");
    form.style.transform = `translateX(-${count * size}%)`;
    window.scrollTo(0, 0);
  }, [count]);

  function nextSlide() {
    if (count === 6) return;
    setCount((count) => count + 1);
  }

  function prevSlide() {
    if (count === 0) return;
    setCount((count) => count - 1);
  }

  // Form data
  const [formData, setFormData] = useState({
    description: "",
    industry: "",
    products: "",
    country: "",
  });

  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "radio" ? checked : value,
      };
    });
  }

  return (
    <div className="relative w-full mb-20">
      {/* {Slide Back Arrow} */}
      {count > 0 && (
        <div
          className="w-[20px] absolute z-10 left-0 lg:-left-[100px] top-3 md:top-0 cursor-pointer"
          onClick={prevSlide}
        >
          <img src={arrow_left} alt="Left Arrow" />
        </div>
      )}
      <div className="w-full overflow-hidden">
        <form className="flex transition-transform duration-500 w-[600%] mt-10 md:mt-0">
          {/* {Slide 0} */}
          <div className={`${styles.stepFormCont}`}>
            <div className="text-center max-w-[700px] mx-auto">
              <h1 className="text-[36px] font-bold mb-8">
                Let's help create your store beautifully
              </h1>
              <p className="leading-[1.3] text-[20px] mb-8">
                Answer a few questions to get started on your store
                creation/customization with our tools specially made for you.
              </p>
              <button
                type="button"
                className={`${styles.button}`}
                onClick={nextSlide}
              >
                Get started now
              </button>
            </div>
          </div>

          {/* {Slide 1} */}
          <div className={`${styles.stepFormCont} text-center`}>
            <p className="font-normal text-[14px] mb-4">Step 1 of 4</p>
            <h2 className={`${styles.stepFormHeading}`}>
              Which best describes you?
            </h2>
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
                <label
                  htmlFor="newBusiness"
                  className="font-normal text-[16px]"
                >
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
                <label
                  htmlFor="existingBusiness"
                  className="font-normal text-[16px]"
                >
                  I have a business already
                </label>
              </div>
            </div>
            <div className={`${styles.skipNext}`}>
              <button
                type="button"
                className="text-brand-gray text-[14px] font-normal"
                onClick={nextSlide}
              >
                Skip
              </button>
              <button
                type="button"
                className={`${styles.button}`}
                onClick={nextSlide}
              >
                Next
              </button>
            </div>
          </div>

          {/* {Slide 2} */}
          <div className={`${styles.stepFormCont} text-center`}>
            <p className="font-normal text-[14px] mb-4">Step 2 of 4</p>
            <h2 className={`${styles.stepFormHeading}`}>
              What industry are you in?
            </h2>
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
              <button
                type="button"
                className="text-brand-gray text-[14px] font-normal"
                onClick={nextSlide}
              >
                Skip
              </button>
              <button
                type="button"
                className={`${styles.button}`}
                onClick={nextSlide}
              >
                Next
              </button>
            </div>
          </div>

          {/* {Slide 3} */}
          <div className={`${styles.stepFormCont} text-center`}>
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
              <button
                type="button"
                className="text-brand-gray text-[14px] font-normal"
                onClick={nextSlide}
              >
                Skip
              </button>
              <button
                type="button"
                className={`${styles.button}`}
                onClick={nextSlide}
              >
                Next
              </button>
            </div>
          </div>

          {/* {Slide 4} */}
          <div className={`${styles.stepFormCont}`}>
            <p className="font-normal text-[14px] mb-4 text-center">
              Step 4 of 4
            </p>
            <h2 className={`${styles.stepFormHeading} text-center`}>
              Where will your business be located??
            </h2>
            <div className={`${styles.stepFormHBox}`}>
              <div className="px-[40px]">
                <h3 className="font-normal text-[16px]">
                  Choose country/region
                </h3>
                <select
                  name="country"
                  onChange={handleChange}
                  value={formData.country}
                  className="block w-full p-4 border bg-inherit"
                >
                  <option>Nigeria</option>
                  {countries.map((country) => (
                    <option
                      className="py-5 text-brand-black bg-white block"
                      value={country.toLowerCase()}
                      key={country}
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`${styles.skipNext}`}>
              <button
                type="button"
                className="text-brand-gray text-[14px] font-normal"
                onClick={nextSlide}
              >
                Skip
              </button>
              <button
                type="button"
                className={`${styles.button}`}
                onClick={nextSlide}
              >
                Next
              </button>
            </div>
          </div>

          {/* {Slide 5} */}
          <div
            className={`${styles.stepFormCont} flex flex-col md:flex-row md:justify-between`}
          >
            <div className="w-full md:w-[40%] mb-[40px] md:mb-0">
              <h1 className="text-[14px]">Final step to your dashboard!</h1>
              <h1 className="font-bold leading-[1.3] text-[28px] my-3">
                Proceed to dashboard to complete your store setup.
              </h1>
              <a className={`${styles.button}`} href="/dashboard">
                Proceed to dashboard
              </a>
            </div>
            <div className="w-full md:w-1/2">
              <img src={my_store} alt="Dashboard Image" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;

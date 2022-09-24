import axios from "axios";

// Load ALL countries from countries endpoint
let countries = [];
axios.get("https://restcountries.com/v3.1/all").then(function (response) {
  const countryInfo = response.data;
  for (const value of countryInfo.values()) {
    let country = value.name.common;
    countries.push(country);
  }

  // Sort in alphabetical order
  countries.sort();
});

const styles = {
  button:
    "py-[16px] px-[32px] bg-brand-primary text-white rounded-[8px] hover:bg-brand-secondary transition:colors duration-500",
  stepFormCont: "w-[16.66%] shrink-0",
  stepFormHeading: "font-bold text-[20px] mb-[56px]",
  stepFormHBox: "border border-[#CACACA] py-[40px] mb-[40px] max-w-[700px] mx-auto",
  stepFormVBox: "flex flex-col md:flex-row border border-[#CACACA] mb-[40px] max-w-[700px] mx-auto",
  radioLabel: "flex items-center gap-[12px] border-b px-[40px] pb-[40px] mb-[40px]",
  radioLabel2: "flex items-center gap-[12px] px-[40px]",
  radioLabel3: "flex items-center gap-[12px] px-[40px] mb-[20px]",
  radioGroup: "border-r py-[40px] w-1/2",
  radioGroup2: "py-[40px] w-1/2",
  skipNext: "flex justify-end items-center gap-[16px] max-w-[700px] mx-auto",
};

export { styles, countries };

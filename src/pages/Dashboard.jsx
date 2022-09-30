import { styles } from "../constants";
import {
  logo,
  all_prods,
  add_prod,
  collections,
  customers,
  edit,
  history,
  marketing,
  orders,
  products,
  review,
  store,
  settings,
  arrow_right,
  arrow_down,
  search,
  bell,
  user_img,
} from "../assets";

function DbIcon({ src }) {
  return <img src={src} className="w-[16px]" alt="Icon" />;
}

const Dashboard = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full flex">
        <div className="w-4/5 lg:w-1/5 shrink-0 left-0 top-0 h-screen border-r border-brand-gray-300 -translate-x-[100%] lg:-translate-x-[0] absolute lg:relative">
          <div className="border-b p-5">
            <img src={logo} className="w-[50px]" />
          </div>
          <div className="border-b flex items-center justify-between p-4 mb-[10px]">
            <h1 className="font-bold text-[16px] ">Micheline</h1>
            <DbIcon src={edit} />
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={store} />
            <h2>My Store</h2>
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={orders} />
            <h2>My Orders</h2>
          </div>
          <div className={`${styles.dbNavItem} relative`}>
            <DbIcon src={products} />
            <h2>Products</h2>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <DbIcon src={arrow_right} />
            </div>
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={customers} />
            <h2>My Customers</h2>
          </div>
          <div className={`${styles.dbNavItem} relative`}>
            <DbIcon src={marketing} />
            <h2>Marketing</h2>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <DbIcon src={arrow_right} />
            </div>
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={review} />
            <h2>Store reviews</h2>
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={history} />
            <h2>Transaction history</h2>
          </div>
          <div className="border-b border-t p-4 mb-[10px]">
            <h1 className="font-bold text-[16px] text-brand-gray">Settings</h1>
          </div>
          <div className={`${styles.dbNavItem} relative w-full`}>
            <DbIcon src={settings} />
            <h2>Store settings</h2>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <DbIcon src={arrow_right} />
            </div>
          </div>
        </div>
        <div className="lg:w-4/5 w-full shrink-0 bg-brand-gray-200 min-h-screen p-[24px] lg:px-10 lg:py-5">
          <div className="w-full flex justify-between items-center">
            <button className={`${styles.buttonOutline}`}>Go to store front</button>
            <div className="flex items-center">
              <div className="relative w-[370px]">
                <img
                  src={search}
                  alt="Icon"
                  className="w-[13px] absolute top-1/2 left-3 -translate-y-[50%]"
                />
                <input
                  type="search"
                  placeholder="Search for customers,orders,products..."
                  className="w-full placeholder:text-brand-gray-400 bg-inherit border py-4 px-8 rounded-xl"
                />
              </div>
              <div className="mr-[24px] ml-2">
                <img src={bell} alt="Icon" className="w-[18px]" />
              </div>
              <div className="flex items-center gap-2">
                <img src={user_img} alt="Profile Image" className="w-[32px]" />
                <img src={arrow_down} alt="Icon" className="w-[13px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

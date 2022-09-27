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
} from "../assets";

function DbIcon({ src }) {
  return <img src={src} className="w-[16px]" alt="Icon" />;
}

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="w-full flex">
        <div className="w-1/5 shrink-0 left-0 top-0 h-screen border-r border-brand-gray-300">
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
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={products} />
            <h2>Products</h2>
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={customers} />
            <h2>My Customers</h2>
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={marketing} />
            <h2>Marketing</h2>
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
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={settings} />
            <h2>Store settings</h2>
          </div>
        </div>
        <div className="w-4/5 shrink-0 bg-brand-gray-200 min-h-screen"></div>
      </div>
    </div>
  );
};

export default Dashboard;

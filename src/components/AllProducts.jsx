import React, { useState, useEffect } from 'react';
import { UserData } from './index';
import { noProducts } from '../assets';
import { deleteProduct } from '../services/services';
import { styles } from '../constants/index';
import { BASE_URL } from '../services/services';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AddEditProducts } from './index';
import Orders from './Orders';
import { TableCell } from '@mui/material';

const details = ["Keys", 'Product name', 'Price', 'Status:', 'Inventory:', 'Action'];
const AllProducts = ({ showActiveComponent, handleNavClick }) => {
  const [myProducts, setMyProducts] = useState([]);
  const [reRender, setRender] = useState(false);

  const handleNext = () => {
    setMyProducts((prev) => {
      return (prev = [0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 89]);
    });
  };

  const token = Cookies.get('_tksr');

  async function fetchProducts() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      'Content-Type': 'application/json',
    };

    try {
      const res = await axios.get(`${BASE_URL}product/list`, config);
      if (res) {
        setMyProducts(res.data.data);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [reRender]);

  const Children = ({ id, productName, price, status, inventory, keys }) => {
    const [currentState, setCurrentState] = React.useState(false);

    const handleClick = () => {
      setCurrentState((prevValue) => !prevValue);
    };

    const handleDeleteProduct = async () => {
      try {
        const res = await deleteProduct(id);
        console.log(res);
        if (!res.statusText === 'OK') return;
        setRender((prev) => (prev = !prev));
      } catch (error) {
        console.log(error);
      }
    };

    return (
      // <div className='flex justify-between wrap items-center'>
      //   <div className='flex justify-between w-full sticky'>
      //     <p className={`${styles.valueStyle} sticky`}>{keys}</p>
      //     <p className={`${styles.valueStyle} relative left-6 lg:left-8`}>
      //       {productName}
      //     </p>
      //     <p className={`${styles.valueStyle} relative left-6 lg:left-8`}>{price}</p>
      //     <Status value={status} />
      //     <p
      //       className={
      //         inventory === 0
      //           ? `${styles.valueStyle} text-red-600 relative right-6 lg:right-14`
      //           : `${styles.valueStyle} right-6 relative lg:right-8`
      //       }
      //     >
      //       {inventory + ' in stock'}
      //     </p>
      //     <div
      //       onClick={handleClick}
      //       className='flex w-2 h-4 relative right-4 lg:right-4'
      //     >
      //       <div
      //         className={
      //           currentState
      //             ? 'rounded bg-white shadow-lg relative top-4 px-3 h-24 w-26'
      //             : 'hidden'
      //         }
      //         onClick={(e) => {
      //           showActiveComponent(e, <AddEditProducts productId={id}/>);
      //           handleNavClick();
      //         }}
      //       >
      //         <p className='text-xs cursor-pointer hover:opacity-70 my-2'>
      //           Edit product
      //         </p>
      //         <p className='text-xs cursor-pointer hover:opacity-70 my-2'>
      //           Preview
      //         </p>
      //         <p
      //           className='text-xs cursor-pointer hover:opacity-70 hover:text-red-300 text-red-400 my-2'
      //           onClick={handleDeleteProduct}
      //         >
      //           Delete
      //         </p>
      //       </div>
      //       <svg
      //         xmlns='http://www.w3.org/2000/svg'
      //         viewBox='0 0 128 512'
      //         className='w-4 h-4 fill-slate-400'
      //       >
      //         <path d='M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z' />
      //       </svg>
      //     </div>
      //   </div>
      // </div>
      <>
          <TableCell>{keys}</TableCell>
          <TableCell>{productName}</TableCell>
          <TableCell>{price}</TableCell>
          <TableCell className="flex justify-center items-center">
            <Status value={status} />
          </TableCell>
          <TableCell>
            <p
              className={
                inventory === 0
                  ? `${styles.valueStyle} text-red-600 `
                  : `${styles.valueStyle}`
              }
            >
              {inventory + ' in stock'}
            </p>
          </TableCell>
          <TableCell>
            <div
                onClick={handleClick}
                className='flex w-2 h-4 '
              >
                <div
                  className={
                    currentState
                      ? 'rounded bg-white shadow-lg relative top-4 px-3 h-24 w-26'
                      : 'hidden'
                  }
                  onClick={(e) => {
                    showActiveComponent(e, <AddEditProducts productId={id}/>);
                    handleNavClick();
                  }}
                >
                  <p className='text-xs cursor-pointer hover:opacity-70 my-2'>
                    Edit product
                  </p>
                  <p className='text-xs cursor-pointer hover:opacity-70 my-2'>
                    Preview
                  </p>
                  <p
                    className='text-xs cursor-pointer hover:opacity-70 hover:text-red-300 text-red-400 my-2'
                    onClick={handleDeleteProduct}
                  >
                    Delete
                  </p>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 128 512'
                  className='w-4 h-4 fill-slate-400'
                >
                  <path d='M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z' />
                </svg>
            </div>
          </TableCell>
      </>
    );
  };

  return (
    <div className="mt-6">
      <p className={`${styles.componentHeader}`}>All Products</p>
      {/* <UserData
        type={'Products'}
        image={noProducts}
        infoHead={details}
        data={myProducts}
        children={Children}
        handleNext={handleNext}
      ></UserData> */}
      <Orders image={noProducts} infoHead={details} children={Children} data={myProducts} type={"Products"} />
    </div>
  );
};

const Status = ({ value }) => {
  if (value === 'draft') {
    return (
      <div className='rounded text-black-800 bg-gray-300 text-center text-xs  px-6 py-1 '>
        {value}
      </div>
    );
  } else if (value === 'archived') {
    return (
      <div className='rounded text-purple-800 bg-purple-200 text-xs text-center  px-3 py-1'>
        {value}
      </div>
    );
  } else if (value === 'active') {
    return (
      <div className='rounded text-green-900 bg-green-200 text-center w-24 text-sm px-2'>
        {value}
      </div>
    );
  }
};

export default AllProducts;

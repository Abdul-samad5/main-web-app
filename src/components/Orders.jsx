import * as React from 'react';
import { TableRow, TableCell, TableBody, TableHead, Table } from '@mui/material';
import { Loader } from '../assets';

const Orders = ({ image, infoHead, children: Children, data, type, navigate }) => {
    const [currentPage, setCurrentPage] = React.useState(0);

    return (
        <React.Fragment>
            <div className="rounded shadow-xl w-full lg:px-5 px-2 py-3 lg:mx-auto my-auto h-auto">
                <div className="w-auto lg:overflow-x-hidden overflow-x-scroll">
                    <div className="mt-3 w-[500px] lg:w-full md:w-full">
                        <Table size="small">
                            <TableHead>
                                <TableRow >
                                    {infoHead.map((word, index) => {
                                        return (
                                            <TableCell key={index} >{word}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            {/* {!data.length && <img src={Loader} alt="loader" className='mx-auto h-[100px] w-[100px]'></img>} */}
                            <TableBody>    
                                {/* Structure of the children passed into the component and to be mapped into each of the data also passed into the component. } */}
                                {data.map((children, index) => {
                                // Displays the details of each collection if the type of the component equals Collections.
                                    if (type === "Collections") {
                                        return (
                                            // <div className="mb-3" key={index + 1}>
                                            <TableRow className='mb-3' key={index + 1}>
                                                <Children
                                                    id={children.id}
                                                    no={index}
                                                    collectionName={children.name}
                                                    product={children.image}
                                                />
                                            </TableRow>
                                            // </div>
                                        );
                                        // Displays the details of each customer if the type of the component equals Customer.
                                    } else if (type === "Customer") {
                                        return (
                                        // <div className="mb-3">
                                            <TableRow className='mb-3' key={index + 1}>
                                                <Children
                                                    id={index + 1}
                                                    key={index + 1}
                                                    name={"Alex Ikenna"}
                                                    email={"Alex@gmail.com"}
                                                    noOfOrders={"29"}
                                                    location={"Lagos, LA. Nigeria"}
                                                    amount={"#4,555,000"}
                                                
                                                />
                                            </TableRow>
                                        // {/* </div> */}
                                        );
                                        // Displays the details of each store review if the type of the component equals Store Reviews.
                                    } else if (type === "Sales target") {
                                        return (
                                            // <div className="mb-3" key={index + 1}>
                                                <TableRow key={index + 1}>
                                                    <Children
                                                        id={children.id}
                                                        reviews={children.paymentMethod}
                                                        ratings={children.shipTo}
                                                        date={children.date}
                                                    />
                                                </TableRow>
                                            // {/* </div> */}
                                        );
                                    } else if (type === "Transaction History") {
                                        return (
                                        // <div className="mb-3" key={index}>
                                            <TableRow className='mb-3' key={index + 1}>
                                                <Children
                                                    id={children.id}
                                                    userEmail={children.userEmail}
                                                    refCode={children.ref_code}
                                                    amount={children.amount}
                                                    paymentID={children.uuid}
                                                    status={children.status}
                                                />
                                            </TableRow>
                                        );
                                    } else if (type === "Discounts") {
                                        return (
                                        // <div className="mb-3" key={index + 1}>
                                            <TableRow className='mb-3' key={index + 1}>
                                                <Children
                                                    id={children.id}
                                                    no={index}
                                                    discountCode={children.discount_code}
                                                    method={children.discount_method}
                                                    type={children.discount_type}
                                                    discount_value={children.discount_value}
                                                    value={children.value}
                                                    end_date={children.end_date}
                                                    active={children.active}
                                                // id, discountStatus, method, status, type, usage
                                                />
                                            </TableRow>
                                        // </div>
                                        );
                                    } else if (type === "My Orders" || type === "My Orders Primary") {
                                        return (
                                            <TableRow className='mb-3' key={index + 1}>
                                                <Children
                                                    id={index + 1}
                                                    key={index + 1}
                                                    customer={"Alex Ikenna"}
                                                    date={"Alex@gmail.com"}
                                                    status={"Cancelled"}
                                                    total={"Stripe"}
                                                />
                                            </TableRow>
                                        );
                                    } else if (type === "Products") {
                                        return (
                                            <TableRow  key={index + 1}>
                                                {/* <div className="mb-3" key={index}> */}
                                                    <Children
                                                        id={children.id}
                                                        keys={index + 1}
                                                        productName={children.title}
                                                        price={children.price}
                                                        status={children.status}
                                                        inventory={children.stock_count}
                                                    />
                                                {/* </div> */}
                                            </TableRow>
                                        );
                                    } else {
                                    }
                                })}
                            </TableBody>
                        </Table>

                        {/* Image and text to be displayed if no data is found */}
                        <img
                            src={image}
                            alt="No data"
                            className={data.length === 0 ? "mx-auto lg:w-auto lg:h-auto h-1/2 w-1/2" : "hidden"}
                        />
                        <p className={data.length === 0 ? "text-base text-center" : "hidden"}>
                            { `No ${type === "My Orders Primary" ? "Orders" : type} found`}
                        </p>
                    </div>

                    <div className="flex justify-between w-[500px] lg:w-full md:w-full mt-10 align-center">
                        <span className="flex justify-between">
                            <p className="text-xs text-slate-400 my-auto">View</p>
                            <select className="bg-gray-100 rounded mx-1 my-auto w-9 text-xs">
                                <option className="bg-gray-100 rounded">5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                            </select>
                            <p className="text-xs text-slate-400 my-auto">entries per page</p>
                        </span>

                        <span className="flex justify-between">
                            <p
                                className={
                                    data.length === 0
                                        ? "text-xs text-slate-400 hidden"
                                        : "text-xs text-slate-400"
                                }
                            >
                                Showing 1 to 5 of 5 entries
                            </p>
                            <p
                                className={
                                    data.length === 0
                                        ? "text-xs text-slate-400"
                                        : "text-xs text-slate-400 hidden"
                                }
                            >
                                Showing 0 to 0 of 0 entries
                            </p>
                            <p className="text-blue-700 text-xs mx-1">{currentPage}</p>
                            <span 
                                // onClick={handleClick}
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                className="w-3 relative top-1 h-3 fill-slate-300"
                                >
                                <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                </svg>
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-3 h-3 relative top-1 fill-slate-300"
                            >
                                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                            </svg>
                        </span>

                        {type === "My Orders Primary" ? <div onClick={navigate} className='rounded text-brand-primary font-semibold text-sm hover:text-brand-secondary cursor-pointer'>
                            View more
                        </div> : <div className='hidden invisible'></div>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Orders;
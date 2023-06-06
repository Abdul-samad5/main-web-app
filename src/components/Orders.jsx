import * as React from 'react';
import { TableRow, TableCell, TableBody, TableHead, Table } from '@mui/material';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

const rows = [];

const Orders = ({image, infoHead}) => {
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
                                            <TableCell key={index}>{word}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.shipTo}</TableCell>
                                        <TableCell>{row.paymentMethod}</TableCell>
                                        <TableCell align="right">{`$${row.amount}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Image and text to be displayed if no data is found */}
                        <img
                            src={image}
                            alt="No data"
                            className={rows.length === 0 ? "mx-auto lg:w-auto lg:h-auto h-1/2 w-1/2" : "hidden"}
                        />
                        <p className={rows.length === 0 ? "text-base text-center" : "hidden"}>
                            { "No orders found"}
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
                                    rows.length === 0
                                        ? "text-xs text-slate-400 hidden"
                                        : "text-xs text-slate-400"
                                }
                            >
                                Showing 1 to 5 of 5 entries
                            </p>
                            <p
                                className={
                                    rows.length === 0
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
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Orders;
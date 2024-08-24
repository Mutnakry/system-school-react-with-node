import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../conponent/Footer';
import Navbar from '../conponent/Navbar';
import { Link } from 'react-router-dom';
function ShowRoom() {
    const [userLogin, setUseLogin] = useState('');
    const [room, setroom] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);  // Start at page 1
    const [limit, setLimit] = useState(20); // Default limit is 5 items per page
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllRoom();
    }, [page, limit, searchQuery]);
    // get all room
    const getAllRoom = async () => {
        setLoading(true);  // Set loading state to true
        try {
            const response = await axios.get('http://localhost:6700/api/classroom', {
                params: {
                    page,
                    limit,
                    search_query: searchQuery
                }
            });
            setroom(response.data.teacher);
            setTotalPages(response.data.totalPages);
            setError(null);  // Reset error state if request is successful
        } catch (error) {
            setError('Error fetching categories data');  // Set error state if request fails
        } finally {
            setLoading(false);  // Set loading state to false
        }
    };
    return (
        <div className='h-screen bg-white dark:bg-gray-950'>
            <Navbar />
            <div className='py-16 px-2 lg:ml-64 bg-white dark:bg-gray-950 '>
                <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                        <div className='grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-2 md:grid-cols-3 '>
                            {room?.map((room, index) => (
                                <div
                                    key={index}
                                    className="w-full max-w-xs my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <Link to={`/showtable/${room.roomid}`}>
                                        <img
                                            className="rounded-t-lg w-full"
                                            src="https://i.pinimg.com/736x/93/b9/29/93b9296b9632191996a77bc00ea18c14.jpg"
                                            alt="product"
                                        />
                                        <div
                                            className={`py-4 px-4 rounded-b-lg ${room.roomstatus === 1 ? 'bg-green-400' : 'bg-red-400'
                                                }`}
                                        >
                                            <div className="px-1 pb-5 overflow-hidden">
                                                <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    ថ្នាក់ទី : {room.names}
                                                </h5>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    គ្រូបន្ទុកថ្នាក់ : {room.kh_name}
                                                </h3>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    ចំនូនតុ : {room.table}
                                                </h3>
                                                <br />
                                                <span className="btn btn-danger">
                                                    {room.roomstatus === 1 ? 'Free' : 'Off'}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id='invoice'>
                            {room.map((categorys, index) => (
                                <tr key={index}>
                                    <td>{categorys.kh_name}</td>
                                  
                                    <td>{categorys.roomstatus}</td>
                                    <td>{categorys.table}</td>
                                    <td className="">
                                        <Link className="btn btn-danger" to={`/showtable/${categorys.roomid}`}>
                                            Update
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <div className="btn btn-warning" id="btn-print">Print</div>
                    </table> */}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ShowRoom
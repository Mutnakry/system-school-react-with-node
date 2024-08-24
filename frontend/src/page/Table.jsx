// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Footer from '../conponent/Footer'; // Ensure the path is correct
// import Navbar from '../conponent/Navbar';
// import { useParams, useNavigate } from 'react-router-dom';

// function ShowRoom() {
//     const [table, setTable] = useState('');
//     const { id } = useParams(); // Destructure id from useParams
//     const navigate = useNavigate(); // For redirecting after successful update

//     useEffect(() => {
//         fetchData();
//     }, [id]);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:6700/api/classroom/${id}`);
//             setTable(response.data.table); // Set initial value from response
//             console.log(response.data.table); 
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const handleChange = (e) => {
//         setTable(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:6700/api/classroom/${id}`, { table });
//             alert('Data updated successfully');
//             navigate('/'); // Redirect to another page after update
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };

//     return (
//         <div className='h-screen bg-white dark:bg-gray-950'>
//             <Navbar />
//             <div className='py-16 px-2 lg:ml-64 bg-white dark:bg-gray-950'>
//                 <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
//                     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                         <form onSubmit={handleSubmit} className='space-y-4'>
//                             <div className="form-group">
//                                 <label htmlFor="">Name</label>
//                                 <input
//                                     type="text"
//                                     value={table}
//                                     className='form-control'
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <button type="submit" className='btn btn-primary'>
//                                 Update
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default ShowRoom;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../conponent/Footer'; // Ensure the path is correct
import Navbar from '../conponent/Navbar';
import { useParams, useNavigate } from 'react-router-dom';

function ShowRoom() {
    const [table, setTable] = useState('');
    const { id } = useParams(); // Destructure id from useParams
    const navigate = useNavigate(); // For redirecting after successful update

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:6700/api/classroom/${id}`);
            setTable(response.data.table); // Set initial value from response
            console.log(response.data.table);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // Generate an array of elements based on the table length
    const renderIndents = () => {
        if (!table) return null;

        const numberOfIndents = table;
        const elements = [];

        for (let i = 0; i < numberOfIndents; i++) {
            elements.push(
                <div key={i}>
                    <section class="bg-center lg:mx-8 md:mx-2 sm:px-0 rounded-2xl bg-no-repeat bg-[url('https://s.alicdn.com/@sc04/kf/HTB1DCTtbi6guuRkSmLyq6AulFXa3.jpg_200x200.jpg')] bg-gray-700 bg-blend-multiply">
                        <div class="px-4 mx-auto max-w-screen-xl text-center py-6">
                            <h2 class="mb-4 text-xl font-extrabold tracking-tight leading-none text-white ">តុលេខ {i + 1} </h2>
                            <h2 class="text-xl font-extrabold tracking-tight leading-none text-white ">Student Name : Admin </h2>
                            <br />
                            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                                <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                    Get started
                                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>

                            </div>
                        </div>
                    </section>

                </div>
            );
        }

        return elements;
    };

    return (
        <div className='h-screen bg-white dark:bg-gray-950'>
            <Navbar />
            <div className='py-16  lg:ml-64 bg-white dark:bg-gray-950'>
                <div className='p-4'>
                    <div className="">
                        <div className='grid md:grid-cols-4  grid-cols-2 gap-4 '>
                            {renderIndents()}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ShowRoom;







// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Footer from '../conponent/Footer'; // Ensure the path is correct
// import Navbar from '../conponent/Navbar';
// import { useParams, useNavigate } from 'react-router-dom';

// function ShowRoom() {
//     const [table, setTable] = useState('');
//     const { id } = useParams(); // Destructure id from useParams
//     const navigate = useNavigate(); // For redirecting after successful update

//     useEffect(() => {
//         fetchData();
//     }, [id]);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:6700/api/classroom/${id}`);
//             setTable(response.data.table); // Set initial value from response
//             console.log(response.data.table);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     // Generate an array of elements based on the table length
//     const renderIndents = () => {
//         if (!table) return null;

//         const numberOfIndents = table.length; // or adjust based on your data
//         const elements = [];

//         for (let i = 0; i < numberOfIndents; i++) {
//             elements.push(
//                 <div className="col-6 col-sm-6 col-md-4 col-lg-2" key={i}>
//                     <div className="mb-2">
//                         <div className="border border-danger rounded shadow-lg">
//                             <div className="card card-widget widget-user"
//                                 style={{
//                                     backgroundImage: "url('https://res.cloudinary.com/tf-lab/image/upload/restaurant/189ccb68-86b5-41ac-a686-00f61ba1103c/3b0ea7cf-0b4d-43c9-a45e-2c1a7ab06d70.jpg')",
//                                     backgroundSize: 'cover',
//                                     backgroundPosition: 'center'
//                                 }}>
//                                 {/* Header with conditional background color */}
//                                 <div className={`widget-user-header bg-${i % 2 === 0 ? 'success' : 'danger'}`}>
//                                     <h1 className="widget-user-username fs-1">តុលេខ</h1>
//                                     <h2 className="widget-user-desc fs-2">{i + 1}</h2>
//                                 </div>
//                                 <div className="widget-user-image">
//                                     <img className="img-circle elevation-2" src="../assets/img/mesa.jpg" alt="User Avatar" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }

//         return elements;
//     };

//     return (
//         <div className='h-screen bg-white dark:bg-gray-950'>
//             <Navbar />
//             <div className='py-16 px-2 lg:ml-64 bg-white dark:bg-gray-950'>
//                 <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
//                     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                         <div className='grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-2 md:grid-cols-3 space-x-3 space-y-3'>
//                             {renderIndents()}
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         </div>
//     );
// }

// export default ShowRoom;

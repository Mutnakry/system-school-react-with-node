import Footer from '../conponent/Footer';
import Navbar from '../conponent/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import icondelete from '../image/delete.png';
import iconedite from '../image/edit.png';
import Pagination from './pagination/Pagination'

function Teacher() {
  const [userLogin, setUseLogin] = useState('');
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(20);



  useEffect(() => {
    fetchCategories();
  }, [page, limit, searchQuery]);

  const fetchCategories = async () => {
    setLoading(true);  // Set loading state to true
    try {
      const response = await axios.get('http://localhost:6700/api/teacher', {
        params: {
          page,
          limit,
          search_query: searchQuery
        }
      });
      setTeacher(response.data.teacher);
      setTotalPages(response.data.totalPages);
      setError(null);  // Reset error state if request is successful
    } catch (error) {
      setError('Error fetching categories data');  // Set error state if request fails
    } finally {
      setLoading(false);  // Set loading state to false
    }
  };


  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = (event) => {
    if (setPage(0)) {
      alert('not found!')
    } else {
      setSearchQuery(event.target.value);
      setPage(1); // Reset to the first page on search 
    }

  };

  return (
    <div className='h-screen bg-white dark:bg-gray-950'>
      <Navbar />
      <div className='py-16 px-2 lg:ml-64 bg-white dark:bg-gray-950'>
        <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
          <div className='flex justify-between py-2 mr-2 md:mr-14'>
            <div className='flex space-x-4'>
              <button className='bg-blue-600 py-2 px-4 rounded-lg shadow-md dark:bg-slate-300'>
                Create
              </button>
              <input
                type='text'
                value={searchQuery}
                onChange={handleSearch}
                className='block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 md:w-80 sm:w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Search for names '
              />
            </div>
            <div className='flex items-center text-center space-x-2 mt-2 md:mt-0'>
              <p>Total</p>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-2 py-2 "
              >
                {[5, 10, 20, 50, 100].map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-4 px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Name Khmer</th>
                  <th scope="col" className="px-6 py-3">Name English</th>
                  <th scope="col" className="px-6 py-3">Gender</th>
                  <th scope="col" className="px-6 py-3">Date Of Birth</th>
                  <th scope="col" className="px-6 py-3">Salary</th>
                  <th scope="col" className="px-6 py-3">Phone</th>
                  <th scope="col" className="px-6 py-3">Subject</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="py-3 px-6 w-30 overflow-hidden overflow-x-auto">Address</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {teacher?.map((teachers, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100">
                    <td className='pl-4 px-6 py-3'>{index + 1}</td>
                    <td className="font-semibold">{teachers.kh_name}</td>
                    <td className="font-semibold">{teachers.en_name}</td>
                    <td className="px-6">{teachers.gender}</td>
                    <td className="px-6">{teachers.dob}</td>
                    <td className="px-6">{teachers.salary}</td>
                    <td className="px-6">{teachers.phone}</td>
                    <td className="px-6">{teachers.subject}</td>
                    <td className="px-6">
                      {teachers.status === 1 ? (
                        <span className='bg-green-500 py-1 px-4 rounded-lg hover:bg-green-300 dark:bg-green-300 text-white'>
                          Active
                        </span>
                      ) : (
                        <span className='bg-red-500 py-1 px-4 rounded-lg hover:bg-red-300 text-white dark:bg-red-300'>
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 w-30">{teachers.address}</td>
                    <td className="flex space-x-4">
                      <button className='block text-white bg-blue-100 my-1 hover:bg-blue-500 font-medium rounded-full text-sm px-2 py-2 text-center'>
                        <img src={iconedite} className='h-4' alt='Edit' />
                      </button>
                      <button className='block text-white bg-red-100 my-1 hover:bg-red-500 font-medium rounded-full text-sm px-2 py-2 text-center'>
                        <img src={icondelete} className='h-4' alt='Delete' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              limit={limit}
              setLimit={setLimit}
            />
 
          </div>
          

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17  Apple MacBook Pro 17 Apple MacBook Pro 17
                </th>
                <td class="px-6 py-4">
                    Silveruh
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999jjjjjjjjj i
                </td>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptopnnnnnnnnnnnn
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>

                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop iye eiuhfiu wueifhw
                </td>
                <td class="px-6 py-4">
                    $2999
                </td> <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop jewfn eofhe ehfu
                </td>
            
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
           
        </tbody>
    </table>
</div>

        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Teacher;

// //////////////////////////

// import React, { useState } from 'react';

// const FormWizard = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     address: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleNext = () => {
//     setStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setStep((prev) => prev - 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//     // Submit the form data
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Step 1 */}
//         {step === 1 && (
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 required
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                
//               />
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 2 */}
//         {step === 2 && (
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Step 2: Account Details</h2>
//             <div className="mb-4">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Back
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3 */}
//         {step === 3 && (
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Step 3: Address Information</h2>
//             <div className="mb-4">
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default FormWizard;





// import React, { useState } from 'react';

// const FormWizard = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     address: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateStep1 = () => {
//     return formData.name.trim() !== '' && formData.email.trim() !== '';
//   };

//   const validateStep2 = () => {
//     return formData.password.trim() !== '';
//   };

//   const validateStep3 = () => {
//     return formData.address.trim() !== '';
//   };

//   const handleNext = () => {
//     if (step === 1 && validateStep1()) {
//       setStep((prev) => prev + 1);
//     } else if (step === 2 && validateStep2()) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     setStep((prev) => prev - 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//     // Submit the form data
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Step 1 */}
//         {step === 1 && (
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 disabled={!validateStep1()}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 2 */}
//         {step === 2 && (
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Step 2: Account Details</h2>
//             <div className="mb-4">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Back
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 disabled={!validateStep2()}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3 */}
//         {step === 3 && (
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Step 3: Address Information</h2>
//             <div className="mb-4">
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default FormWizard;

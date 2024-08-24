import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../conponent/Navbar';
import icondelete from '../image/delete.png'
import iconedite from '../image/edit.png'
import axios from 'axios'
import Footer from '../conponent/Footer';
import { toast } from 'react-toastify';
import Pagination from './pagination/Pagination';
import 'react-toastify/dist/ReactToastify.css';

function Room() {
  const [userLogin, setUseLogin] = useState('');
  const [room, setroom] = useState([]);
  const [teacherId, setTeacherId] = useState([]); // Assuming teacher_id is a single value, not an array
  const [teacher, setTeacher] = useState('');
  const [names, setNames] = useState('');
  const [table, setTable] = useState('');
  // const [teacher, setTeacher] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);  // Start at page 1
  const [limit, setLimit] = useState(20); // Default limit is 5 items per page
  const [error, setError] = useState(null);       // Added error state
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    getAllRoom();
    GetAllTeacher();
  }, [page, limit, searchQuery]);

  // get teacher
  const GetAllTeacher = async () => {
    try {
      const res = await axios.get('http://localhost:6700/api/teacher');
      setTeacherId(res.data.teacher);
    } catch (err) {
      console.log(err);
    }
  };

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

  // click move and back page
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  // search data
  const handleSearch = (event) => {
    if (setPage(0)) {
      alert('not found!')
    } else {
      setSearchQuery(event.target.value);
      setPage(1); // Reset to the first page on search 
    }

  };
  // create room
  const CreateRoom = async (e) => {
    e.preventDefault();
    const values = {
      names: names,
      table: table,
      teacher: teacher,

    };
    try {
      const res = await axios.post('http://localhost:6700/api/classroom', values);
      console.log(res.data);
      toast.success('Teacher added successfully!', { autoClose: 3000 });
       window.location.reload();
      setIsInsertModalOpen(false);
      getAllRoom();
    } catch (err) {
      console.error(err);
      toast.error('Error adding teacher!', { autoClose: 3000 });
    }
  };

  const UpdateRoom = async (e) => {
    e.preventDefault();
    const values = {
      names: names,
      table: table,
      teacher: teacher,
      status: status,
    };
    try {
      const res = await axios.put(`http://localhost:6700/api/classroom/${selectedCategoryId}`, values);
      console.log(res.data);
      toast.success('Room Update successfully!', { autoClose: 3000 });
      window.location.reload();
      setIsInsertModalOpen(false);
      setSelectedCategoryId(null);
      getAllRoom();
    } catch (err) {
      console.error(err);
      toast.error('Error adding teacher!', { autoClose: 3000 });
    }
  };

  // delete room
  const DeleteRoom = async () => {
    if (selectedCategoryId) {
      try {
        await axios.delete(`http://localhost:6700/api/classroom/${selectedCategoryId}`);
        toast.success('Category deleted successfully!', { autoClose: 3000 });
        getAllRoom();
        setIsDeleteModalOpen(false);
        setSelectedCategoryId(null);
      } catch (err) {
        console.error(err);
        toast.error('Error deleting category!', { autoClose: 3000 });
      }
    }
  };


  const openUpdateModal = (room) => {
    setIsUpdateModalOpen(true);
    setNames(room.names);
    setTable(room.table);
    setStatus(room.roomstatus);
    setTeacher(room.teacher_id);
    setSelectedCategoryId(room.roomid);
  };

  const openDeleteModal = cat => {
    setSelectedCategoryId(cat.roomid);
    setIsDeleteModalOpen(true);
  };
  const openInsertModal = () => {
    setIsInsertModalOpen(true);
  };




  return (
    <div className='h-screen bg-white dark:bg-gray-950'>
      <Navbar />
      <div className='py-16 px-2 lg:ml-64 bg-white dark:bg-gray-950 '>
        <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
          <div className='flex justify-between py-2 mr-2 md:mr-14'>
            <div className='flex space-x-8'>
              <div className=''>
                <button onClick={openInsertModal} className='bg-blue-600 py-2 px-4 rounded-lg shadow-md dark:bg-slate-300'>បង្កើត</button>
              </div>
              <div className="">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="block md:w-full w-36 p-2 bg-slate-100 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Search Mockups, Logos..." required />
                </div>
              </div>
            </div>

            <div className='flex items-center text-center space-x-2 md:mt-0 dark:bg-gray-950 dark:text-white'>
              <p>ចំនួនសរុប</p>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-2 py-2 dark:bg-gray-700 dark:text-white "
              >
                {[5, 10, 20, 50, 100].map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-md text-gray-700 font-light uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-4 px-6 py-3">
                    ល.រ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ឈ្មោះថ្នាក់រៀម
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ឈ្មោះគ្រូបន្ទុកថ្នាក់
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ចំនួនតុ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ស្ងានភាព
                  </th>
                  <th scope="col" className="px-6 py-3">
                    action
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {room?.map((rooms, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100">
                    <td className='pl-4 px-6 py-3'>{index + 1}</td>
                    <td className=" font-semibold">
                      {rooms.names}
                    </td>
                    <td className=" font-semibold whitespace-nowrap">
                      {rooms.kh_name}
                    </td>
                    <td className="px-6 whitespace-nowrap">
                      {rooms.table}
                    </td>

                    <td className="px-6">
                      {rooms.roomstatus === 1 ? (
                        <span className='bg-green-500 py-1 px-4 rounded-lg hover:bg-green-300 dark:bg-green-300 text-white'>Active</span>
                      ) : (
                        <span className='bg-red-500 py-1 px-4 rounded-lg hover:bg-red-300 text-white dark:bg-red-300'>Inactive</span>
                      )}
                    </td>
                    <td className=" flex space-x-4">
                      <button
                        onClick={() => openUpdateModal(rooms)}
                        className='block text-white bg-blue-100 my-1 hover:bg-blue-500 font-medium rounded-full text-sm px-2 py-2 text-center'
                      >
                        <img src={iconedite} className='h-4' alt='Edit' />
                      </button>
                      <button
                        onClick={() => openDeleteModal(rooms)}
                        className='block text-white bg-red-100 my-1 hover:bg-red-500 font-medium rounded-full text-sm px-2 py-2 text-center'
                      >
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

          {/* Insert Modal */}
          {isInsertModalOpen && (
            <div
              id={`insert-modal`}
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900  dark:text-white">បន្ថៃមថ្នាក់រៀន</h3>
                  <button
                    type="button"
                    className="hover:text-gray-600 bg-transparent hover:bg-gray-200 text-red-500  rounded-lg text-sm w-12 h-12 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsInsertModalOpen(false)}
                  >
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4l8 8m0-8l-8 8"
                      />

                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 bottom-8 overflow-y-auto max-h-screen">
                  <form class="" onSubmit={CreateRoom}>
                    <div className="">
                      <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2 sm:col-span-1">
                          <label
                            for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ឈ្មោះថ្នាក់</label>
                          <input
                            type="text"
                            id="price"
                            value={names}
                            onChange={e => setNames(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                          <label
                            for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ចំនួនតុ</label>
                          <input
                            type="text"
                            id="price"
                            value={table}
                            onChange={e => setTable(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div className="col-span-2">
                          <label for="category" className="block mb-2 text-lg text-gray-900 font-medium dark:text-white">
                            គ្រូបន្ទុកថ្នាក់
                          </label>
                          <select
                            id="category"
                            value={teacher}
                            required
                            onChange={e => setTeacher(e.target.value)} // Set the selected teacher ID
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                          >
                            <option value="">Select Teacher</option> {/* Default option */}
                            {teacherId.map((teacher) => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.kh_name}
                              </option>
                            ))}
                          </select>
                        </div>

                      </div>
                      <button
                        type="submit"

                        className="block py-2 px-6 my-4 rounded-lg justify-end text-white bg-blue-700 hover:bg-blue-800 dark:bg-slate-300 "
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {isDeleteModalOpen && (
            <div
              id={`delete-modal`}
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">លុបទិន្ន័យ</h3>
                  <button
                    type="button"
                    className="hover:text-gray-600 bg-transparent hover:bg-gray-200 text-red-500  rounded-lg text-sm w-12 h-12 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4l8 8m0-8l-8 8"
                      />

                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    តើអ្នកប្រាកដថាចង់លុបប្រភេទនេះទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      មិនលុប
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={DeleteRoom}
                    >
                      លុប
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Update Modal */}
          {isUpdateModalOpen && (
            <div
              id={`insert-modal`}
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900  dark:text-white">បន្ថៃមគ្រូបង្រៀន</h3>
                  <button
                    type="button"
                    className="hover:text-gray-600 bg-transparent hover:bg-gray-200 text-red-500  rounded-lg text-sm w-12 h-12 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsUpdateModalOpen(false)}
                  >
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4l8 8m0-8l-8 8"
                      />

                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 bottom-8 overflow-y-auto max-h-screen">
                  <form class="" onSubmit={UpdateRoom}>
                    <div className="">
                      <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2 sm:col-span-1">
                          <label
                            for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ឈ្មោះថ្នាក់</label>
                          <input
                            type="text"
                            id="price"
                            value={names}
                            onChange={e => setNames(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                          <label
                            for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ចំនួនតុ</label>
                          <input
                            type="text"
                            id="price"
                            value={table}
                            onChange={e => setTable(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label for="category" className="block mb-2 text-lg text-gray-900 font-medium dark:text-white">
                            គ្រូបន្ទុកថ្នាក់
                          </label>
                          <select
                            id="category"
                            value={teacher}
                            onChange={e => setTeacher(e.target.value)} // Set the selected teacher ID
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                          >
                            {teacherId.map((teacher) => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.kh_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                          <label
                            for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ស្ងានភាព</label>
                            <select
                            id="category"
                            value={status}
                            onChange={e => setStatus(e.target.value)} // Set the selected teacher ID
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:text-white dark:bg-gray-600"
                          >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                        </div>

                      </div>
                      <button
                        type="submit"

                        className="block py-2 px-6 my-4 rounded-lg justify-end text-white bg-blue-700 hover:bg-blue-800 dark:bg-slate-300 "
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>


    </div>
  );
}

export default Room;










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

function Student() {
  /// default  ////
  const [student, setStudent] = useState([]);
  const [classroomID, setClassroomID] = useState([]);
  const [userLogin, setUseLogin] = useState('');
  // ------- mother ---  /// 
  const [m_kh_name, setM_kh_name] = useState('');
  const [M_en_name, setM_en_name] = useState('');
  const [M_age, setM_age] = useState('');
  const [M_address, setM_address] = useState('');
  const [M_phone, setM_phone] = useState('');
  const [M_email, setM_email] = useState('');
  const [M_gender, setM_gender] = useState('');

  // -- student ---////
  const [fkh_names, setFKhNames] = useState('');
  const [lkh_name, setLkhNames] = useState('');
  const [fen_name, setFen_name] = useState('');
  const [len_name, setLen_name] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [clsss_id, setClass_id] = useState('');
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null); // Existing image filename
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);  // Start at page 1
  const [limit, setLimit] = useState(20); // Default limit is 5 items per page
  const [error, setError] = useState('');       // Added error state
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {

      if (fkh_names && fen_name && clsss_id) {
        setStep(2);
      } else {
        toast.error('សូមបញ្ចូលឈ្មោះនៅតារាងទាំងអស់សិន​ !', {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    getAllStudent();
    GetAllTeacher();
  }, [page, limit, searchQuery]);

  const getAllStudent = async () => {
    setLoading(true);  // Set loading state to true
    try {
      const response = await axios.get('http://localhost:6700/api/student', {
        params: {
          page,
          limit,
          search_query: searchQuery
        }
      });
      setStudent(response.data.category);
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

  // get teacher
  const GetAllTeacher = async () => {
    try {
      const res = await axios.get('http://localhost:6700/api/classroom');
      setClassroomID(res.data.teacher);
    } catch (err) {
      console.log(err);
    }
  };

  // greate student
  const CreateStudent = async (e) => {
    e.preventDefault();
    setError('');

    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (file && !fileTypes.includes(file.type)) {
      setError('Error: Images Only (jpeg, jpg, png, gif)');
      return;
    }
    // Optionally, check file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file && file.size > maxSize) {
      setError('Error: File size exceeds 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('M_kh_name', m_kh_name);
    formData.append('M_en_name', M_en_name);
    formData.append('M_age', M_age);
    formData.append('M_address', M_address);
    formData.append('M_phone', M_phone);
    formData.append('M_email', M_email);
    formData.append('M_gender', M_gender);

    formData.append('students[fkh_names]', fkh_names);
    formData.append('students[lkh_name]', lkh_name);
    formData.append('students[fen_name]', fen_name);
    formData.append('students[len_name]', len_name);
    formData.append('students[gender]', gender);
    formData.append('students[dob]', dob);
    formData.append('students[age]', age);
    formData.append('students[phone]', phone);
    formData.append('students[address]', address);
    formData.append('students[email]', email);
    formData.append('students[clsss_id]', clsss_id);

    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:6700/api/student', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      toast.success('Student added successfully!', { autoClose: 3000 });
      setIsInsertModalOpen(false);
      window.location.reload();
      getAllStudent();
    } catch (err) {
      console.error(err);
      toast.error('Error adding student!', { autoClose: 3000 });
    }
  };

  const openInsertModal = () => {
    setIsInsertModalOpen(true);
  };
  // delete room
  const DeleteRoom = async () => {
    if (selectedCategoryId) {
      try {
        await axios.delete(`http://localhost:6700/api/student/${selectedCategoryId}`);
        toast.success('Category deleted successfully!', { autoClose: 3000 });
        getAllStudent();
        setIsDeleteModalOpen(false);
        setSelectedCategoryId(null);
      } catch (err) {
        console.error(err);
        toast.error('Error deleting category!', { autoClose: 3000 });
      }
    }
  };
  const openDeleteModal = stu => {
    setSelectedCategoryId(stu.stuid);
    setIsDeleteModalOpen(true);
  };


  // update student
  // const openUpdateModal = (stu) => {
  //   const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  //   if (file && !fileTypes.includes(file.type)) {
  //     setError('Error: Images Only (jpeg, jpg, png, gif)');
  //     return;
  //   }
  //   setIsUpdateModalOpen(true);
  //   setFKhNames(stu.fkh_names);
  //   setLkhNames(stu.lkh_name);
  //   setLen_name(stu.len_name);
  //   setFen_name(stu.fen_name);
  //   setClass_id(stu.clsss_id)
  //   setAge(stu.age);
  //   setDOB(stu.dob);
  //   setPhone(stu.phone);
  //   setEmail(stu.email);
  //   setGender(stu.gender);
  //   setAddress(stu.address);
  //   setExistingImage(stu.image); // Store existing image
  //   setFile(null);
  //   setSelectedCategoryId(stu.stuid);
  // };

  // const handleUpdateSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('fkh_names', fkh_names);
  //   formData.append('lkh_name', lkh_name);
  //   formData.append('len_name', len_name);
  //   formData.append('fen_name', fen_name);
  //   formData.append('class_id', clsss_id);
  //   formData.append('age', age);
  //   formData.append('dob', dob);
  //   formData.append('phone', phone);
  //   formData.append('email', email);
  //   formData.append('gender', gender);
  //   formData.append('address', address);

  //   if (file) {
  //     formData.append('file', file); // Append the file only if it's selected
  //   }

  //   try {
  //     await axios.put(`http://localhost:6700/api/student/${selectedCategoryId}`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     toast.success('Student updated successfully!', { autoClose: 3000 });
  //     setIsUpdateModalOpen(false);
  //     getAllStudent(); // Refresh the list of students
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('Error updating student!', { autoClose: 3000 });
  //   }
  // };

  const openUpdateModal = (stu) => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (file && !fileTypes.includes(file.type)) {
      setError('Error: Images Only (jpeg, jpg, png, gif)');
      return;
    }
    setIsUpdateModalOpen(true);
    setFKhNames(stu.fkh_names);
    setLkhNames(stu.lkh_name);
    setLen_name(stu.len_name);
    setFen_name(stu.fen_name);
    setClass_id(stu.clsss_id);
    setAge(stu.age);
    setDOB(stu.dob);
    setPhone(stu.phone);
    setEmail(stu.email);
    setGender(stu.gender);
    setAddress(stu.address);
    setExistingImage(stu.image);
    setFile(null);
    setSelectedCategoryId(stu.stuid);
  };

  const handleUpdateSubmit = async (e) => {
    setError(''); // Clear any previous errors

    // Check if file is of valid type
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (file && !fileTypes.includes(file.type)) {
      setError('Error: Images Only (jpeg, jpg, png, gif)');
      return;
    }

    // Optionally, check file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file && file.size > maxSize) {
      setError('Error: File size exceeds 5MB');
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('fkh_names', fkh_names);
    formData.append('lkh_name', lkh_name);
    formData.append('len_name', len_name);
    formData.append('fen_name', fen_name);
    formData.append('clsss_id', clsss_id);
    formData.append('age', age);
    formData.append('dob', dob);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('address', address);

    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.put(`http://localhost:6700/api/student/${selectedCategoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Student updated successfully!', { autoClose: 3000 });
      setIsUpdateModalOpen(false);
      getAllStudent();
    } catch (err) {
      console.error(err);
        
        // Display a user-friendly error message
        if (err.response && err.response.data) {
            setError(`Error: ${err.response.data.message || 'An error occurred'}`);
        } else {
            setError('Error uploading the file');
        }

        toast.error('Error updating student!', { autoClose: 3000 });
        setIsUpdateModalOpen(true);
    }
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
                    className="block md:w-full w-36 p-2 bg-slate-100 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Search Your Name ......" required />
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
                    ឈ្មោះខ្មែរ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ឈ្មោះអង្គគ្លេស
                  </th>
                  <th scope="col" className="py-3 px-6 ">
                    ឈ្មោះអនាព្យាបាយ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ភេទ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ថ្នាក់រៀន
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ថ្ថៃ ខៃ ឆ្នាំកំណើត
                  </th>
                  <th scope="col" className="px-6 py-3">
                    អាយុ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    អ៊ីម៊ែល
                  </th>

                  <th scope="col" className="px-6 py-3">
                    លេខទូរស័ព្ទ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    កន្លែងរស់នៅ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    រូបភាព
                  </th>
                  <th scope="col" className="px-6 py-3">
                    សកម្មភាព
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {student?.map((teachers, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100">
                    <td className='pl-4 px-6 py-3'>{index + 1}</td>
                    <td className=" font-semibold">
                      {teachers.lkh_name}      {teachers.fkh_names}
                    </td>
                    <td className=" font-semibold whitespace-nowrap">
                      {teachers.fen_name}    {teachers.len_name}
                    </td>
                    <td className="px-6">
                      {teachers.mother_names}   {teachers.Enmother_names}
                    </td>
                    <td className="px-6 whitespace-nowrap">
                      {teachers.gender}
                    </td>
                    <td className="px-6">
                      {teachers.names}
                    </td>
                    <td className="px-6 whitespace-nowrap">
                      {teachers.dob}
                    </td>
                    <td className="px-6 whitespace-nowrap">
                      {teachers.age}ឆ្នាំ
                    </td>
                    <td className="px-6 ">
                      {teachers.email}
                    </td>
                    <td className="px-6">
                      {teachers.phone}
                    </td>
                    <td className="px-6 w-30">
                      {teachers.address}

                    </td>
                    <td className="px-6 w-30">
                      <img src={`http://localhost:6700/image/${teachers.image}`} className="h-10 w-10 rounded hover:scale-150 duration-500" alt={teachers.name} />
                    </td>
                    <td className=" flex space-x-4">

                      <button
                        onClick={() => openUpdateModal(teachers)}
                        className='block text-white bg-blue-100 my-1 hover:bg-blue-500 font-medium rounded-full text-sm px-2 py-2 text-center'
                      >
                        <img src={iconedite} className='h-4' alt='Edit' />
                      </button>
                      <button
                        onClick={() => openDeleteModal(teachers)}
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
              <div className="relative w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                {/* header */}
                <div className="bottom-8 overflow-y-auto max-h-screen">
                  <form className="space-y-4" onSubmit={CreateStudent}>
                    {/* Step 1 */}
                    {step === 1 && (
                      <div className="px-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700">
                        <div className="flex items-center justify-between px-4 border-b rounded-t dark:border-gray-600">
                          <h2 className="text-xl font-bold my-4">ជំហានទី 1 ៖ ព័ត៌មានផ្ទាល់ខ្លួនរបស់សិស្ស</h2>
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
                        <div className="grid gap-2 grid-cols-2">
                          <div class="col-span-1 sm:col-span-1">
                            <label
                              for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">នាមត្រកូល​​ ខ្មែរ</label>
                            <input
                              type="text"
                              id="price"
                              value={lkh_name}
                              onChange={e => setLkhNames(e.target.value)}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white "
                              placeholder="" required
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="category"
                              class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">នាមខ្លូន​ ខ្មែរ</label>
                            <input
                              type="text"
                              value={fkh_names}
                              onChange={e => setFKhNames(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="" required
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label
                              for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">នាមត្រកូល​​​​ អង្គគ្លេស​ </label>
                            <input
                              type="text"
                              id="price"
                              value={len_name}
                              onChange={e => setLen_name(e.target.value)}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="" required
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="category"
                              class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">នាមខ្លូន​ អង្គគ្លេស</label>
                            <input
                              type="text"
                              value={fen_name}
                              onChange={e => setFen_name(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="" required
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-1">
                            <label for="category" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                              គ្រូបន្ទុកថ្នាក់
                            </label>
                            <select
                              id="category"
                              value={clsss_id}
                              required
                              onChange={e => setClass_id(e.target.value)} // Set the selected teacher ID
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            >
                              <option value="">ជ្រើសរើសថ្នាក់រៀន</option> {/* Default option */}
                              {classroomID.map((room) => (
                                <option key={room.roomid} value={room.roomid}>
                                  {room.names}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ថ្ងៃ ខែ ឆ្នាំកំណើត</label>
                            <input
                              type="date"
                              name="Text"
                              value={dob}
                              onChange={e => setDOB(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="category"
                              class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">អាយុ</label>
                            <input
                              type="number"
                              name="Text"
                              value={age}
                              onChange={e => setAge(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="" 
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">លេខទូរស័ព្ទ</label>
                            <input
                              type="text"
                              name="Text"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="" 
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">អ៊ីម៊ែល</label>
                            <input
                              type="email"
                              name="Text"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="examle@gmail.com" 
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="category"
                              class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">ភេទ</label>
                            <select id="category"
                              value={gender}
                              onChange={e => setGender(e.target.value)}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white">
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Orter</option>
                            </select>
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Photo</label>

                            <input
                              type="file"
                              
                              className='form-control'
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                            {error && <p className="text-danger">{error}</p>}
                          </div>

                          <div class="col-span-1 sm:col-span-1">
                            <label for="description" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">អស្ស័យដ្ឋាន</label>
                            <textarea id="description"
                              value={address}
                              onChange={e => setAddress(e.target.value)}
                              rows="4"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="អស្ស័យដ្ឋានបច្ចុប្បន្ន">
                            </textarea>
                          </div>

                        </div>
                        <div className="flex justify-end space-x-4 py-2">
                          <button
                            type="button"
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Step 2 */}
                    {step === 2 && (
                      <div className="px-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700">
                        <div className="flex items-center justify-between px-4 border-b rounded-t dark:border-gray-600">
                          <h2 className="text-xl font-bold my-4">ជំហានទី 2 ៖ ព័ត៌មានផ្ទាល់ខ្លួនរបស់អនាព្យាបាល</h2>
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
                        <div className="grid gap-2 grid-cols-2">
                          <div class="col-span-1 sm:col-span-1">
                            <label
                              for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ឈ្មោះខ្មែរ</label>
                            <input
                              type="text"
                              id="price"
                              value={m_kh_name}
                              onChange={e => setM_kh_name(e.target.value)}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white "
                              placeholder="" required
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="category"
                              class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">ឈ្មោះអង្គគ្លេស</label>
                            <input
                              type="text"
                              value={M_en_name}
                              onChange={e => setM_en_name(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="" required
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="category"
                              class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">អាយុ</label>
                            <input
                              type="number"
                              name="Text"
                              value={M_age}
                              onChange={e => setM_age(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="" required
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">លេខទូរស័ព្ទ</label>
                            <input
                              type="text"
                              name="Text"
                              value={M_phone}
                              onChange={e => setM_phone(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="" required
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="price"
                              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">អ៊ីម៊ែល</label>
                            <input
                              type="email"
                              name="Text"
                              value={M_email}
                              onChange={e => setM_email(e.target.value)}
                              id="price"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="examle@gmail.com" required
                            />
                          </div>
                          <div class="col-span-1 sm:col-span-1">
                            <label for="category"
                              class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">ភេទ</label>
                            <select id="category"
                              value={M_gender}
                              onChange={e => setM_gender(e.target.value)}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white">
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Orter</option>
                            </select>
                          </div>

                          <div class="col-span-1 sm:col-span-1">
                            <label for="description" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">អស្ស័យដ្ឋាន</label>
                            <textarea id="description"
                              value={M_address}
                              onChange={e => setM_address(e.target.value)}
                              rows="4"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                              placeholder="អស្ស័យដ្ឋានបច្ចុប្បន្ន">
                            </textarea>
                          </div>
                        </div>
                        <div className="flex py-2 justify-between">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
                          >
                            Back
                          </button>
                          <button
                            type="submit"

                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
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

          {/* update Modal */}
          {isUpdateModalOpen && (
            <div
              id={`insert-modal`}
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                {/* header */}
                <div className="bottom-8 overflow-y-auto max-h-screen">
                  <form className="space-y-4" onSubmit={handleUpdateSubmit}>

                    <div className="px-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700">
                      <div className="flex items-center justify-between px-4 border-b rounded-t dark:border-gray-600">
                        <h2 className="text-xl font-bold my-4">កែប្រែព័ត៌មានផ្ទាល់ខ្លួនរបស់សិស្ស</h2>
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
                      <div className="grid gap-2 grid-cols-2">
                        <div class="col-span-1 sm:col-span-1">
                          <label
                            for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">នាមត្រកូល​​ ខ្មែរ</label>
                          <input
                            type="text"
                            id="price"
                            value={lkh_name}
                            onChange={e => setLkhNames(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white "
                            placeholder="" required
                          />
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="category"
                            class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">នាមខ្លូន​ ខ្មែរ</label>
                          <input
                            type="text"
                            value={fkh_names}
                            onChange={e => setFKhNames(e.target.value)}
                            id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label
                            for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">នាមត្រកូល​​​​ អង្គគ្លេស​ </label>
                          <input
                            type="text"
                            id="price"
                            value={len_name}
                            onChange={e => setLen_name(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="category"
                            class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">នាមខ្លូន​ អង្គគ្លេស</label>
                          <input
                            type="text"
                            value={fen_name}
                            onChange={e => setFen_name(e.target.value)}
                            id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-1">
                          <label for="category" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            គ្រូបន្ទុកថ្នាក់
                          </label>
                          <select
                            id="category"
                            value={clsss_id}
                            required
                            onChange={e => setClass_id(e.target.value)} // Set the selected teacher ID
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                          >
                            <option value="">ជ្រើសរើសថ្នាក់រៀន</option> {/* Default option */}
                            {classroomID.map((room) => (
                              <option key={room.roomid} value={room.roomid}>
                                {room.names}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ថ្ងៃ ខែ ឆ្នាំកំណើត</label>
                          <input
                            type="date"
                            name="Text"
                            value={dob}
                            onChange={e => setDOB(e.target.value)}
                            id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required="" />
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="category"
                            class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">អាយុ</label>
                          <input
                            type="number"
                            name="Text"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">លេខទូរស័ព្ទ</label>
                          <input
                            type="text"
                            name="Text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="" required
                          />
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">អ៊ីម៊ែល</label>
                          <input
                            type="email"
                            name="Text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="examle@gmail.com" required
                          />
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="category"
                            class="block mb-2 text-lg text-gray-900 font-medium dark:text-white">ភេទ</label>
                          <select id="category"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Orter</option>
                          </select>
                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="price"
                            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Photo</label>

                          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                          {existingImage && !file && (
                            <img src={`http://localhost:6700/image/${existingImage}`} alt="Current" className='h-28 w-28 rounded-lg py-2' />
                          )}
                          {error && <p className="text-red-600">{error}</p>}

                        </div>
                        <div class="col-span-1 sm:col-span-1">
                          <label for="description" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">អស្ស័យដ្ឋាន</label>
                          <textarea id="description"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            rows="4"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                            placeholder="អស្ស័យដ្ឋានបច្ចុប្បន្ន">
                          </textarea>
                        </div>

                      </div>
                      <div className="flex justify-end space-x-4 py-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          រក្សាទុក
                        </button>
                      </div>
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

export default Student;

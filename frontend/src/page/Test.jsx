

import React, { useState } from 'react';

function ModalWizard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [nameKh, setNameKh] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);  // Reset to the first step when closing the modal
    // setNameKh('');
    // setNameEn('');
    // setPassword('');
    // setAddress('');
  };

  const handleNext = () => {
    if (step === 1) {

      if (nameKh && nameEn && password) {
        setStep(2);
      } else {
        alert('Please fill in all required fields.');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div>
      <button onClick={openModal} className="bg-blue-600 py-2 px-4 rounded-lg shadow-md dark:bg-slate-300">
        បង្កើត
      </button>

      {isModalOpen && (
        <div
          id="insert-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                បន្ថៃមគ្រូបង្រៀន
              </h3>
              <button
                type="button"
                className="hover:text-gray-600 bg-transparent hover:bg-gray-200 text-red-500 rounded-lg text-sm w-12 h-12 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
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
              <form className="space-y-4">
                {/* Step 1 */}
                {step === 1 && (
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="nameKhmer"
                          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                          ឈ្មោះខ្មែរ
                        </label>
                        <input
                          type="text"
                          id="nameKhmer"
                          name="nameKhmer"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          value={nameKh}
                          onChange={e => setNameKh(e.target.value)}
                          required
                        />
                        {errors.nameKhmer && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                            {errors.nameKhmer}
                          </p>
                        )}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="nameEnglish"
                          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                          ឈ្មោះអង់គ្លេស
                        </label>
                        <input
                          type="text"
                          id="nameEnglish"
                          name="nameEnglish"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w/full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          value={nameEn}
                          onChange={e => setNameEn(e.target.value)}
                          required
                        />
                        {errors.nameKhmer && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                            {errors.nameKhmer}
                          </p>
                        )}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
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
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Step 2: Additional Information</h2>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w/full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
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
    </div>
  );
}

export default ModalWizard;

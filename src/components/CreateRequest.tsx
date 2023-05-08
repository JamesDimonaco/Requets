'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


export default function CreateRequest() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    done: false,
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const { title } = formData;
    const userEmail = session?.user?.email;
    e.preventDefault();
    await fetch('/api/plexRequests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        userEmail
      }),
    });
    setFormData({
      title: '',
      type: '',
      done: false,
    });
    router.refresh();
  };

  return (
    <div className="container mx-auto bg-gradient min-h-screen py-6">
      <h1 className="text-4xl font-bold mb-6">Form Component</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-bold mb-2">
            Type:
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select type</option>
            <option value="Film">Film</option>
            <option value="TV series">TV series</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="done" className="block text-sm font-bold mb-2">
            Done:
          </label>
          <input
            type="checkbox"
            name="done"
            id="done"
            checked={formData.done}
            onChange={handleCheckboxChange}
            className="text-black focus:ring-black focus:border-black rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-yellow-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


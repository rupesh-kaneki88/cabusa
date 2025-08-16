'use client'
import { useTheme } from '@/components/ThemeProvider';
import { useState } from 'react';

const ContactForm = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    findUs: '',
    enquiry: '',
  });
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let tempErrors: any = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid';
    }
    if (!formData.findUs) tempErrors.findUs = 'Please select an option';
    if (!formData.enquiry) tempErrors.enquiry = 'Enquiry is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission logic here
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 uppercase italic">
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-gray-700">Name *</label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email *</label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="findUs" className="block text-sm font-bold text-gray-700">How did you find us? *</label>
        <select
          name="findUs"
          id="findUs"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        >
          <option value="">Please select</option>
          <option value="search">Search Engine</option>
          <option value="social">Social Media</option>
          <option value="friend">From a friend</option>
          <option value="other">Other</option>
        </select>
        {errors.findUs && <p className="text-red-500 text-xs mt-1">{errors.findUs}</p>}
      </div>
      <div>
        <label htmlFor="enquiry" className="block text-sm font-bold text-gray-700">Enquiry *</label>
        <textarea
          name="enquiry"
          id="enquiry"
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        ></textarea>
        {errors.enquiry && <p className="text-red-500 text-xs mt-1">{errors.enquiry}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold text-white cursor-pointer"
          style={{ backgroundColor: colors.thirdBackground, color: colors.secondaryBackground }}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

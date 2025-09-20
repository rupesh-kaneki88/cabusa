
'use client'
import { useTheme } from '@/components/ThemeProvider';
import { useState } from 'react';

const DonationForm = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    comments: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
  }

  const validate = () => {
    const tempErrors: FormErrors = {};
    if (!formData.name) tempErrors.name = 'Name/Organization is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid';
    }
    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    if (!formData.subject) tempErrors.subject = 'Subject is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <label htmlFor="name" className="block text-sm font-bold text-gray-500">Name/Organization *</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          aria-describedby="name-error"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        />
        {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-500">Email *</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          aria-describedby="email-error"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        />
        {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-gray-500">Phone Number *</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          aria-describedby="phone-error"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        />
        {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-gray-500">Subject *</label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          aria-describedby="subject-error"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        />
        {errors.subject && <p id="subject-error" className="text-red-500 text-xs mt-1">{errors.subject}</p>}
      </div>
      <div>
        <label htmlFor="comments" className="block text-sm font-bold text-gray-500">Comments</label>
        <textarea
          name="comments"
          id="comments"
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold text-white cursor-pointer"
          style={{ backgroundColor: colors.thirdBackground, color: colors.secondaryBackground }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DonationForm;

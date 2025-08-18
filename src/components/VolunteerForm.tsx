'use client'
import { useTheme } from '@/components/ThemeProvider';
import { useState } from 'react';

const VolunteerForm = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    helpType: '',
    location: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  interface FormErrors {
    firstName?: string;
    email?: string;
    mobile?: string;
    helpType?: string;
  }

  const validate = () => {
    const tempErrors: FormErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid';
    }
    if (!formData.mobile) tempErrors.mobile = 'Mobile number is required';
    if (!formData.helpType) tempErrors.helpType = 'Please select a help type';
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
    <div className="container mx-auto px-4 md:px-14 py-8">
      <form onSubmit={handleSubmit} className="space-y-6 uppercase italic">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-bold text-gray-700">First Name *</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              aria-describedby="firstName-error"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
            {errors.firstName && <p id="firstName-error" className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email *</label>
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
          <label htmlFor="mobile" className="block text-sm font-bold text-gray-700">Mobile Number *</label>
          <input
            type="tel"
            name="mobile"
            id="mobile"
            required
            aria-describedby="mobile-error"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange}
          />
          {errors.mobile && <p id="mobile-error" className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
        </div>
        <div>
          <label htmlFor="helpType" className="block text-sm font-bold text-gray-700">Type of Help *</label>
          <select
            name="helpType"
            id="helpType"
            required
            aria-describedby="helpType-error"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange}
          >
            <option value="">Please select</option>
            <option value="match-day">Match Day Support</option>
            <option value="admin">Administrative Help</option>
            <option value="fundraising">Fundraising</option>
            <option value="other">Other</option>
          </select>
          {errors.helpType && <p id="helpType-error" className="text-red-500 text-xs mt-1">{errors.helpType}</p>}
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-bold text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange}
          />
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
    </div>
  );
};

export default VolunteerForm;

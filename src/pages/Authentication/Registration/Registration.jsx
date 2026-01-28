import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import { IoEyeOutline } from "react-icons/io5";
import { LuEyeClosed } from "react-icons/lu";
import VistaLand from '../../Shared/ProjectLogo/VistaLand';

const Registration = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const toggleShow = () => setShowPassword(prev => !prev);

  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(async () => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Welcome to VistaLand!',
          timer: 2000,
          showConfirmButton: false
        });

        const userInfo = {
          name: data.name,
          email: data.email,
          role: 'user',
          isFirstLogin: true,
          createdAt: new Date().toISOString()
        };

        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        };

        await updateUserProfile(userProfile);
        await axiosInstance.post('/users', userInfo);
        navigate(from);
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.message
        });
      });
  };

  const handleRegisterGoogle = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: 'user',
          isFirstLogin: true,
          createdAt: new Date().toISOString()
        };

        try {
          await axiosInstance.post('/users', userInfo);
        } catch (err) {
          console.error("Failed to save Google user:", err);
        }

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Welcome to VistaLand!',
          timer: 2000,
          showConfirmButton: false
        });

        navigate(from);
      })
      .catch(err => {
        console.error("Google Sign-in failed:", err);
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-in Failed',
          text: err.message
        });
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_upload_Key}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed:", err);
      Swal.fire({
        icon: 'error',
        title: 'Image Upload Failed',
        text: 'Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-white">
      <div className="flex justify-center mx-auto mb-8">
        <VistaLand />
      </div>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 border border-red-500">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-red-600">
          Create An Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block font-medium mb-1 text-black">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="input input-bordered w-full border-black"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block font-medium mb-1 text-black">Profile Picture</label>
            <input
              onChange={handleImageUpload}
              type="file"
              className="file-input file-input-bordered w-full cursor-pointer border-black"
            />
            {profilePic && (
              <img src={profilePic} alt="Preview" className="h-16 w-16 rounded-full mt-2" />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1 text-black">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="input input-bordered w-full border-black"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className='relative'>
            <label className="block font-medium mb-1 text-black">Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'At least 6 characters' },
                pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/, message: 'Must include capital & special char' }
              })}
              type={showPassword ? 'text' : 'password'}
              className="input input-bordered w-full border-black"
              placeholder="Create a password"
            />
            <button
              type='button'
              className='absolute right-4 top-9 cursor-pointer text-red-600'
              onClick={toggleShow}
            >
              {showPassword ? <IoEyeOutline size={23} /> : <LuEyeClosed size={23} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className='relative'>
            <label className="block font-medium mb-1 text-black">Confirm Password</label>
            <input
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: value => value === watch('password') || 'Passwords do not match'
              })}
              type={showConfirm ? 'text' : 'password'}
              className="input input-bordered w-full border-black"
              placeholder="Confirm your password"
            />
            <button
              type='button'
              className='absolute right-4 top-9 cursor-pointer text-red-600'
              onClick={() => setShowConfirm(prev => !prev)}
            >
              {showConfirm ? <IoEyeOutline size={23} /> : <LuEyeClosed size={23} />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Register Button */}
          <button className="btn w-full bg-red-600 text-white hover:bg-red-700 border-none font-semibold">
            Register
          </button>

          <p className="text-center mt-2 text-black">
            Already have an account?{' '}
            <Link to="/login" className="ml-1 text-red-600 hover:underline">Login</Link>
          </p>

          <div className="divider text-red-600">OR</div>

          {/* Google Registration */}
          <button
            onClick={handleRegisterGoogle}
            type="button"
            className="btn w-full bg-white text-black border-red-500 hover:bg-red-50 flex items-center justify-center gap-2"
          >
            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </g>
            </svg>
            Continue with Google
          </button>

        </form>
      </div>
    </div>
  );
};

export default Registration;

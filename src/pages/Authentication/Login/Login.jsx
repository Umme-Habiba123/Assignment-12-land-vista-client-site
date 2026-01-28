import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import VistaLand from '../../Shared/ProjectLogo/VistaLand';
import { IoEyeOutline } from 'react-icons/io5';
import { LuEyeClosed } from 'react-icons/lu';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.init';

const Login = () => {
  const { signInWithGoogle, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosIntance = useAxios();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const toggleShow = () => setShowPassword(prev => !prev);

  const from = location.state?.from || '/';

  // Email/password login
  const onSubmit = data => {
    signIn(data.email, data.password)
      .then(async (result) => {
        const loggedUser = result.user;

        const userInfo = {
          email: loggedUser.email,
          role: 'user',
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        };

        await axiosIntance.post('/users', userInfo);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome, ${loggedUser.email}!`,
          timer: 2000,
          showConfirmButton: false
        });

        navigate(from);
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message
        });
      });
  };

  // Google login
  const handleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        localStorage.setItem('token', token);

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: 'user',
          isFirstLogin: true,
          createdAt: new Date().toISOString()
        };

        try {
          await axiosIntance.get(`/users/${encodeURIComponent(user.email)}`);
        } catch (err) {
          if (err.response?.status === 404) {
            await axiosIntance.post('/users', userInfo);
          }
        }

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome, ${user.displayName}!`,
          timer: 2000,
          showConfirmButton: false
        });

        navigate(from);
      })
      .catch(error => console.error("Google Sign-in failed:", error));
  };

  // Forgot password
  const handleForgotPassword = async () => {
    const email = getValues('email');
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter your email first!',
        text: 'Please provide your email to reset password.'
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: 'success',
        title: 'Email Sent!',
        text: `A password reset link has been sent to ${email}. Check your inbox or spam folder.`,
        timer: 4000,
        showConfirmButton: true
      });
    } catch (error) {
      console.error(error);
      let message = '';
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many attempts. Try again later.';
          break;
        default:
          message = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Project Logo */}
      <div className="mb-6">
        <VistaLand />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-red-500 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-red-600">Login</h2>

          {/* Email */}
          <div>
            <label className="label text-black">Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="input w-full border border-red-400 px-3 py-2 rounded-md"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label text-black">Password</label>
            <input
              {...register('password', { required: true, minLength: 6, maxLength: 20 })}
              type={showPassword ? 'text' : 'password'}
              className="input w-full border border-red-400 px-3 py-2 rounded-md"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 cursor-pointer text-red-600"
              onClick={toggleShow}
            >
              {showPassword ? <IoEyeOutline size={22} /> : <LuEyeClosed size={22} />}
            </button>
            {errors.password?.type === 'required' && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-red-600 hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            className="btn w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg mt-2"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center mt-2 text-sm text-black">
            Don't have an account?{' '}
            <Link state={from} to={'/registration'}>
              <button className="btn btn-link text-red-600">Register</button>
            </Link>
          </p>

          {/* Divider */}
          <div className="divider text-red-600">OR</div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleSignIn}
            className="btn w-full bg-white text-black border border-red-400 hover:bg-red-50 mt-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

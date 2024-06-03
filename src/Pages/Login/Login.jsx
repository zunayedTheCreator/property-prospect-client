import React, { useContext } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import lock from '../../../public/images/lock.gif'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {

    const {signIn, googleLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Signed In!",
                showConfirmButton: false,
                timer: 2000
            });
            navigate(from, {replace: true});
        })
        .catch(error => {
            toast.error(error)
        })
    } 

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleLogin = () => {
        googleLogin(googleProvider)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Signed In!",
                showConfirmButton: false,
                timer: 2000
            });
            navigate(from, {replace: true});
        })
        .catch(error => {
            toast.error(error)
        })
    }

    return (
        <div className='pt-24 mb-6'>
            <div  className='max-w-sm border-2 mx-auto rounded-md border-[#FEFFFF]'>
                <h2 className='text-[#FEFFFF] font-bold text-4xl py-3 text-center bg-[#17242A] rounded-t-md border-b-2 border-[#FEFFFF]'>Login</h2>
                <form onSubmit={handleLogin} className='px-3 py-4 container-bottom'>
                    <div>
                        <input type="email" name='email' placeholder="Enter Your Email" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold mb-4 mt-3" />
                        <input type="password" name='password' placeholder="Your Password" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold mb-3" />
                        <button className='btn bg-[#17242A] hover:bg-black font-bold text-[#FEFFFF] border-none w-full mb-3'>Login</button>
                    </div>
                    <div className='flex justify-center'>
                        <img src={lock} alt="" />
                    </div>
                </form>
                <div className='w-full border-y-2 border-[#FEFFFF] flex items-center justify-around'>
                    <h3 className='text-[#FEFFFF] font-bold text-lg'>Or Login With:</h3>
                    <div className='flex items-center gap-5 w-fit my-3'>
                        <FaGoogle onClick={handleGoogleLogin} className='text-5xl text-[#17242A] bg-[#FEFFFF] rounded-full p-3 hover:rotate-12 duration-200 cursor-pointer hover:p-2'></FaGoogle>
                        <FaGithub className='text-5xl text-[#17242A] bg-[#FEFFFF] rounded-full p-3 hover:rotate-12 duration-200 cursor-pointer hover:p-2'></FaGithub>
                    </div>
                </div>
                <div>
                    <h3 className='text-[#FEFFFF] font-bold text-center py-2'>New Here? Please <Link to={'/register'} className='text-[#17242A] font-bold'>Register</Link></h3>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
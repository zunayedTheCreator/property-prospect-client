import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const Register = () => {

    const {createUser, profileUpdate} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/;
        if (passwordRegex.test(password)) {
            console.log(name, email, password, image);
            createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                profileUpdate(name, image)
                .then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully Registered!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/');
                })
                .catch(error => {
                    toast.error(error)
                })
            })
            .catch(error => {
                toast.error(error)
            })
        }
        else{
            toast.error('Your Password must have at least one Upper and Lower Case, 1 number, 1 special character and must be 8 characters long.')
        }
    } 

    return (
        <div className='mt-24 mb-6'>
            <div  className='max-w-sm border-2 mx-auto rounded-md border-[#FEFFFF]'>
                <h2 className='text-[#FEFFFF] font-bold text-4xl py-3 text-center bg-[#17242A] rounded-t-md border-b-2 border-[#FEFFFF]'>Register</h2>
                <form onSubmit={handleSignUp} className='px-3 py-4'>
                    <div>
                        <input required type="text" name='name' placeholder="Enter Your Name" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold mb-4 mt-3" />
                        <input required type="email" name='email' placeholder="Enter Your Email" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold mb-4" />
                        <input required type="password" name='password' placeholder="Your Password" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold mb-3" />
                        <div>
                            <input type="text" name='image' placeholder="Your Photo URL" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold" />

                            <h3 className='text-[#FEFFFF] font-bold my-1 ml-2'>Or</h3>
                            <input type="file" className="file-input bg-[#FEFFFF] w-full border-none rounded-md file-input-black mb-4 font-bold text-[#17242A]" />
                        </div>
                        <button className='btn bg-[#17242A] hover:bg-black font-bold text-[#FEFFFF] border-none w-full mb-3'>Register</button>
                    </div>
                </form>
                <div className='border-t-2 border-[#FEFFFF]'>
                    <h3 className='text-[#FEFFFF] font-bold text-center py-2'>Already A Member? Please <Link to={'/login'} className='text-[#17242A] font-bold'>Login</Link></h3>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
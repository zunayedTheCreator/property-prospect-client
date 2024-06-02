import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className='mt-24 mb-6'>
            <div  className='max-w-sm border-2 mx-auto rounded-md border-[#FEFFFF]'>
                <h2 className='text-[#FEFFFF] font-bold text-4xl py-3 text-center bg-[#17242A] rounded-t-md border-b-2 border-[#FEFFFF]'>Register</h2>
                <form className='px-3 py-4 container-bottom'>
                    <div>
                        <input type="text" name='name' placeholder="Enter Your Name" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold mb-4 mt-3" />
                        <input type="email" name='email' placeholder="Enter Your Email" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold mb-4" />
                        <input type="password" name='password' placeholder="Your Password" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold mb-3" />
                        <div>
                            <input type="text" name='image' placeholder="Your Photo URL" className="input input-bordered w-full rounded-md bg-[#FEFFFF] text-[#17242A] font-bold" />

                            <h3 className='text-[#FEFFFF] font-bold my-1 ml-2'>Or</h3>
                            <input type="file" className="file-input bg-[#FEFFFF] w-full border-none rounded-md file-input-black mb-4 font-bold text-[#17242A]" />
                        </div>
                        <button className='btn bg-[#17242A] hover:bg-black font-bold text-[#FEFFFF] border-none w-full mb-3'>Register</button>
                    </div>
                    <div className='flex justify-center'>
                        {/* <img src={} alt="" /> */}
                    </div>
                </form>
                <div className='border-t-2 border-[#FEFFFF]'>
                    <h3 className='text-[#FEFFFF] font-bold text-center py-2'>Already A Member? Please <Link to={'/login'} className='text-[#17242A] font-bold'>Login</Link></h3>
                </div>
            </div>
        </div>
    );
};

export default Register;
import React from 'react';
import useAxiosSecure, { axiosSecure } from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Header from '../../../../Shared/Header/Header';
import { FaTrashAlt } from 'react-icons/fa';
import { MdBlockFlipped } from "react-icons/md";
import Swal from 'sweetalert2'

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user')
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/admin/${user._id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${user.name} is a admin now!`,
                            showConfirmButton: false,
                            timer: 2000
                          });
                    }
                })
            }
          });
    }

    const handleMakeAgent = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/agent/${user._id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${user.name} is a agent now!`,
                            showConfirmButton: false,
                            timer: 2000
                          });
                    }
                })
            }
          });
    }

    const handleDeleteUser = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your review deleted successfully.",
                            icon: "success"
                        });
                    }
                })
            }
          });
    }

    return (
        <div className='mt-8'>
            <Header header="Manage Users"></Header>
            <div className='px-2 md:px-4 mt-7'>
                <div className="overflow-x-auto rounded-t-lg border-[#FEFFFF]">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#17242A] text-[#FEFFFF]'>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Make Admin</th>
                            <th>Make Agent</th>
                            <th>Mark as Fraud</th>
                            <th>Delete User</th>
                        </tr>
                        </thead>
                        <tbody className='text-[#17242A] font-bold'>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={() => handleMakeAdmin(user)} className="btn min-h-0 h-8 bg-transparent hover:bg-[#DEF2F1] font-bold rounded px-4 border-2 border-[#FEFFFF] text-[#FEFFFF] hover:text-black hover:border-[#FEFFFF]">Make Admin</button></td>
                                    <td><button onClick={() => handleMakeAgent(user)} className="btn min-h-0 h-8 bg-transparent hover:bg-[#DEF2F1] font-bold rounded px-4 border-2 border-[#FEFFFF] text-[#FEFFFF] hover:text-black hover:border-[#FEFFFF]">Make Agent</button></td>
                                    <td><button className="btn min-h-0 h-8 bg-transparent hover:bg-red-600 font-bold rounded px-4 border-2 border-red-600 text-red-600 hover:text-[#FEFFFF]  hover:border-red-700"><MdBlockFlipped className='text-lg'></MdBlockFlipped> Fraud</button></td>
                                    <td><button onClick={() => handleDeleteUser(user._id)} className="btn btn-square min-h-0 h-10 w-10 bg-red-600 hover:bg-red-500 border-none">
                                            <FaTrashAlt className='text-lg text-[#FEFFFF]'></FaTrashAlt>
                                        </button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
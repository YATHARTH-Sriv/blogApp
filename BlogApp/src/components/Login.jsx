import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as sliceLogin } from '../features/authSlice'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {Logo,Input} from "./index"

function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{register,handleSubmit}=useForm()
    const [error, seterror] = useState("")
    const login=async (data)=>{
        seterror("")
        try {
            const session=await authService.login(data)
            if(session){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(sliceLogin(userData))
                navigate="/"
            }
        } catch (error) {
            seterror(error.message)
            console.log(error)
        }

    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                 <Input
                 label="email"
                 type="email"
                 placeholder='Enter your Email address'
                 {...register("email",{
                    required:true,
                    validate:{
                        matchpattern:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter a valid email address"
                    }
                 })}
                 />
                 <Input
                 label="password"
                 type="password"
                 placeholder='enter a password'
                 {...register("password",{
                    required:true,
                    validate:{
                        matchpattern:(value)=>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Enter a valid password"
                    }
                 })}
                 />
                 <Button
                type="submit"
                className="w-full"
                >Log in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
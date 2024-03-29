import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService, { AuthService } from '../appwrite/auth'
import { login } from '../features/authSlice'
import { useForm } from 'react-hook-form'
import {Logo,Input} from "./index"

function Signup() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [error, seterror] = useState("")
    const{register,handleSubmit}=useForm()
    const Signin=async (data)=>{
          seterror("")
          try {
            const create=await authService.createAccount(data)
            if(create){
              const userData=await authService.getCurrentUser()
              if(userData){
              dispatch(login(userData))
              navigate="/"
              }
            }
          } catch (error) {
            console.log(error)
            seterror(error.message)
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
        <form onSubmit={handleSubmit(Signin)} className='mt-8'>
            <div className='space-y-5'>
                 <Input
                 label="Username"
                 type="text"
                 placeholder="Enter your username"
                 {...register("Username",{
                    required:true
                 })}
                 />
                 <Input
                 label="Email"
                 type="email"
                 placeholder="Enter your email"
                 {...register("email",{
                    required:true,
                    validate:{
                        matchpattern:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter a valid email address"
                    }
                 })}
                 />
                 <Input
                 label="Password"
                 type="password"
                 placeholder="Enter your password"
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
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Signup
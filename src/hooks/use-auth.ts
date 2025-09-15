import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


const signInSchema = z.object({
    email : z.email("Invalid email address"),
    password : z.string().min(6, "Password must be at least 6 characters"),
})

const signUpSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email: z.email("Invalid username address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignInData = z.infer<typeof signInSchema>
type SignUpData = z.infer<typeof signUpSchema>


export const useAuth = () => {
    const { signIn, signOut } = useAuthActions();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const signInForm = useForm<SignInData>({
        resolver : zodResolver(signInSchema),
        defaultValues : {
            email:  '',
            password: ''
        }
    })

    const signUpForm = useForm<SignUpData>({
        resolver : zodResolver(signUpSchema),
        defaultValues : {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    })

    const handleSignIn = async (data : SignInData) => {
        setIsLoading(true);
        try {
            await signIn("password",{
                email: data.email,
                password: data.password,
                flow : 'signIn'
            });
            router.push("/dashboard");
        }catch (error) {
            console.error(error);
           signInForm.setError('password',{
               message : "Invalid email address or password",
           })
        }finally {
            setIsLoading(false);
        }
    }

    const handleSignUp = async (data: SignUpData) => {
        setIsLoading(true);
        try {
            await signIn("password",{
                email: data.email,
                password: data.password,
                flow : 'signUp',
                name : `${data.firstName} ${data.lastName}`,
            })
            router.push("/dashboard");

        }catch (error) {
            console.error("Signup Error",error);
            signUpForm.setError('root',{
                message : "Failed to create account, please try again",
            })
        }finally {
            setIsLoading(false);
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/auth/sign-in");
        }catch (error) {
            console.error(error);
        }
    }

    return {
        handleSignIn,
        handleSignUp,
        handleSignOut,
        signInForm,
        signUpForm,
        isLoading,
    }
}
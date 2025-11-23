"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


// definition de type d utilisateur 
type userLogin={
    email:string
    password:string 
    role:string
}

type Erreur={
    field:string
    message:string
}


export default function LoginPage(){

    let defaultUser:userLogin={
        email:"",
        password:"",
        role:""
    }
    
    const [userLogin,setUserlogin]=useState<userLogin>(defaultUser)
    const[EmailError,setEmailError]=useState<Erreur>()
    const[PasswordError,setPasswordError]=useState<Erreur>()
    const [isLoading,setLoading]=useState<boolean>(false)
    const [connexionError,setConnexionError]=useState<string>("");
    const router=useRouter()

    // cette fonction change les champs lorsque l utilisateur entrez ses information
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setConnexionError("")
        const {name,value}=e.target;
        setUserlogin({...userLogin,[name]:value})
    }

    // fonction pour validation des inputs
    const HandleBlur=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target

        if(name=='email'){
            if(value=="" || value==" "){
                setEmailError({field:name,message:"Email is required"})
            }
            else if(value.indexOf("@")==-1){
                setEmailError({field:name,message:"Invalid email please enter a valid Email"})
            }
            else{
                setEmailError({field:"", message:""})
            }
        }
        
        if(name=="password"){
         
            if(value=="" || value==" "){
                setPasswordError({field:name,message:"Password is required"})
            }
            else{
                setPasswordError({field:"", message:""})
            }

        }
    }

    // fonction submit pour se connecter 
    const handleSubmit=async()=>{
        setLoading(true)

        let response=await fetch("/api/auth",{
            method:"POST",
            headers:{'Content-Type':"Application/json"},
            body:JSON.stringify(userLogin)
        })

        let data=await response.json();
        if (response.ok){
            setConnexionError("")
            toast.success(data.message,{position:"top-center",duration:3000})
            if(userLogin.role=="employee")router.replace("/expenses")
            else router.replace("/manager")
            localStorage.setItem("user_login",JSON.stringify({email:userLogin.email,role:userLogin.role}))
        }
        else{
            setConnexionError(data.message)
        }

        setLoading(false)

    }
    return(<>
    
    <div className="w-full min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center py-6 flex-col px-10 shadow-xs shadow-black rounded-xl" >
            <h1 className="text-xl text-gray-950 font-bold">Welcome back</h1>
            <p className="text-sm text-gray-700">Please Enter your details to sign in</p>
            {connexionError&&<p className="text-sm text-red-400">{connexionError}</p>}
            <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-1">
                    <Label className="text-gray-950">Email</Label>
                    <Input  name="email" value={userLogin.email} onChange={handleChange} onBlur={HandleBlur} className={`focus-visible:ring-0 focus-visible:ring-offset-0 w-80 ${(EmailError?.message || connexionError)&&'text-red-500 border-2 border-red-500'}`} type="Email" required placeholder="Ennter your email"/>
                     {EmailError?.message&&<p className="text-xs text-red-500">{EmailError.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="text-gray-950">Password</Label>
                    <Input value={userLogin.password} onChange={handleChange} onBlur={HandleBlur} name="password" type="password" className={`focus-visible:ring-0 focus-visible:ring-offset-0 w-80 ${(PasswordError?.message|| connexionError)&&'text-red-500 border-2 border-red-500'}`} required placeholder="Ennter your email"/>
                   {PasswordError?.message&&<p className="text-xs text-red-500">{PasswordError.message}</p>}
                </div>
                
                <div>
                    <Label >Role</Label>
                     <Select name="role" onValueChange={(value)=>setUserlogin({...userLogin,role:value})}>
                        <SelectTrigger className="w-80">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent className="bg-white">
                            <SelectItem value="manager">manager</SelectItem>
                            <SelectItem value="employee">employee</SelectItem>
                        </SelectContent>
                    </Select>
                    
                </div>
                
            </div>
            <div>
                <Button
                    disabled={userLogin.email=="" || EmailError?.message!="" || PasswordError?.message!=""}
                    type="button" onClick={handleSubmit} variant={'secondary'} className="bg-green-400 cursor-pointer mt-6 w-80 text-sm text-white font-semibold">
                    {isLoading&&(<p className="flex gap-1 justify-center items-center"><Loader2 className="animate-spin"></Loader2><span>connicting...</span></p>)}
                    {!isLoading&&<span>se connecter</span>}
                </Button>
            </div>
        </div>
    </div>
    
    </>)
}
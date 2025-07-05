import { createContext, useContext, useEffect, useState } from "react";
import { initialSignInFormData, initialSignUpFormData } from "../../config";
import { checkauthservice, loginUserservice, RegisterUserservice } from "../../services";
import { Skeleton } from "../../components/ui/skeleton";

export const AuthContext=createContext(null); 

export default function AuthProvider({children}){
      const [signinFormData,setsigninFormData]=useState(initialSignInFormData);
      const [signupFormData,setsignupFormData]=useState(initialSignUpFormData);
      const [auth,setauth]=useState({
          authenticate:false,
          user:null
      });
      const [loading,setloading]=useState(true);
      async function handleregisterUser(event){
         event.preventDefault();
          const data=await RegisterUserservice(signupFormData);
          console.log(data);
      }
      async function handleSigninUser(event){
         event.preventDefault();
         console.log(signinFormData);
          const data=await loginUserservice(signinFormData);
          console.log(data); 
          if(data.success){
              sessionStorage.setItem('accessToken',JSON.stringify(data.data.accessToken));
              setauth({
                authenticate:true,
                user:data.data.user
                
              })
              setloading(false)
          }else {
            setauth({
               authenticate:false,
               user:null
            })
            setloading(false)
          }
      }
   async function checkAuthuser(){

      try {
        const data=await checkauthservice();
       if(data.success){
           setauth({
             authenticate:true,
             user:data.data.user
           })
            setloading(false)
       }else {
           setauth({
            authenticate:false,
            user:null
           })
            setloading(false)
       }
      } catch (error) {
        if(!error?.data?.data.success){
            setauth({
            authenticate:false,
            user:null
           })
            setloading(false)
        }
      }
   }
   function resetCrendentials(){
       setauth({
        authenticate:false,
        user:null
       })
   }
   useEffect(()=>{
      checkAuthuser();
   },[])
   console.log(auth);

   return (
     <AuthContext.Provider value={{
       signinFormData,  
       setsigninFormData,
       signupFormData,
       setsignupFormData,
       handleregisterUser,
       handleSigninUser,
       auth,
       resetCrendentials,
     }}>
       {
        loading? <Skeleton/>:children
       }
     </AuthContext.Provider>
   )
}
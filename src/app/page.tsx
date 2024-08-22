import Image from "next/image";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import HomePage from "@/components/UserInfo";
import Login from "@/components/Login/Login";
import {redirect} from "next/navigation";

export default async function Home() {

  const session= await getServerSession(authOptions);

  if(session){
    return redirect("/dashboard");
  }

  console.log("session",session);

  return (
      <Login />
  );
}

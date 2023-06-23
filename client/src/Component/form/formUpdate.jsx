import { useState } from "react";
import FormClient from "./formClient";
import NormalButton from "../Buttons/normalButton";

export default function FormUpdate() {
  const [isActive,setIsActive] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    phone: '',
    date: '',
    email: '',
    comments: '',
    cobrador: '',
    cobradorId: '',
    status:'',
    statusId: '',
    vendedora: '',
    vendedoraId:'',
  });
  const postData = () =>{
    const requiredData = ['name','cobrador','date','status','vendedora']
    const isUpdate=requiredData.reduce((p,c)=>!!userData[c]&&p,true)

    console.log(isUpdate)
  }

  const buttonParams = {name:'button', params:{className:'button', onClick:postData}}
  return (<>
  <FormClient {...{userData, setUserData}}/>
  <NormalButton {...buttonParams}/>
  {isActive&&<div>Se agregaran estos:</div>}
  </>)
}
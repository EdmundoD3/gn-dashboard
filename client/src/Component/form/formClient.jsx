import { Suspense, useEffect, useState } from "react";
import { fetchData } from "../../Hooks/fetchData";
// import './styles.css'
import DropBox from "../DropBoxes/DropBox";
import CobradorDropbox from "../DropBoxes/CobradorDropBox";

const url = "/api/v1/client/data"
const apiDataInit = fetchData({
  url, params: {
    'name': '',
    'lastName': '',
    'phone': '',
    'email': '',
    'date': ''
  }
})

export default function FormClient() {
  const [apiData, setApiData] = useState(apiDataInit);
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    phone: '',
    date: '',
    email: '',
    comments: ''
  });

  useEffect(() => {
    const { name, lastName, phone, email } = userData
    // verify that there is no other client with that data
    setApiData(fetchData({
      url, params: {
        'name': name,
        'lastName': lastName,
        'phone': phone,
        'email': email
      }
    }))
    return () => {
    };
  }, [userData]);
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    const newValues = {
      ...userData,
      [name]: value,
    };
    setUserData(newValues);
  }
  // `cobrador_id` INTEGER NOT NULL,\
  // `status_id` INTEGER NOT NULL,\
  // `ischange` INTEGER NOT NULL DEFAULT 1,\
  // `id_mdb` TEXT NULL,\
  // `vendedora_id` INTEGER NOT NULL,\
  const propsUserDropBox = { values: userData, setValues: setUserData, handleChange, apiData }
  const props = {
    name: { name: "Nombre", propertyName: "name" },
    lastname: { name: "Apellido", propertyName: "lastname" },
    phone: { name: "telefono", propertyName: "phone" },
    email: { name: "email", propertyName: "email" },
    date: { name: "date", propertyName: "date", inputProps: { type: "date" } }
  }
  return (<>
    <form onSubmit={handleSubmit}>
      {Object.keys(props).map((e) => <DropBox key={props[e].propertyName} {...props[e]} {...propsUserDropBox} />)}
      <CobradorDropbox />
    </form>
  </>)
}
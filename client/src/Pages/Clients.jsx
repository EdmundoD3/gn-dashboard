import React from "react";
import AddNotas from "./AddNotas";
import FormClient from "../Component/form/formClient";


export default function Clients() {

  return (
    <div className="Clients">
      <FormClient/>
      <AddNotas/>
    </div>
  );
}

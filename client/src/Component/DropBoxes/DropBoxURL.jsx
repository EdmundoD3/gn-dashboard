import { useEffect, useState } from "react";
import DropBox from "./DropBox";
import { fetchData } from "../../Hooks/fetchData";


export default function DropBoxUrl({ url = "/api/v1/cobrador", fetchParam = "cobrador", labelName = "Cobrador" }) {
  const fetchDataDropBox = fetchData(url)
  const apiDataInit = fetchDataDropBox.get({
    url:'/',
    params: {
      [fetchParam]: '',
    }
  })

  const nameId = fetchParam + 'Id'

  return ({ values, setValues }) => {
    const [apiData, setApiData] = useState(apiDataInit);

    useEffect(() => {
      const paramData = values[fetchParam]
      setApiData(fetchDataDropBox.get({
        url:'/', params: {
          [fetchParam]: paramData,
        }
      }))
      return () => {
      };
    }, [values]);

    function handleChange(evt) {
      evt.preventDefault()
      const { name, value } = evt.target;
      // if exist value and not
      const isData = (e) => e[fetchParam] === value
      const newData = data.find(isData)||{id:true}
      const { id } = newData
      console.log(nameId)
      const newValues = {
        ...values,
        [name]: value,
        [nameId]:!id||id
      };
      setValues(newValues);

    };

    const propsDropBox = { values, setValues, handleChange, apiData };
    const { data } = apiData.read();
    // console.log(fetchParam,!!values[fetchParam],data)
    return (<>
      <DropBox key={fetchParam} {...{ name: labelName, propertyName: fetchParam }} {...propsDropBox} />
    </>)
  }
}
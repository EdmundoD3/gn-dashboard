import { Suspense, useState } from "react";
import './styles.css'


export default function DropBox({ name = "DropBox", values, handleChange, setValues, propertyName = '', apiData, inputProps = { type: 'text' } }) {
  const [selectedSpan, setSelectedSpan] = useState(0);

  function handleSubmit(evt) {
    evt.preventDefault();
  }
  function setNewValue({ value }) {
    const newValues = {
      ...values,
      [propertyName]: value,
    };
    setValues(newValues);
  }
  function setChange(evt) {
    const value = evt.target.innerText
    const newValues = {
      ...values,
      [propertyName]: value,
    };
    setValues(newValues);
  }
  const keyforList = ({ code }) => {
    const size = data.length
    if (!data[selectedSpan]) return
    if (size === 0) return
    if (code === 'ArrowUp') return setSelectedSpan(selectedSpan > 0 ? selectedSpan - 1 : size - 1)
    if (code === 'ArrowDown') return setSelectedSpan(selectedSpan < size - 1 ? selectedSpan + 1 : 0)
    const setSelectedData = () => {
      const selectedData = { name: propertyName, value: data[selectedSpan][propertyName] }
      setNewValue(selectedData)
      setSelectedSpan(0)
    }
    if (code === 'Enter') return setSelectedData()
    if (code === 'Tab') return setSelectedData()
  }

  const { data } = apiData.read();
  return (<>
    <label>
      {name}:
      <div className="select-dropbox">
        <input className="select-dropbox-input"
          name={propertyName}
          {...inputProps}
          value={values[propertyName] || ''}
          onSubmit={handleSubmit}
          onChange={handleChange} onKeyDown={keyforList} />
        <div className="select-container" >
          <Suspense fallback={<span className="select-box" key={`suspenseid-${propertyName}`} >Loading...</span>}>
            {data?.map((e, index) => <span
              className={`select-box ${selectedSpan === index ? 'select-mark' : ''}`}
              key={e.id}
              value={e[propertyName]}
              onClick={setChange}
            >{e[propertyName]}</span>)}
          </Suspense>
        </div>
      </div>
    </label>
  </>)
}
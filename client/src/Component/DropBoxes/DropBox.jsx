import { Suspense, useState } from "react";
import './styles.css'
import { handleSubmit, setNewValues } from "../Handle/handle";


export default function DropBox({ name = "DropBox", values, setValues, propertyName = '', apiData, handleChange, inputProps = { type: 'text' } }) {
  const [selectedSpan, setSelectedSpan] = useState(0);

  const { setChange, setSelectedData } = setNewValues({ values, setValues, propertyName })


  const keyforList = ({ code }) => {
    const size = data.length
    if (!data[selectedSpan]) return
    if (size === 0) return
    if (code==='ArrowUp') return setSelectedSpan(selectedSpan > 0 ? selectedSpan - 1 : size - 1)
    if (code==='ArrowDown') return setSelectedSpan(selectedSpan < size - 1 ? selectedSpan + 1 : 0)
    if (code==='Enter') return setSelectedData({ data, selectedSpan, setSelectedSpan, size })
    if (code==='Tab')return setSelectedData({ data, selectedSpan, setSelectedSpan, size })
  }

  const { data } = apiData.read();
  const isOnKeyDown = inputProps.type === "date" ? {} : { onKeyDown: keyforList }
  return (<>
    <label>
      {name}:
      <div className="select-dropbox">
        <input className="select-dropbox-input"
          name={propertyName}
          {...inputProps}
          value={values[propertyName] || ''}
          onSubmit={handleSubmit}
          onChange={handleChange}
          {...isOnKeyDown} />
        <div className="select-container" >
          <Suspense fallback={<span className="select-box" key={`suspenseid-${propertyName}`} >Loading...</span>}>
            {data?.map((e, index) =>
              <span
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
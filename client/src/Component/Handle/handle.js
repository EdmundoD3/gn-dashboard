function handleSubmit(evt) {
  evt.preventDefault();
}
const setNewValues = ({ values, setValues, propertyName }) => {
  const setNewValue = ({ value }) => {
    const newValues = {
      ...values,
      [propertyName]: value,
    };
    setValues(newValues);
  }
  return {
    setNewValue,
    setChange: (evt) => {
      const value = evt.target.innerText
      const newValues = {
        ...values,
        [propertyName]: value,
      };
      setValues(newValues);
    },

    setSelectedData: ({ data, selectedSpan, setSelectedSpan, size }) => {
      const selectedData = { name: propertyName, value: data[selectedSpan][propertyName] }
      setNewValue({ ...selectedData })
      setSelectedSpan(0)
      // when there is no more data, the selected data will auto fill the other data
      if (size === 1) {
        const newValues = Object.keys(values).reduce(
          (previosValue, propertyName) => {
            return data[selectedSpan][propertyName] ? {
              ...previosValue,
              [propertyName]: data[selectedSpan][propertyName]
            } : { ...previosValue }
          }, { ...values })
      }
    }
  }
}

const setHandleChange = ({ values, setValues }) =>
  (evt) => {
    evt.preventDefault()
    const { name, value } = evt.target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  }


export { handleSubmit, setNewValues, setHandleChange }
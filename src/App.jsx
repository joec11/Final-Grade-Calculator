import React, { useState } from 'react';
import './App.css'

function App() {
  const [inputFields, setInputFields] = useState([{ grade: '', percentage: '' }]);

  const handleFormChange = (index, event) => {
    const updatedFields = [...inputFields];
    updatedFields[index][event.target.name] = event.target.value;
    setInputFields(updatedFields);
  };

  const addInputField = () => {
    setInputFields([...inputFields, { grade: '', percentage: '' }]);
  };

  const removeInputField = (indexToRemove) => {
    if (inputFields.length === 1) {
      // If only one field is present, do not allow removal
      return;
    }
    const updatedFields = inputFields.filter((_, index) => index !== indexToRemove);
    setInputFields(updatedFields);
  };

  return (
    <div className="App">
      <form>
        {inputFields.map((input, index) => (
          <div key={index}>
            <input
              name="grade"
              placeholder="Grade"
              value={input.grade}
              onChange={(event) => handleFormChange(index, event)}
            />
            <input
              name="percentage"
              placeholder="Percentage (%)"
              value={input.percentage}
              onChange={(event) => handleFormChange(index, event)}
            />
            {inputFields.length > 1 && <button onClick={() => removeInputField(index)}>Remove</button>}
          </div>
        ))}
      </form>
      <button name="Add Field" onClick={addInputField}>Add Field</button>
    </div>
  );
}

export default App;

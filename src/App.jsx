import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputFields, setInputFields] = useState([{ percentage: '', grades: [{ grade: '' }], result: '' }]);

  const handleFormChange = (index, subIndex, event) => {
    const { name, value } = event.target;
    const updatedFields = [...inputFields];

    if (name === 'percentage' || name === 'grade') {
      updatedFields[index][name] = value;

      if (name === 'grade') {
        updatedFields[index].grades[subIndex][name] = value;
      }

      updatedFields[index].result = calculateResult(updatedFields[index]);
      setInputFields(updatedFields);
    }
  };

  const calculateResult = (input) => {
    const sumOfGrades = input.grades.reduce((acc, curr) => acc + parseFloat(curr.grade || 0), 0);
    const totalGrades = input.grades.length;
    const percentage = parseFloat(input.percentage || 0) / 100;

    return percentage !== 0 && totalGrades !== 0 ? (sumOfGrades / totalGrades * percentage).toFixed(2) : '';
  };

  const addInputField = () => setInputFields([...inputFields, { percentage: '', grades: [{ grade: '' }], result: '' }]);
  
  const addOrRemoveGradeField = (index, subIndexToRemove = -1) => {
    const updatedFields = [...inputFields];

    if (subIndexToRemove === -1) updatedFields[index].grades.push({ grade: '' });
    else if (updatedFields[index].grades.length > 1) updatedFields[index].grades.splice(subIndexToRemove, 1);

    updatedFields[index].result = calculateResult(updatedFields[index]);
    setInputFields(updatedFields);
  };

  const removeInputField = (indexToRemove) => inputFields.length > 1 && setInputFields(inputFields.filter((_, index) => index !== indexToRemove));

  const { resultSum, percentageSum } = inputFields.reduce((acc, { result, percentage }) => ({ resultSum: acc.resultSum + parseFloat(result || 0), percentageSum: acc.percentageSum + parseFloat(percentage || 0) }), { resultSum: 0, percentageSum: 0 });

  const finalNumericGrade = (percentageSum !== 0 ? (resultSum / percentageSum * 100) : 0).toFixed(2);

  return (
    <div className="App">
      <h1>Final Grade Calculator</h1>
      <form>
        {inputFields.map((input, index) => (
          <div key={index}>
            <input
              name="percentage"
              placeholder="Percentage (%)"
              value={input.percentage}
              onChange={(event) => handleFormChange(index, 0, event)}
            />
            {input.grades.map(({ grade }, subIndex) => (
              <div key={subIndex}>
                <input
                  name="grade"
                  placeholder="Grade"
                  value={grade}
                  onChange={(event) => handleFormChange(index, subIndex, event)}
                />
                {input.grades.length > 1 && (
                  <button type="button" name="Remove Grade" onClick={() => addOrRemoveGradeField(index, subIndex)}>Remove Grade</button>
                )}
              </div>
            ))}
            <button type="button" name="Add Another Grade" onClick={() => addOrRemoveGradeField(index)}>Add Another Grade</button>
            {inputFields.length > 1 && (
              <button type="button" name="Remove Field" onClick={() => removeInputField(index)}>Remove Field</button>
            )}
          </div>
        ))}
      </form>
      <button type="button" name="Add Field" onClick={addInputField}>Add Field</button>
      <div name="Final Grade">
        <label>{resultSum} / {percentageSum} = <b>{finalNumericGrade}</b></label>
      </div>
    </div>
  );
}

export default App;

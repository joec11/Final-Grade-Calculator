import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputFields, setInputFields] = useState([{ sectionPercentage: '', sectionGrades: [{ grade: '' }] }]);
  const [overallPercentage, setOverallPercentage] = useState('');
  const [overallResult, setOverallResult] = useState('');
  const [overallAverage, setOverallAverage] = useState('');

  useEffect(() => {
    updateOverall();
  }, [inputFields]);

  const handleFormChange = (index, subIndex, name, value) => {
    const updatedFields = [...inputFields];
    updatedFields[index][name] = value;

    if (name === 'grade') {
      updatedFields[index].sectionGrades[subIndex][name] = value;
    }

    updateSectionCalculations(updatedFields[index]);
    setInputFields(updatedFields);
  };

  const updateSectionCalculations = (input) => {
    const sumOfGrades = input.sectionGrades.reduce((acc, curr) => acc + parseFloat(curr.grade || 0), 0);
    const totalGrades = input.sectionGrades.filter(grade => grade.grade !== '').length;
    const percentage = parseFloat(input.sectionPercentage || 0) / 100;

    input.sectionResult = percentage !== 0 && totalGrades !== 0 ? (sumOfGrades / totalGrades * percentage).toFixed(3) : '';
    input.sectionAverage = percentage !== 0 && input.sectionResult !== '' ? ((input.sectionResult / input.sectionPercentage) * 100).toFixed(3) : '';

    setInputFields(input);
  };

  const updateOverall = () => {
    const sumOfSectionResults = inputFields.reduce((acc, { sectionResult }) => acc + parseFloat(sectionResult || 0), 0);
    let totalSectionPercentage = 0;

    inputFields.forEach(({ sectionGrades, sectionPercentage }) => {
      if (sectionGrades.some(grade => grade.grade !== '')) {
        totalSectionPercentage += parseFloat(sectionPercentage || 0);
      }
    });

    const overallResult = sumOfSectionResults !== '' ? sumOfSectionResults.toFixed(3) : '';
    const overallPercentage = totalSectionPercentage !== 0 ? totalSectionPercentage : 0;
    const overallAverage = overallPercentage !== 0 && overallResult !== '' ? ((sumOfSectionResults / totalSectionPercentage) * 100).toFixed(3) : '';

    setOverallResult(overallResult);
    setOverallPercentage(overallPercentage);
    setOverallAverage(overallAverage);
  };

  const addInputField = () => setInputFields([...inputFields, { sectionPercentage: '', sectionGrades: [{ grade: '' }] }]);

  const addOrRemoveGradeField = (index, subIndexToRemove = -1) => {
    const updatedFields = [...inputFields];

    if (subIndexToRemove === -1) {
      updatedFields[index].sectionGrades.push({ grade: '' });
    } else {
      if (updatedFields[index].sectionGrades.length > 1) {
        updatedFields[index].sectionGrades.splice(subIndexToRemove, 1);
        updateSectionCalculations(updatedFields[index]);
      }
    }

    setInputFields(updatedFields);
  };

  const removeInputField = (indexToRemove) => {
    if (inputFields.length > 1) {
      const updatedFields = inputFields.filter((_, index) => index !== indexToRemove);
      setInputFields(updatedFields);
    }
  };

  return (
    <div className="App">
      <h1>Final Grade Calculator</h1>
      <form>
        {inputFields.map((input, index) => (
          <div key={index}>
            <input
              name="sectionPercentage"
              placeholder="Percentage (%)"
              value={input.sectionPercentage}
              onChange={(event) => handleFormChange(index, 0, event.target.name, event.target.value)}
            />
            {input.sectionGrades.map(({ grade }, subIndex) => (
              <div key={subIndex}>
                <input
                  name="grade"
                  placeholder="Grade"
                  value={grade}
                  onChange={(event) => handleFormChange(index, subIndex, event.target.name, event.target.value)}
                  disabled={input.sectionPercentage === ''}
                />
                {input.sectionGrades.length > 1 && (
                  <button
                    type="button"
                    name="Remove Grade"
                    onClick={() => addOrRemoveGradeField(index, subIndex)}
                  >
                    Remove Grade
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              name="Add Another Grade"
              onClick={() => addOrRemoveGradeField(index)}
              disabled={input.sectionPercentage === ''}
            >
              Add Another Grade
            </button>
            {inputFields.length > 1 && (
              <button type="button" name="Remove Field" onClick={() => removeInputField(index)}>Remove Field</button>
            )}
            {input.sectionAverage && (
              <div name="Section Grade">
                <label>{input.sectionResult} / {input.sectionPercentage} = <b>{input.sectionAverage}</b></label>
              </div>
            )}
            {inputFields.length > 1 && <hr />}
          </div>
        ))}
      </form>
      <button type="button" name="Add Field" onClick={addInputField}>Add Field</button>
      {overallAverage && (
        <div name="Final Grade">
          <label>{overallResult} / {overallPercentage} = <b>{overallAverage}</b></label>
        </div>
      )}
    </div>
  );
}

export default App;

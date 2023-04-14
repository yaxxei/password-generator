import { useState } from 'react';
import './App.css';
import icon from './images/tabler-icon-refresh.svg'

function App() {

  const initCheckboxes = [
    { id: 1, type: 'Symbols', checked: true },
    { id: 2, type: 'Numbers', checked: true },
    { id: 3, type: 'Uppercase', checked: true },
    { id: 4, type: 'Lowercase', checked: true },
  ]

  const [password, setPassword] = useState('Password will be here')
  const [length, setLength] = useState(1)
  const [checkboxes, setCheckboxes] = useState(initCheckboxes)

  const generatePassword = (length) => {
    let character = ''
    if (checkboxes[0].checked === true) {
      character = '!@#$%^&*()'
      if (character && checkboxes[1].checked === true) {
        character += '1234567890'
      }
      if (character && checkboxes[2].checked === true) {
        character += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
      if (character && checkboxes[3].checked === true) {
        character += 'abcdefghijklmnopqrstuvwxyz'
      }

    }
    console.log(character);
    let password = ''
    for (let i = 0; i < length; i++) {
      password += character.charAt(Math.floor(Math.random() * character.length))
    }
    return password
  }

  const handleClickPasswordText = () => {
    setPassword(generatePassword(length))
  }

  const handleChangePasswordText = () => {
    setPassword(generatePassword)
  }

  const handleChangeLength = (e) => {
    setLength(e.currentTarget.value)
  }

  const handleChangeCheckbox = (checkboxId, checked) => {
    const checkbox = checkboxes.find(c => c.id === checkboxId)
    if (checkbox) {
      checkbox.checked = checked
    }
    setCheckboxes([...checkboxes])
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <img src={icon} alt='none' className='regenerate' onClick={handleClickPasswordText} />

        <input className='password' type='text'
          value={password}
          onChange={handleChangePasswordText} />

        <div className='editor'>
          <div className='password-lenght'>
            <input className='slider-length' type='range' min='1' max='20' step='1'
              value={length}
              onChange={handleChangeLength} />
            <input className='input-lenghth' type='text'
              value={length}
              onChange={handleChangeLength} />
          </div>

          <div className='choice'>
            {
              checkboxes.map(c => {
                const className = c.type.toLowerCase()
                const handlerChange = (e) => {
                  handleChangeCheckbox(c.id, e.currentTarget.checked)
                }
                return (
                  <div key={c.id} className={className}>
                    <input className={`editor-${className}`} type='checkbox' checked={c.checked}
                      onChange={handlerChange}
                    />
                    <h1>{c.type}</h1>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

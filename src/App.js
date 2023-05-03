import { useState } from 'react';
import './App.css';
import icon from './images/tabler-icon-refresh.svg'
import copy from './images/tabler-icon-copy.svg'
import arrow from './images/arrow.png'
import select from './images/select.png'

function App() {

  const initCheckboxes = [
    { id: 1, type: 'Symbols', checked: true },
    { id: 2, type: 'Numbers', checked: true },
    { id: 3, type: 'Uppercase', checked: true },
    { id: 4, type: 'Lowercase', checked: true },
  ]

  const [password, setPassword] = useState('Password will be here')
  const [length, setLength] = useState(8)
  const [checkboxes, setCheckboxes] = useState(initCheckboxes)
  const [isActive, setIsActive] = useState(false)

  const generatePassword = (length) => {
    let character = ''
    if (checkboxes[0].checked === true) {
      character += '!@#$%^&*()'
    }
    if (checkboxes[1].checked === true) {
      character += '1234567890'
    }
    if (checkboxes[2].checked === true) {
      character += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (checkboxes[3].checked === true) {
      character += 'abcdefghijklmnopqrstuvwxyz'
    }

    let password = ''
    for (let i = 0; i < length; i++) {
      password += character.charAt(Math.floor(Math.random() * character.length))
    }
    return password
  }

  const handleClickPasswordText = () => {
    setPassword(generatePassword(length))
    setIsActive(!isActive)
    setTimeout(() => {
      setIsActive(false)
    }, 300)
  }

  const [showCopied, setShowCopied] = useState(false)
  const [showCantCopied, setShowCantCopied] = useState(false)

  const handleCopyPassword = async () => {
    try {
      if (password === 'Password will be here') {
        setShowCantCopied(true)
        setTimeout(() => {
          setShowCantCopied(false)
        }, 1500)
        return
      }
      await navigator.clipboard.writeText(password)
      setShowCopied(true)
      setTimeout(() => {
        setShowCopied(false)
      }, 1500)
    } catch (e) {
      console.error('Copy error: ', e)
    }
    return null
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
        <div className='password-output'>
          <div className='help1'>
            <img className='arrow' src={arrow} alt='none'/>
            <p className='help-text'>Click here to generate password</p>
          </div>

          <div className='help2'>
            <img className='arrow' src={arrow} alt='none'/>
            <p className='help-text'>Click here to copy password</p>
          </div>

          <img src={icon} alt='none' className={`generate ${isActive ? 'rotate' : ''}`} onClick={handleClickPasswordText} />

          <div className='password-text'>
            <input className='password' type='text'
              value={password}
              onChange={handleChangePasswordText} />
            {
              showCopied && <p className='copied'>Copied!</p>
              || showCantCopied && <p className='copied'>You have not generated a password!</p>
            }
            <img className='copy' src={copy} alt='none'
              onClick={handleCopyPassword} />
          </div>
        </div>

        <div className='editor'>
          <div className='help3'>
            <img className='select' src={select} alt='none'/>
            <p className='help-text'>Here you can change password settings</p>
          </div>

          <div className='help4'>
            <img className='arrow' src={arrow} alt='none'/>
            <p className='help-text'>And here you can set password length</p>
          </div>

          <div className='password-length'>
            <input className='slider-length' type='range' min='1' max='20' step='1'
              value={length}
              onChange={handleChangeLength} />
            <input className='input-length' type='text'
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

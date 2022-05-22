import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosWithAuth from '../axios'
import LoginForm from './LoginForm'
import VirtueTracker from './VirtueTracker'
import Message from './Message'
import Spinner from './Spinner'

const trackerUrl = 'http://localhost:9000/api/virtue-tracker'
const loginUrl = 'http://localhost:9000/api/login'

const  virtuesList = {Temperance: 1, Silence: 2, Order: 3, Resolution: 4, Frugality: 5, Industry: 6,
  Sincerity: 7, Justice: 8, Moderation: 9, Cleanliness: 10, Tranquillity: 11, Chastity: 12, Humility: 13}

const initialVirtuesState = {
   week: 1,
   focusVirtue: 'Temperance',
   focusVirtueSaying: 'Eat not to dullness; drink not to elevation.',
   virtues: [
     ['Day', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
     ['Temperance',false, false, false, false, false, false, false],
     ['Silence', false, false, false, false, false, false, false],
     ['Order', false, false, false, false, false, false, false],
     ['Resolution', false, false, false, false, false, false, false],
     ['Frugality', false, false, false, false, false, false, false],
     ['Industry', false, false, false, false, false, false, false],
     ['Sincerity', false, false, false, false, false, false, false],
     ['Justice', false, false, false, false, false, false, false],
     ['Moderation', false, false, false, false, false, false, false],
     ['Cleanliness', false, false, false, false, false, false, false],
     ['Tranquillity', false, false, false, false, false, false, false],
     ['Chastity', false, false, false, false, false, false, false],
     ['Humility', false, false, false, false, false, false, false],
   ],
}

export default function App() {
  const [message, setMessage] = useState('')
  const [virtues, setVirtues] = useState(initialVirtuesState)
  const [spinnerOn, setSpinnerOn] = useState(false)

  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/') }
  const redirectToVirtuesTracker = () => { navigate('/virtues-tracker') }

  const logout = () => {
    window.localStorage.removeItem('token')
    setMessage('Goodbye!')
    redirectToLogin()
  }

  const login = ({ username, password }) => {
    setMessage('')
    setSpinnerOn(true)
    axios.post(loginUrl, { username, password })
      .then(res => {
        window.localStorage.setItem('token', res.data.token)
        setMessage(res.data.message)
        redirectToVirtuesTracker()
        setSpinnerOn(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getVirtues = () => {
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().get('/virtues-tracker')
      .then(res => {
        setVirtues(res.data.virtues)
        setMessage(res.data.message)
        setSpinnerOn(false)
      })
      .catch(err => {
        console.log(err)
        setSpinnerOn(false)
        redirectToLogin()
      })
  }

  const toggleDayMarked = ( virtue, day ) => {
    // setMessage('')
    // setSpinnerOn(true)
    // axiosWithAuth().put(`/virtues-tracker/${virtue}`, day)
    //   .then(res => {
    //     setVirtues(virtues.map(virt => {
    //       return virt.virtue === virtue
    //         ? res.data.day
    //         : virt
    //     }))
    //     setMessage(res.data.message)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    //   .finally(() => {
    //     setSpinnerOn(false)
    //   })
    const virtueRowNum = virtuesList[virtue]
    console.log('virtueRowNum', virtuesList[virtue])
    console.log('day', day)
    setVirtues({...virtues, virtues: virtues.virtues.map((virt, idx) => {
      // console.log('idx', idx)
      if (idx === virtueRowNum ) {
        console.log('idx', idx)
        return virt.map((el, i) => {
          if (i == day && day != 0) {
            console.log('i',i)
            return !el
          } else {
            return el
          }
        })
      } else {
        return virt
      }
    })})
  }
  

 

  return (
    <React.StrictMode>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        <h1>Benjamin Franklin's Virtue Tracker</h1>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="virtues-tracker" element={<VirtueTracker virtues={virtues} toggleDayMarked={toggleDayMarked} />} />
        </Routes>
        <footer>Michael Gutierrez 2022</footer>
      </div>
    </React.StrictMode>
  )
}

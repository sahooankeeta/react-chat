import { useState,useEffect } from 'react'
import socketIO from 'socket.io-client';
const socket = socketIO.connect(import.meta.env.VITE_API);
import './App.css'

const App=()=>{
  
  return (
    <div>hi</div>
  )
}

export default App

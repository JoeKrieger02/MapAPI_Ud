import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import './index.css'
import serviceWorker from './serviceWorker.js'

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker();

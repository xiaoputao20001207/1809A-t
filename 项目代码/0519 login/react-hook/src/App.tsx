import React, { Component } from 'react'
import './App.scss';
import RouterView from "./router/RouterView"
import routerConfig from "./router/routerConfig"

export default class App extends Component {
  render() {
    return (
      <div className='App'>
      <RouterView routes={routerConfig} />
      </div>
    )
  }
}


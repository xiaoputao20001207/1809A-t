
import React, { Component } from 'react'
import RouterView from './router/RouterView'
import routerConfig from './router/routerConfig'

export default class App extends Component {
  render() {
    return (
      <>
        <RouterView routes={routerConfig}></RouterView>
      </>
    )
  }
}

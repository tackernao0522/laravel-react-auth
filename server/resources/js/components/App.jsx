import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { About } from './About'
import { GlobalNav } from './GlobalNav'
import { Top } from './Top'

function App() {
  return (
    <BrowserRouter>
      <GlobalNav />
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Example

if (document.getElementById('nav')) {
  ReactDOM.render(<App />, document.getElementById('nav'))
}

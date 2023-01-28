import {Route, Redirect, Switch} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'

import Home from './components/Home'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import ThemeContext from './Context/ThemeContext'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
  }

  toggleTheme = () => {
    this.setState(preState => ({isDarkTheme: !preState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme} = this.state
    return (
      <>
        <ThemeContext.Provider
          value={{
            isDarkTheme,
            toggleTheme: this.toggleTheme,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/users/:userId"
              component={UserProfile}
            />
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </ThemeContext.Provider>
      </>
    )
  }
}

export default App

import React, { Component } from 'react';
import { doLogin, doRegistration } from '../../actions/authorization';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import { Preloader } from '../Preloader';
import * as events from '../app/events'
class Authorization extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      login: props.login,
      accessToken: props.accessToken,
      error: props.error
    };
  }
  
  handleChangeLogin = (e) => {
    this.setState({login: e.target.value});
  }

  handleChangePassword = (e) => {
    this.setState({password: e.target.value});
  }

  handleLogin = () => {
    store.dispatch({type: events.LOGIN + events.INPROCESS_EVENT, loading:true});
    store.dispatch(doLogin(this.state.login, this.state.password));
  }

  handleRegistration = () => {
    store.dispatch({type: events.REGISTRATION + events.INPROCESS_EVENT, loading:true});
    store.dispatch(doRegistration(this.state.login, this.state.password));
  }

  render() {
    return this.props.accessToken ? 
    (<div></div>) : (
      <div className="Authorization">
        <header className="Authorization-header">
          <p className="AuthorizationLabel">Авторизация</p>
          <input type="text" className="LoginInput" name="Login:"
             value={this.state.login} onChange={this.handleChangeLogin} placeholder="Login"/>
          <input type="text" className="PasswordInput" name="Password:"
             value={this.state.password} onChange={this.handleChangePassword} placeholder="Password"/>          
          <p className="AuthorizationErrorLabel">{this.props.error}</p>
          <div className="AuthorizationButtons">
          {this.props.loading ? <Preloader/> : <div></div> }
          <button className="LoginButton" onClick={this.handleLogin}>Sign in</button>
          <button className="RegistrationButton" onClick={this.handleRegistration}>Sign up</button>
          </div>
        </header>
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {
    error: state.loginFailed.authError || state.registrationFailed.authError,
    login: state.logon.login || state.registrated.login,
    accessToken: state.logon.accessToken || state.registrated.accessToken,
    loading: state.logonLoading.authLoading || state.registrationLoading.authLoading
  }
}
export default connect(mapStateToProps)(Authorization);

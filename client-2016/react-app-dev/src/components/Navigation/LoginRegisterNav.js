import React from 'react';
import {withRouter} from 'react-router-dom';
import RegisterDialog from '@components/RegisterDialog/RegisterDialog';
import LoginDialog from '@components/LoginDialog/LoginDialog';
import UrlHelper from '@services/UrlHelper';

class LoginRegisterNav extends React.Component {
  constructor(props){
    super(props);

    const query = UrlHelper.parseQuery(props.location.search || "");
    this.state = {
      //showRegisterDialog: query.showRegister ? true : false,
      showLoginDialog: query.showLogin ? true : false
    };
  }

  render(){
    return (
      <div>
        <ul className="nav nav-pills nav-login-btns pull-right nc-nav-pills">
          <a>
            <li>
              <div onClick={()=>(this.setState({showLoginDialog: true}))}>Sign in</div>
            </li>
          </a>
          {/* Registration no longer necessary
          <a>
            <li>
              <div onClick={()=>(this.setState({showRegisterDialog: true}))}>Register</div>
            </li>
          </a>*/}
        </ul>
        {this.state.showLoginDialog ?
          <LoginDialog onClose={() => (this.setState({showLoginDialog: false}))}/>
          : null
        }
        {/*this.state.showRegisterDialog ?
          <RegisterDialog onClose={() => (this.setState({showRegisterDialog: false}))}/>
          : null
        */}
      </div>
    );
  }
};
export default withRouter(LoginRegisterNav);

import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@store/store';
import {initiateUser} from '@actions/userActions';
import { IconContext } from 'react-icons';

//custom component imports
import NavBar from '@components/Navigation/NavBar';
import MainView from '@components/MainView/MainView';
import Projects from '@components/Projects/Projects';
import Home from '@components/Home/Home.js';
import Account from '@components/Account/Account';

//styles
import text from '@styles/text.css';

export default class extends React.Component {
  constructor(props){
    super(props);

    //Initialize store
    this.store = store;
    this.store.dispatch(initiateUser());
  }

  render() {

    const tabs = [
      {
        path: "/",
        exact: true,
        navTab: true,
        name: "Home",
        view: Home
      },
      {
        path: "/projects",
        navTab: true,
        name: "Projects",
        view: Projects
      },
      {
        path: "/account",
        view: Account,
        authRequired: true
      }
    ];

    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            <div className={text.regular} style={{height: '100%'}}>
              <NavBar routes={tabs}/>
              <MainView routes={tabs}/>
            </div>
          </IconContext.Provider>
        </BrowserRouter>
      </Provider>
    );
  }
}

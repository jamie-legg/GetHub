import { IonContent, IonLoading, IonIcon, IonPage, IonSearchbar, IonItem, IonButton } from '@ionic/react';
import React, { Component } from 'react';
import "./Home.scss";
import { arrowForward } from 'ionicons/icons';
import {
  withRouter
} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import { UserContext } from '../../App';
import logo from '../../assets/logo.png';

interface IProps extends RouteComponentProps<any> {

}

class Home extends Component<IProps, { user: string, showLoading: boolean, userInfo:object }> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: '',
      showLoading: false,
      userInfo: {}
    };
  }

  updateUser(event: any) {
    this.setState({ user: event.target.value });
  }

  alertUser() {
    this.props.history.push(`/user/${this.state.user}`);
  }

  setShowLoading(loadingState:boolean,event:any) {
    event.preventDefault();
    this.setState({showLoading:loadingState})
  }



  render() {
    return (
      <UserContext.Provider value={{user:this.state.user, userInfo: this.state.userInfo}}>
      <IonPage>
        <IonContent className="ion-padding scroll-content">

          <div className="app-title-container">
            <img className="app-logo" src={logo} />
            <div className="app-title">Get<span className="title-suffix">Hub</span></div>
          </div>

          <form onSubmit={(event) => this.setShowLoading(true,event)}>
          <IonItem mode="ios" className="app-search-bar">
            <IonSearchbar mode="ios" id="username" placeholder="GitHub Username" onIonChange={(event) => this.updateUser(event)}></IonSearchbar>
            <IonButton className="btn-search" type="submit"><IonIcon icon={arrowForward} /></IonButton>
          </IonItem>
          </form>
          <IonLoading
          isOpen={this.state.showLoading}
          onDidDismiss={() => this.alertUser()}
          message={'Loading...'}
          duration={1000}
        />
        </IonContent>
      </IonPage>
      </UserContext.Provider>
    );
  }

}

export default withRouter(Home);

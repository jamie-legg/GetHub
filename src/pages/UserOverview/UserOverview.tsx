import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { RouteComponentProps } from "react-router";
import "./UserOverview.scss"
import { IonGrid, IonRow, IonCol, IonList, IonPage, IonText, IonItem, IonAvatar, IonLabel, IonBadge, IonContent, IonToolbar, IonButton, IonHeader, IonIcon } from '@ionic/react';
import axios from "axios";
import { arrowRoundBack, arrowForward } from "ionicons/icons"

interface IProps extends RouteComponentProps<any> {

}

export class UserOverview extends Component<IProps, { user: string, showLoading: boolean, userInfo: any, repos: any }> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: "",
            showLoading: false,
            userInfo: {},
            repos: {}
        }
    }

    async componentDidMount() {
        let user = this.props?.match?.params?.username;
        if (!user) this.props.history.push("/")
        const userInfo = await axios.get(`https://api.github.com/users/${user}`)
        if (userInfo.status === 200) {
        this.setState({
            user,
            userInfo:userInfo.data
        });

        const repos = await axios.get(`https://api.github.com/users/${user}/repos`)
        console.log(repos);

        this.setState({
            repos: repos.data
        })
        }
    }

    componentDidUpdate(oldState: any, newState: any) {
        console.log({ oldState, newState })
    }

    goActivity() {
        console.log("badge clicked")
        this.props.history.push(`/activity/${this.state.user}`);
    }

    render() {
        let repos: any;
        const name = this.state.userInfo.name ?  this.state.userInfo.name : this.state.userInfo.login
        if (this.state.repos.length > 1) {
            repos = this.state.repos.map((repo: any) => {
                return <IonItem key={repo.node_id} onClick={() => window.location.href="https://google.com"}>
                <IonLabel  className="ion-text-wrap">
                  <IonText>
                    <h1>{repo.name.toUpperCase()}</h1><IonBadge>{repo.language}</IonBadge>
                  </IonText>
                  <IonText color="secondary">
                    <p>{repo.description}</p>
                  </IonText>
                </IonLabel>
              </IonItem>
            })
        }
        return (
            <IonPage  className="scroll-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButton onClick={() => this.props.history.goBack()}>
                            <IonIcon className="ion-padding" icon={arrowRoundBack}></IonIcon>
                        </IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                
                <div className="user-container">
                    <div className="image-container">
                        <IonAvatar className="avatar-container">
                            <img className="image-avatar" src={this.state.userInfo.avatar_url} />
                        </IonAvatar>
                        <h1>{name}</h1>
                    </div>
                    <div className="metrics-container">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <h2>{this.state.userInfo.following}</h2>
                                    <IonLabel mode="ios">FOLLOWING</IonLabel>

                                </IonCol>
                                <IonCol>
                                    <h2>{this.state.userInfo.followers}</h2>
                                    <IonLabel mode="ios">FOLLOWERS</IonLabel>

                                </IonCol>
                                <IonCol>
                                    <h2>9</h2>
                                    <IonLabel mode="ios">REPOSITORIES</IonLabel>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonBadge onClick={() => this.goActivity()}>View Activity <IonIcon icon={arrowForward}></IonIcon></IonBadge>
                                </IonCol>
                            </IonRow>
                            </IonGrid>
                    </div>
                    <div className="divider"></div>
                    <div className="repo-container">
                        <IonList mode="ios" className="repo-list">
                            {repos}
                        </IonList>

                    </div>

                </div>


                </IonContent>
            </IonPage>

        )
    }
}


export default withRouter(UserOverview)

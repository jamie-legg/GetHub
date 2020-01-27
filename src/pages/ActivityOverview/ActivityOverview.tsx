import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { RouteComponentProps } from "react-router";
import "./ActivityOverview.scss"
import { IonGrid, IonRow, IonCol, IonList, IonPage, IonText, IonItem, IonAvatar, IonLabel, IonBadge, IonContent, IonToolbar, IonButton, IonHeader, IonIcon } from '@ionic/react';
import axios from "axios";
import { arrowRoundBack, arrowForward } from "ionicons/icons"

interface IProps extends RouteComponentProps<any> {

}

export class ActivityOverview extends Component<IProps, { user: string, showLoading: boolean, activity: Array<any> }> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: "",
            showLoading: false,
            activity: [],
        }
    }

    async componentDidMount() {
        let user = this.props?.match?.params?.username;
        if (!user) this.props.history.push("/")
        const userInfo = await axios.get(`https://api.github.com/users/${user}/events`)
        if(userInfo.status === 200) {
            const userEvents: Array<object> = [];
            (userInfo.data as Array<object>).forEach((event:any) => {
                for (let index = 1; index < event.type.length; index++) {
                    const element = event.type[index];
                    if(element == element.toUpperCase()) {
                        console.log(event.type.substr(0,index));
                    }
                }
                userEvents.push({
                    "type":event.type.replace("Event", ""),
                    "repo":event.repo.name,
                    "avatar":event.actor.avatar_url,
                    "user":event.actor.login,
                    "createdAt":event.created_at
                })
            })
            this.setState({
                activity:userEvents
            });
            
            
        }
        
    }

    componentDidUpdate(oldState: any, newState: any) {
        console.log({ oldState, newState })
    }

    goActivity() {
        console.log("badge clicked")
        this.props.history.push(`/users/${this.state.user}/activity`);
    }

    render() {

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
                    <IonList>
                        {this.state.activity.map(event => (
                            <IonItem>
                                <IonAvatar slot="start">
                                    <img src={event.avatar}></img>
                                </IonAvatar>
                                <IonBadge color={event.type == "Push" ? "primary" : "danger"}>{event.type}</IonBadge>
                                <IonLabel>
                                <h2>{event.user}</h2>
                                <h3>{event.repo}</h3>
                                <h4>{event.createdAt}</h4>
                                </IonLabel>




                            </IonItem>
                        ))}
                    </IonList>
                </IonContent>
            </IonPage>

        )
    }
}


export default withRouter(ActivityOverview)

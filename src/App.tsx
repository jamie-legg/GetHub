import React, { createContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import UserOverview from './pages/UserOverview/UserOverview';
import ActivityOverview from './pages/ActivityOverview/ActivityOverview';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

export const UserContext = createContext({
  user:"",
  userInfo:{},
})

const App: React.FC = () => (
  <UserContext.Provider value = {
    {
      user:"",
      userInfo:{}
    }
  }>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/gethub" component={Home} exact={true}  />
          <Route path="/user/" component={Home} exact={true} />
          <Route path="/user/:username" component={UserOverview} exact={true} />
          <Route path="/activity/:username" component={ActivityOverview} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/gethub"></Redirect>} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </UserContext.Provider>

);

export default App;

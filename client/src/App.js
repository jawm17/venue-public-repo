import React, { useContext } from "react";
import ScrollToTop from "./scrollToTop";
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import AVPRoute from './hocs/AVPRoute';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Web3Context } from "./context/Web3Context";
import { AlertContext } from "./context/AlertContext";
import "./index.css";

// Pages
import NoMatch from "./pages/NoMatch/NoMatch";
import Home from "./pages/HomePage/Home";
// import Account from "./pages/Account/Account";
import Create from './pages/Create/Create';
import LandingOne from './pages/LandingOne/LandingOne';
import Landing from './pages/Landing/Landing';
import LandingMain from './pages/LandingMain/LandingMain';
import BG from './pages/Landing/styles/test';
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Video from "./pages/Media/Video";
import Profile from "./pages/Profile/Profile";
import SearchPage from "./pages/Search/SearchPage";
import NFTGate from './pages/Create/NFTGate';

import NewTest from './pages/NewTest/NewTest';
import NewHome from './pages/NewTest/NewHome';
import SubTest from './pages/NewTest/subTest';
import TestEquity from './pages/NewTest/testEquity';
import NewCreate from './pages/NewCreate/NewCreate';
import Account from "./pages/Account/Account";
import WalletPage from "./pages/Wallet/WalletPage";

import MasterProfile from "./pages/Master/MasterProfile";
import CompeteComponents from "./pages/Landing/CompeteComponents";
import TopSupportersDemo from "./pages/Landing/TopSupportersDemo";
import TopTippersDemo from "./pages/Landing/TopTippersDemo";
import PromoTiles from "./pages/Promo/PromoTiles";
import Layout from "./pages/Experimental/Layout";

import GoogleLanding from "./components/GoogleLanding";
import LearnMore from "./pages/Blog/LearnMore";
import Terms from "./pages/Blog/Terms";

import BottomNav from "./components/BottomNav";
import StarsPromo from "./pages/Promo/StarsPromo";

function App() {
  const { alert } = useContext(AlertContext);

  return (
    <div>
      {alert.alertText ?
        <div id="networkAlertArea">
          <div id="alert">
            <div>{alert.alertText}</div>
            <div className="activityLoader"></div>
          </div>
        </div>
        :
        null
      }
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={LandingMain} />
          <Route exact path="/landingmain" component={LandingMain} />
          <Route exact path="/starspromo" component={StarsPromo} />
          <Route exact path="/test" component={PromoTiles} />
          <Route exact path="/layout" component={Layout} />
          <Route exact path="/google" component={GoogleLanding} />
          <Route exact path="/master" component={MasterProfile} />
          <Route exact path="/compete" component={CompeteComponents} />
          <Route exact path="/supporters" component={TopSupportersDemo} />
          <Route exact path="/tippers" component={TopTippersDemo} />
          <Route exact path="/blog/etherplay" component={LearnMore} />
          <Route exact path="/terms" component={Terms} />
          <PrivateRoute exact path="/wallet" component={WalletPage} />
          <Route exact path="/gate" component={NFTGate} />
          <Route exact path="/home/:auth" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route path="/video/:id" component={Video} />
          <Route path="/search/:query" component={SearchPage} />
          <Route path="/search" component={SearchPage} />
          <PrivateRoute path="/account" component={Account} />
          <AVPRoute path="/user/:user" component={Profile} />
          <Route path="/create" component={NewCreate} />
          <Route path="/new" component={BottomNav} />
          <Route path="/newhome" component={NewHome} />
          <Route path="/subTest" component={SubTest} />
          <Route path="/equity" component={TestEquity} />
          <Route path="/" component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

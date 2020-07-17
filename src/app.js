// Imports
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@rmwc/theme";
// App Imports
import { Layout, Service } from "./components";
import { Home, Plugins, Settings } from "./views";
import {DisableChatSettings, DodgeQueueSettings} from "./plugins"

const theme = {
  primary: "#24aee9",
  secondary: "#e539ff",
  error: "#b00020",
  background: "#212121",
  surface: "#37474F",
  onPrimary: "rgba(255,255,255,.87)",
  onSecondary: "rgba(0,0,0,0.87)",
  onSurface: "rgba(255,255,255,.87)",
  onError: "#fff",
  textPrimaryOnBackground: "rgba(255, 255, 255, 1)",
  textSecondaryOnBackground: "rgba(255, 255, 255, 0.7)",
  textHintOnBackground: "rgba(255, 255, 255, 0.5)",
  textDisabledOnBackground: "rgba(255, 255, 255, 0.5)",
  textIconOnBackground: "rgba(255, 255, 255, 0.5)",
  textPrimaryOnLight: "rgba(0, 0, 0, 0.87)",
  textSecondaryOnLight: "rgba(0, 0, 0, 0.54)",
  textHintOnLight: "rgba(0, 0, 0, 0.38)",
  textDisabledOnLight: "rgba(0, 0, 0, 0.38)",
  textIconOnLight: "rgba(0, 0, 0, 0.38)",
  textPrimaryOnDark: "white",
  textSecondaryOnDark: "rgba(255, 255, 255, 0.7)",
  textHintOnDark: "rgba(255, 255, 255, 0.5)",
  textDisabledOnDark: "rgba(255, 255, 255, 0.5)",
  textIconOnDark: "rgba(255, 255, 255, 0.5)",
};

const App = () => (
  <ThemeProvider options={theme} className="app__root" tag="div">
    <Service>
      <Switch>
        <Route path="/plugin/easy-queue-dodge" component={DodgeQueueSettings} />
        <Route path="/plugin/disable-chat" component={DisableChatSettings} />
        <Layout className="app__content">
          <Route exact path="/" component={Home} />
          <Route exact path="/plugins" component={Plugins} />
          <Route exact path="/settings" component={Settings} />
        </Layout>
      </Switch>
      </Service>
  </ThemeProvider>
);

export default App;

import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CartProvider from "./components/Context";
import CheckOut from "./pages/CheckOut";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3} width="100%">
        <ColorModeSwitcher justifySelf="flex-end" />
        <Router>
          <CartProvider>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/checkout">
                <CheckOut />
              </Route>
            </Switch>
          </CartProvider>
        </Router>
      </Grid>
    </Box>
  </ChakraProvider>
);

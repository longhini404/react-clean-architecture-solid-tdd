import React from 'react'
import { Switch } from 'react-router-dom'
import {
  MakeDashboardFactory,
  MakeLoginFactory,
  MakeProductListingFactory,
  MakeProductRegistrationFactory,
  MakeUserRegistrationFactory,
} from 'core/factories'
import Route from './routes'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={MakeLoginFactory} />
    <Route path="/dashboard" component={MakeDashboardFactory} isPrivate />
    <Route path="/sign-up" component={MakeUserRegistrationFactory} />
    <Route
      path="/listar-produtos"
      component={MakeProductListingFactory}
      isPrivate
    />
    <Route
      path="/cadastrar-produtos"
      component={MakeProductRegistrationFactory}
      isPrivate
    />
    <Route path="/" component={MakeLoginFactory} />
  </Switch>
)

export default Routes

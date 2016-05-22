var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var useRouterHistory = ReactRouter.useRouterHistory;
import { createHashHistory } from 'history'

var appHistory = useRouterHistory(createHashHistory)({queryKey: false});

var BasePage = require('./components/base/Base.jsx');
var ListManagerPage = require('./components/moviesList/ListManager.jsx');
var MoviePage = require('./components/movie/Movie.jsx');


var Routes = (
    <Router history={appHistory}>
        <Route path="/" component={BasePage}>
            <IndexRoute component={ListManagerPage}/>
            <Route path="/movie/:movieId" component={MoviePage}/>
        </Route>
    </Router>
);


module.exports = Routes;
import './App.css';
import Dashboard from "../src/component/dashboard";
import Login from "../src/component/login";
import Cart from "../src/component/cart";
import { Route , Switch} from "react-router-dom";


function App() {
  return (
   <>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route  path="/login" component={Login} />
      <Route  path="/cart" component={Cart} />
    </Switch>
   </>
  )
}

export default App;

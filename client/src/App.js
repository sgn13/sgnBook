import './App.css';
import 'antd/dist/antd.css';
import Home from './components/Home/Home';
import Router from './Router';
import { Layout } from 'antd';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { setAuthToken } from './utils/setAuthToken'
import store from './store';
import { clearCurrentProfile } from './actions/profileActions';

const { Header, Content } = Layout


function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
    const decoded = jwt_decode(localStorage.getItem('token'))
    store.dispatch(setCurrentUser(decoded))

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser())
      store.dispatch(clearCurrentProfile())
      window.location.href = '/login'
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout >
          <Home />
          <Content>
            <div className="site-layout-content">
              <Router />
            </div>
          </Content>
        </Layout>
      </BrowserRouter>
    </Provider >
  );
}

export default App;

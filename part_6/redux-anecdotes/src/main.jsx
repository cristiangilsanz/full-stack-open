import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { showNotification } from './reducers/notificationReducer'

store.dispatch(showNotification('Welcome!', 5))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

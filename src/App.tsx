import './App.css';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import ContactCard from 'components/ContactCard';

function App() {
  return (
    <div className="App">
      <ReduxProvider store={store}>
        <ContactCard />
      </ReduxProvider>
    </div>
  );
}

export default App;

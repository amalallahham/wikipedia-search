import './App.css';
import MainPage from './main/main';
import store from './store/reducer'
function App() {
  return (
    <div className="background">
      <MainPage store={store}></MainPage>
    </div>
  );
}

export default App;

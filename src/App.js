import './App.css';
import Card from './card';

function App() {
  return (
    <div className="App">
      <Card mesto={"Prague"}/>  
      <Card mesto={"Liberec"}/>
      <Card mesto={"Brno"}/>
      <Card mesto={"Pilsen"}/>
      <Card mesto={"Louny"}/>
    </div>
  );
}

export default App;

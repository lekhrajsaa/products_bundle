import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <hr className="line" />
      <ProductList />
    </div>
  );
}

export default App;

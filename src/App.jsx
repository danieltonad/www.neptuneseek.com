import "./App.scss";
import Header from "./components/Header";
import { useSearch } from "./context/SearchContext";
import { Home } from "./pages/home";
import { Results } from "./pages/results";
import config from "./utils/config.json";

function App() {
  const { messages, isSearching } = useSearch();
  const isFixed = messages.length > 0 || isSearching;

  return (
    <>
      {isFixed && <Header title={config.name} />}
      <div className="container">{isFixed ? <Results /> : <Home />}</div>
    </>
  );
}

export default App;
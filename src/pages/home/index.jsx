import SearchBox from "../../components/searchBox";
import Logo from "../../components/ui/Logo";
import { useSearch } from "../../context/SearchContext";
import { quickSearch } from "../../utils";
import "./home.scss";

export function Home() {
  return (
    <div className="home">
      <Logo />
      <h1>What service do you need?</h1>
      <SearchBox />
      <Suggestions />
    </div>
  );
}

const Suggestions = () => {
  const { sendMessage } = useSearch();
  return <div className="suggestions"></div>;
};

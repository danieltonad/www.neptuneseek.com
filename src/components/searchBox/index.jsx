import React, { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import "./searchbox.scss";
import { ArrowUp } from "lucide-react";
import AutoResizeTextarea from "../ui/AutoResizeTextArea";
import { MODES } from "../../utils";
import config from "../../utils/config";

const SearchBox = ({
  onSearch,
  placeholder = `Ask ${config.name} a question...`,
  className = "",
  notice,
}) => {
  const { sendMessage } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");

  const submit = () => {
    sendMessage(searchTerm);
    setSearchTerm("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        className={`search-box ${className} ${searchTerm ? "active" : ""}`}
      >
        <AutoResizeTextarea
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-area"
          spellCheck={false}
          enterKeyHint="send"
        />

        <button
          className="search-button button"
          disabled={searchTerm.trim().length > 0 ? false : true}
          type="submit"
        >
          <ArrowUp size={18} strokeWidth={2.4} />
        </button>
      </label>
      {notice && (
        <div className="notice">
          {`${config.name} uses proprietary data sets. Check important info.`}
        </div>
      )}
    </form>
  );
};

const SearchOptions = () => {
  const { mode, setMode } = useSearch();

  return (
    <div className="options">
      {MODES.map((option) => (
        <button
          key={option.name}
          type="button"
          className={`option button ${mode === option.name ? "active" : ""}`}
          role="menuitem"
          onClick={() => setMode(option.name)}
        >
          <option.icon size={16} strokeWidth={1.8} />
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default SearchBox;

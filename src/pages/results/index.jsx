import SearchBox from "../../components/searchBox";
import { useSearch } from "../../context/SearchContext";
import "./results.scss";
import { Bot, Copy, Download, Globe, MapPin, Star } from "lucide-react";
import { useEffect, useRef } from "react";

export function Results() {
  return (
    <div className="messages">
      <MessagesView />
      <SearchBox notice />
    </div>
  );
}

const MessagesView = () => {
  const { messages, isSearching } = useSearch();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const messages = scrollRef.current.querySelectorAll(".sent");
      const lastMessage = messages[messages.length - 1];
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isSearching]);

  return (
    <div className="messages-view" ref={scrollRef}>
      <div className="view">
        {messages.map((message, index) =>
          message.sender === "user" ? (
            <SentMessage key={index} message={message} />
          ) : (
            <ReceivedMessage key={index} message={message} />
          )
        )}
        {isSearching && (
          <ReceivedMessage>
            <Loading />
          </ReceivedMessage>
        )}
      </div>
    </div>
  );
};

const SentMessage = ({ message }) => {
  return (
    <div className="message sent">
      <img src="https://api.dicebear.com/9.x/lorelei/svg" alt="" />
      <div className="text">{message.content}</div>
    </div>
  );
};

const ReceivedMessage = ({ message, children }) => {
  return (
    <div className="message received">
      <Bot size={22} />
      {message && (
        <div className="text">
          <PromptResponse data={message.content} />
          <Actions message={message} />
        </div>
      )}
      {children && children}
    </div>
  );
};

const Actions = ({ message }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return <div className="actions"></div>;
};

const Loading = () => {
  return (
    <div className="loading">
      {[...Array(3)].map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
};

const PromptResponse = ({ data }) => {
  const { message, data: list } = data;
  return (
    <div className="response">
      {message && <p>{message}</p>}
      {list && (
        <div className="results">
          {list.map((result, index) => (
            <ResponseCard key={index} data={result} />
          ))}
        </div>
      )}
    </div>
  );
};

const ResponseCard = ({ data }) => {
  const { name, rating, price, address, booking, neptune_score, source } =
    data || {};

  return (
    <div className="card" style={{ "--i": neptune_score }}>
      <div className="card-header">
        <h3 className="title">{name}</h3>
        {neptune_score && (
          <div className="score">
            <div className="neptune-score">{neptune_score}</div>
          </div>
        )}
      </div>

      <div className="card-details">
        {price && <h3 className="price">{price}</h3>}
        {address && (
          <div className="address">
            <MapPin size={16} strokeWidth={1.8} />
            <span>{address}</span>
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="clusters">
          {rating && (
            <div className="rating cluster">
              <Star size={16} strokeWidth={1.8} />
              <span>{rating}</span>
            </div>
          )}
          {source && (
            <span className="source cluster">
              <Globe size={16} strokeWidth={1.8} />
              <span>{source}</span>
            </span>
          )}
        </div>
        {booking && (
          <a
            href={booking}
            className="booking-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Now
          </a>
        )}
      </div>
    </div>
  );
};

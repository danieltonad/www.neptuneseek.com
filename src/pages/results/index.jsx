import { Drawer } from "vaul";
import SearchBox from "../../components/searchBox";
import { useSearch } from "../../context/SearchContext";
import "./results.scss";
import {
  Bot,
  Clock,
  Copy,
  Download,
  Globe,
  Headset,
  MapPin,
  Star,
} from "lucide-react";
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
      <span>
        <Bot size={23} strokeWidth={1.8} opacity={0.9} />
      </span>
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
  const { message, results } = data;
  return (
    <div className="response">
      {message && <p>{message}</p>}
      {results && (
        <div className="results">
          {results.map((result, index) => (
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
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="card mini" style={{ "--i": neptune_score }}>
          <div className="card-header">
            <h3 className="title">{name}</h3>
            <div className="score">
              <div className="neptune-score">{neptune_score}</div>
            </div>
          </div>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content">
          <Drawer.Handle />
          <ResponseCardLarge data={data} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const ResponseCardLarge = ({ data }) => {
  const { name, neptune_score, description, phone, map, hours, review, image } =
    data || {};

  const iconProps = {
    size: 21,
    strokeWidth: 1.7,
  };

  const handleOpenMap = () => {
    if (map) {
      window.open(map, "_blank");
    }
  };

  return (
    <div className="card large" style={{ "--i": neptune_score }}>
      <Drawer.Title asChild>
        <div className="card-header">
          <h3 className="title">{name}</h3>
          <div className="score">
            <div className="neptune-score">{neptune_score}</div>
          </div>
        </div>
      </Drawer.Title>
      <Drawer.Description asChild>
        <div className="card-details">
          {description && <p className="description">{description}</p>}
          {phone && (
            <div className="phone cluster">
              <Headset {...iconProps} />
              <span>{phone}</span>
            </div>
          )}
          {hours && (
            <div className="hours cluster">
              <Clock {...iconProps} />
              <span>{hours}</span>
            </div>
          )}
          {review && (
            <div className="review cluster">
              <Star {...iconProps} />
              <span>{review}</span>
            </div>
          )}
          {/* {review && (
            <div className="review cluster">
              <Star {...iconProps} />
              <span>{review}</span>
            </div>
          )} */}
        </div>
      </Drawer.Description>

      {map && (
        <button className="map cluster" onClick={handleOpenMap}>
          <MapPin {...iconProps} size={20} />
          <span>Open Map</span>
        </button>
      )}
      {/* <Drawer.Close>Close</Drawer.Close> */}
    </div>
  );
};

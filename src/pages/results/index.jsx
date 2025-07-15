import { Drawer } from "vaul";
import SearchBox from "../../components/searchBox";
import { useSearch } from "../../context/SearchContext";
import "./results.scss";
import {
  Bot,
  Tag,
  Home,
  Headset,
  MapPin,
  Star,
  ChevronRight,
  CreditCard,
  Clock3,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { BadgeIcon, TridentIcon } from "../../components/ui/Icon";

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
            <ResponseCard key={index} index={index} data={result} />
          ))}
        </div>
      )}
    </div>
  );
};

const ResponseCard = ({ index, data }) => {
  const { name, score_description, neptune_score } = data || {};

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="card mini" style={{ "--i": neptune_score }}>
          <div className="card-header">
            <div className="bar">
              <div className="score">
                <div className="neptune-score">{neptune_score}</div>
              </div>
              {index === 0 && <TridentIcon />}
            </div>
            <div className="details">
              <h3 className="title">{name}</h3>
              <p className="description">{score_description}</p>
            </div>
            <div className="nav">
              <ChevronRight />
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
  const {
    name,
    neptune_score,
    description,
    phone,
    map,
    address,
    review,
    pricing,
    score_description,
    booking,
    opening_hours
  } = data || {};

  const iconProps = {
    size: 21,
    strokeWidth: 1.7,
  };

  const handleBooking = () => {
    if (booking) {
      window.open(booking, "_blank");
    }
  };

  return (
    <div className="card large" style={{ "--i": neptune_score }}>
      <Drawer.Title asChild>
        <div className="card-header">
          <h3 className="title">{name}</h3>
          <Drawer.NestedRoot>
            <Drawer.Trigger asChild>
              <div className="score">
                <div className="neptune-score">{neptune_score}</div>
              </div>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="drawer-overlay drawer-step" />
              <Drawer.Content className="drawer-content drawer-step">
                <Drawer.Handle />
                <NeptuneScoreDescription
                  score={neptune_score}
                  description={score_description}
                />
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.NestedRoot>
        </div>
      </Drawer.Title>
      <Drawer.Description asChild>
        <div className="card-details">
          <iframe
            src="https://maps.google.com/maps?q=6926+Main+St,+New+York,+NY&output=embed"
            allowFullScreen
            loading="lazy"
          />

          {description && <p className="description">{description}</p>}
          {pricing && (
            <div className="pricing cluster">
              <Tag {...iconProps} />
              <span>{pricing}</span>
            </div>
          )}
          {phone && (
            <div className="phone cluster">
              <Headset {...iconProps} />
              <span>{phone}</span>
            </div>
          )}
          {address && (
            <div className="address cluster">
              <MapPin {...iconProps} />
              <span>{address}</span>
            </div>
          )}
          {review && (
            <div className="review cluster">
              <Star {...iconProps} />
              <span>{review}</span>
            </div>
          )}
          {opening_hours && (
            <div className="opening-hours cluster">
              <Clock3 {...iconProps} />
              <span>{opening_hours}</span>
            </div>
          )}
        </div>
      </Drawer.Description>

      {map && (
        <button className="map cluster" onClick={handleBooking}>
          <CreditCard {...iconProps} size={22} strokeWidth={1.65} />
          <span>Book Now</span>
        </button>
      )}
      {/* <Drawer.Close>Close</Drawer.Close> */}
    </div>
  );
};

const NeptuneScoreDescription = ({ score, description }) => {
  return (
    <div className="card large description" style={{ "--i": score / 100 }}>
      <Drawer.Title asChild>
        <div className="card-header">
          <h3>Neptune Score</h3>

          <BadgeIcon />
        </div>
      </Drawer.Title>
      <p>{description}</p>
    </div>
  );
};

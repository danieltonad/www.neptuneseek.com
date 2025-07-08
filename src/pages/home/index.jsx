import SearchBox from "../../components/searchBox";
import Logo from "../../components/ui/Logo";
import { useSearch } from "../../context/SearchContext";
import { Drawer } from "vaul";
import "./home.scss";

export function Home() {
  return (
    <div className="home">
      <Logo />
      <div className="motto">
        <p>Trust deeper. Book smarter.</p>
        {/* <p>Save 90 minutes in 90 seconds.</p> */}
      </div>
      <h1>What service do you need?</h1>
      <SearchBox />
      <Suggestions />
    </div>
  );
}

function Suggestions() {
  return (
    <div className="suggestions">
      Find the best with our scoring based on ratings, pricing, and
      availability. &nbsp;
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <span id="custom">Learn more</span>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="drawer-overlay drawer-step" />
          <Drawer.Content className="drawer-content drawer-step">
            <Drawer.Handle />
            <NeptuneScoringExplanation />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}

function NeptuneScoringExplanation() {
  return (
    <div className="card large description">
      <Drawer.Title asChild>
        <div className="score-factor-header">Understanding Neptune Score</div>
      </Drawer.Title>
      <div className="score-factor">
        <p>
          The Neptune Score is a comprehensive rating system designed to help
          you find the best service providers quickly and confidently. Each
          provider earns a score out of 100, composed of points from three key
          factors:
        </p>
      </div>

      <div class="score-factor">
        <h3>1. Ratings & Reviews</h3>
        <p>
          <strong>(Up to 30 points)</strong> This reflects the average customer
          satisfaction based on their reviews and ratings. Higher star ratings
          contribute more points to the overall Neptune Score.
        </p>
      </div>

      <div class="score-factor">
        <h3>2. Competitive Pricing</h3>
        <p>
          <strong>(Up to 20 points)</strong> We assess the provider's pricing
          against industry averages for similar services. Providers offering
          more competitive (lower) average costs receive higher points in this
          category.
        </p>
      </div>

      <div class="score-factor">
        <h3>3. Availability</h3>
        <p>
          <strong>(Up to 40 points)</strong> This factor measures how quickly a
          provider can offer their services. Same-day availability earns the
          most points, followed by next-day availability.
        </p>
      </div>

      <div className="score-factor">
        <p class="summary-text">
          By combining these factors, the Neptune Score gives you a holistic
          view of a provider's quality, value, and responsiveness, empowering
          you to "Trust deeper" and "Book smarter."
        </p>
      </div>
    </div>
  );
}

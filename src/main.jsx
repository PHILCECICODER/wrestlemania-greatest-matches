import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Heart, Trophy, Star, CalendarDays, Clock3, Menu, X,
  ChevronDown, Flame, Award, Users, Filter
} from "lucide-react";
import "./styles.css";

const MATCHES = [
  {
    id: 1, rank: 1, rating: 9.9,
    title: "The Undertaker vs. Shawn Michaels",
    event: "WrestleMania XXV", year: 2009,
    type: "Singles Match", duration: "30:44",
    wrestlers: ["The Undertaker", "Shawn Michaels"],
    description: "A legendary clash built around counters, near-falls and two of the greatest performers in WrestleMania history.",
    tags: ["Classic", "Iconic", "★★★★★"]
  },
  {
    id: 2, rank: 2, rating: 9.8,
    title: "The Undertaker vs. Shawn Michaels",
    event: "WrestleMania XXVI", year: 2010,
    type: "Streak vs. Career", duration: "24:58",
    wrestlers: ["The Undertaker", "Shawn Michaels"],
    description: "The rematch raised the stakes dramatically: Michaels' career against Undertaker's undefeated WrestleMania streak.",
    tags: ["Career", "Streak", "★★★★★"]
  },
  {
    id: 3, rank: 3, rating: 9.7,
    title: "Bret Hart vs. Stone Cold Steve Austin",
    event: "WrestleMania 13", year: 1997,
    type: "Submission Match", duration: "22:05",
    wrestlers: ["Bret Hart", "Stone Cold Steve Austin"],
    description: "A brutal, emotionally charged submission match that helped define the Attitude Era.",
    tags: ["Submission", "Attitude Era", "★★★★★"]
  },
  {
    id: 4, rank: 4, rating: 9.6,
    title: "Shawn Michaels vs. Razor Ramon",
    event: "WrestleMania X", year: 1994,
    type: "Ladder Match", duration: "18:47",
    wrestlers: ["Shawn Michaels", "Razor Ramon"],
    description: "A groundbreaking ladder match whose creativity and athleticism changed the possibilities of WWE matches.",
    tags: ["Ladder", "Historic", "★★★★★"]
  },
  {
    id: 5, rank: 5, rating: 9.5,
    title: "Triple H vs. The Undertaker",
    event: "WrestleMania XXVIII", year: 2012,
    type: "Hell in a Cell", duration: "30:52",
    wrestlers: ["Triple H", "The Undertaker"],
    description: "Inside Hell in a Cell, three legends delivered a dramatic battle with Shawn Michaels as special referee.",
    tags: ["Hell in a Cell", "Legends", "★★★★★"]
  },
  {
    id: 6, rank: 6, rating: 9.4,
    title: "Randy Savage vs. Ricky Steamboat",
    event: "WrestleMania III", year: 1987,
    type: "Intercontinental Championship", duration: "14:35",
    wrestlers: ["Randy Savage", "Ricky Steamboat"],
    description: "A meticulously structured classic widely remembered for its fast pace, counters and unforgettable finish.",
    tags: ["Classic", "Technical", "★★★★★"]
  },
  {
    id: 7, rank: 7, rating: 9.3,
    title: "Sasha Banks vs. Bayley",
    event: "WrestleMania 37", year: 2021,
    type: "Singles Match", duration: "19:12",
    wrestlers: ["Sasha Banks", "Bayley"],
    description: "A modern-era showcase of athleticism and storytelling between two defining WWE women's division stars.",
    tags: ["Modern", "Women's", "★★★★★"]
  },
  {
    id: 8, rank: 8, rating: 9.2,
    title: "Edge vs. Mick Foley",
    event: "WrestleMania 22", year: 2006,
    type: "Hardcore Match", duration: "14:17",
    wrestlers: ["Edge", "Mick Foley"],
    description: "A wild hardcore collision packed with weapons, fire and memorable high-risk moments.",
    tags: ["Hardcore", "Extreme", "★★★★★"]
  },
  {
    id: 9, rank: 9, rating: 9.1,
    title: "Kurt Angle vs. Shawn Michaels",
    event: "WrestleMania 21", year: 2005,
    type: "Singles Match", duration: "27:25",
    wrestlers: ["Kurt Angle", "Shawn Michaels"],
    description: "Elite technical wrestling mixed with Shawn Michaels' trademark drama in a fan-favorite encounter.",
    tags: ["Technical", "Dream Match", "★★★★★"]
  },
  {
    id: 10, rank: 10, rating: 9.0,
    title: "The Rock vs. Hulk Hogan",
    event: "WrestleMania X8", year: 2002,
    type: "Singles Match", duration: "16:23",
    wrestlers: ["The Rock", "Hulk Hogan"],
    description: "A once-in-a-lifetime generational showdown where the crowd became part of the story.",
    tags: ["Generations", "Iconic", "★★★★★"]
  }
];

function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wm-favorites") || "[]"); }
    catch { return []; }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const types = ["All", ...new Set(MATCHES.map(m => m.type))];

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem("wm-favorites", JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return MATCHES.filter(m => {
      const haystack = [m.title, m.event, m.year, m.type, ...m.wrestlers, ...m.tags]
        .join(" ").toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesType = type === "All" || m.type === type;
      const matchesFav = !showFavorites || favorites.includes(m.id);
      return matchesQuery && matchesType && matchesFav;
    });
  }, [query, type, showFavorites, favorites]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => setMobileMenu(false)}>
          <span className="brand-mark"><Trophy size={19} /></span>
          <span>WRESTLE<span>MANIA</span></span>
        </a>
        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <nav className={mobileMenu ? "nav open" : "nav"}>
          <a href="#rankings" onClick={() => setMobileMenu(false)}>Rankings</a>
          <a href="#top10" onClick={() => setMobileMenu(false)}>Top 10</a>
          <button className={showFavorites ? "nav-favorite active" : "nav-favorite"}
            onClick={() => { setShowFavorites(!showFavorites); setMobileMenu(false); }}>
            <Heart size={16} fill={showFavorites ? "currentColor" : "none"} />
            Favorites <b>{favorites.length}</b>
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-noise" />
          <div className="hero-content">
            <div className="eyebrow"><Flame size={15} /> THE ULTIMATE WRESTLEMANIA ARCHIVE</div>
            <h1>The Greatest<br /><em>WrestleMania</em> Matches Ever</h1>
            <p>Ten unforgettable battles. Decades of history. One definitive ranking of the matches that made WrestleMania legendary.</p>
            <a className="hero-button" href="#rankings">Explore the rankings <ChevronDown size={18} /></a>
          </div>
          <div className="hero-stats">
            <div><strong>10</strong><span>ALL-TIME MATCHES</span></div>
            <div><strong>40+</strong><span>YEARS OF HISTORY</span></div>
            <div><strong>∞</strong><span>LEGENDARY MOMENTS</span></div>
          </div>
        </section>

        <section className="content" id="rankings">
          <div className="section-heading">
            <div>
              <div className="section-kicker">THE DEFINITIVE LIST</div>
              <h2>All-Time <span>Top 10</span></h2>
            </div>
            <div className="heading-note"><Award size={18} /> Ranked by legacy, storytelling & match quality</div>
          </div>

          <div className="controls">
            <div className="search-box">
              <Search size={18} />
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search wrestlers, events, match types..." />
              {query && <button onClick={() => setQuery("")}><X size={15} /></button>}
            </div>
            <div className="filter-wrap">
              <Filter size={16} />
              <select value={type} onChange={e => setType(e.target.value)}>
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <button className={showFavorites ? "favorite-filter active" : "favorite-filter"}
              onClick={() => setShowFavorites(!showFavorites)}>
              <Heart size={16} fill={showFavorites ? "currentColor" : "none"} />
              Favorites
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <Search size={34} />
              <h3>No matches found</h3>
              <p>Try another wrestler, event, or match type.</p>
            </div>
          ) : (
            <div className="match-list">
              {filtered.map(match => (
                <MatchCard key={match.id} match={match}
                  favorite={favorites.includes(match.id)}
                  onFavorite={() => toggleFavorite(match.id)} />
              ))}
            </div>
          )}
        </section>

        <section className="top10-strip" id="top10">
          <div>
            <div className="section-kicker">THE HALL OF FAME</div>
            <h2>Every match has a <em>moment.</em></h2>
          </div>
          <div className="strip-icons">
            <Users size={28} /><span>Legends</span>
            <Trophy size={28} /><span>Championships</span>
            <Star size={28} /><span>Classics</span>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><Trophy size={17} /> WRESTLEMANIA ARCHIVE</div>
        <span>A fan-made ranking of iconic WrestleMania matches.</span>
      </footer>
    </div>
  );
}

function MatchCard({ match, favorite, onFavorite }) {
  return (
    <article className="match-card">
      <div className="rank">{String(match.rank).padStart(2, "0")}</div>
      <div className="match-main">
        <div className="match-meta">
          <span className="event">{match.event}</span>
          <span>{match.year}</span>
          <span className="dot">•</span>
          <span>{match.type}</span>
        </div>
        <h3>{match.title}</h3>
        <div className="wrestlers">
          <span>{match.wrestlers[0]}</span>
          <b>VS</b>
          <span>{match.wrestlers[1]}</span>
        </div>
        <p>{match.description}</p>
        <div className="tags">{match.tags.map(t => <span key={t}>{t}</span>)}</div>
      </div>
      <div className="match-side">
        <button className={favorite ? "heart active" : "heart"} onClick={onFavorite} aria-label="Favorite match">
          <Heart size={19} fill={favorite ? "currentColor" : "none"} />
        </button>
        <div className="rating"><strong>{match.rating}</strong><span>/ 10</span></div>
        <div className="duration"><Clock3 size={14} /> {match.duration}</div>
      </div>
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);

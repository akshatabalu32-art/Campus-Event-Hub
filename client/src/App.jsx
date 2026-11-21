
import React, { useState } from "react";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("campusUser") || ""
  );

  const [authMode, setAuthMode] = useState("login");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registeredEvents, setRegisteredEvents] = useState([]);

  const events = [
    {
      id: 1,
      title: "Tech Fest 2026",
      category: "Technology",
      date: "25 November 2026",
      description: "Explore innovation, coding and future technology.",
      icon: "💻",
    },
    {
      id: 2,
      title: "Music Festival",
      category: "Entertainment",
      date: "28 November 2026",
      description: "Experience music, dance and amazing performances.",
      icon: "🎵",
    },
    {
      id: 3,
      title: "Art Competition",
      category: "Creativity",
      date: "02 December 2026",
      description: "Show your creativity and artistic talents.",
      icon: "🎨",
    },
    {
      id: 4,
      title: "Sports Day",
      category: "Sports",
      date: "05 December 2026",
      description: "Participate in exciting sports activities.",
      icon: "🏆",
    },
  ];

  const handleAuthChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuth = (e) => {
    e.preventDefault();

    const email = authData.email.trim().toLowerCase();

    if (authMode === "signup") {
      const users = JSON.parse(
        localStorage.getItem("campusUsers") || "[]"
      );

      const exists = users.find((user) => user.email === email);

      if (exists) {
        setMessage("Account already exists. Please login.");
        return;
      }

      const newUser = {
        name: authData.name.trim(),
        email,
        password: authData.password,
      };

      users.push(newUser);
      localStorage.setItem("campusUsers", JSON.stringify(users));

      localStorage.setItem("campusUser", newUser.name);
      setLoggedInUser(newUser.name);
      setMessage("");
    } else {
      const users = JSON.parse(
        localStorage.getItem("campusUsers") || "[]"
      );

      const user = users.find(
        (item) =>
          item.email === email &&
          item.password === authData.password
      );

      if (!user) {
        setMessage("Invalid email or password!");
        return;
      }

      localStorage.setItem("campusUser", user.name);
      setLoggedInUser(user.name);
      setMessage("");
    }

    setAuthData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("campusUser");
    setLoggedInUser("");
    setAuthMode("login");
    setRegisteredEvents([]);
  };

  const handleRegister = (event) => {
    if (registeredEvents.includes(event.title)) {
      return;
    }

    setRegisteredEvents([
      ...registeredEvents,
      event.title,
    ]);

    alert(`Successfully registered for ${event.title}!`);
  };

  const filteredEvents = events.filter((event) =>
    `${event.title} ${event.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // LOGIN AND SIGNUP PAGE

  if (!loggedInUser) {
    return (
      <div className="login-page">

        <div className="login-design">
          <div className="login-brand">
            Campus<span>Hub.</span>
          </div>

          <div className="login-content">
            <span className="eyebrow">
              YOUR CAMPUS, YOUR COMMUNITY
            </span>

            <h1>
              Discover Events.
              <br />
              Create Memories.
            </h1>

            <p>
              Join your campus community and explore
              exciting events, activities and experiences.
            </p>

            <div className="login-emoji">
              🎓 🎉 🚀
            </div>
          </div>

          <p className="design-footer">
            Connecting students through experiences.
          </p>
        </div>

        <div className="login-form-section">
          <div className="login-box">

            <div className="mobile-brand">
              Campus<span>Hub.</span>
            </div>

            <span className="form-tag">
              WELCOME TO CAMPUS EVENT HUB
            </span>

            <h2>
              {authMode === "login"
                ? "Welcome Back!"
                : "Create Account"}
            </h2>

            <p className="form-description">
              {authMode === "login"
                ? "Login to explore your campus events."
                : "Join us and discover exciting events."}
            </p>

            <div className="auth-tabs">
              <button
                className={authMode === "login" ? "active" : ""}
                onClick={() => {
                  setAuthMode("login");
                  setMessage("");
                }}
              >
                Login
              </button>

              <button
                className={authMode === "signup" ? "active" : ""}
                onClick={() => {
                  setAuthMode("signup");
                  setMessage("");
                }}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuth}>

              {authMode === "signup" && (
                <>
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={authData.name}
                    onChange={handleAuthChange}
                    required
                  />
                </>
              )}

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={authData.email}
                onChange={handleAuthChange}
                required
              />

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={authData.password}
                onChange={handleAuthChange}
                minLength={6}
                required
              />

              <button
                type="submit"
                className="submit-registration"
              >
                {authMode === "login"
                  ? "Login to Account →"
                  : "Create Account →"}
              </button>

            </form>

            {message && (
              <p className="login-message">
                {message}
              </p>
            )}

            <p className="login-footer">
              © 2026 Campus Event Hub. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // HOME PAGE

  return (
    <div className="home-page">

      <header className="main-header">

        <div className="navbar">
          <div className="brand">
            Campus<span>Hub.</span>
          </div>

          <nav>
            <a href="#home">Home</a>
            <a href="#events">Events</a>
            <a href="#about">About</a>
          </nav>

          <div className="user-actions">
            <span className="welcome-user">
              Hi, {loggedInUser} 👋
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

      </header>

      <main>

        <section className="hero-section" id="home">

          <div className="hero-content">
            <span className="eyebrow">
              YOUR CAMPUS. YOUR EXPERIENCE.
            </span>

            <h1>
              Make Every
              <br />
              Campus Moment
              <br />
              <span>Memorable.</span>
            </h1>

            <p>
              Discover exciting events, connect with students
              and be part of unforgettable campus experiences.
            </p>

            <a href="#events" className="hero-button">
              Explore Events →
            </a>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-icon">🎓</div>
              <h3>Campus Life</h3>
              <p>Discover. Participate. Celebrate.</p>
              <div className="visual-icons">
                <span>🎨</span>
                <span>💻</span>
                <span>🎵</span>
                <span>🏆</span>
              </div>
            </div>
          </div>

        </section>

        <section className="events-section" id="events">

          <div className="section-heading">
            <div>
              <span className="eyebrow">EXPLORE & PARTICIPATE</span>
              <h2>Upcoming Events</h2>
              <p>Find your next favourite campus experience.</p>
            </div>

            <div className="event-search">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span>🔍</span>
            </div>
          </div>

          <div className="events-grid">

            {filteredEvents.map((event) => (
              <div className="event-card" key={event.id}>

                <div className="event-icon">
                  {event.icon}
                </div>

                <span className="event-category">
                  {event.category}
                </span>

                <h3>{event.title}</h3>

                <p>{event.description}</p>

                <div className="event-date">
                  📅 {event.date}
                </div>

                <button
                  className="register-btn"
                  onClick={() => handleRegister(event)}
                  disabled={registeredEvents.includes(event.title)}
                >
                  {registeredEvents.includes(event.title)
                    ? "Registered ✓"
                    : "Register Now →"}
                </button>

              </div>
            ))}

            {filteredEvents.length === 0 && (
              <p>No events found. Try another search.</p>
            )}

          </div>

        </section>

        <section className="about-section" id="about">
          <span className="eyebrow">ABOUT OUR PLATFORM</span>
          <h2>One Hub. Endless Experiences.</h2>
          <p>
            Campus Event Hub brings students and college events
            together in one place. Discover opportunities,
            participate in activities and create memories.
          </p>
        </section>

      </main>

      <footer className="main-footer">
        <div className="brand">
          Campus<span>Hub.</span>
        </div>
        <p>Connecting students through campus experiences.</p>
        <p>© 2026 Campus Event Hub</p>
      </footer>

    </div>
  );
}

export default App;

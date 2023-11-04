import "./header.css";
export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="top-bar">
          <div className="logo">DevCon</div>
          <div className="searchbar">
            <input type="text" />
          </div>
          <div className="post-button">
            <div className="icon"></div>
          </div>
          <div className="profile-icon">
            <div className="icon">
              <ul className="submenu">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

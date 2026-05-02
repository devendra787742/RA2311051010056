import React, { useEffect, useState } from "react";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notifications/123")
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map(n => (
        <div key={n.id}>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
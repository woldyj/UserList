import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      const url = 'https://randomuser.me/api/?inc=name,picture&results=48';
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data.results);
    }
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
    return name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="App">
      <h1>List of users</h1>
      <input 
        id="filter-field" 
        type="text" 
        className="form-control mb-3 form-control-lg" 
        placeholder="Type to filter..." 
        value={filter} 
        onChange={handleFilterChange}
      />
      <div className="container">
        <div className="users row">
          {filteredUsers.map((user, index) => (
            <div key={index} className="user col-2">
              <img src={user.picture.large} alt={`${user.name.title} ${user.name.first} ${user.name.last}`} />
              <h3>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

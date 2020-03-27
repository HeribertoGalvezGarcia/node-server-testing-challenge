const express = require('express');

const server = express();
server.use(express.json());

let id = 1;

let users = [
  {
    id: id++,
    name: 'John Doe',
    bio: 'Anonymous Male'
  },
  {
    id: id++,
    name: 'Jane Doe',
    bio: 'Anonymous Female'
  }
];

server.post('/', ({body: {name, bio}}, res) => {
  if (name === undefined || bio === undefined) {
    return res.status(400).json({errorMessage: 'Please provide name and bio for the user.'});
  }

  const user = {
    id: id++,
    name,
    bio
  };

  try {
    users.push(user);
    res.status(201).json(user);
  } catch {
    res.status(500).json({errorMessage: 'There was an error while saving the user to the database.'})
  }
});

server.get('/', (req, res) => {
  try {
    res.status(200).json(users);
  } catch {
    res.status(500).json({errorMessage: 'The users information could not be retrieved.'});
  }
});

server.get('/:id', ({params: {id}}, res) => {
  let user;

  try {
    user = users.find(({id: userID}) => Number(id) === userID);
  } catch {
    return res.status(500).json({errorMessage: 'The user information could not be retrieved.'});
  }

  if (!user) return res.status(404).json({message: 'The user with the specified ID does not exist.'});

  res.status(200).json(user);
});

server.delete('/:id', ({params: {id}}, res) => {
  let user;

  try {
    user = users.find(({id: userID}) => Number(id) === userID);
  } catch {
    return res.status(500).json({errorMessage: 'The user information could not be retrieved.'});
  }

  if (!user) return res.status(404).json({message: 'The user with the specified ID does not exist.'});

  try {
    users = users.filter(({id: userID}) => id !== userID);
  } catch {
    return res.status(500).json({errorMessage: 'The user could not be removed.'});
  }

  res.status(200).json({message: 'User deleted.'});
});

module.exports = server;

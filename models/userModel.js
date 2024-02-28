const pool = require('../config/db');

const User = {
  create: async (userData) => {
    const { username, name, bio, password } = userData;
    const [result] = await pool.execute('INSERT INTO users (username, name, bio, password) VALUES (?, ?, ?, ?)', [username, name, bio, password]);
    const userId = result.insertId;
    return { id: userId, username, name, bio, password };
  },
  findOne: async (username) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows.length > 0 ? rows[0] : null;
  },
  findById: async (userId) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    return rows.length > 0 ? rows[0] : null;
  },
};

module.exports = User;

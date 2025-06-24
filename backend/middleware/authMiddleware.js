require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);

  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    next();
  } catch (err) {
    console.error('JWT Verify Error:', err); 
    return res.status(403).json({ message: 'Invalid token' });
  }
};

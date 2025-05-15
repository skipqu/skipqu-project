import admin from '../firebase.js';

export const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;

      if (allowedRoles.length > 0) {
        const userRole = req.user?.userType;
        if (!userRole || !allowedRoles.includes(userRole)) {
          return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
      }

      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};

/**
 * Extract and verify Firebase token and return UID
 * @param {string} authHeader - The Authorization header (e.g., "Bearer <token>")
 * @returns {Promise<string>} UID if token is valid
 * @throws {Error} If token is invalid or missing
 */
export const getUidFromAuthHeader = async (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};



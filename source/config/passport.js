import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";


const mockUser = { id: 1, username: "hemant", password: "1234" };
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      // Fetch user from DB or use mock data
      const user = mockUser;

      if (!user) {
        return done(null, false, { message: 'Invalid username' });
      }

      // Compare entered password with hashed password stored in DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user); // User authenticated
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = { id, username: "hemant" }; // Mocked deserialization
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Export passport configuration
export default passport;

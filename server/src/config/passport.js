import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const initPassport = (db) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const googleId = profile.id;

          let user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

          if (!user) {
            await db.run(
              `INSERT INTO users (id, email, googleId, role, status)
               VALUES (?, ?, ?, ?, ?)`,
              [
                crypto.randomUUID(),
                email,
                googleId,
                "user",
                "active",
              ]
            );

            user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};
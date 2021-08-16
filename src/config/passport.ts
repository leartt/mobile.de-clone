

import passport, { JwtFromRequestFunction } from 'passport-jwt';
import User from '../models/user.model';

import dotenv from 'dotenv';
dotenv.config();

const JwtStrategy = passport.Strategy;
const ExtractJwt = passport.ExtractJwt;

interface IOpts {
   jwtFromRequest: JwtFromRequestFunction
   secretOrKey: string | undefined
}

const opts = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_TOKEN_SECRET
};

export default passport => {
   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         User.findById(jwt_payload._id).then(user => {
            if (user) return done(null, user)
            return done(null, false);
         }).catch(err => {
            console.log(err);
         });
      })
   );
}
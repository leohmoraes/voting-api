import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pick from 'lodash.pick';
import config from 'config';

import User from '../models/User';
import Activity from '../models/Activity';
import errors from '../errors';

const authErrors = errors.auth;

export default class AuthController {
    static async signUp(ctx) {
        const {
            email, password, firstName, lastName, nickname,
        } = ctx.request.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            if (!hash) {
                throw new Error(authErrors.generateHashErr);
            }

            if (await User.findOne({ email })) {
                return ctx.send(400, authErrors.userWithEmailExists);
            }

            const user = await User.create({
                _id: new mongoose.Types.ObjectId(),
                email,
                firstName,
                lastName,
                nickname,
                password: hash,
            });

            return (user)
                ? ctx.send(200, {
                    user: pick(user, ['_id', 'lastName', 'firstName', 'email']),
                })
                : ctx.send(400, authErrors.unableToSignUp);
        } catch (error) {
            return ctx.send(500, error);
        }
    }

    static async signIn(ctx) {
        try {
            const { activity } = ctx.request.body;

            return passport.authenticate('local', { session: false }, async (err, user) => {
                if (err || !user) {
                    return ctx.send(400, authErrors.incorrectCredentials);
                }

                await ctx.login(user, { session: false });

                await Activity.create({
                    _id: new mongoose.Types.ObjectId(),
                    userId: user._id,
                    ...activity,
                });

                const token = jwt.sign(
                    pick(user, ['_id', 'email', 'username']),
                    config.token.secret, {
                        expiresIn: config.token.expiresIn,
                    },
                );

                return ctx.send(200, { token });
            })(ctx);
        } catch (error) {
            return ctx.send(500, error);
        }
    }

    static async getActivity(ctx) {
        const { userId } = ctx.params;

        try {
            const activities = await Activity.find({ userId }).sort({ date: -1 }).limit(10);

            return (activities && activities.length)
                ? ctx.send(200, activities)
                : ctx.send(204);
        } catch (error) {
            return ctx.send(500, error);
        }
    }

    static async signOut(ctx) {
        try {
            if (!ctx.isAuthenticated()) {
                return ctx.send(400, authErrors.unableToLogout);
            }
            ctx.logout();
            return ctx.send(200);
        } catch (error) {
            return ctx.send(500, error);
        }
    }
}

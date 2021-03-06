import mongoose from 'mongoose';

import Group from '../models/Group';
import MailService from '../services/mail';
import errors from '../errors';
import Voting from '../models/Voting';
import Vote from '../models/Vote';
import UserGroup from '../models/UserGroup';
import User from '../models/User';

const groupsError = errors.groups;

export default class GroupsController {
    static async create(ctx) {
        const { name, adminEmail, membersEmails } = ctx.request.body;

        try {
            const group = await Group.create({
                _id: new mongoose.Types.ObjectId(),
                name,
            });

            const emails = [adminEmail, ...membersEmails];

            await Promise.all(emails.map(async (email) => {
                const emailStart = 'https://voting-app-university.herokuapp.com';
                let linkToJoin = `${emailStart}/auth/signup?group=${group._id}&email=${email}`;

                if (email === adminEmail) {
                    linkToJoin += '&isAdmin=true';
                }

                await MailService.sendEmail({
                    to: email,
                    subject: 'You’re invited to join VoteApp',
                    text: linkToJoin,
                });
            }));

            return ctx.send(200, group);
        } catch (error) {
            return ctx.send(500, error);
        }
    }

    static async getVotingsByVoteState(ctx) {
        const { groupId, userId } = ctx.params;
        const { state } = ctx.query;

        if (state !== 'new' && state !== 'recent') {
            return ctx.send(400, groupsError.incorrectVotingState);
        }

        const votings = await Voting.find({
            groupId,
        });

        try {
            const newVotings = await Promise.all(votings.map(async (voting) => {
                const userVotes = await Vote.find({
                    userId,
                    votingId: voting._id,
                });

                if (state === 'new' && userVotes.length === 0) {
                    return voting;
                } if (state === 'recent' && userVotes.length > 0) {
                    return voting;
                } return null;
            }));

            const newVotingsFiltered = newVotings.filter(voting => voting);

            return (newVotingsFiltered.length)
                ? ctx.send(200, newVotingsFiltered)
                : ctx.send(204);
        } catch (error) {
            return ctx.send(500, error);
        }
    }

    static async getUsers(ctx) {
        const { groupId } = ctx.params;

        try {
            const userGroups = await UserGroup.find({ groupId }, 'userId');
            const userIds = userGroups.map(userGroup => userGroup.userId);
            const users = await User.find({
                _id: {
                    $in: userIds,
                },
            });

            return (users && users.length)
                ? ctx.send(200, users)
                : ctx.send(204);
        } catch (error) {
            return ctx.send(500, error);
        }
    }

    static async groupExists(ctx, next) {
        const { groupId } = ctx.params;
        const group = await Group.findById(groupId);

        if (!group) {
            return ctx.send(400, groupsError.noSuchId(groupId));
        }
        return next();
    }
}

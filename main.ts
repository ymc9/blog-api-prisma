import { PrismaClient } from '@prisma/client';
import express from 'express';
import {
    PostSchema,
    SpaceSchema,
    SpaceUserSchema,
    UserSchema,
} from './prisma/generated/zod';
require('express-async-errors');

main();

async function main() {
    const prisma = new PrismaClient();

    // express app and routes
    const app = express();

    app.use(express.json());

    // auth middleware
    app.use(async (req, res, next) => {
        const uid = req.headers['x-user-id'];
        if (typeof uid === 'string') {
            req.uid = parseInt(uid);
            const user = await prisma.user.findFirstOrThrow({
                where: { id: req.uid },
            });
            req.user = user;
        } else {
            if (req.path !== '/user' || req.method !== 'POST') {
                res.status(401).send({ error: 'Unauthorized' });
                return;
            }
        }
        next();
    });

    // user routes
    app.post('/user', async (req, res) => {
        const data = UserSchema.omit({ id: true }).parse(req.body);
        const r = await prisma.user.create({ data });
        res.send(r);
    });

    // space routes
    app.post('/space', async (req, res) => {
        const data = SpaceSchema.omit({ id: true }).parse(req.body);
        const r = await prisma.space.create({
            data: { ...data, ownerId: req.uid! },
        });
        res.send(r);
    });

    // space member management

    async function requireSpaceAdmin(
        uid: number,
        slug: string,
        prisma: PrismaClient
    ) {
        const space = await prisma.space.findFirst({
            where: {
                AND: [
                    { slug: slug },
                    {
                        OR: [
                            { ownerId: uid },
                            {
                                members: {
                                    some: {
                                        userId: uid,
                                        role: 'ADMIN',
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        });
        return space;
    }

    app.post('/space/:slug/member', async (req, res) => {
        const space = await requireSpaceAdmin(
            req.uid!,
            req.params.slug,
            prisma
        );
        if (!space) {
            res.status(403).send({ error: 'Forbidden' });
            return;
        }

        const data = SpaceUserSchema.partial({ role: true })
            .omit({ id: true, spaceId: true })
            .parse(req.body);
        // only allow adding users to the current space
        const r = await prisma.spaceUser.create({
            data: { ...data, spaceId: space.id },
        });
        res.send(r);
    });

    function requireSpace(slug: string) {
        return prisma.space.findFirst({ where: { slug } });
    }

    // post routes

    app.post('/space/:slug/post', async (req, res) => {
        const space = await requireSpace(req.params.slug);
        if (!space) {
            res.status(404).send({ error: 'Not found' });
            return;
        }

        const data = PostSchema.partial({ published: true })
            .omit({ id: true, spaceId: true, authorId: true })
            .parse(req.body);
        const r = await prisma.post.create({
            data: { ...data, spaceId: space.id, authorId: req.uid! },
        });
        res.send(r);
    });

    app.get('/space/:slug/post', async (req, res) => {
        const space = await requireSpace(req.params.slug);
        if (!space) {
            res.status(404).send({ error: 'Not found' });
            return;
        }

        const posts = await prisma.post.findMany({
            include: { author: true },
            where: {
                spaceId: space.id,
                OR: [
                    // 1. published and current user is a member of the space
                    {
                        published: true,
                        space: { members: { some: { userId: req.uid! } } },
                    },
                    // 2. authored by the current user
                    { authorId: req.uid! },
                    // 3. belongs to space owned by the current user
                    { space: { ownerId: req.uid! } },
                    // 4. belongs to space where the current user is an admin
                    {
                        space: {
                            members: {
                                some: {
                                    userId: req.uid!,
                                    role: 'ADMIN',
                                },
                            },
                        },
                    },
                ],
            },
        });

        res.send(posts);
    });

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

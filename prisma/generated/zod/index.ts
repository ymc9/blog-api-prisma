import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email']);

export const SpaceScalarFieldEnumSchema = z.enum(['id','ownerId','name','slug']);

export const SpaceUserScalarFieldEnumSchema = z.enum(['id','spaceId','userId','role']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','published','authorId','spaceId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const SpaceUserRoleSchema = z.enum(['MEMBER','ADMIN']);

export type SpaceUserRoleType = `${z.infer<typeof SpaceUserRoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SPACE SCHEMA
/////////////////////////////////////////

export const SpaceSchema = z.object({
  id: z.number().int(),
  ownerId: z.number().int(),
  name: z.string(),
  slug: z.string(),
})

export type Space = z.infer<typeof SpaceSchema>

/////////////////////////////////////////
// SPACE USER SCHEMA
/////////////////////////////////////////

export const SpaceUserSchema = z.object({
  role: SpaceUserRoleSchema,
  id: z.number().int(),
  spaceId: z.number().int(),
  userId: z.number().int(),
})

export type SpaceUser = z.infer<typeof SpaceUserSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  published: z.boolean(),
  authorId: z.number().int().nullable(),
  spaceId: z.number().int().nullable(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  spaceMembership: z.union([z.boolean(),z.lazy(() => SpaceUserFindManyArgsSchema)]).optional(),
  ownedSpaces: z.union([z.boolean(),z.lazy(() => SpaceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
  spaceMembership: z.boolean().optional(),
  ownedSpaces: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  spaceMembership: z.union([z.boolean(),z.lazy(() => SpaceUserFindManyArgsSchema)]).optional(),
  ownedSpaces: z.union([z.boolean(),z.lazy(() => SpaceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SPACE
//------------------------------------------------------

export const SpaceIncludeSchema: z.ZodType<Prisma.SpaceInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => SpaceUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SpaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SpaceArgsSchema: z.ZodType<Prisma.SpaceDefaultArgs> = z.object({
  select: z.lazy(() => SpaceSelectSchema).optional(),
  include: z.lazy(() => SpaceIncludeSchema).optional(),
}).strict();

export const SpaceCountOutputTypeArgsSchema: z.ZodType<Prisma.SpaceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SpaceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SpaceCountOutputTypeSelectSchema: z.ZodType<Prisma.SpaceCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
  members: z.boolean().optional(),
}).strict();

export const SpaceSelectSchema: z.ZodType<Prisma.SpaceSelect> = z.object({
  id: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => SpaceUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SpaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SPACE USER
//------------------------------------------------------

export const SpaceUserIncludeSchema: z.ZodType<Prisma.SpaceUserInclude> = z.object({
  space: z.union([z.boolean(),z.lazy(() => SpaceArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SpaceUserArgsSchema: z.ZodType<Prisma.SpaceUserDefaultArgs> = z.object({
  select: z.lazy(() => SpaceUserSelectSchema).optional(),
  include: z.lazy(() => SpaceUserIncludeSchema).optional(),
}).strict();

export const SpaceUserSelectSchema: z.ZodType<Prisma.SpaceUserSelect> = z.object({
  id: z.boolean().optional(),
  spaceId: z.boolean().optional(),
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  space: z.union([z.boolean(),z.lazy(() => SpaceArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  space: z.union([z.boolean(),z.lazy(() => SpaceArgsSchema)]).optional(),
}).strict()

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  published: z.boolean().optional(),
  authorId: z.boolean().optional(),
  spaceId: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  space: z.union([z.boolean(),z.lazy(() => SpaceArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserListRelationFilterSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserOrderByRelationAggregateInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserListRelationFilterSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SpaceWhereInputSchema: z.ZodType<Prisma.SpaceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceWhereInputSchema),z.lazy(() => SpaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceWhereInputSchema),z.lazy(() => SpaceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ownerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  members: z.lazy(() => SpaceUserListRelationFilterSchema).optional()
}).strict();

export const SpaceOrderByWithRelationInputSchema: z.ZodType<Prisma.SpaceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  members: z.lazy(() => SpaceUserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SpaceWhereUniqueInputSchema: z.ZodType<Prisma.SpaceWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    slug: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => SpaceWhereInputSchema),z.lazy(() => SpaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceWhereInputSchema),z.lazy(() => SpaceWhereInputSchema).array() ]).optional(),
  ownerId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  members: z.lazy(() => SpaceUserListRelationFilterSchema).optional()
}).strict());

export const SpaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpaceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpaceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SpaceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpaceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpaceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SpaceSumOrderByAggregateInputSchema).optional()
}).strict();

export const SpaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpaceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema),z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema),z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ownerId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SpaceUserWhereInputSchema: z.ZodType<Prisma.SpaceUserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceUserWhereInputSchema),z.lazy(() => SpaceUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceUserWhereInputSchema),z.lazy(() => SpaceUserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  spaceId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => EnumSpaceUserRoleFilterSchema),z.lazy(() => SpaceUserRoleSchema) ]).optional(),
  space: z.union([ z.lazy(() => SpaceRelationFilterSchema),z.lazy(() => SpaceWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SpaceUserOrderByWithRelationInputSchema: z.ZodType<Prisma.SpaceUserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  space: z.lazy(() => SpaceOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SpaceUserWhereUniqueInputSchema: z.ZodType<Prisma.SpaceUserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    spaceId_userId: z.lazy(() => SpaceUserSpaceIdUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    spaceId_userId: z.lazy(() => SpaceUserSpaceIdUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  spaceId_userId: z.lazy(() => SpaceUserSpaceIdUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SpaceUserWhereInputSchema),z.lazy(() => SpaceUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceUserWhereInputSchema),z.lazy(() => SpaceUserWhereInputSchema).array() ]).optional(),
  spaceId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  role: z.union([ z.lazy(() => EnumSpaceUserRoleFilterSchema),z.lazy(() => SpaceUserRoleSchema) ]).optional(),
  space: z.union([ z.lazy(() => SpaceRelationFilterSchema),z.lazy(() => SpaceWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SpaceUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpaceUserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpaceUserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SpaceUserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpaceUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpaceUserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SpaceUserSumOrderByAggregateInputSchema).optional()
}).strict();

export const SpaceUserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpaceUserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceUserScalarWhereWithAggregatesInputSchema),z.lazy(() => SpaceUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceUserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceUserScalarWhereWithAggregatesInputSchema),z.lazy(() => SpaceUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  spaceId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => EnumSpaceUserRoleWithAggregatesFilterSchema),z.lazy(() => SpaceUserRoleSchema) ]).optional(),
}).strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  spaceId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  space: z.union([ z.lazy(() => SpaceNullableRelationFilterSchema),z.lazy(() => SpaceWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  spaceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  space: z.lazy(() => SpaceOrderByWithRelationInputSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  spaceId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  space: z.union([ z.lazy(() => SpaceNullableRelationFilterSchema),z.lazy(() => SpaceWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  spaceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PostAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PostSumOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  published: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  spaceId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  email: z.string(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserCreateNestedManyWithoutUserInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserUpdateManyWithoutUserNestedInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  email: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceCreateInputSchema: z.ZodType<Prisma.SpaceCreateInput> = z.object({
  name: z.string(),
  slug: z.string(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwnedSpacesInputSchema),
  posts: z.lazy(() => PostCreateNestedManyWithoutSpaceInputSchema).optional(),
  members: z.lazy(() => SpaceUserCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceUncheckedCreateInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  ownerId: z.number().int(),
  name: z.string(),
  slug: z.string(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutSpaceInputSchema).optional(),
  members: z.lazy(() => SpaceUserUncheckedCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceUpdateInputSchema: z.ZodType<Prisma.SpaceUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwnedSpacesNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutSpaceNestedInputSchema).optional(),
  members: z.lazy(() => SpaceUserUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutSpaceNestedInputSchema).optional(),
  members: z.lazy(() => SpaceUserUncheckedUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceCreateManyInputSchema: z.ZodType<Prisma.SpaceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  ownerId: z.number().int(),
  name: z.string(),
  slug: z.string()
}).strict();

export const SpaceUpdateManyMutationInputSchema: z.ZodType<Prisma.SpaceUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceUserCreateInputSchema: z.ZodType<Prisma.SpaceUserCreateInput> = z.object({
  role: z.lazy(() => SpaceUserRoleSchema).optional(),
  space: z.lazy(() => SpaceCreateNestedOneWithoutMembersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutSpaceMembershipInputSchema)
}).strict();

export const SpaceUserUncheckedCreateInputSchema: z.ZodType<Prisma.SpaceUserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  spaceId: z.number().int(),
  userId: z.number().int(),
  role: z.lazy(() => SpaceUserRoleSchema).optional()
}).strict();

export const SpaceUserUpdateInputSchema: z.ZodType<Prisma.SpaceUserUpdateInput> = z.object({
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  space: z.lazy(() => SpaceUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSpaceMembershipNestedInputSchema).optional()
}).strict();

export const SpaceUserUncheckedUpdateInputSchema: z.ZodType<Prisma.SpaceUserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceUserCreateManyInputSchema: z.ZodType<Prisma.SpaceUserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  spaceId: z.number().int(),
  userId: z.number().int(),
  role: z.lazy(() => SpaceUserRoleSchema).optional()
}).strict();

export const SpaceUserUpdateManyMutationInputSchema: z.ZodType<Prisma.SpaceUserUpdateManyMutationInput> = z.object({
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceUserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpaceUserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  title: z.string(),
  published: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  space: z.lazy(() => SpaceCreateNestedOneWithoutPostsInputSchema).optional()
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  published: z.boolean().optional(),
  authorId: z.number().int().optional().nullable(),
  spaceId: z.number().int().optional().nullable()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  space: z.lazy(() => SpaceUpdateOneWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spaceId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  published: z.boolean().optional(),
  authorId: z.number().int().optional().nullable(),
  spaceId: z.number().int().optional().nullable()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spaceId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> = z.object({
  every: z.lazy(() => PostWhereInputSchema).optional(),
  some: z.lazy(() => PostWhereInputSchema).optional(),
  none: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const SpaceUserListRelationFilterSchema: z.ZodType<Prisma.SpaceUserListRelationFilter> = z.object({
  every: z.lazy(() => SpaceUserWhereInputSchema).optional(),
  some: z.lazy(() => SpaceUserWhereInputSchema).optional(),
  none: z.lazy(() => SpaceUserWhereInputSchema).optional()
}).strict();

export const SpaceListRelationFilterSchema: z.ZodType<Prisma.SpaceListRelationFilter> = z.object({
  every: z.lazy(() => SpaceWhereInputSchema).optional(),
  some: z.lazy(() => SpaceWhereInputSchema).optional(),
  none: z.lazy(() => SpaceWhereInputSchema).optional()
}).strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceUserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SpaceUserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SpaceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SpaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceSumOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSpaceUserRoleFilterSchema: z.ZodType<Prisma.EnumSpaceUserRoleFilter> = z.object({
  equals: z.lazy(() => SpaceUserRoleSchema).optional(),
  in: z.lazy(() => SpaceUserRoleSchema).array().optional(),
  notIn: z.lazy(() => SpaceUserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => NestedEnumSpaceUserRoleFilterSchema) ]).optional(),
}).strict();

export const SpaceRelationFilterSchema: z.ZodType<Prisma.SpaceRelationFilter> = z.object({
  is: z.lazy(() => SpaceWhereInputSchema).optional(),
  isNot: z.lazy(() => SpaceWhereInputSchema).optional()
}).strict();

export const SpaceUserSpaceIdUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.SpaceUserSpaceIdUserIdCompoundUniqueInput> = z.object({
  spaceId: z.number(),
  userId: z.number()
}).strict();

export const SpaceUserCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceUserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceUserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceUserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceUserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceUserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceUserMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceUserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceUserSumOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceUserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSpaceUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSpaceUserRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpaceUserRoleSchema).optional(),
  in: z.lazy(() => SpaceUserRoleSchema).array().optional(),
  notIn: z.lazy(() => SpaceUserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => NestedEnumSpaceUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpaceUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpaceUserRoleFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const SpaceNullableRelationFilterSchema: z.ZodType<Prisma.SpaceNullableRelationFilter> = z.object({
  is: z.lazy(() => SpaceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SpaceWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostSumOrderByAggregateInputSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpaceUserCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutUserInputSchema),z.lazy(() => SpaceUserCreateWithoutUserInputSchema).array(),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => SpaceUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceUserCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpaceCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutOwnerInputSchema),z.lazy(() => SpaceCreateWithoutOwnerInputSchema).array(),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => SpaceCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpaceUserUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutUserInputSchema),z.lazy(() => SpaceUserCreateWithoutUserInputSchema).array(),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => SpaceUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceUserCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpaceUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutOwnerInputSchema),z.lazy(() => SpaceCreateWithoutOwnerInputSchema).array(),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => SpaceCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceUserUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SpaceUserUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutUserInputSchema),z.lazy(() => SpaceUserCreateWithoutUserInputSchema).array(),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => SpaceUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpaceUserUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SpaceUserUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceUserCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpaceUserUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SpaceUserUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpaceUserUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SpaceUserUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpaceUserScalarWhereInputSchema),z.lazy(() => SpaceUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.SpaceUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutOwnerInputSchema),z.lazy(() => SpaceCreateWithoutOwnerInputSchema).array(),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => SpaceCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpaceUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => SpaceUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpaceUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => SpaceUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpaceUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => SpaceUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpaceScalarWhereInputSchema),z.lazy(() => SpaceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceUserUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SpaceUserUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutUserInputSchema),z.lazy(() => SpaceUserCreateWithoutUserInputSchema).array(),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => SpaceUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpaceUserUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SpaceUserUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceUserCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpaceUserUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SpaceUserUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpaceUserUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SpaceUserUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpaceUserScalarWhereInputSchema),z.lazy(() => SpaceUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutOwnerInputSchema),z.lazy(() => SpaceCreateWithoutOwnerInputSchema).array(),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => SpaceCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpaceUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => SpaceUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpaceUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => SpaceUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpaceUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => SpaceUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpaceScalarWhereInputSchema),z.lazy(() => SpaceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutOwnedSpacesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOwnedSpacesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOwnedSpacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwnedSpacesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOwnedSpacesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostCreateNestedManyWithoutSpaceInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutSpaceInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutSpaceInputSchema),z.lazy(() => PostCreateWithoutSpaceInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => PostCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManySpaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpaceUserCreateNestedManyWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserCreateNestedManyWithoutSpaceInput> = z.object({
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema).array(),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceUserCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => SpaceUserCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceUserCreateManySpaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutSpaceInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutSpaceInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutSpaceInputSchema),z.lazy(() => PostCreateWithoutSpaceInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => PostCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManySpaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpaceUserUncheckedCreateNestedManyWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserUncheckedCreateNestedManyWithoutSpaceInput> = z.object({
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema).array(),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceUserCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => SpaceUserCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceUserCreateManySpaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutOwnedSpacesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOwnedSpacesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOwnedSpacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwnedSpacesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOwnedSpacesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOwnedSpacesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutOwnedSpacesInputSchema),z.lazy(() => UserUpdateWithoutOwnedSpacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwnedSpacesInputSchema) ]).optional(),
}).strict();

export const PostUpdateManyWithoutSpaceNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutSpaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutSpaceInputSchema),z.lazy(() => PostCreateWithoutSpaceInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => PostCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManySpaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutSpaceInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutSpaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceUserUpdateManyWithoutSpaceNestedInputSchema: z.ZodType<Prisma.SpaceUserUpdateManyWithoutSpaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema).array(),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceUserCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => SpaceUserCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpaceUserUpsertWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => SpaceUserUpsertWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceUserCreateManySpaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpaceUserUpdateWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => SpaceUserUpdateWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpaceUserUpdateManyWithWhereWithoutSpaceInputSchema),z.lazy(() => SpaceUserUpdateManyWithWhereWithoutSpaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpaceUserScalarWhereInputSchema),z.lazy(() => SpaceUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutSpaceNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutSpaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutSpaceInputSchema),z.lazy(() => PostCreateWithoutSpaceInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => PostCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManySpaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutSpaceInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutSpaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceUserUncheckedUpdateManyWithoutSpaceNestedInputSchema: z.ZodType<Prisma.SpaceUserUncheckedUpdateManyWithoutSpaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema).array(),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceUserCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => SpaceUserCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpaceUserUpsertWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => SpaceUserUpsertWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceUserCreateManySpaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpaceUserWhereUniqueInputSchema),z.lazy(() => SpaceUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpaceUserUpdateWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => SpaceUserUpdateWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpaceUserUpdateManyWithWhereWithoutSpaceInputSchema),z.lazy(() => SpaceUserUpdateManyWithWhereWithoutSpaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpaceUserScalarWhereInputSchema),z.lazy(() => SpaceUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.SpaceCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutMembersInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpaceCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => SpaceWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutSpaceMembershipInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSpaceMembershipInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpaceMembershipInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpaceMembershipInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpaceMembershipInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumSpaceUserRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSpaceUserRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SpaceUserRoleSchema).optional()
}).strict();

export const SpaceUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.SpaceUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutMembersInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpaceCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => SpaceUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => SpaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpaceUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => SpaceUpdateWithoutMembersInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSpaceMembershipNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSpaceMembershipNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpaceMembershipInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpaceMembershipInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpaceMembershipInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSpaceMembershipInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSpaceMembershipInputSchema),z.lazy(() => UserUpdateWithoutSpaceMembershipInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpaceMembershipInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SpaceCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.SpaceCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutPostsInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpaceCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => SpaceWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const SpaceUpdateOneWithoutPostsNestedInputSchema: z.ZodType<Prisma.SpaceUpdateOneWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutPostsInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpaceCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => SpaceUpsertWithoutPostsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SpaceWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SpaceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SpaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpaceUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => SpaceUpdateWithoutPostsInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnumSpaceUserRoleFilterSchema: z.ZodType<Prisma.NestedEnumSpaceUserRoleFilter> = z.object({
  equals: z.lazy(() => SpaceUserRoleSchema).optional(),
  in: z.lazy(() => SpaceUserRoleSchema).array().optional(),
  notIn: z.lazy(() => SpaceUserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => NestedEnumSpaceUserRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSpaceUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSpaceUserRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpaceUserRoleSchema).optional(),
  in: z.lazy(() => SpaceUserRoleSchema).array().optional(),
  notIn: z.lazy(() => SpaceUserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => NestedEnumSpaceUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpaceUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpaceUserRoleFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.object({
  title: z.string(),
  published: z.boolean().optional(),
  space: z.lazy(() => SpaceCreateNestedOneWithoutPostsInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  published: z.boolean().optional(),
  spaceId: z.number().int().optional().nullable()
}).strict();

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyAuthorInputSchema),z.lazy(() => PostCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SpaceUserCreateWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserCreateWithoutUserInput> = z.object({
  role: z.lazy(() => SpaceUserRoleSchema).optional(),
  space: z.lazy(() => SpaceCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const SpaceUserUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  spaceId: z.number().int(),
  role: z.lazy(() => SpaceUserRoleSchema).optional()
}).strict();

export const SpaceUserCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SpaceUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutUserInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SpaceUserCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SpaceUserCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SpaceUserCreateManyUserInputSchema),z.lazy(() => SpaceUserCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SpaceCreateWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceCreateWithoutOwnerInput> = z.object({
  name: z.string(),
  slug: z.string(),
  posts: z.lazy(() => PostCreateNestedManyWithoutSpaceInputSchema).optional(),
  members: z.lazy(() => SpaceUserCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutSpaceInputSchema).optional(),
  members: z.lazy(() => SpaceUserUncheckedCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpaceCreateWithoutOwnerInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const SpaceCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.SpaceCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SpaceCreateManyOwnerInputSchema),z.lazy(() => SpaceCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  spaceId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const SpaceUserUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SpaceUserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpaceUserUpdateWithoutUserInputSchema),z.lazy(() => SpaceUserUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutUserInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SpaceUserUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SpaceUserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpaceUserUpdateWithoutUserInputSchema),z.lazy(() => SpaceUserUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SpaceUserUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SpaceUserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpaceUserUpdateManyMutationInputSchema),z.lazy(() => SpaceUserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SpaceUserScalarWhereInputSchema: z.ZodType<Prisma.SpaceUserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceUserScalarWhereInputSchema),z.lazy(() => SpaceUserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceUserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceUserScalarWhereInputSchema),z.lazy(() => SpaceUserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  spaceId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => EnumSpaceUserRoleFilterSchema),z.lazy(() => SpaceUserRoleSchema) ]).optional(),
}).strict();

export const SpaceUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpaceUpdateWithoutOwnerInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => SpaceCreateWithoutOwnerInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const SpaceUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpaceUpdateWithoutOwnerInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const SpaceUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => SpaceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpaceUpdateManyMutationInputSchema),z.lazy(() => SpaceUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const SpaceScalarWhereInputSchema: z.ZodType<Prisma.SpaceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceScalarWhereInputSchema),z.lazy(() => SpaceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceScalarWhereInputSchema),z.lazy(() => SpaceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ownerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutOwnedSpacesInputSchema: z.ZodType<Prisma.UserCreateWithoutOwnedSpacesInput> = z.object({
  email: z.string(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutOwnedSpacesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOwnedSpacesInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutOwnedSpacesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOwnedSpacesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutOwnedSpacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwnedSpacesInputSchema) ]),
}).strict();

export const PostCreateWithoutSpaceInputSchema: z.ZodType<Prisma.PostCreateWithoutSpaceInput> = z.object({
  title: z.string(),
  published: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutSpaceInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutSpaceInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  published: z.boolean().optional(),
  authorId: z.number().int().optional().nullable()
}).strict();

export const PostCreateOrConnectWithoutSpaceInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutSpaceInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutSpaceInputSchema),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema) ]),
}).strict();

export const PostCreateManySpaceInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManySpaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManySpaceInputSchema),z.lazy(() => PostCreateManySpaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SpaceUserCreateWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserCreateWithoutSpaceInput> = z.object({
  role: z.lazy(() => SpaceUserRoleSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSpaceMembershipInputSchema)
}).strict();

export const SpaceUserUncheckedCreateWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserUncheckedCreateWithoutSpaceInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  role: z.lazy(() => SpaceUserRoleSchema).optional()
}).strict();

export const SpaceUserCreateOrConnectWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserCreateOrConnectWithoutSpaceInput> = z.object({
  where: z.lazy(() => SpaceUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema) ]),
}).strict();

export const SpaceUserCreateManySpaceInputEnvelopeSchema: z.ZodType<Prisma.SpaceUserCreateManySpaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SpaceUserCreateManySpaceInputSchema),z.lazy(() => SpaceUserCreateManySpaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutOwnedSpacesInputSchema: z.ZodType<Prisma.UserUpsertWithoutOwnedSpacesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutOwnedSpacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwnedSpacesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutOwnedSpacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwnedSpacesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutOwnedSpacesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOwnedSpacesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutOwnedSpacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwnedSpacesInputSchema) ]),
}).strict();

export const UserUpdateWithoutOwnedSpacesInputSchema: z.ZodType<Prisma.UserUpdateWithoutOwnedSpacesInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutOwnedSpacesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutOwnedSpacesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  spaceMembership: z.lazy(() => SpaceUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostUpsertWithWhereUniqueWithoutSpaceInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutSpaceInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutSpaceInputSchema),z.lazy(() => PostUncheckedUpdateWithoutSpaceInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutSpaceInputSchema),z.lazy(() => PostUncheckedCreateWithoutSpaceInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutSpaceInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutSpaceInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutSpaceInputSchema),z.lazy(() => PostUncheckedUpdateWithoutSpaceInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutSpaceInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutSpaceInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutSpaceInputSchema) ]),
}).strict();

export const SpaceUserUpsertWithWhereUniqueWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserUpsertWithWhereUniqueWithoutSpaceInput> = z.object({
  where: z.lazy(() => SpaceUserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpaceUserUpdateWithoutSpaceInputSchema),z.lazy(() => SpaceUserUncheckedUpdateWithoutSpaceInputSchema) ]),
  create: z.union([ z.lazy(() => SpaceUserCreateWithoutSpaceInputSchema),z.lazy(() => SpaceUserUncheckedCreateWithoutSpaceInputSchema) ]),
}).strict();

export const SpaceUserUpdateWithWhereUniqueWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserUpdateWithWhereUniqueWithoutSpaceInput> = z.object({
  where: z.lazy(() => SpaceUserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpaceUserUpdateWithoutSpaceInputSchema),z.lazy(() => SpaceUserUncheckedUpdateWithoutSpaceInputSchema) ]),
}).strict();

export const SpaceUserUpdateManyWithWhereWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserUpdateManyWithWhereWithoutSpaceInput> = z.object({
  where: z.lazy(() => SpaceUserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpaceUserUpdateManyMutationInputSchema),z.lazy(() => SpaceUserUncheckedUpdateManyWithoutSpaceInputSchema) ]),
}).strict();

export const SpaceCreateWithoutMembersInputSchema: z.ZodType<Prisma.SpaceCreateWithoutMembersInput> = z.object({
  name: z.string(),
  slug: z.string(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwnedSpacesInputSchema),
  posts: z.lazy(() => PostCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateWithoutMembersInput> = z.object({
  id: z.number().int().optional(),
  ownerId: z.number().int(),
  name: z.string(),
  slug: z.string(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.SpaceCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpaceCreateWithoutMembersInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const UserCreateWithoutSpaceMembershipInputSchema: z.ZodType<Prisma.UserCreateWithoutSpaceMembershipInput> = z.object({
  email: z.string(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSpaceMembershipInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSpaceMembershipInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSpaceMembershipInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSpaceMembershipInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSpaceMembershipInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpaceMembershipInputSchema) ]),
}).strict();

export const SpaceUpsertWithoutMembersInputSchema: z.ZodType<Prisma.SpaceUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => SpaceUpdateWithoutMembersInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => SpaceCreateWithoutMembersInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => SpaceWhereInputSchema).optional()
}).strict();

export const SpaceUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.SpaceUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => SpaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SpaceUpdateWithoutMembersInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const SpaceUpdateWithoutMembersInputSchema: z.ZodType<Prisma.SpaceUpdateWithoutMembersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwnedSpacesNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutSpaceMembershipInputSchema: z.ZodType<Prisma.UserUpsertWithoutSpaceMembershipInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSpaceMembershipInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpaceMembershipInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSpaceMembershipInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpaceMembershipInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSpaceMembershipInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSpaceMembershipInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSpaceMembershipInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpaceMembershipInputSchema) ]),
}).strict();

export const UserUpdateWithoutSpaceMembershipInputSchema: z.ZodType<Prisma.UserUpdateWithoutSpaceMembershipInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSpaceMembershipInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSpaceMembershipInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  email: z.string(),
  spaceMembership: z.lazy(() => SpaceUserCreateNestedManyWithoutUserInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  spaceMembership: z.lazy(() => SpaceUserUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const SpaceCreateWithoutPostsInputSchema: z.ZodType<Prisma.SpaceCreateWithoutPostsInput> = z.object({
  name: z.string(),
  slug: z.string(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwnedSpacesInputSchema),
  members: z.lazy(() => SpaceUserCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateWithoutPostsInput> = z.object({
  id: z.number().int().optional(),
  ownerId: z.number().int(),
  name: z.string(),
  slug: z.string(),
  members: z.lazy(() => SpaceUserUncheckedCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.SpaceCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpaceCreateWithoutPostsInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spaceMembership: z.lazy(() => SpaceUserUpdateManyWithoutUserNestedInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spaceMembership: z.lazy(() => SpaceUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  ownedSpaces: z.lazy(() => SpaceUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const SpaceUpsertWithoutPostsInputSchema: z.ZodType<Prisma.SpaceUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => SpaceUpdateWithoutPostsInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => SpaceCreateWithoutPostsInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => SpaceWhereInputSchema).optional()
}).strict();

export const SpaceUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.SpaceUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => SpaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SpaceUpdateWithoutPostsInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const SpaceUpdateWithoutPostsInputSchema: z.ZodType<Prisma.SpaceUpdateWithoutPostsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwnedSpacesNestedInputSchema).optional(),
  members: z.lazy(() => SpaceUserUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => SpaceUserUncheckedUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  published: z.boolean().optional(),
  spaceId: z.number().int().optional().nullable()
}).strict();

export const SpaceUserCreateManyUserInputSchema: z.ZodType<Prisma.SpaceUserCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  spaceId: z.number().int(),
  role: z.lazy(() => SpaceUserRoleSchema).optional()
}).strict();

export const SpaceCreateManyOwnerInputSchema: z.ZodType<Prisma.SpaceCreateManyOwnerInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string()
}).strict();

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  space: z.lazy(() => SpaceUpdateOneWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpaceUserUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserUpdateWithoutUserInput> = z.object({
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  space: z.lazy(() => SpaceUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const SpaceUserUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceUserUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SpaceUserUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceUpdateWithoutOwnerInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutSpaceNestedInputSchema).optional(),
  members: z.lazy(() => SpaceUserUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutSpaceNestedInputSchema).optional(),
  members: z.lazy(() => SpaceUserUncheckedUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateManySpaceInputSchema: z.ZodType<Prisma.PostCreateManySpaceInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  published: z.boolean().optional(),
  authorId: z.number().int().optional().nullable()
}).strict();

export const SpaceUserCreateManySpaceInputSchema: z.ZodType<Prisma.SpaceUserCreateManySpaceInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  role: z.lazy(() => SpaceUserRoleSchema).optional()
}).strict();

export const PostUpdateWithoutSpaceInputSchema: z.ZodType<Prisma.PostUpdateWithoutSpaceInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutSpaceInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutSpaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PostUncheckedUpdateManyWithoutSpaceInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutSpaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpaceUserUpdateWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserUpdateWithoutSpaceInput> = z.object({
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSpaceMembershipNestedInputSchema).optional()
}).strict();

export const SpaceUserUncheckedUpdateWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserUncheckedUpdateWithoutSpaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceUserUncheckedUpdateManyWithoutSpaceInputSchema: z.ZodType<Prisma.SpaceUserUncheckedUpdateManyWithoutSpaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SpaceUserRoleSchema),z.lazy(() => EnumSpaceUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const SpaceFindFirstArgsSchema: z.ZodType<Prisma.SpaceFindFirstArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithRelationInputSchema.array(),SpaceOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceScalarFieldEnumSchema,SpaceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SpaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpaceFindFirstOrThrowArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithRelationInputSchema.array(),SpaceOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceScalarFieldEnumSchema,SpaceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SpaceFindManyArgsSchema: z.ZodType<Prisma.SpaceFindManyArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithRelationInputSchema.array(),SpaceOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceScalarFieldEnumSchema,SpaceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SpaceAggregateArgsSchema: z.ZodType<Prisma.SpaceAggregateArgs> = z.object({
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithRelationInputSchema.array(),SpaceOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SpaceGroupByArgsSchema: z.ZodType<Prisma.SpaceGroupByArgs> = z.object({
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithAggregationInputSchema.array(),SpaceOrderByWithAggregationInputSchema ]).optional(),
  by: SpaceScalarFieldEnumSchema.array(),
  having: SpaceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SpaceFindUniqueArgsSchema: z.ZodType<Prisma.SpaceFindUniqueArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereUniqueInputSchema,
}).strict()

export const SpaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpaceFindUniqueOrThrowArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereUniqueInputSchema,
}).strict()

export const SpaceUserFindFirstArgsSchema: z.ZodType<Prisma.SpaceUserFindFirstArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  where: SpaceUserWhereInputSchema.optional(),
  orderBy: z.union([ SpaceUserOrderByWithRelationInputSchema.array(),SpaceUserOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceUserScalarFieldEnumSchema,SpaceUserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SpaceUserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpaceUserFindFirstOrThrowArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  where: SpaceUserWhereInputSchema.optional(),
  orderBy: z.union([ SpaceUserOrderByWithRelationInputSchema.array(),SpaceUserOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceUserScalarFieldEnumSchema,SpaceUserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SpaceUserFindManyArgsSchema: z.ZodType<Prisma.SpaceUserFindManyArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  where: SpaceUserWhereInputSchema.optional(),
  orderBy: z.union([ SpaceUserOrderByWithRelationInputSchema.array(),SpaceUserOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceUserScalarFieldEnumSchema,SpaceUserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SpaceUserAggregateArgsSchema: z.ZodType<Prisma.SpaceUserAggregateArgs> = z.object({
  where: SpaceUserWhereInputSchema.optional(),
  orderBy: z.union([ SpaceUserOrderByWithRelationInputSchema.array(),SpaceUserOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SpaceUserGroupByArgsSchema: z.ZodType<Prisma.SpaceUserGroupByArgs> = z.object({
  where: SpaceUserWhereInputSchema.optional(),
  orderBy: z.union([ SpaceUserOrderByWithAggregationInputSchema.array(),SpaceUserOrderByWithAggregationInputSchema ]).optional(),
  by: SpaceUserScalarFieldEnumSchema.array(),
  having: SpaceUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SpaceUserFindUniqueArgsSchema: z.ZodType<Prisma.SpaceUserFindUniqueArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  where: SpaceUserWhereUniqueInputSchema,
}).strict()

export const SpaceUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpaceUserFindUniqueOrThrowArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  where: SpaceUserWhereUniqueInputSchema,
}).strict()

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const SpaceCreateArgsSchema: z.ZodType<Prisma.SpaceCreateArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  data: z.union([ SpaceCreateInputSchema,SpaceUncheckedCreateInputSchema ]),
}).strict()

export const SpaceUpsertArgsSchema: z.ZodType<Prisma.SpaceUpsertArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereUniqueInputSchema,
  create: z.union([ SpaceCreateInputSchema,SpaceUncheckedCreateInputSchema ]),
  update: z.union([ SpaceUpdateInputSchema,SpaceUncheckedUpdateInputSchema ]),
}).strict()

export const SpaceCreateManyArgsSchema: z.ZodType<Prisma.SpaceCreateManyArgs> = z.object({
  data: z.union([ SpaceCreateManyInputSchema,SpaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SpaceDeleteArgsSchema: z.ZodType<Prisma.SpaceDeleteArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereUniqueInputSchema,
}).strict()

export const SpaceUpdateArgsSchema: z.ZodType<Prisma.SpaceUpdateArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  data: z.union([ SpaceUpdateInputSchema,SpaceUncheckedUpdateInputSchema ]),
  where: SpaceWhereUniqueInputSchema,
}).strict()

export const SpaceUpdateManyArgsSchema: z.ZodType<Prisma.SpaceUpdateManyArgs> = z.object({
  data: z.union([ SpaceUpdateManyMutationInputSchema,SpaceUncheckedUpdateManyInputSchema ]),
  where: SpaceWhereInputSchema.optional(),
}).strict()

export const SpaceDeleteManyArgsSchema: z.ZodType<Prisma.SpaceDeleteManyArgs> = z.object({
  where: SpaceWhereInputSchema.optional(),
}).strict()

export const SpaceUserCreateArgsSchema: z.ZodType<Prisma.SpaceUserCreateArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  data: z.union([ SpaceUserCreateInputSchema,SpaceUserUncheckedCreateInputSchema ]),
}).strict()

export const SpaceUserUpsertArgsSchema: z.ZodType<Prisma.SpaceUserUpsertArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  where: SpaceUserWhereUniqueInputSchema,
  create: z.union([ SpaceUserCreateInputSchema,SpaceUserUncheckedCreateInputSchema ]),
  update: z.union([ SpaceUserUpdateInputSchema,SpaceUserUncheckedUpdateInputSchema ]),
}).strict()

export const SpaceUserCreateManyArgsSchema: z.ZodType<Prisma.SpaceUserCreateManyArgs> = z.object({
  data: z.union([ SpaceUserCreateManyInputSchema,SpaceUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SpaceUserDeleteArgsSchema: z.ZodType<Prisma.SpaceUserDeleteArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  where: SpaceUserWhereUniqueInputSchema,
}).strict()

export const SpaceUserUpdateArgsSchema: z.ZodType<Prisma.SpaceUserUpdateArgs> = z.object({
  select: SpaceUserSelectSchema.optional(),
  include: SpaceUserIncludeSchema.optional(),
  data: z.union([ SpaceUserUpdateInputSchema,SpaceUserUncheckedUpdateInputSchema ]),
  where: SpaceUserWhereUniqueInputSchema,
}).strict()

export const SpaceUserUpdateManyArgsSchema: z.ZodType<Prisma.SpaceUserUpdateManyArgs> = z.object({
  data: z.union([ SpaceUserUpdateManyMutationInputSchema,SpaceUserUncheckedUpdateManyInputSchema ]),
  where: SpaceUserWhereInputSchema.optional(),
}).strict()

export const SpaceUserDeleteManyArgsSchema: z.ZodType<Prisma.SpaceUserDeleteManyArgs> = z.object({
  where: SpaceUserWhereInputSchema.optional(),
}).strict()

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict()

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict()

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
}).strict()

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict()
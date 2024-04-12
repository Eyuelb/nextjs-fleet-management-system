import tokenService from "@/lib/token";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { error } from "console";
import { connectToDatabase } from "db/pool";
import { users } from "db/schema";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { commonInjection } from "utils/api/common";
import { logRequest } from "utils/api/log";

interface RequestContext {
  params: {
    data?: string[];
  };
}

interface RequestType extends NextRequest {
  state: {};
}

// Create a router
const router = createEdgeRouter<RequestType, RequestContext>();

router.use(logRequest);
router.use(tokenService.validateRequestMiddleware);

router.get(async (req) => {
  const db = await connectToDatabase();
  const result = await db.select().from(users);

  return NextResponse.json(result);
});

router.post(async (req) => {
  const body = await req.json();
  const salt = genSaltSync(10);
  const password = hashSync("123456", salt);
  console.log(body)
  const newUser = {
    ...body,
    password,
    ...commonInjection.post
  };
  try {
    const db = await connectToDatabase();

    const result = await db.insert(users).values(newUser);
    return NextResponse.json(result);
  } catch (error) {}

  return NextResponse.json(error, {
    status: 500,
  });
});

// Export handlers
export const { GET, POST } = {
  GET: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<Response>
  },
  POST: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<Response>
  },
};

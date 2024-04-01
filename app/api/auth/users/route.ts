import tokenService from "@/lib/token";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { randomUUID } from "crypto";
import { connectToDatabase } from "db/pool";
import { user } from "db/schema";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
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
  const result = await db.select().from(user);

  return NextResponse.json(result);
});

router.post(async (req) => {
  const body = await req.json();
  const salt = genSaltSync(10);
  const password = hashSync("123456", salt);
  const newUser = {
    id: randomUUID(),
    ...body,
    password,
  };
  try {
    const db = await connectToDatabase();

    await db.insert(user).values(newUser);
  } catch (error) {}

  return NextResponse.json({
    message: "User has been created",
  });
});

// Export handlers
export const { GET, POST } = {
  GET: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
  POST: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
};

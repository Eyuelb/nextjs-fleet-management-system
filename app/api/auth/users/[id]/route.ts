import { connectToDatabase } from "db/pool";
import { users } from "db/schema";
import { eq } from "drizzle-orm";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { logRequest } from "utils/api/log";

interface RequestContext {
  params: {
    id?: string;
  };
}

interface RequestType extends NextRequest {
  state: {
    usersId: string;
  };
}

async function validateId(
  req: RequestType,
  ctx: RequestContext,
  next: () => void
) {
  const usersId = ctx.params.id;
  if (!usersId) {
    return NextResponse.json(
      { message: "Invalid id!" },
      {
        status: 400,
      }
    );
  }
  req.state = {
    usersId,
  };

  return next();
}
// Create a router
const router = createEdgeRouter<RequestType, RequestContext>();

router.use(logRequest);
router.use(validateId);

// Define GET handler
router.get(async (req) => {
  const usersId = req.state.usersId;
  const db = await connectToDatabase();
  const data = await db.select().from(users).where(eq(users.id, usersId));
  return NextResponse.json(data);
});

// Define PUT handler
router.put(async (req) => {
  const usersId = req.state.usersId;
  const body = await req.json();

  const db = await connectToDatabase();
  await db.update(users).set(body).where(eq(users.id, usersId));

  return NextResponse.json({
    message: "User has been updated",
  });
});

// Define DELETE handler
router.delete(async (req) => {
  const usersId = req.state.usersId;
  console.log(usersId);

  const db = await connectToDatabase();
  await db.delete(users).where(eq(users.id, usersId));

  return NextResponse.json({
    message: "User has been deleted",
  });
});

// Export handlers
export const { GET, PUT, DELETE } = {
  GET: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
  PUT: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
  DELETE: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
};

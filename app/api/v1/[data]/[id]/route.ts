import { connectToDatabase } from "db/pool";
import { eq } from "drizzle-orm";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { logRequest } from "utils/api/log";
import * as schema from "db/schema";
import { AppConfig } from "utils/app-config";

interface RequestContext {
  params: {
    id?: string;
  };
}

interface RequestType extends NextRequest {
  state: {
    uuid: string;
    tableName: string;
  };
}
function getTableName(pathname: string): string | null {
  // Extract role ID using regular expression
  const match = pathname.split("/");
  if (match.length > 3) return match[3];

  return "";
}
async function validateTable(
  req: RequestType,
  ctx: RequestContext,
  next: () => void
) {
  const tableName = getTableName(req.nextUrl.pathname);
  if (!tableName || !(tableName in AppConfig)) {
    return NextResponse.json(
      { message: "Invalid Model!" },
      {
        status: 400,
      }
    );
  }
  req.state = {
    ...req.state,
    tableName,
  };

  return next();
}
async function validateId(
  req: RequestType,
  ctx: RequestContext,
  next: () => void
) {
  const uuid = ctx.params.id;
  if (!uuid) {
    return NextResponse.json(
      { message: "Invalid id!" },
      {
        status: 400,
      }
    );
  }
  req.state = {
    ...req.state,
    uuid,
  };

  return next();
}
// Create a router
const router = createEdgeRouter<RequestType, RequestContext>();

router.use(logRequest);
router.use(validateTable);
router.use(validateId);

// Define GET handler
router.get(async (req) => {
  const uuid = req.state.uuid;
  const tableName = req.state.tableName as keyof typeof schema;

  const db = await connectToDatabase();
  const data = await db
    .select()
    .from(schema[tableName])
    .where(eq(schema[tableName].id, uuid));
  return NextResponse.json(data);
});

// Define PUT handler
router.put(async (req) => {
  const uuid = req.state.uuid;
  const tableName = req.state.tableName as keyof typeof schema;
  const body = await req.json();

  const db = await connectToDatabase();
  const result = await db
    .update(schema[tableName])
    .set(body)
    .where(eq(schema[tableName].id, uuid));

  return NextResponse.json(result);
});

// Define DELETE handler
router.delete(async (req) => {
  const uuid = req.state.uuid;
  const tableName = req.state.tableName as keyof typeof schema;
  const db = await connectToDatabase();
  const result = await db
    .delete(schema[tableName])
    .where(eq(schema[tableName].id, uuid));

  return NextResponse.json(result);
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

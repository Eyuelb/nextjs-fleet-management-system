import { connectToDatabase, getTable } from "db/pool";
import queryBuilder from "db/query";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { validateSchema } from "utils/api/common";
import { logRequest } from "utils/api/log";
import { ErrorResponse } from "utils/api/response";
import { AppConfig } from "utils/app-config";

interface RequestContext {
  params: {
    data?: string;
  };
}

interface RequestType extends NextRequest {
  state: {
    tableName: string;
  };
}

// Middleware function to validate table names
async function validateTable(
  req: RequestType,
  ctx: RequestContext,
  next: () => void
) {
  const tableName = ctx.params.data;

  if (!tableName || !(tableName in AppConfig)) {
    return NextResponse.json(
      { message: "Invalid Model!" },
      {
        status: 400,
      }
    );
  }
  req.state = {
    tableName,
  };

  return next();
}

// Create a router
const router = createEdgeRouter<RequestType, RequestContext>();

router.use(logRequest);
router.use(validateTable);

// Define GET handler
router.get(async (req) => {
  try {
    const table = getTable(req.state?.tableName); // Obtain table object from database setup
    const db = await connectToDatabase(); // Initialize db asynchronously
    const result = await db.select().from(table);
    return NextResponse.json(result);
  } catch (error) {
    return ErrorResponse(501, "Error retrieving data");
  }
});
router.post(async (req) => {
  const table = getTable(req.state?.tableName); // Obtain table object from database setup
  try {
    const body = await req.json();
    const data = validateSchema(table).insert.parse(body)
    const db = await connectToDatabase(); // Initialize db asynchronously
    const result = await db.insert(table).values(data);
    return NextResponse.json(result);
  } catch (error) {
     console.log(error);
    return ErrorResponse(500, "Error on creating data");
  }
  const body = await req.json();
  const result = await queryBuilder.create(req.state?.tableName, body);

  const res = NextResponse.json(result);
  return res;
});
// Export handlers
export const { GET, POST } = {
  GET: async function (request: RequestType, ctx: RequestContext) {
    return await router.run(request, ctx);
  },
  POST: async function (request: RequestType, ctx: RequestContext) {
    return await router.run(request, ctx);
  },
};

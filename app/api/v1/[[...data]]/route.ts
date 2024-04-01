import { randomUUID } from "crypto";
import queryBuilder from "db/query";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { logRequest } from "utils/api/log";

enum AppConfig {
  user = "user",
  products = "products",
  // Add more endpoints and their corresponding table names as needed
}
interface RequestContext {
  params: {
    data?: string[];
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
  const tableName = ctx.params.data?.[0];

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
  const data = await queryBuilder.read(req.state?.tableName);
  return NextResponse.json({ data });
});
router.post(async (req) => {
  const body = await req.json();
  const newUser = {
    id: randomUUID(),
    ...body,
  };

  const result = await queryBuilder.create(req.state?.tableName, newUser);

  const res = NextResponse.json({
    message: "User has been created",
  });
  return res;
});
// Export handlers
export const { GET, POST, PUT, DELETE } = {
  GET: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
  POST: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
  PUT: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
  DELETE: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
};

import queryBuilder from "db/query";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { logRequest } from "utils/api/log";
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
  const data = await queryBuilder.read(req.state?.tableName);
  return NextResponse.json(data);
});
router.post(async (req) => {
  const body = await req.json();

  const result = await queryBuilder.create(req.state?.tableName, body);

  const res = NextResponse.json(result);
  return res;
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

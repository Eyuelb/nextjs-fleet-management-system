import tokenService from "@/lib/token";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { logRequest } from "utils/api/log";
import { ErrorResponse } from "utils/api/response";

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

// Create a router
const router = createEdgeRouter<RequestType, RequestContext>();

router.use(logRequest);

router.get(async (req) => {
  try {
    const refresh_token = await tokenService.getToken(req, "refresh");
    if (!refresh_token) {
      return ErrorResponse(401, "Invalid Request Refresh Token is required");
    }
    const refresh_token_isValid = await tokenService.isValid(refresh_token);
    if (!refresh_token_isValid) {
      return ErrorResponse(
        401,
        "Your Session Has Expired Please Login To continue"
      );
    }
    const res = NextResponse.json({
      message: "Token Refreshed Successfully",
    });

    const userData = await tokenService.decode(refresh_token);
    const access_token = await tokenService.createJWT(userData, "access");

    res.cookies.set("access_token", access_token, {
      path: "/",
    });
    res.cookies.set("refresh_token", refresh_token, {
      path: "/",
    });
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Authentication Failed" },
      { status: 401 }
    );
  }
});

// Export handlers
export const { GET } = {
  GET: async function (request: RequestType, ctx: RequestContext) {
    return router.run(request, ctx);
  },
};

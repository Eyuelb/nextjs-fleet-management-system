import tokenService from "@/lib/token";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { logRequest } from "utils/api/log";

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
    if (refresh_token) {
      const refresh_token_isValid = await tokenService.isValid(refresh_token);
      console.log();
      if (refresh_token_isValid) {
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
      }
      const res = NextResponse.json(
        {
          message: "Your Session Has Expired Please Login To continue",
        },
        {
          status: 401,
        }
      );
      return res;
    }
    const res = NextResponse.json(
      {
        message: "Invalid Session",
      },
      {
        status: 401,
      }
    );
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

export const logRequest = (req: any, ctx: any, next: () => Promise<void>) => {
    // console.log(req, ctx)
  return next();
};

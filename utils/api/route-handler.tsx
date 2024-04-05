// // route-handler.js

// const apiHandler = () => {
//   return nextConnec({
//     attachParams: true,
//     onNoMatch: (req, res) =>
//       res.status(404).send({
//         ok: false,
//         message: `API route not found: ${req.url}`,
//       }),
//     onError(err, req, res, next) {
//       res.status(500);
//       res.json({
//         message: env !== "production" ? err.message : "Unexpected error",
//       });
//       console.error(err);
//       // unexcepted error, catch with Sentry, etc.
//     },
//   });
// };

// export default apiHandler;

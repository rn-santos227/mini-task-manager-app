export default (err, req, res, next) => {
  const status = err.statusCode || deriveStatusCode(err) || 500;
  const message = err.message || "Something went wrong";

  console.error("Error:", message);

  res.status(status).json({
    success: false,
    message,
  });
};

function deriveStatusCode(err) {
  if (err.name === "CastError") {
    return 400;
  }

  if (err.code === 11000) {
    return 400;
  }

  return null;
}

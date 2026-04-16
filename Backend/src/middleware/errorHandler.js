const errorHandler = (err, req, res, next) => {
  console.error("🔴 Server Error:", err.message);

  // Handle error database MySQL (contoh: duplicate key)
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      error: { code: "DUPLICATE_ENTRY", message: "Data sudah ada di database" }
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Terjadi kesalahan pada server"
    }
  });
};

module.exports = { errorHandler };
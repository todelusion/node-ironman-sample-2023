/**
 * 1. 引入必要模組
 * 用於處理錯誤、建立應用、解析路徑、處理 Cookie 和記錄日誌
 */
var createError = require("http-errors"); // 引入 http-errors 模組，用於產生 HTTP 錯誤物件，例如 404、500 錯誤。
var express = require("express"); // 引入 express 模組，用於建立 Web 應用程式。
var path = require("path"); // 引入 path 模組，用於處理和轉換檔案路徑。
var cookieParser = require("cookie-parser"); // 引入 cookie-parser 模組，用於處理 HTTP 請求中的 Cookie。
var logger = require("morgan"); // 引入 morgan 模組，用於記錄 HTTP 請求的日誌。

/**
 * 2. 引入路由模組
 * 定義各主要路徑對應的路由處理邏輯
 */
var indexRouter = require("./routes/index"); // 引入 index 路由模組，用於處理首頁和根路徑的請求。
var usersRouter = require("./routes/users"); // 引入 users 路由模組，用於處理用戶相關的請求。
const orderRouter = require("./routes/order"); // 引入 order 路由模組，用於處理訂單相關的請求。

/**
 * 3. 建立 Express 應用程式實例
 * 用於設定中介層、路由與錯誤處理器
 */
var app = express();

/**
 * 4. 設定視圖引擎
 * 指定視圖模板目錄和模板引擎
 */
app.set("views", path.join(__dirname, "views")); // 指定視圖模板檔案存放的目錄為 views 資料夾。
app.set("view engine", "ejs"); // 設定視圖引擎為 EJS（嵌入式 JavaScript 模板）。

/**
 * 5. 註冊中介層（Middleware）
 * 處理請求、回應及資源解析
 */
app.use(logger("dev")); // 使用 morgan 記錄 HTTP 請求，模式為 dev（開發模式）。
app.use(express.json()); // 使用內建中介層來解析 JSON 格式的 HTTP 請求主體。
app.use(express.urlencoded({ extended: false })); // 使用內建中介層來解析 URL 編碼格式的 HTTP 請求主體。
app.use(cookieParser()); // 使用 cookie-parser 解析請求中的 Cookie。
app.use(express.static(path.join(__dirname, "public"))); // 指定 public 資料夾為靜態資源目錄，直接提供靜態檔案（如圖片、CSS）。

/**
 * 6. 註冊路由
 * 將請求分配給各自對應的路由模組
 */
app.use("/", indexRouter); // 設定根路徑（/）的路由處理邏輯。
app.use("/users", usersRouter); // 設定 /users 路徑的路由處理邏輯。
app.use("/api", orderRouter); // 設定 /api 路徑的路由處理邏輯（新增的路由）。

/**
 * 7. 錯誤處理
 * 處理 404 錯誤與一般錯誤
 */
app.use(function (req, res, next) {
  next(createError(404)); // 當沒有路由處理請求時，自動產生一個 404 錯誤，傳遞給錯誤處理器。
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; // 設定錯誤訊息。
  res.locals.error = req.app.get("env") === "development" ? err : {}; // 僅在開發模式提供詳細錯誤資訊。

  // render the error page
  res.status(err.status || 500); // 回應 HTTP 錯誤碼，預設為 500（伺服器錯誤）。
  res.render("error"); // 渲染 error.ejs 頁面。
});

/**
 * 8. 匯出應用程式
 * 供其他檔案（如 bin/www）使用
 */
module.exports = app;

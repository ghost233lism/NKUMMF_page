@echo off
chcp 65001 >nul
echo =============================================
echo      南开大学数学建模协会网站启动器
echo =============================================
echo.
echo 正在启动本地服务器...
echo.
echo 启动后请在浏览器中访问：
echo http://localhost:8000
echo.
echo 按 Ctrl+C 停止服务器
echo =============================================
echo.

python -m http.server 8000 || python -m SimpleHTTPServer 8000 || (
    echo.
    echo 错误：未找到Python！
    echo 请确保已安装Python并添加到系统PATH中。
    echo.
    echo 您也可以：
    echo 1. 直接双击 index.html 文件
    echo 2. 双击 启动服务器.html 查看预览指南
    echo.
    pause
) 
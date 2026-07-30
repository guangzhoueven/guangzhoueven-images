export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    
    // 如果是图片请求，直接放行，不经过任何重定向
    const imageExts = ['.png', '.gif', '.webp', '.jpg', '.jpeg', '.jfif', '.svg', '.bmp', '.avif', '.tiff', '.tif', '.ico', '.heic', '.heif', '.image'];
    if (imageExts.some(ext => url.pathname.endsWith(ext))) {
        return next();
    }
    
    // 其他所有请求正常处理
    return next();
}
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id || !/^\d+$/.test(id)) {
        return new Response(JSON.stringify({ error: '请提供ID: ?id=数字' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    const extensions = ['png', 'gif', 'webp', 'jpg', 'jpeg', 'jfif', 'image', 'svg', 'bmp', 'avif', 'tiff', 'tif', 'ico', 'heic', 'heif'];
    
    // 在服务器端检查图片是否存在
    for (const ext of extensions) {
        const imageUrl = `${id}.${ext}`;
        try {
            const response = await fetch(imageUrl, { method: 'HEAD' });
            if (response.ok) {
                return new Response(JSON.stringify({ url: imageUrl }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } catch (e) {
            continue;
        }
    }
    
    return new Response(JSON.stringify({ error: '找不到图片' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });
}
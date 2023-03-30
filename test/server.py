import aiohttp.web
import logging

logger = logging.getLogger("test_server")

def main():
    logging.basicConfig(level=logging.INFO)
    app = aiohttp.web.Application()
    app.add_routes([
        aiohttp.web.get("/", handle_get_index),
    ])
    aiohttp.web.run_app(app)

async def handle_get_index(req):
    ws = aiohttp.web.WebSocketResponse(protocols=("hrana1",))
    if ws.can_prepare(req):
        await ws.prepare(req)
        await handle_websocket(ws)
        return ws

    lines = ["Hello from test server over HTTP"]
    for key, value in req.headers.items():
        lines.append(f"Request header {key!r} is {value!r}")
    return aiohttp.web.Response(text="\n".join(lines))

async def handle_websocket(ws):
    msg = await ws.receive()
    if msg.type == aiohttp.WSMsgType.TEXT:
        await ws.send_str(f"Hello from test server over WebSocket. You said {msg.data!r}")
    else:
        raise RuntimeError(f"Unknown WebSocket message: {msg!r}")

if __name__ == "__main__":
    main()


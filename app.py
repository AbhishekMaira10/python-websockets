import asyncio
import websockets


async def echo(websocket, path):
    async for message in websocket:
        await websocket.send(message)

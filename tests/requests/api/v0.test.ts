import app from "app";

{
  describe("Ping チェック", testGetPing);
}

/**
 * GET /api/v0/ping
 */
function testGetPing(): void {
  test(`"pong" が返ってくる。`, async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v0/ping",
      headers: {
        "x-requested-with": "test",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual("pong");
  });
}

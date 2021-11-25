import app from "app";

{
  describe("GET /health", testGetHealth);
}

/**
 * GET /health
 */
function testGetHealth() {
  it("200が返ってくる。", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual("OK");
  });
}

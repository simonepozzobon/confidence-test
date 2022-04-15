import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { rest } from "msw";
import useFetchLocations from "./useFetchLocations";
import response from "../Response";

const server = setupServer(
    rest.post("/v2/confidence/locations", (req, res, ctx) => {
        return res(ctx.json(response));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("fetch locations success", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
        useFetchLocations(0, 6)
    );

    expect(result.current.error).toBeFalsy();
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.error).toBeFalsy();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.locations).toEqual(response.locations);
    expect(result.current.hasMore).toBeFalsy();
});

test("fetch locations error", async () => {
    server.use(
        rest.post("/v2/confidence/locations", (req, res, ctx) => {
            return res(
                ctx.status(403),
                ctx.json({ message: "Missing Authentication Token" })
            );
        })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
        useFetchLocations(1, 6)
    );

    expect(result.current.error).toBeFalsy();
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.error).toBeTruthy();
});

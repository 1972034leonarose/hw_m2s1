import { screen, render } from "@testing-library/react";
import { SearchBar } from "./index";

import { rest } from "msw";
import { setUpServer } from "msw/node"; // setup server object

// TODO: incorrect / incomplete
const url = "ahjkdd";
const searchResponse = rest.get(url, (req, res, ctx) => {
  return res(
    ctx.json([
      { href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20\n" },
    ])
  );
});

const server = new searchResponse();

const MockSearchBar = () => {
  return (
    <SearchBar
      onSubmit={searchResponse}
      onChange="set search param"
      onClick="click"
    />
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should have the correct todo item clean room", async () => {
  render(<MockSearchBar />);
  const searchResult = await screen.findByText("bohemian rhapsody");
  expect(searchResult).toBeVisible();
});

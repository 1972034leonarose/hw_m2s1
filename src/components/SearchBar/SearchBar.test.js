import { screen, render, cleanup, waitFor } from "@testing-library/react";
import { SearchBar } from "./index";
import store from "../../redux/store";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));


describe("SearchBar", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <SearchBar onSubmit={onSubmit} />
      </Provider>
    );
  });
  afterEach(cleanup);

  test("components are rendered", () => {
    const searchInput = screen.getByPlaceholderText("Search for a song");
    expect(searchInput).toBeInTheDocument();
  })

  test("should receive input", async () => {
    const input = screen.getByRole("textbox");
    userEvent.type(input, { target: { value: "song title" } });
    // expect(input).toHaveValue("song title");

    userEvent.click(screen.getByRole("button", {name: "search"}));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({lazy: true});
  });

});
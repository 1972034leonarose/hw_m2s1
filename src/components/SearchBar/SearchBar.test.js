import { screen, render, cleanup, renderHook, act, waitFor } from "@testing-library/react";
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
  const onChange = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <SearchBar onChange={onChange} />
      </Provider>
    );
  });
  afterEach(cleanup);

  test("components are rendered", () => {
    const searchInput = screen.getByPlaceholderText("Search for a song");
    expect(searchInput).toBeInTheDocument();
  })

  test("should receive input", () => {
    const input = screen.getByPlaceholderText("Search for a song");
    userEvent.type(input, "song title");
    expect(input).toHaveValue("song title");
  });

});
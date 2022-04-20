import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { SongCard } from "./index";
import SelectButton from "../../atoms/SelectButton";

const MockSongCard = () => {
  return (
    <Provider store={store}>
      <SongCard
        image="https://picsum.photos/id/237/200/300"
        title="dog"
        artist="the dog band"
        album="the dog album"
        trackUri="asdfghjkl123"

        // ignore select button
      />
    </Provider>
  );
};
test("should render SongCard component", () => {
  render(<MockSongCard />);

  const element = screen.getByTestId("songCard");
  expect(element).toBeTruthy();
});

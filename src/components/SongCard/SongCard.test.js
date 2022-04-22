import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { SongCard } from "./index";

const MockSongCard = () => {
  return (
    <Provider store={store}>
      <SongCard
        image="https://picsum.photos/id/237/200/300"
        title="dog"
        artist="the dog band"
        album="the dog album"
        duration="3:31"
      />
    </Provider>
  );
};
test("should render SongCard component", () => {
  render(<MockSongCard />);

  const element = screen.getByTestId("songCard");
  expect(element).toBeTruthy();
});

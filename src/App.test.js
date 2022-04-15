import { render, screen } from "@testing-library/react";
import App from "./App";

test("Get the title and main component", () => {
    render(<App />);
    // const titleElement = screen.getByRole(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
});

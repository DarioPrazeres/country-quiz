import { render, screen } from "@testing-library/react";
import { ContContext } from "../../App";
import Question from "./Question";

jest.mock("../CountryMap/CountryMap", () => () => (
  <div data-testid="mock-country-map">Mapa Mock</div>
));

describe("Question component", () => {
  const baseData = [
    {
      capital: "Luanda",
      name: { common: "Angola" },
      flags: { png: "flag.png" },
      currencies: { AOA: { name: "Kwanza" } },
      latlng: [0, 0],
    },
  ];

  const renderWithContext = (value) =>
    render(
      <ContContext.Provider
        value={{
          questionPosition: 0,
          cont: value,
          data: baseData,
          t: (key, obj) => `${key} - ${obj ? Object.values(obj).join(", ") : ""}`,
        }}
      >
        <Question />
      </ContContext.Provider>
    );

  test("renderiza pergunta de capital (cont=0)", () => {
    renderWithContext(0);
    expect(screen.getByText(/question_capital/i)).toBeInTheDocument();
  });

  test("renderiza bandeira (cont=1)", () => {
    renderWithContext(1);
    expect(screen.getByAltText(/flag/i)).toBeInTheDocument();
    expect(screen.getByText(/question_flag/i)).toBeInTheDocument();
  });

  test("renderiza mapa (cont=8)", () => {
    renderWithContext(8);
    expect(screen.getByText(/question_map/i)).toBeInTheDocument();
    expect(screen.getByTestId("mock-country-map")).toBeInTheDocument();
  });

  test("renderiza continente (default)", () => {
    renderWithContext(99);
    expect(screen.getByText(/question_continent/i)).toBeInTheDocument();
  });
});

import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMockRoom } from "@baditaflorin/mesh-common/testing";
import { Feature } from "../../src/Feature";
import { config } from "../../src/config";

describe("Feature (component)", () => {
  it("renders the app name when connected", () => {
    const room = createMockRoom();
    render(<Feature room={room} config={config} />);
    expect(screen.getByRole("heading", { name: config.appName })).toBeInTheDocument();
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("shows a connecting state when room is null", () => {
    render(<Feature room={null} config={config} />);
    expect(screen.getByRole("button", { name: "Save amount" })).toBeDisabled();
  });

  it("adds a local contribution", () => {
    render(<Feature room={createMockRoom({ peerId: "alex" })} config={config} />);
    fireEvent.change(screen.getByLabelText("Your contribution"), { target: { value: "24.5" } });
    fireEvent.click(screen.getByRole("button", { name: "Save amount" }));
    expect(screen.getAllByText("$24.50")).toHaveLength(2);
    expect(screen.getByText("You added $24.50.")).toBeInTheDocument();
  });
});

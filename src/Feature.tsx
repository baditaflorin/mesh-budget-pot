import { useState } from "react";
import { useSharedBudget } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };

export function Feature({ room, config }: Props) {
  const budget = useSharedBudget(room);
  const mine = budget.contributions.find((entry) => entry.peerId === room?.peerId);
  const [amount, setAmount] = useState("");
  const contributionCount = budget.contributions.length;

  return (
    <main className="budget-pot">
      <h1>{config.appName}</h1>
      <p className="lede">
        Put one clear amount into the shared pot. Everyone can see the running total.
      </p>
      <section className="total" aria-labelledby="total-label">
        <span id="total-label">Shared total</span>
        <strong>${budget.total.toFixed(2)}</strong>
        <p aria-live="polite">
          {contributionCount} contribution{contributionCount === 1 ? "" : "s"}
        </p>
      </section>
      <form
        className="contribution-form"
        onSubmit={(event) => {
          event.preventDefault();
          const value = Number(amount);
          if (budget.setMine(value)) setAmount("");
        }}
      >
        <label htmlFor="contribution">Your contribution</label>
        <div className="amount-row">
          <span aria-hidden="true">$</span>
          <input
            id="contribution"
            inputMode="decimal"
            min="0"
            max="1000000"
            step="0.01"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder={mine ? String(mine.amount) : "0.00"}
          />
          <button type="submit" disabled={!room || amount.trim() === ""}>
            Save amount
          </button>
        </div>
      </form>
      {mine && (
        <p className="mine" aria-live="polite">
          You added ${mine.amount.toFixed(2)}.
        </p>
      )}
      <section className="contributors" aria-labelledby="contributors-title">
        <h2 id="contributors-title">Contributors</h2>
        {budget.contributions.length ? (
          <ul>
            {budget.contributions.map((entry) => (
              <li key={entry.peerId}>
                <span>{entry.peerId === room?.peerId ? "You" : "A peer"}</span>
                <strong>${entry.amount.toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">Be the first person to add an amount.</p>
        )}
      </section>
      <button
        className="quiet-action"
        type="button"
        disabled={!budget.contributions.length}
        onClick={budget.clear}
      >
        Clear shared pot
      </button>
      <p className="feature-status">
        {room ? `Connected · ${room.peerCount} peer(s)` : "Connecting…"}
      </p>
    </main>
  );
}

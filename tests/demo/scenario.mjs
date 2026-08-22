export default async function scenario(a, b) {
  await a.getByLabel("Your contribution").fill("18.50");
  await a.getByRole("button", { name: "Save amount" }).click();
  await a.waitForTimeout(900);
  await b.getByLabel("Your contribution").fill("12");
  await b.getByRole("button", { name: "Save amount" }).click();
  await b.waitForTimeout(2200);
}

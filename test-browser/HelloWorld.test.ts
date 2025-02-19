/// <reference types="@vitest/browser/providers/playwright" />
import { expect, test } from "vitest";
import { page } from "@vitest/browser/context";
import HelloWorld from "./HelloWorld.js";

test("renders name", async () => {
  const parent = HelloWorld({ name: "Vitest" });
  document.body.appendChild(parent);

  const element = await page.getByRole("heading", { name: /Hello Vitest!/i });

  expect(element).not.toBeNull();
});

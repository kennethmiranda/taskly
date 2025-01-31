import {
  formattedFileSize,
  formattedFileType,
  getStatusOrder,
  getPriorityOrder,
} from "@/src/lib/utils";

describe("Utility Functions", () => {
  test("formats file size correctly", () => {
    expect(formattedFileSize(500)).toBe("0.49 KB");
    expect(formattedFileSize(1500000)).toBe("1.43 MB");
  });

  test("formats file type correctly", () => {
    expect(formattedFileType("application/pdf")).toBe("PDF");
    expect(formattedFileType("image/jpeg")).toBe("Image");
  });

  test("gets correct status order", () => {
    expect(getStatusOrder("todo")).toBe(1);
    expect(getStatusOrder("done")).toBe(3);
  });

  test("gets correct priority order", () => {
    expect(getPriorityOrder("low")).toBe(1);
    expect(getPriorityOrder("high")).toBe(3);
  });
});

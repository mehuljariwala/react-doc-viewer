import { render, screen } from "@testing-library/react";
import DocViewer from "../index";

import csvFile from "../exampleFiles/csv-file.csv?url";
import pdfFile from "../exampleFiles/pdf-file.pdf?url";
import gifFile from "../exampleFiles/gif-image.gif?url";
import pngFile from "../exampleFiles/png-image.png?url";

test("renders component with no documents", () => {
  render(<DocViewer documents={[]} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
});

test("renders component with documents", () => {
  const docs = [
    { uri: pdfFile },
    { uri: pngFile },
    { uri: csvFile },
    { uri: gifFile },
  ];

  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Document 1 of ${docs.length}`)).toBeDefined();
});

test("renders component with unsupported file type", () => {
  const docs = [{ uri: "", fileType: "application/postscript" }];
  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();

  expect(
    screen.getByText("No renderer for file type: application/postscript"),
  ).toBeInTheDocument();
});

test("renders doc viewer with initialActiveDocument prop", () => {
  const docs = [{ uri: pdfFile }, { uri: pngFile }];
  render(<DocViewer documents={docs} initialActiveDocument={docs[1]} />);

  const proxyRenderer = screen.getByTestId("proxy-renderer");

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Document 2 of ${docs.length}`)).toBeDefined();
  expect(proxyRenderer).toBeDefined();
  expect(proxyRenderer.querySelector("img")).toBeDefined();
});

test("hides download button when enableDownload is false", () => {
  const docs = [{ uri: "", fileType: "application/postscript" }];
  render(
    <DocViewer
      documents={docs}
      config={{ download: { enableDownload: false } }}
    />,
  );

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.queryByText("Download file")).not.toBeInTheDocument();
});

test("shows download button by default when enableDownload is not set", () => {
  const docs = [{ uri: "", fileType: "application/postscript" }];
  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText("Download file")).toBeInTheDocument();
});

test("shows download button when enableDownload is true", () => {
  const docs = [{ uri: "", fileType: "application/postscript" }];
  render(
    <DocViewer
      documents={docs}
      config={{ download: { enableDownload: true } }}
    />,
  );

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText("Download file")).toBeInTheDocument();
});

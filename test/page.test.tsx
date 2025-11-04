import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DocumentsPage from "../src/app/page";
import ToastProvider from "../src/components/base/toast"; // wherever your provider is
import AddNewFolder from "@/components/home/addnewfolder";

jest.mock('@/lib/api/document', () => ({
  getDocuments: jest.fn(() => Promise.resolve({ data: [], count: 0 })),
}));

describe("DocumentsPage Component", () => {
    const renderWithProviders = (ui: React.ReactElement) => {
        return render(<ToastProvider>{ui}</ToastProvider>);
    };

    it("renders buttons", () => {
        renderWithProviders(<DocumentsPage />);
        expect(screen.getByText(/Upload files/i)).toBeInTheDocument();
        expect(screen.getByText(/Add new folder/i)).toBeInTheDocument();
    });

    it("opens folder modal when Create Folder is clicked", async () => {
        renderWithProviders(<DocumentsPage />);
        userEvent.click(screen.getByText(/Add new folder/i));

        expect(await screen.findByTestId("folder-modal")).toBeInTheDocument();
        expect(await screen.findByPlaceholderText(/Folder name/i)).toBeInTheDocument();
    });

    it("opens upload modal when Upload File is clicked", async () => {
        renderWithProviders(<DocumentsPage />);
        userEvent.click(screen.getByText(/Upload files/i));

        expect(await screen.findByTestId("file-modal")).toBeInTheDocument();
        expect(await screen.findByText(/Drag & drop files here or click to select/i)).toBeInTheDocument();
    });
    it("shows error toast when folder name is empty", async () => {
        renderWithProviders(<DocumentsPage />);

        const user = userEvent.setup();

        // Open modal
        const addButton = screen.getByText(/Add new folder/i);
        await user.click(addButton);

        // Find and click Create button
        const createButton = screen.getByRole('button', { name: /Create/i });
        await user.click(createButton);

        // Wait for toast to appear
        await waitFor(() => {
        expect(screen.getByText(/Folder name is required/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });
});

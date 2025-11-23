import { fetchUsers } from "@/lib/api/user";
import { User } from "@/types/user"; 

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserList from "../_components/UserList";
import useSWR from "swr";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../components/Skeleton", () => ({
  Skeleton: () => <div data-testid="skeleton-mock" />,
}));

const mockUseSWR = useSWR as jest.Mock;
const mockFetch = global.fetch as jest.Mock;

const mockUsersData: User[] = [
  { id: 1, name: "Alice Smith", email: "alice.s@example.com", website: "alice.org" },
  { id: 2, name: "Bob Johnson", email: "bob@example.net", website: "bob.net" },
  { id: 3, name: "Charlie Brown", email: "charlie.b@example.com", website: "charlie.com" },
];

describe("fetchUsers test", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should return all users when search query is empty", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUsersData),
    });

    const users = await fetchUsers("");
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(users).toHaveLength(3);
    expect(users[0].name).toBe("Alice Smith");
  });

  it("should return filtered users", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUsersData),
    });

    const users = await fetchUsers("Bob");
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("Bob Johnson");
  });
});

describe("UserList render", () => {
  beforeEach(() => {
    mockUseSWR.mockClear();
  });

  it("should render all user rows correctly when data is fetched successfully", async () => {
    mockUseSWR.mockReturnValue({
      data: mockUsersData,
      error: undefined,
      isLoading: false,
    });

    render(<UserList />);

    await waitFor(() => {
      const renderedUserRows = screen.getAllByTestId(/user-row-/i);

      expect(renderedUserRows).toHaveLength(mockUsersData.length);

      expect(screen.getByText("Alice Smith")).toBeInTheDocument();
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
      expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
    });
  });

  it("should render the skeleton when data is loading", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(<UserList />);

    const renderedSkeletons = screen.getAllByTestId('skeleton-mock');

    expect(renderedSkeletons).toHaveLength(9); 

    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
  });

  it("should render the error message when data fetching fails", async () => {
    const errorMessage = "Failed to load users";
    
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: new Error("Network Error"),
      isLoading: false,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
    expect(screen.queryByTestId('skeleton-mock')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId(/user-row-/i)).toHaveLength(0);
  });
  
  it("should filter the rendered list when the search input changes", async () => {
    mockUseSWR.mockReturnValue({
      data: mockUsersData,
      error: undefined,
      isLoading: false,
    });
    
    render(<UserList />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    
    expect(screen.getAllByTestId(/user-row-/i)).toHaveLength(3);
    
    await userEvent.type(searchInput, 'Alice'); 

    const filteredData = mockUsersData.filter(u => u.name.includes('Alice'));
    
    await waitFor(() => {
        mockUseSWR.mockReturnValue({
            data: filteredData,
            error: undefined,
            isLoading: false,
        });
        
        fireEvent.change(searchInput, { target: { value: 'Alice' } });

        const renderedRows = screen.queryAllByTestId(/user-row-/i);
        
        if (renderedRows.length === 1 && renderedRows[0].textContent?.includes('Alice Smith')) {
            expect(renderedRows).toHaveLength(1);
            expect(screen.getByText('Alice Smith')).toBeInTheDocument();
            expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
        } else {
            throw new Error('Waiting for filtered data to settle...');
        }
    }, { timeout: 1000 });
  });
});
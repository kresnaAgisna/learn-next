import { getUser } from "@/lib/api/user";
import type { User } from "@/types/user";
import { render, screen } from "@testing-library/react";
import UserDetailPage from "../page";
import UserDetailLoading from "../loading";

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

jest.mock("../../../../components/Skeleton", () => ({
  Skeleton: (props: { className?: string }) => <div data-testid="skeleton-mock" className={props.className} />,
}));

const MOCK_USER: User = {
  id: 5,
  name: "Chelsey Dietrich",
  username: "Kamren",
  email: "Lucio_Hettinger@annie.ca",
  phone: "254.123.6655",
  website: "wow.com",
  address: {
    street: "Skiles Walks",
    suite: "Suite 351",
    city: "Rosamond",
    zipcode: "2338-1234",
  },
  company: {
    name: "Keebler LLC",
    catchPhrase: "User-centric fault-tolerant solution",
    bs: "revolutionize end-to-end systems",
  },
};

beforeEach(() => {
  mockFetch.mockClear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("getUser test", () => {
  it("should return user detail correctly", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_USER),
    });

    const promise = getUser("5");
    jest.advanceTimersByTime(1000);
    const user = await promise;

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(user.id).toBe(5);
    expect(user.name).toBe(MOCK_USER.name);
  });
});


describe("user card test", () => {
  it("should render the card correctly", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_USER),
    });

    const componentPromise = UserDetailPage({ params: { id: "5" } });
    
    jest.runAllTimers();

    const component = await componentPromise;
    
    render(component);

    expect(mockFetch).toHaveBeenCalledTimes(1);

    expect(screen.getByRole("heading", { name: MOCK_USER.name, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(MOCK_USER.username!)).toBeInTheDocument();
    
    expect(screen.getByText(MOCK_USER.phone!)).toBeInTheDocument(); 

    expect(screen.getByRole("heading", { name: "Company", level: 2 })).toBeInTheDocument();
    expect(screen.getByText(MOCK_USER.company!.name)).toBeInTheDocument();
    
    expect(screen.getByText(MOCK_USER.company!.catchPhrase!)).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Address", level: 2 })).toBeInTheDocument();
    
    expect(screen.getByText(/Skiles Walks, Suite 351/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Rosamond, 2338-1234/i)).toBeInTheDocument();
  });


  it("should render the loading skeleton correctly", () => {
    render(<UserDetailLoading />);

    const skeletons = screen.getAllByTestId('skeleton-mock');
    
    expect(skeletons).toHaveLength(10); 
    
    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });
});
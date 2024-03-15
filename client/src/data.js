export const BASE_URL = "http://localhost:5000/api";


export const menuItems = [
    {
        id: 1,
        title: "Dashboard",
        url: "/",
        icon: "/home.svg",
    },
    {
        id: 2,
        title: "Category",
        url: "/category",
        icon: "/reports.svg",
    },
    {
        id: 3,
        title: "Expense",
        url: "/expense",
        icon: "/expense.svg",
    },
    {
        id: 4,
        title: "Income",
        url: "/income",
        icon: "/income.svg",
    },
    {
        id: 5,
        title: "Chart",
        url: "/chart",
        icon: "/chart.svg",
    },
    {
        id: 6,
        title: "Budget",
        url: "/budget",
        icon: "/budget.svg",
    },
    {
        id: 7,
        title: "Refer",
        url: "/refer",
        icon: "/refer.svg",
    },
]


export const dashboardBlocks = [
    {
        id: 1,
        counter: "37%",
        title: "Budget consumed",
    },
    {
        id: 2,
        counter: "51000",
        title: "This month expense",
    },
    {
        id: 3,
        counter: "43000",
        title: "This month income",
    },
    {
        id: 4,
        counter: "21",
        title: "Active days",
    },
    {
        id: 5,
        counter: "120000",
        title: "Total Expense",
    },
    {
        id: 6,
        counter: "107000",
        title: "Total Income",
    },

]

export const category = [
    {
        id: 1,
        name: "Shopping",
        value: "Shopping",
        status: 1,
    },
    {
        id: 2,
        name: "Medical",
        value: "Medical",
        status: 1,
    },
    {
        id: 3,
        name: "Emi",
        value: "Emi",
        status: 1,
    },
]

export const paymentMethods = [
    {
        id: 1,
        name: "Cash",
        value: "Cash",
    },
    {
        id: 2,
        name: "Debit Card",
        value: "Debit Card",
    },
    {
        id: 3,
        name: "Credit Card",
        value: "Credit Card",
    },
    {
        id: 4,
        name: "Bank Transfer",
        value: "Bank Transfer",
    },
    {
        id: 5,
        name: "Cheque",
        value: "Cheque",
    },
    {
        id: 6,
        name: "UPI",
        value: "UPI",
    },
]

export const currentVersion = "1.0.2"
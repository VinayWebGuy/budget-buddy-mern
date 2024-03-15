import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
config({
    path: "./config/config.env"
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/budget_buddy")
    .then(() => { console.log("Mongo DB Connected") })
    .catch((e) => { console.log(e) });

app.get('/', (req, res) => {
    res.send("Welcome");
});


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
});
const Category = mongoose.model("Category", categorySchema);

app.post('/api/add-category', async (req, res) => {
    const { name, status } = req.body;
    try {
        await Category.create({
            name,
            status,
        });
        const category = await Category.find({});
        res.status(201).json({
            success: true,
            message: "Categry added successfully",
            category: category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
app.get('/api/all-category', async (req, res) => {
    const category = await Category.find({});
    res.status(200).json({
        success: true,
        category: category
    })
});
app.delete('/api/delete-category/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Category.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


const incomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        default: ''
    },
    payment_method: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Income = mongoose.model("Income", incomeSchema);

app.post('/api/add-income', async (req, res) => {
    const { amount, date, payment_method, category, remarks } = req.body;
    try {
        await Income.create({
            amount,
            date,
            payment_method,
            category,
            remarks,
        });
        const income = await Income.find({});
        res.status(201).json({
            success: true,
            message: "Income added successfully",
            income: income
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
app.get('/api/all-income', async (req, res) => {
    const income = await Income.find({});
    res.status(200).json({
        success: true,
        income: income
    })
});
app.delete('/api/delete-income/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Income.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: "Income deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        default: ''
    },
    payment_method: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Expense = mongoose.model("Expense", expenseSchema);

app.post('/api/add-expense', async (req, res) => {
    const { amount, date, payment_method, category, remarks } = req.body;
    try {
        await Expense.create({
            amount,
            date,
            payment_method,
            category,
            remarks,
        });
        const expense = await Expense.find({});
        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense: expense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
app.get('/api/all-expense', async (req, res) => {
    const expense = await Expense.find({});
    res.status(200).json({
        success: true,
        expense: expense
    })
});
app.delete('/api/delete-expense/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Expense.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

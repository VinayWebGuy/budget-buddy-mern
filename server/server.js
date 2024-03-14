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
        res.status(201).json({
            success: true,
            message: "Income added successfully"
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
        res.status(201).json({
            success: true,
            message: "Expense added successfully"
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

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

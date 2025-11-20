import mongoose from "mongoose";
import { CATEGORIES } from "../utils/constants.js";

/**
 * Expense Schema
 * Defines the structure for expense documents in MongoDB
 */
const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Amount must be a positive number",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: CATEGORIES,
        message: "{VALUE} is not a valid category",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
      validate: {
        validator: function (value) {
          // Don't allow future dates
          return value <= new Date();
        },
        message: "Date cannot be in the future",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Indexes for better query performance
 */
expenseSchema.index({ date: -1 }); // Most recent first
expenseSchema.index({ category: 1 });
expenseSchema.index({ amount: -1 });

/**
 * Virtual property for formatted date
 */
expenseSchema.virtual("formattedDate").get(function () {
  return this.date.toISOString().split("T")[0];
});

/**
 * Instance method to format expense for response
 * @returns {Object} Formatted expense object
 */
expenseSchema.methods.toResponseObject = function () {
  return {
    id: this._id.toString(),
    amount: this.amount,
    category: this.category,
    description: this.description,
    date: this.formattedDate,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * Static method to get expenses grouped by category
 * @returns {Promise<Array>} Array of category totals
 */
expenseSchema.statics.getExpensesByCategory = async function () {
  return await this.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        total: { $round: ["$total", 2] },
        count: 1,
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);
};

/**
 * Static method to get total expenses
 * @returns {Promise<Number>} Total amount of all expenses
 */
expenseSchema.statics.getTotalExpenses = async function () {
  const result = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  return result.length > 0 ? Math.round(result[0].total * 100) / 100 : 0;
};

/**
 * Pre-save middleware to round amount to 2 decimal places
 */
expenseSchema.pre("save", function (next) {
  if (this.isModified("amount")) {
    this.amount = Math.round(this.amount * 100) / 100;
  }
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;

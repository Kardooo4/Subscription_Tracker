import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      required: [true, "currency is required"],
    },
    frequency: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    category: {
      type: String,
      enum: ["software", "hardware", "other"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["creditCard", "paypal", "bankTransfer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },

  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.startDate.getDate() + renewalPeriod[this.frequency]
    );
  }
  next();
});

export default mongoose.model("Subscription", subscriptionSchema);

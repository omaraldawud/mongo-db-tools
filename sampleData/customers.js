export const customers = [
  {
    customer_type: "individual",
    customer_name: "Alice Smith",
    customer_email: "alice.smith@example.com",
    customer_phone: "+1-555-123-4567",
    customer_address: {
      street: "123 Maple St",
      city: "Springfield",
      state: "IL",
      postalCode: "62704",
      country: "USA",
    },
    customer_companyId: null,
    customer_notes: "Preferred individual customer",
    customer_status: "active",
    createdAt: new Date("2024-01-01T08:30:00Z"),
    updatedAt: new Date("2024-01-01T08:30:00Z"),
  },
  {
    customer_type: "corporate",
    customer_name: "Globex Corporation",
    customer_email: "contact@globex.com",
    customer_phone: "+1-555-987-6543",
    customer_address: {
      street: "456 Oak St",
      city: "Shelbyville",
      state: "IL",
      postalCode: "62565",
      country: "USA",
    },
    customer_companyId: null, // Replace with real ObjectId if available
    customer_notes: "Important corporate client",
    customer_status: "active",
    createdAt: new Date("2024-02-15T14:00:00Z"),
    updatedAt: new Date("2024-02-15T14:00:00Z"),
  },
];

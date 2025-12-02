# API Testing Guide

This file contains commands and examples for testing the Expense Tracker API.

## Base URL

```
http://localhost:5000/api
```

## Windows PowerShell Commands

### 1. Health Check

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
```

### 2. Get All Expenses

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method GET
```

### 3. Create Expense

```powershell
$body = @{
    amount = 50.99
    category = "Food"
    description = "Grocery shopping"
    date = "2025-11-20"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $body -ContentType "application/json"
```

### 4. Get Single Expense

```powershell
# Replace {id} with actual expense ID
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/{id}" -Method GET
```

### 5. Update Expense

```powershell
$body = @{
    amount = 60.99
    category = "Shopping"
    description = "Updated description"
} | ConvertTo-Json

# Replace {id} with actual expense ID
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/{id}" -Method PUT -Body $body -ContentType "application/json"
```

### 6. Delete Expense

```powershell
# Replace {id} with actual expense ID
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/{id}" -Method DELETE
```

### 7. Get Statistics

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/summary/statistics" -Method GET
```

### 8. Get Expenses by Category

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/summary/by-category" -Method GET
```

### 9. Filter Expenses

```powershell
# Filter by category
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses?category=Food" -Method GET

# Filter by date range
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses?dateFrom=2025-11-01&dateTo=2025-11-30" -Method GET

# Combined filters with pagination
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses?category=Food&page=1&limit=10" -Method GET
```

## cURL Commands (Cross-platform)

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

### 2. Get All Expenses

```bash
curl http://localhost:5000/api/expenses
```

### 3. Create Expense

```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.99,
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2025-11-20"
  }'
```

### 4. Update Expense

```bash
curl -X PUT http://localhost:5000/api/expenses/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 60.99,
    "category": "Shopping"
  }'
```

### 5. Delete Expense

```bash
curl -X DELETE http://localhost:5000/api/expenses/{id}
```

## Test Scenarios

### Scenario 1: Create Multiple Expenses

```powershell
# Expense 1 - Food
$expense1 = @{
    amount = 25.50
    category = "Food"
    description = "Breakfast"
    date = "2025-11-20"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $expense1 -ContentType "application/json"

# Expense 2 - Transport
$expense2 = @{
    amount = 15.00
    category = "Transport"
    description = "Uber ride"
    date = "2025-11-20"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $expense2 -ContentType "application/json"

# Expense 3 - Shopping
$expense3 = @{
    amount = 99.99
    category = "Shopping"
    description = "New shoes"
    date = "2025-11-19"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $expense3 -ContentType "application/json"
```

### Scenario 2: Test Validation Errors

```powershell
# Invalid amount (should fail)
$invalid1 = @{
    amount = -10
    category = "Food"
    description = "Test"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $invalid1 -ContentType "application/json"

# Invalid category (should fail)
$invalid2 = @{
    amount = 50
    category = "InvalidCategory"
    description = "Test"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $invalid2 -ContentType "application/json"

# Missing required field (should fail)
$invalid3 = @{
    category = "Food"
    description = "Test"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $invalid3 -ContentType "application/json"
```

### Scenario 3: Full CRUD Workflow

```powershell
# 1. Create
$createBody = @{
    amount = 42.00
    category = "Entertainment"
    description = "Movie tickets"
    date = "2025-11-20"
} | ConvertTo-Json
$created = Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $createBody -ContentType "application/json"
$expenseId = $created.data.id
Write-Host "Created expense with ID: $expenseId"

# 2. Read
$expense = Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/$expenseId" -Method GET
Write-Host "Retrieved expense: $($expense.data.description)"

# 3. Update
$updateBody = @{
    amount = 45.00
    description = "Movie tickets + popcorn"
} | ConvertTo-Json
$updated = Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/$expenseId" -Method PUT -Body $updateBody -ContentType "application/json"
Write-Host "Updated expense amount: $($updated.data.amount)"

# 4. Delete
$deleted = Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/$expenseId" -Method DELETE
Write-Host "Deleted expense: $($deleted.message)"
```

## Expected Responses

### Success Response (GET)

```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "amount": 50.99,
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2025-11-20"
  }
}
```

### Success Response (LIST)

```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "totalPages": 5,
  "data": [...]
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be greater than 0"
    }
  ]
}
```

## Testing with Postman

1. **Import Collection**: Create a new collection named "Expense Tracker API"
2. **Add Environment**:
   - Variable: `baseUrl`
   - Value: `http://localhost:5000/api`
3. **Create Requests**: Add requests for each endpoint
4. **Add Tests**: Use Postman test scripts to validate responses

## VS Code REST Client Extension

If you have the REST Client extension installed, create a file `api-tests.http`:

```http
### Health Check
GET http://localhost:5000/api/health

### Get All Expenses
GET http://localhost:5000/api/expenses

### Create Expense
POST http://localhost:5000/api/expenses
Content-Type: application/json

{
  "amount": 50.99,
  "category": "Food",
  "description": "Grocery shopping",
  "date": "2025-11-20"
}

### Get Statistics
GET http://localhost:5000/api/expenses/summary/statistics
```

## Automated Testing Script

Save as `test-api.ps1`:

```powershell
Write-Host "🧪 Testing Expense Tracker API..." -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "`n1️⃣ Testing health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
    Write-Host "✅ Health check passed: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health check failed" -ForegroundColor Red
    exit 1
}

# Test 2: Create Expense
Write-Host "`n2️⃣ Creating test expense..." -ForegroundColor Yellow
$testExpense = @{
    amount = 99.99
    category = "Testing"
    description = "Test expense"
    date = "2025-11-20"
} | ConvertTo-Json

try {
    $created = Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method POST -Body $testExpense -ContentType "application/json"
    $testId = $created.data.id
    Write-Host "✅ Expense created with ID: $testId" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to create expense" -ForegroundColor Red
    exit 1
}

# Test 3: Get Expense
Write-Host "`n3️⃣ Retrieving expense..." -ForegroundColor Yellow
try {
    $expense = Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/$testId" -Method GET
    Write-Host "✅ Retrieved expense: $($expense.data.description)" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to retrieve expense" -ForegroundColor Red
}

# Test 4: Delete Expense
Write-Host "`n4️⃣ Deleting test expense..." -ForegroundColor Yellow
try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/expenses/$testId" -Method DELETE
    Write-Host "✅ Expense deleted successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to delete expense" -ForegroundColor Red
}

Write-Host "`n🎉 All tests completed!" -ForegroundColor Cyan
```

Run with: `.\test-api.ps1`

## Notes

- Always ensure the backend server is running before testing
- Replace `{id}` with actual MongoDB ObjectId from created expenses
- Some commands may need to be run from PowerShell with administrator privileges
- For detailed error messages, check the backend terminal logs

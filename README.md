# Data Reconcilation

## Introduction

Reconcile source.csv and proxy.csv for the month of July 2021.

Think of source.csv as a bank statement and proxy.csv as your own record
of the transactions.

A. Produce an output report, in csv format, of mismatched, i.e. non-reconciled entries.
The report format should follow `proxy.csv`'s format but have an additional `Remarks` column appended.
The `Remarks` column should highlight the reason for the discrepancy. 
Think about how to make the Remarks column user-friendly.

B. Produce a summary report, in text format, listing the following data:
1. date range for the report.
1. number of source records processed.
1. numbers and types of discrepancies.

## Dependencies

- **Node v12.22.6**
- **NPM 6.14.15**

## How to Install

```npm install```

## How to Build

```npm run build```

## How to Run

```npm start```

## How to Test

```npm run test```

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintInvoiceService {
  printInvoice(order: any) {
    const printContent = this.generateInvoiceHTML(order);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      // Wait for content to load
      printWindow.onload = () => {
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      };
    }
  }

  private generateInvoiceHTML(order: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${order.invoiceNumber}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .customer-details, .invoice-info {
            flex: 1;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
          .totals {
            float: right;
            width: 300px;
          }
          .totals table {
            margin-top: 20px;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 14px;
            color: #666;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            @page {
              margin: 20mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>WASH FACTORY LAUNDRY</h1>
          <h2>INVOICE</h2>
        </div>

        <div class="invoice-details">
          <div class="customer-details">
            <h3>Customer Details:</h3>
            <p>Name: ${order.customer.name}</p>
            <p>Phone: ${order.customer.phone}</p>
            <p>Address: ${order.customer.address}</p>
          </div>
          <div class="invoice-info">
            <h3>Invoice Details:</h3>
            <p>Invoice #: ${order.invoiceNumber}</p>
            <p>Order #: ${order.orderNumber}</p>
            <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
            <p>Status: ${order.status}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${order.orderItems.map((item: { item: any; description: any; quantity: any; price: number; amount: number; }) => `
              <tr>
                <td>${item.item}</td>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>GHS ${item.price.toFixed(2)}</td>
                <td>GHS ${item.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <table>
            <tr>
              <td><strong>Total Amount:</strong></td>
              <td>GHS ${order.totalAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td><strong>Amount Paid:</strong></td>
              <td>GHS ${order.amountPaid.toFixed(2)}</td>
            </tr>
            <tr>
              <td><strong>Outstanding Balance:</strong></td>
              <td>GHS ${order.outstandingBalance.toFixed(2)}</td>
            </tr>
          </table>
        </div>

        <div class="footer">
          <p>Payment Method: ${order.paymentMethod}</p>
          <p>Received By: ${order.receivedBy}</p>
          <p>Thank you for your business!</p>
        </div>
      </body>
      </html>
    `;
  }
}
import React from 'react';

const CancellationRefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Returns, Refunds, Cancellations & Exchanges</h1>

      <p className="mb-4"><strong>Effective Date:</strong> May 27, 2025</p>
      <p className="mb-6">
        This policy applies to all purchases made via <strong>www.bynatablet.in</strong>,
        operated under the name <strong>Shreeji Remedies</strong>—a wholesale distributor of Ayurvedic wellness and classical products.
      </p>

      <h2 className="text-2xl font-semibold mb-3">✅ Wrong, Expired, Damaged, or Incomplete items ?</h2>
      <ol className="list-decimal ml-6 mb-6 space-y-2">
        <li>
          <strong>Raise a Request:</strong> If you receive wrong, expired, damaged, or incomplete items:
          <ul className="list-disc ml-6 mt-1">
            <li>For wrong/expired products: request within <strong>7 days</strong> of delivery.</li>
            <li>For damaged/missing products: request within <strong>2 days</strong> of delivery.</li>
          </ul>
          Use the <a href="/contact-us" className="text-blue-600 underline">Contact Page</a> to raise a request.
        </li>
        <li><strong>Review:</strong> We&apos;ll review your request in up to <strong>2 working days</strong>.</li>
        <li><strong>Pickup:</strong> If approved, we&apos;ll schedule a pickup. If not serviceable, self-ship and get reimbursed via UPI or bank transfer.</li>
        <li><strong>Refund or Replacement:</strong> After quality check at our warehouse, we&apos;ll initiate a replacement or refund depending on stock.</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-3">📌 Conditions for Return or Replacement</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold mb-2">✅ Eligible:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Wrong product delivered</li>
            <li>Expired product delivered</li>
            <li>Product damaged in transit</li>
            <li>Incomplete order (missing items)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">❌ Not Eligible:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Opened or used products</li>
            <li>Missing original packaging/labels</li>
            <li>Return request after the allowed time</li>
            <li>Classical Ayurvedic items unless expired/damaged</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-3">❌ Cancellations</h2>
      <p className="mb-4">
        Orders can be canceled from the &quot;My Account&quot; section before their status changes to <strong>&quot;Ready to Ship.&quot;</strong>
        For urgent cancellations, use our site chat or contact form.
      </p>
      <p className="mb-6">
        <strong>Note:</strong> Shreeji Remedies reserves the right to cancel any order at any time without prior notice and may confirm orders via call or message.
      </p>

      <h2 className="text-2xl font-semibold mb-3">💳 Refund Timelines</h2>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>For prepaid orders: refund to original method in <strong>7 business days</strong>.</li>
        <li>For COD returns: bank details required, refund in <strong>7 working days</strong>.</li>
        <li>For returned items: refund takes up to <strong>14 days</strong> post-pickup and quality check.</li>
      </ul>

      <p className="text-sm text-gray-600">
        For more help, contact us at <strong>support@bynatablet.in</strong> or use our website chat.
      </p>
    </div>
  );
};

export default CancellationRefundPolicy;

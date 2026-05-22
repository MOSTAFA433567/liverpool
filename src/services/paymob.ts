export const PAYMOB_API_KEY = import.meta.env.VITE_PAYMOB_API_KEY;
export const INTEGRATION_ID_CARD = import.meta.env.VITE_PAYMOB_INTEGRATION_ID_CARD;
export const INTEGRATION_ID_WALLET = import.meta.env.VITE_PAYMOB_INTEGRATION_ID_WALLET;
export const IFRAME_ID = import.meta.env.VITE_PAYMOB_IFRAME_ID;

const API_BASE = 'https://accept.paymob.com/api';

/**
 * 1. Authentication Request
 */
export async function authenticatePaymob(): Promise<string> {
  const response = await fetch(`${API_BASE}/auth/tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: PAYMOB_API_KEY }),
  });
  const data = await response.json();
  return data.token;
}

/**
 * 2. Order Registration
 */
export async function registerOrder(token: string, amount_cents: number, merchant_order_id: string): Promise<string> {
  const response = await fetch(`${API_BASE}/ecommerce/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      delivery_needed: 'false',
      amount_cents: amount_cents.toString(),
      currency: 'EGP',
      merchant_order_id: merchant_order_id,
      items: [],
    }),
  });
  const data = await response.json();
  return data.id;
}

/**
 * 3. Payment Key Request
 */
export async function getPaymentKey(
  token: string, 
  amount_cents: number, 
  order_id: string, 
  integration_id: string,
  billing_data: any
): Promise<string> {
  const response = await fetch(`${API_BASE}/acceptance/payment_keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      amount_cents: amount_cents.toString(),
      expiration: 3600,
      order_id: order_id,
      billing_data: billing_data,
      currency: 'EGP',
      integration_id: integration_id,
    }),
  });
  const data = await response.json();
  return data.token;
}

/**
 * 4. Generate Wallet Link (For Vodafone Cash)
 */
export async function generateWalletLink(payment_token: string, identifier: string): Promise<string> {
  const response = await fetch(`${API_BASE}/acceptance/payments/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: {
        identifier: identifier,
        subtype: 'WALLET'
      },
      payment_token: payment_token
    }),
  });
  const data = await response.json();
  return data.redirect_url;
}

/**
 * Orchestrator function to initiate payment
 */
export async function initiatePayment(
  type: 'card' | 'wallet',
  amount: number, // in EGP
  bookingId: string,
  customerData: { first_name: string, last_name: string, email: string, phone_number: string },
  walletMobileNumber?: string
): Promise<string> {
  // If API keys are missing, simulate a redirect for dev/testing
  if (!PAYMOB_API_KEY || PAYMOB_API_KEY === 'your_paymob_api_key') {
    console.warn("Paymob keys not configured. Simulating payment redirect.");
    return `/customer/checkout/${bookingId}?success=true&transaction_id=SIMULATED_${Date.now()}`;
  }

  const token = await authenticatePaymob();
  const orderId = await registerOrder(token, amount * 100, bookingId);
  
  const integrationId = type === 'card' ? INTEGRATION_ID_CARD : INTEGRATION_ID_WALLET;
  
  const paymentKey = await getPaymentKey(
    token, 
    amount * 100, 
    orderId, 
    integrationId,
    {
      ...customerData,
      apartment: "NA", email: customerData.email || "NA", floor: "NA", first_name: customerData.first_name,
      street: "NA", building: "NA", phone_number: customerData.phone_number || "NA", shipping_method: "NA",
      postal_code: "NA", city: "NA", country: "EG", last_name: customerData.last_name || "NA",
      state: "NA"
    }
  );

  if (type === 'wallet' && walletMobileNumber) {
    return await generateWalletLink(paymentKey, walletMobileNumber);
  } else {
    // Return Iframe URL for Card
    return `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentKey}`;
  }
}

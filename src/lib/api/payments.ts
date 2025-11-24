import { supabase } from '../supabase/client';
import type { MilestoneType, PaymentIntent, StripeAccount } from '../../types/database';

export type PaymentIntentCheckoutRequest = {
  projectId: string;
  milestoneType: MilestoneType;
  amount: number;
  currency?: string;
  successUrl: string;
  cancelUrl: string;
};

export type PaymentIntentCheckoutResponse = {
  checkoutUrl: string;
  paymentIntentId?: string;
};

export async function getPaymentIntentsForProject(projectId: string): Promise<PaymentIntent[]> {
  const { data, error } = await supabase
    .from('payment_intents')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as PaymentIntent[];
}

export async function getStripeAccountForUser(clerkUserId: string): Promise<StripeAccount | null> {
  const { data, error } = await supabase
    .from('stripe_accounts')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as StripeAccount | null;
}

export async function createPaymentIntentCheckout(
  body: PaymentIntentCheckoutRequest,
): Promise<PaymentIntentCheckoutResponse> {
  const { data, error } = await supabase.functions.invoke('create-payment-intent', {
    body: {
      projectId: body.projectId,
      milestoneType: body.milestoneType,
      amount: body.amount,
      currency: body.currency || 'usd',
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl,
    },
  });

  if (error) {
    throw error;
  }

  if (!data?.checkoutUrl) {
    throw new Error('Missing checkout URL from Stripe session.');
  }

  return data as PaymentIntentCheckoutResponse;
}

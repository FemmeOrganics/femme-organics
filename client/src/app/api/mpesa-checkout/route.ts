import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/mpesa";
import axios from "axios"
import moment from "moment"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// allow cors origin
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


type CheckoutProduct = {
  id: number;
  name: string;
  price: number;
  amount: number;
  quantity: number;
};
type ResponseType = {
  products: CheckoutProduct[];
  phoneNumber: string;
  amount: string;
  orderId: number;
};
export async function POST(req: Request,) {
  const { phoneNumber, amount, orderId }: ResponseType = await req.json();

  console.log(phoneNumber, amount, orderId)

  if (!phoneNumber) {
    return new NextResponse("Phone number is required", { status: 400 });
  }
  if (!amount) {
    return new NextResponse("Amount is required", { status: 400 });
  }
  if (!orderId) {
    return new NextResponse("Order ID is required", { status: 400 });
  }

  let paymentResponse: {url: string, response: string, responseType: string} | {} = {}
  await getAccessToken(
    {consumer_key: process.env.MPESA_CONSUMER_KEY!, consumer_secret: process.env.MPESA_CONSUMER_SECRET!},
  )
  .then( async (accessToken) => {
    const url = process.env.MPESA_STKPUSH;
    const auth = `Bearer ${accessToken}` ;
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(
      process.env.MPESA_BUSINESS_SHORTCODE + process.env.MPESA_PASS_KEY! + timestamp
    ).toString("base64");

    console.log("🚀 ~ file: route.ts ~ line 94 ~ POST ~ password", url, {
      BusinessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount:  Math.round(Number.parseFloat(amount)),
      PartyA: phoneNumber, //phone number to receive the stk push
      PartyB: process.env.MPESA_BUSINESS_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/callback/mpesa/${orderId}`,
      AccountReference: process.env.MPESA_ACCOUNT_REFERENCE,
      TransactionDesc: process.env.MPESA_TRANSACTION_DESC,
    })

    if (!url) {
      throw new Error("MPESA_STKPUSH URL is not defined");
    }

    await axios
      .post(
        url,
        {
          BusinessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount:  Math.round(Number.parseFloat(amount)),
          PartyA: phoneNumber, //phone number to receive the stk push
          PartyB: process.env.MPESA_BUSINESS_SHORTCODE,
          PhoneNumber: phoneNumber,
          CallBackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/callback/mpesa/${orderId}`,
          AccountReference: process.env.MPESA_ACCOUNT_REFERENCE,
          TransactionDesc: process.env.MPESA_TRANSACTION_DESC,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then((response) => {
        paymentResponse =  {
          ...paymentResponse,
          responseType: 'success',
          response: "😀 Request is successful done ✔✔. Please enter mpesa pin to complete the transaction",
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout?success=1`
        }
      
      })
      .catch((error) => {
        console.error(error);
        paymentResponse = {
          ...paymentResponse,
          responseType: 'failed',
          response: "❌ Request failed",
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout?canceled=1`
        }
      });
  })
  .catch((err)=>console.log(err));
  return NextResponse.json(
    paymentResponse,
    {
      headers: corsHeaders,
    }
  );
}

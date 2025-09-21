import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import util from "node:util"
import { AddTransactionDocument } from "@/__gql__/graphql";
import { getClient } from "@/lib/graphql/ApolloClient";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// allow cors origin
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

type Props = {
  params: {
      orderId: string
  }
}

export async function POST(request: Request, {params: {orderId}}: Props) {
  console.log(util.inspect(request, {depth: null}))

  const data = await request.json()
 
  if (!data.Body.stkCallback.CallbackMetadata) {
    //for failed transactions
    console.log(data.Body.stkCallback.ResultDesc);
    return NextResponse.json("ok saf");
  }


  //lets extract the values from the callback metadata
  const body = data.Body.stkCallback.CallbackMetadata
  const amountObj = body.Item.find((obj: any) => obj.Name === "Amount");
  const amount = amountObj.Value;
  
  //mpesa code
  const codeObj = body.Item.find(
    (obj: any) => obj.Name === "MpesaReceiptNumber"
  );
  const mpesaCode = codeObj.Value;
  
  //phone number - in recent implimentations, it is hashed.
  const phoneNumberObj = body.Item.find(
    (obj: any) => obj.Name === "PhoneNumber"
  );
  const phoneNumber = phoneNumberObj.Value.toString();

  try {

    const {data} = await getClient().mutate({
      mutation: AddTransactionDocument,
      variables: {
        "transaction": {
          "orderId": Number.parseInt(orderId),
          "phoneNumber": phoneNumber,
          "amount": amount,
          "type": "MPESA",
          "transactionCode": mpesaCode
        }
      }
    })
    console.log(data)

    return Response.json({ ok: "ok" })
  } catch (err) {
    redirect("")
  }
}
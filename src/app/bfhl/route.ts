import { NextRequest, NextResponse } from "next/server";

export async function GET(requrest: NextRequest) {
  return NextResponse.json(
    {
      operation_code: 1,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    const numbers = data.filter((item: number) => !isNaN(item));
    const alphabets = data.filter((item: string) => /^[a-zA-Z]$/.test(item));

    let highest_alphabet: string[] = [];
    if (alphabets.length > 0) {
      const highest = alphabets.reduce(
        (
          max: { toLowerCase: () => number },
          current: { toLowerCase: () => number }
        ) => (current.toLowerCase() > max.toLowerCase() ? current : max)
      );
      highest_alphabet = [highest];
    }

    return NextResponse.json({
      is_success: true,
      user_id: "Mobeen_khan_20112003",
      email: "22BCS16879@cuchd.in",
      roll_number: "22BCS16879",
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        is_success: false,
        message: "Some thing went wrong!",
      },
      { status: 200 }
    );
  }
}
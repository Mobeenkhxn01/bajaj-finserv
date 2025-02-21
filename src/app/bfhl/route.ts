import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { operation_code: 1 },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { is_success: false, message: "Invalid input. Expected an array of characters or numbers." },
        { status: 400 }
      );
    }

    const numbers: number[] = [];
    const alphabets: string[] = [];
    const invalidItems: string[] = [];

    data.forEach((item) => {
      if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
      } else if (typeof item === "number") {
        numbers.push(item);
      } else {
        invalidItems.push(String(item));
      }
    });

    if (invalidItems.length > 0) {
      return NextResponse.json(
        {
          is_success: false,
          message: `Invalid input detected: ${invalidItems.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const highest_alphabet: string[] = alphabets.length > 0
      ? [alphabets.reduce((max, current) => (current.toLowerCase() > max.toLowerCase() ? current : max))]
      : [];

    return NextResponse.json({
      is_success: true,
      user_id: "Mobeen_khan_20112003",
      email: "22BCS16879@cuchd.in",
      roll_number: "22BCS16879",
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch {
    return NextResponse.json(
      { is_success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

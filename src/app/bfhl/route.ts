import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      operation_code: 1,
    },
    { status: 200 }
  );
}

function isValidInput(str: string) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

export async function POST(request: NextRequest) {
  try {
    const { data }: { data: string[] } = await request.json();

    for (const str of data) {
      if (!isValidInput(str)) {
        return NextResponse.json(
          {
            is_success: false,
            message: "Invalid Data - Only Alphanumeric Allowed",
          },
          { status: 400 }
        );
      }
    }

    const numbers = data.filter((item) => /^\d+$/.test(item)); // Only digits
    const alphabets = data.filter((item) => /^[a-zA-Z]+$/.test(item)); // Only letters

    let highest_alphabet: string[] = [];
    if (alphabets.length > 0) {
      highest_alphabet = [
        alphabets.reduce((max, current) =>
          current.toLowerCase() > max.toLowerCase() ? current : max
        ),
      ];
    }

    return NextResponse.json({
      is_success: true,
      user_id: "mobeen_khan_22bcs16879",
      email: "22bcs16879@cuchd.in",
      roll_number: "22bcs16879",
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch {
    return NextResponse.json(
      {
        is_success: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
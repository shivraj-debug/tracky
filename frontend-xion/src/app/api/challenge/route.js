import ChallengeModel from "@/lib/database/models/challenge-model";
import UserModel from "@/lib/database/models/user-model";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/database/connection";

// Create a challenge using wallet address
export async function POST(req) {
  try {
    await dbConnect();
    const { challenge_name, tasks, address } = await req.json();

   

    if (!address || !challenge_name || !tasks?.length) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const user = await UserModel.findOne({ address });

    console.log("User found:", user); // ✅ log the user object

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found with this address.",
      });
    }

    
    const curr_date = new Date();
    curr_date.setHours(0, 0, 0, 0);

    const newChallenge = new ChallengeModel({
      owner: user._id,
      challenge_name,
      tasks,
      created_at: curr_date.getTime(),
    });

    await newChallenge.save();

    return NextResponse.json({
      success: true,
      data: newChallenge,
      message: "Challenge created successfully",
    });
  } catch (error) {
    console.error("Error in POST /challenge:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create challenge",
    });
  }
}

// Get all challenges for a user by wallet address
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json({
        success: false,
        message: "Wallet address is required.",
      });
    }

    const user = await UserModel.findOne({ address });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found with this address.",
      });
    }

    const challenges = await ChallengeModel.find({ owner: user._id });

    return NextResponse.json({
      success: true,
      data: challenges,
      message: "Challenges fetched successfully",
    });
  } catch (error) {
    console.error("Error in GET /challenge:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch challenges",
    });
  }
}

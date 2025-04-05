import { CompletedChallengeModel } from "@/lib/database/models/challenge-model";
import UserModel from "@/lib/database/models/user-model";
import {
  create_obj_for_today_challenge,
  streak_calculation,
} from "@/lib/utility/functions/challenge";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/database/connection";

export async function GET(req, { params }) {
  await dbConnect();
  const { challenge_id } = params;
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  try {
    const user = await UserModel.findOne({ address });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const completed_challenges = await CompletedChallengeModel.find({
      owner: user._id,
      challenge: challenge_id,
      date: { $lt: date },
    });

    let streak = streak_calculation(completed_challenges, date);

    let today_challenge = await CompletedChallengeModel.findOne({
      owner: user._id,
      challenge: challenge_id,
      date: date,
    });

    let today_challenge_obj = await create_obj_for_today_challenge(
      today_challenge,
      challenge_id,
      user._id,
      date
    );

    if (!today_challenge_obj.success) {
      return NextResponse.json({
        message: "Challenge not found",
        success: false,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        streak,
        today_challenge: today_challenge_obj.data,
      },
      message: "Challenge fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch challenge",
    });
  }
}

export async function PATCH(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const { challenge_id } = params;
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  try {
    const user = await UserModel.findOne({ address });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const { task_name } = data;

    const completed_challenge = await CompletedChallengeModel.findOne({
      owner: user._id,
      challenge: challenge_id,
      date: date.getTime(),
    });

    if (!completed_challenge) {
      return NextResponse.json({
        message: "Challenge not found",
        status: 400,
      });
    }

    let completed_tasks = completed_challenge.completed_tasks;

    for (let i = 0; i < completed_tasks.length; i++) {
      if (completed_tasks[i].task_name === task_name) {
        completed_tasks[i].completed = !completed_tasks[i].completed;
        break;
      }
    }

    const allCompleted = completed_tasks.every(task => task.completed);
    completed_challenge.completed = allCompleted;

    await completed_challenge.save();

    return NextResponse.json({
      success: true,
      message: "Challenge updated successfully",
      data: completed_challenge,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to update challenge",
    });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { challenge_id } = params;
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  try {
    const user = await UserModel.findOne({ address });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const completed_challenge = await CompletedChallengeModel.findOne({
      owner: user._id,
      challenge: challenge_id,
      date: date.getTime(),
    });

    if (!completed_challenge) {
      return NextResponse.json({
        message: "Challenge not found",
        status: 400,
      });
    }

    completed_challenge.is_rewarded = true;
    await completed_challenge.save();

    return NextResponse.json({
      success: true,
      message: "Challenge rewarded successfully",
      data: completed_challenge,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to reward challenge",
    });
  }
}

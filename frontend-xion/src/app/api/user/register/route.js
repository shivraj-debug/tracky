// app/api/user/register/route.js
import dbConnect from "@/lib/database/connection";
import UserModel from "@/lib/database/models/user-model";
import PointsModel from "@/lib/database/models/points-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { address } = await req.json();

    console.log("Received address:", address); // Log the received address

    let user = await UserModel.findOne({ address });

    if (!user) {
      user = new UserModel({ address });
      await user.save();

      const point_details = new PointsModel({
        user: user._id,
        points: 0,
      });

      await point_details.save();
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ success: false, message: "Registration failed" });
  }
}

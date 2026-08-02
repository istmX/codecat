import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { queuePRReview } from "@/lib/webhook-queue";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-hub-signature-256");
    const event = req.headers.get("x-github-event");
    const rawBody = await req.text();

    // In a real app we'd verify the webhook secret here
    // const secret = process.env.GITHUB_WEBHOOK_SECRET;
    // if (secret && signature) {
    //   const hmac = crypto.createHmac("sha256", secret);
    //   const digest = "sha256=" + hmac.update(rawBody).digest("hex");
    //   if (signature !== digest) {
    //     return new NextResponse("Unauthorized", { status: 401 });
    //   }
    // }

    if (event !== "pull_request") {
      return NextResponse.json({ message: "Ignored event type" });
    }

    const payload = JSON.parse(rawBody);
    const action = payload.action;

    if (action !== "opened" && action !== "synchronize") {
      return NextResponse.json({ message: "Ignored PR action" });
    }

    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const number = payload.pull_request.number;
    const isSynchronize = action === "synchronize";

    // Find the repository in our DB to get the user's access token
    // We assume the repository is connected by exactly one user for simplicity in this MVP
    const dbRepo = await prisma.repository.findFirst({
      where: { owner, name: repo },
      include: {
        user: {
          include: {
            accounts: {
              where: { provider: "github" }
            }
          }
        }
      }
    });

    if (!dbRepo) {
      return NextResponse.json({ message: "Repository not connected to CodeCat" });
    }

    const account = dbRepo.user.accounts[0];
    if (!account || !account.access_token) {
      return NextResponse.json({ message: "GitHub access token not found for repository owner" });
    }

    // Queue the review
    await queuePRReview(
      owner,
      repo,
      number,
      account.access_token,
      dbRepo.userId,
      isSynchronize
    );

    return NextResponse.json({ success: true, message: "Review queued" });
  } catch (error) {
    console.error("Webhook processing error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

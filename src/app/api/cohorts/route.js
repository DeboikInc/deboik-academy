import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";


const filePath = path.join(process.cwd(), "src/data/cohorts.json");

const ensureFile = () => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
};

const REQUIRED_FIELDS = ["name", "startDate", "endDate", "enrollmentDeadline", "isPublic", "status"];

const safeEqual = (a, b) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
};

export async function GET(request) {
  try {
    ensureFile();
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";

    const data = fs.readFileSync(filePath, "utf8");
    const cohorts = JSON.parse(data || "[]");

    const now = new Date();
    const results = activeOnly
      ? cohorts.filter(
          (c) =>
            c.isPublic &&
            c.status !== "completed" &&
            new Date(c.enrollmentDeadline) > now
        )
      : cohorts;

    return NextResponse.json({ success: true, data: results });
  } catch (err) {
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(request) {
  const authHeader = request.cookies.get("admin_token")?.value || "";
  const token = authHeader.replace("Bearer ", "");
  const expected = process.env.ADMIN_SECRET || "";

  if (!expected || !safeEqual(token, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    ensureFile();
    const newCohort = await request.json();

    const missing = REQUIRED_FIELDS.filter((f) => newCohort[f] === undefined);
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const cohortToSave = {
      ...newCohort,
      id: Date.now().toString(),
      enrolledCount: 0,
      createdAt: new Date().toISOString(),
    };

    const data = fs.readFileSync(filePath, "utf8");
    const cohorts = JSON.parse(data || "[]");
    cohorts.push(cohortToSave);
    fs.writeFileSync(filePath, JSON.stringify(cohorts, null, 2));

    return NextResponse.json({ success: true, data: cohortToSave });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
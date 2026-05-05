import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/cohorts.json");

// Helper to ensure file exists
const ensureFile = () => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
};

export async function GET() {
  try {
    ensureFile();
    const data = fs.readFileSync(filePath, "utf8");
    return NextResponse.json({ success: true, data: JSON.parse(data || "[]") });
  } catch (err) {
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    ensureFile();
    const newCohort = await request.json();
    
    // Add a unique ID and default values
    const cohortToSave = {
      ...newCohort,
      id: Date.now().toString(),
      enrolledCount: 0,
      createdAt: new Date().toISOString()
    };

    const data = fs.readFileSync(filePath, "utf8");
    const cohorts = JSON.parse(data || "[]");
    
    cohorts.push(cohortToSave);
    fs.writeFileSync(filePath, JSON.stringify(cohorts, null, 2));

    return NextResponse.json({ success: true, data: cohortToSave });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
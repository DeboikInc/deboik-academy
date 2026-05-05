import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/cohorts.json");

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // This gets the ID from the URL
    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const content = fs.readFileSync(filePath, "utf8");
    let cohorts = JSON.parse(content || "[]");

    // Filter out the one we want to delete
    const filteredCohorts = cohorts.filter((c) => c.id !== id);
    
    fs.writeFileSync(filePath, JSON.stringify(filteredCohorts, null, 2));

    return NextResponse.json({ success: true, message: "Cohort deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
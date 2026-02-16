import { NextResponse } from "next/server";
import { hasPrismaModel, prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/server/adminAuth";

export async function GET() {
  const admin = await requireAdmin();
  if (admin.error) return admin.error;

  try {
    if (!hasPrismaModel("adminAuditLog")) {
      return NextResponse.json(
        {
          success: false,
          message: "Database is not available. Check DATABASE_URL and Prisma client generation.",
        },
        { status: 503 }
      );
    }

    const logs = await prisma.adminAuditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
    });

    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch audit logs." },
      { status: 500 }
    );
  }
}


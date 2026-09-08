import { ReportFilter, ReportResponse } from "@/lib/types/reportType";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";
import { buildMockReportResponse } from "@/lib/mocks/reportMock";

const buildParams = (filter: ReportFilter) => {
  const params = new URLSearchParams({
    scope: filter.scope,
    start_date: filter.start_date,
    end_date: filter.end_date,
  });
  if (filter.habit_id) params.set("habit_id", filter.habit_id);
  if (filter.initiatives?.length) params.set("initiatives", filter.initiatives.join(","));
  return params;
};

// Ambil laporan perkembangan siswa rombel dalam rentang tanggal tertentu
export async function getClassroomReportApi(filter: ReportFilter): Promise<ReportResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return buildMockReportResponse(filter);
  }

  try {
    const params = buildParams(filter);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/classroom/report?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Unduh laporan dalam format CSV atau PDF
export async function exportClassroomReportApi(
  filter: ReportFilter,
  format: "csv" | "pdf"
): Promise<Blob> {
  const params = buildParams(filter);
  params.set("format", format);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/classroom/report/export?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return res.blob();
}

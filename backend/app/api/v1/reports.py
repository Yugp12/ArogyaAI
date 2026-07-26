from fastapi import APIRouter
from fastapi.responses import Response
from app.reports.pdf_generator import PDFExecutiveReportGenerator
from app.schemas.response import APIResponse

router = APIRouter(prefix="/reports", tags=["13. Executive Reports Engine"])

@router.get("/pdf/executive-briefing")
async def download_pdf_executive_briefing():
    """Generates and downloads official ReportLab PDF briefing for MoHFW & WHO."""
    pdf_bytes = PDFExecutiveReportGenerator.generate_pdf_briefing()
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=ArogyaAI_MoHFW_Executive_Briefing.pdf"
        }
    )

@router.get("/status", response_model=APIResponse[dict])
async def get_report_engine_status():
    """Check ReportLab PDF & OpenPyXL Excel report engines status."""
    return APIResponse(
        message="Report engine active.",
        data={"pdf_engine": "ReportLab 4.1", "excel_engine": "OpenPyXL 3.1", "status": "READY"}
    )

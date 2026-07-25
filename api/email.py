"""Email notification service using Resend."""

import logging
import resend
from api.core.config import settings

logger = logging.getLogger(__name__)


def _send(to: list[str], subject: str, html: str) -> None:
    """Send an email via Resend. Silently logs on failure so it never crashes the app."""
    if not settings.RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — skipping email to %s", to)
        return
    try:
        resend.api_key = settings.RESEND_API_KEY
        resend.Emails.send({
            "from": settings.RESEND_FROM_EMAIL,
            "to": to,
            "subject": subject,
            "html": html,
        })
        logger.info("Email sent to %s: %s", to, subject)
    except Exception as exc:
        logger.error("Failed to send email to %s: %s", to, exc)


# ── Booking emails ────────────────────────────────────────────────────────────

def send_booking_received(full_name: str, email: str, service_type: str, preferred_date: str, preferred_time: str) -> None:
    """Confirmation to client + notification to admin when a booking is submitted."""
    # Client confirmation
    _send(
        to=[email],
        subject="Booking Received — AE$R Holdings",
        html=f"""
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f0f9ff;border-radius:16px">
          <h2 style="color:#0B192C">Booking Received!</h2>
          <p style="color:#334155">Hi <strong>{full_name}</strong>,</p>
          <p style="color:#334155">
            Thank you for booking with AE$R Holdings. We&rsquo;ve received your request and will confirm it shortly.
          </p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0">
            <tr><td style="padding:8px;color:#64748b;font-size:14px">Service</td><td style="padding:8px;font-weight:600;color:#0B192C">{service_type}</td></tr>
            <tr style="background:#e0f2fe"><td style="padding:8px;color:#64748b;font-size:14px">Date</td><td style="padding:8px;font-weight:600;color:#0B192C">{preferred_date}</td></tr>
            <tr><td style="padding:8px;color:#64748b;font-size:14px">Time</td><td style="padding:8px;font-weight:600;color:#0B192C">{preferred_time}</td></tr>
          </table>
          <p style="color:#64748b;font-size:13px">
            We&rsquo;ll send you another email once your booking is approved. If you have questions, call us at
            <a href="tel:19739372289" style="color:#0EA5E9">1(973)937-2289</a>.
          </p>
          <p style="color:#0B192C;font-weight:600;margin-top:24px">— AE$R Holdings Team</p>
        </div>
        """,
    )
    # Admin notification
    _send(
        to=[settings.ADMIN_NOTIFY_EMAIL],
        subject=f"New Booking: {full_name} — {service_type}",
        html=f"""
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:16px">
          <h2 style="color:#0B192C">New Booking Request</h2>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;color:#64748b">Client</td><td style="padding:8px;font-weight:600;color:#0B192C">{full_name}</td></tr>
            <tr style="background:#f1f5f9"><td style="padding:8px;color:#64748b">Email</td><td style="padding:8px;color:#0B192C">{email}</td></tr>
            <tr><td style="padding:8px;color:#64748b">Service</td><td style="padding:8px;color:#0B192C">{service_type}</td></tr>
            <tr style="background:#f1f5f9"><td style="padding:8px;color:#64748b">Date</td><td style="padding:8px;color:#0B192C">{preferred_date}</td></tr>
            <tr><td style="padding:8px;color:#64748b">Time</td><td style="padding:8px;color:#0B192C">{preferred_time}</td></tr>
          </table>
          <a href="{settings.BASE_URL}/admin/dashboard"
             style="display:inline-block;background:#0EA5E9;color:#0B192C;font-weight:700;padding:12px 24px;border-radius:10px;text-decoration:none;margin-top:16px">
            View in Dashboard
          </a>
        </div>
        """,
    )


def send_booking_approved(full_name: str, email: str, service_type: str, preferred_date: str, preferred_time: str) -> None:
    """Email to client when admin approves their booking."""
    _send(
        to=[email],
        subject="Booking Approved ✓ — AE$R Holdings",
        html=f"""
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f0fdf4;border-radius:16px">
          <h2 style="color:#0B192C">Your Booking is Approved!</h2>
          <p style="color:#334155">Hi <strong>{full_name}</strong>,</p>
          <p style="color:#334155">
            Great news — your booking has been <strong style="color:#16a34a">approved</strong>. Our team will be there as scheduled.
          </p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0">
            <tr><td style="padding:8px;color:#64748b;font-size:14px">Service</td><td style="padding:8px;font-weight:600;color:#0B192C">{service_type}</td></tr>
            <tr style="background:#dcfce7"><td style="padding:8px;color:#64748b;font-size:14px">Date</td><td style="padding:8px;font-weight:600;color:#0B192C">{preferred_date}</td></tr>
            <tr><td style="padding:8px;color:#64748b;font-size:14px">Time</td><td style="padding:8px;font-weight:600;color:#0B192C">{preferred_time}</td></tr>
          </table>
          <p style="color:#64748b;font-size:13px">
            Need to reschedule? Call us at <a href="tel:19739372289" style="color:#0EA5E9">1(973)937-2289</a>.
          </p>
          <p style="color:#0B192C;font-weight:600;margin-top:24px">— AE$R Holdings Team</p>
        </div>
        """,
    )


def send_booking_completed(full_name: str, email: str, service_type: str) -> None:
    """Email to client when booking is marked completed."""
    _send(
        to=[email],
        subject="Service Completed — Thank You! — AE$R Holdings",
        html=f"""
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f0f9ff;border-radius:16px">
          <h2 style="color:#0B192C">Service Completed!</h2>
          <p style="color:#334155">Hi <strong>{full_name}</strong>,</p>
          <p style="color:#334155">
            Your <strong>{service_type}</strong> service has been completed. We hope everything looks spotless!
          </p>
          <p style="color:#334155">
            If you&rsquo;re happy with the results, we&rsquo;d love a review. Any concerns? Reach us at
            <a href="tel:19739372289" style="color:#0EA5E9">1(973)937-2289</a>.
          </p>
          <p style="color:#0B192C;font-weight:600;margin-top:24px">— AE$R Holdings Team</p>
        </div>
        """,
    )


# ── Contact / message emails ──────────────────────────────────────────────────

def send_contact_received(name: str, email: str, message: str) -> None:
    """Confirmation to client + notification to admin when a contact message is submitted."""
    _send(
        to=[email],
        subject="Message Received — AE$R Holdings",
        html=f"""
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f0f9ff;border-radius:16px">
          <h2 style="color:#0B192C">We Got Your Message!</h2>
          <p style="color:#334155">Hi <strong>{name}</strong>,</p>
          <p style="color:#334155">
            Thanks for reaching out. We&rsquo;ve received your message and will get back to you within a few hours.
          </p>
          <div style="background:#e0f2fe;border-radius:12px;padding:16px;margin:20px 0;color:#0B192C;font-size:14px">
            {message}
          </div>
          <p style="color:#64748b;font-size:13px">
            Need urgent help? Call us at <a href="tel:19739372289" style="color:#0EA5E9">1(973)937-2289</a>.
          </p>
          <p style="color:#0B192C;font-weight:600;margin-top:24px">— AE$R Holdings Team</p>
        </div>
        """,
    )
    _send(
        to=[settings.ADMIN_NOTIFY_EMAIL],
        subject=f"New Message from {name}",
        html=f"""
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:16px">
          <h2 style="color:#0B192C">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;color:#64748b">From</td><td style="padding:8px;font-weight:600;color:#0B192C">{name}</td></tr>
            <tr style="background:#f1f5f9"><td style="padding:8px;color:#64748b">Email</td><td style="padding:8px;color:#0B192C">{email}</td></tr>
          </table>
          <div style="background:#f1f5f9;border-radius:12px;padding:16px;margin:16px 0;color:#0B192C;font-size:14px">{message}</div>
          <a href="{settings.BASE_URL}/admin/dashboard"
             style="display:inline-block;background:#0EA5E9;color:#0B192C;font-weight:700;padding:12px 24px;border-radius:10px;text-decoration:none;margin-top:16px">
            View in Dashboard
          </a>
        </div>
        """,
    )


def send_message_acknowledged(name: str, email: str) -> None:
    """Email to client when admin marks their message as read."""
    _send(
        to=[email],
        subject="Your Message Has Been Acknowledged — AE$R Holdings",
        html=f"""
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f0f9ff;border-radius:16px">
          <h2 style="color:#0B192C">Message Acknowledged</h2>
          <p style="color:#334155">Hi <strong>{name}</strong>,</p>
          <p style="color:#334155">
            Our team has reviewed your message and will follow up with you shortly if any action is needed.
          </p>
          <p style="color:#64748b;font-size:13px">
            Questions? Call us at <a href="tel:19739372289" style="color:#0EA5E9">1(973)937-2289</a>.
          </p>
          <p style="color:#0B192C;font-weight:600;margin-top:24px">— AE$R Holdings Team</p>
        </div>
        """,
    )

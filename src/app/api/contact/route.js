
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const MAX_BODY_LENGTH = 12000;

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isValidEmail(email) {
  return (
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function errorResponse(field, message) {
  return Response.json(
    {
      success: false,
      field,
      message,
    },
    { status: 400 }
  );
}

export async function POST(request) {
  try {
    // ==========================================
    // READ REQUEST
    // ==========================================

    const raw = await request.text();

    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_LENGTH) {
      return errorResponse(
        'message',
        'The submitted form is too large.'
      );
    }

    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      return errorResponse(
        'form',
        'Invalid form submission.'
      );
    }

    if (
      !data ||
      typeof data !== 'object' ||
      Array.isArray(data)
    ) {
      return errorResponse(
        'form',
        'Invalid form data.'
      );
    }

    // Basic honeypot spam protection
    if (data.website) {
      return Response.json({
        success: true,
        autoReplySent: false,
      });
    }

    // ==========================================
    // NORMALIZE FORM DATA
    // ==========================================

    const name =
      typeof data.name === 'string'
        ? data.name.trim()
        : '';

    const email =
      typeof data.email === 'string'
        ? data.email.trim()
        : '';

    const phone =
      typeof data.phone === 'string'
        ? data.phone.trim()
        : '';

    const topic =
      typeof data.topic === 'string'
        ? data.topic.trim()
        : '';

    const message =
      typeof data.message === 'string'
        ? data.message.trim()
        : '';

    const lang = data.lang === 'te' ? 'te' : 'en';

    // ==========================================
    // FIELD-BY-FIELD VALIDATION
    // ==========================================

    if (
      name.length < 2 ||
      name.length > 100 ||
      /[\r\n]/.test(name)
    ) {
      return errorResponse(
        'name',
        'Please enter a valid name (2–100 characters).'
      );
    }

    if (!isValidEmail(email)) {
      return errorResponse(
        'email',
        'Please enter a valid email address.'
      );
    }

    if (phone.length > 30) {
      return errorResponse(
        'phone',
        'Phone number must be 30 characters or fewer.'
      );
    }

    if (
      topic.length < 1 ||
      topic.length > 100 ||
      /[\r\n]/.test(topic)
    ) {
      return errorResponse(
        'topic',
        'Please select a valid enquiry topic.'
      );
    }

    if (
      message.length < 10 ||
      message.length > 5000
    ) {
      return errorResponse(
        'message',
        'Your message must contain 10–5000 characters, excluding surrounding spaces.'
      );
    }

    // ==========================================
    // HOSTINGER SMTP CONFIGURATION
    // ==========================================

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(
      process.env.SMTP_PORT || 465
    );

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    const mailFrom = process.env.MAIL_FROM;
    const contactReceiver =
      process.env.CONTACT_RECEIVER;

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword ||
      !mailFrom ||
      !contactReceiver
    ) {
      console.error(
        'SUSALI: SMTP environment variables missing.'
      );

      return Response.json(
        {
          success: false,
          message:
            'Email service is not configured. Please contact support.',
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      requireTLS: smtpPort === 587,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    const from = {
      name: 'SUSALI Healthcare',
      address: mailFrom,
    };

    // ==========================================
    // EMAIL 1: SEND ENQUIRY TO SUSALI
    // ==========================================

    const adminSubject =
      'SUSALI Website Enquiry - ' + topic;

    const adminText = [
      'New SUSALI Healthcare Website Enquiry',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Topic: ${topic}`,
      '',
      'Visitor Message:',
      message,
      '',
      'Reply to this email to respond to the visitor.',
    ].join('\n');

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;background:#f5f8f6;padding:28px">
        <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden">

          <div style="background:#063e34;padding:26px;color:#ffffff">
            <h2 style="margin:0">SUSALI Healthcare</h2>
            <p style="margin:8px 0 0;color:#e1c482">
              New Website Enquiry
            </p>
          </div>

          <div style="padding:28px;color:#253b34;line-height:1.8">
            <h3>Visitor Details</h3>

            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
            <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>

            <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0">

            <h3>Message</h3>
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>

            <p style="font-size:13px;color:#64736e">
              Reply to this email to contact the visitor.
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from,
      to: contactReceiver,
      replyTo: {
        name,
        address: email,
      },
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    });

    // ==========================================
    // EMAIL 2: AUTO REPLY TO VISITOR
    // ==========================================

    const isTelugu = lang === 'te';

    const replySubject = isTelugu
      ? 'మీ సందేశం అందింది | SUSALI Healthcare'
      : 'We Received Your Enquiry | SUSALI Healthcare';

    const greeting = isTelugu
      ? `నమస్కారం ${name},`
      : `Dear ${name},`;

    const replyMessage = isTelugu
      ? 'SUSALI Healthcareను సంప్రదించినందుకు ధన్యవాదాలు. మీ సందేశం మా బృందానికి అందింది. మీ సందేహాన్ని పరిశీలించి, అవసరమైన సమాచారంతో మిమ్మల్ని సంప్రదిస్తాము.'
      : 'Thank you for contacting SUSALI Healthcare. We have received your enquiry. Our support team will review your message and respond with the relevant information.';

    const emergencyNote = isTelugu
      ? 'అత్యవసర వైద్య సహాయం కోసం స్థానిక అత్యవసర సేవలను సంప్రదించండి.'
      : 'For medical emergencies, please contact local emergency services.';

    const replyText = [
      greeting,
      '',
      replyMessage,
      '',
      emergencyNote,
      '',
      'SUSALI Healthcare Support Team',
      mailFrom,
    ].join('\n');

    const replyHtml = `
      <div style="font-family:Arial,sans-serif;background:#f5f8f6;padding:28px">
        <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden">

          <div style="background:#063e34;padding:26px;color:#ffffff">
            <h2 style="margin:0">SUSALI Healthcare</h2>
            <p style="color:#e1c482">
              ${isTelugu ? 'మీ సందేశానికి ధన్యవాదాలు' : 'Thank You for Contacting Us'}
            </p>
          </div>

          <div style="padding:28px;color:#253b34;line-height:1.9">
            <h3>${escapeHtml(greeting)}</h3>
            <p>${escapeHtml(replyMessage)}</p>
            <p style="font-size:13px;color:#64736e">
              ${escapeHtml(emergencyNote)}
            </p>

            <p>
              Warm Regards,<br>
              <strong>SUSALI Healthcare Support Team</strong><br>
              ${escapeHtml(mailFrom)}
            </p>
          </div>
        </div>
      </div>
    `;

    let autoReplySent = false;

    try {
      await transporter.sendMail({
        from,
        to: email,
        replyTo: contactReceiver,
        subject: replySubject,
        text: replyText,
        html: replyHtml,
      });

      autoReplySent = true;
    } catch (replyError) {
      console.error(
        'SUSALI automatic reply error:',
        replyError
      );
    }

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return Response.json({
      success: true,
      autoReplySent,
      message: 'Enquiry submitted successfully.',
    });

  } catch (error) {
    console.error('SUSALI contact API error:', error);

    return Response.json(
      {
        success: false,
        message:
          'Unable to send your enquiry. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * converts the current gmail headers and data into MIME-Version 1.0 format 
 * @see https://tanaikech.github.io/2021/10/16/sending-multiple-emails-using-batch-request-with-gmail-api-using-google-apps-script/
 */
 const convert_ = ({
    to,
    cc,
    bcc,
    fromName,
    fromEmail,
    subject,
    textBody,
    htmlBody,
    attachments,
  }) => {
    if (!to) throw new Error("Please set 'to'.");
    const obj = [`MIME-Version: 1.0`, `To: ${to}`];
    if (cc) obj.push(`CC: ${cc}`);
    if (bcc) obj.push(`BCC: ${bcc}`);
    if ((fromName && fromEmail) || fromEmail) {
      obj.push(
        fromName && fromEmail ? `From: "${fromName}" <${fromEmail}>` : fromEmail
      );
    }
    const boundary1 = "boundaryboundary001";
    const boundary2 = "boundaryboundary002";
    if (attachments && attachments.length > 0) {
      obj.push(
        `Subject: =?UTF-8?B?${Utilities.base64Encode(
          subject || "",
          Utilities.Charset.UTF_8
        )}?=`,
        `Content-Type: multipart/mixed; boundary=${boundary1}`,
        ``,
        `--${boundary1}`,
        `Content-Type: multipart/alternative; boundary=${boundary2}`,
        ``,
        `--${boundary2}`,
        `Content-Type: text/plain; charset=UTF-8`,
        ``,
        textBody || "",
        `--${boundary2}`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: base64`,
        ``,
        Utilities.base64Encode(htmlBody || "", Utilities.Charset.UTF_8),
        `--${boundary2}--`
      );
      attachments.forEach((f) => {
        obj.push(
          `--${boundary1}`,
          `Content-Type: ${f.mimeType}; charset=UTF-8; name="${f.filename}"`,
          `Content-Transfer-Encoding: base64`,
          ``,
          f.data,
          `--${boundary1}`
        );
      });
    } else {
      obj.push(
        `Subject: =?UTF-8?B?${Utilities.base64Encode(
          subject || "",
          Utilities.Charset.UTF_8
        )}?=`,
        `Content-Type: multipart/alternative; boundary=${boundary1}`,
        ``,
        `--${boundary1}`,
        `Content-Type: text/plain; charset=UTF-8`,
        ``,
        textBody || "",
        `--${boundary1}`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: base64`,
        ``,
        Utilities.base64Encode(htmlBody || "", Utilities.Charset.UTF_8),
        `--${boundary1}`
      );
    }
    return Utilities.base64EncodeWebSafe(obj.join("\r\n") + "--");
  };
  
  const sendEmails = (workshopData, subject) => {
    const batch1 = getContacts()
    const obj = [
      {
        to: "ghosterinc@gmail.com",
        bcc: batch1.toString(),
        fromName: "Kevin Bravo",
        fromEmail: "kevinjosemotab@gmail.com",
        subject: subject,
        htmlBody: createGmailHTMLMessage1(workshopData),
      }
      // {
      //   to: "bravokevinto@gmail.com",
      //   bcc: batch2,
      //   fromName: "Kevin B",
      //   fromEmail: "kevinjosemotab@gmail.com",
      //   subject: "This is a sample email",
      //   textBody: ", if you recive one, please not respond",
      // },
      // {
      //   to: "bravokajosta@gmail.com",
      //   bcc: batch3,
      //   fromName: "Kevin B",
      //   fromEmail: "kevinjosemotab@gmail.com",
      //   subject: "This is a sample email, if you recive one",
      //   textBody: ", if you recive one, please not respond",
      // },
    ];
  
    const raws = obj.map((e) => convert_(e));
  
    raws.forEach(raw => {
      var message = Gmail.newMessage();
      message.raw = raw;
      var sentMsg = Gmail.Users.Messages.send(message, 'me');
    })
  }
  
  
  
  
  
  
  
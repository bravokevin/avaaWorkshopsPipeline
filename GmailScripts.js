// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
"use strict";
// GmailScripts.ts
/**
 * This functions allow us to send message using the Gmail API
 * @see {@link https://developers.google.com/gmail/api} for reference about the gmail API
 * @module
 */
/**
 * Converts the current gmail headers and data into MIME-Version 1.0 format
 *
 * I don't really understand what is happening here but it works.
 *
 * @param {*} param0 all the necesary parameters to make this thing work
 * @returns a kind of string with all the necesary to be able to send a Gmail message to a bunch of people
 *
 * @see {@link https://tanaikech.github.io/2021/10/16/sending-multiple-emails-using-batch-request-with-gmail-api-using-google-apps-script/} for reference
 */
const convert_ = (object) => {
    const { to, cc, bcc, fromName, fromEmail, subject, textBody, htmlBody, attachments, } = object;
    if (!to)
        throw new Error("Please set 'to'.");
    const obj = [`MIME-Version: 1.0`, `To: ${to}`];
    if (cc)
        obj.push(`CC: ${cc}`);
    if (bcc)
        obj.push(`BCC: ${bcc}`);
    if ((fromName && fromEmail) || fromEmail) {
        obj.push(fromName && fromEmail ? `From: "${fromName}" <${fromEmail}>` : fromEmail);
    }
    const boundary1 = "boundaryboundary001";
    const boundary2 = "boundaryboundary002";
    if (attachments && attachments.length > 0) {
        obj.push(`Subject: =?UTF-8?B?${Utilities.base64Encode(subject || "", Utilities.Charset.UTF_8)}?=`, `Content-Type: multipart/mixed; boundary=${boundary1}`, ``, `--${boundary1}`, `Content-Type: multipart/alternative; boundary=${boundary2}`, ``, `--${boundary2}`, `Content-Type: text/plain; charset=UTF-8`, ``, textBody || "", `--${boundary2}`, `Content-Type: text/html; charset=UTF-8`, `Content-Transfer-Encoding: base64`, ``, Utilities.base64Encode(htmlBody || "", Utilities.Charset.UTF_8), `--${boundary2}--`);
        attachments.forEach((f) => {
            obj.push(`--${boundary1}`, `Content-Type: ${f.mimeType}; charset=UTF-8; name="${f.filename}"`, `Content-Transfer-Encoding: base64`, ``, f.data, `--${boundary1}`);
        });
    }
    else {
        obj.push(`Subject: =?UTF-8?B?${Utilities.base64Encode(subject || "", Utilities.Charset.UTF_8)}?=`, `Content-Type: multipart/alternative; boundary=${boundary1}`, ``, `--${boundary1}`, `Content-Type: text/plain; charset=UTF-8`, ``, textBody || "", `--${boundary1}`, `Content-Type: text/html; charset=UTF-8`, `Content-Transfer-Encoding: base64`, ``, Utilities.base64Encode(htmlBody || "", Utilities.Charset.UTF_8), `--${boundary1}`);
    }
    return Utilities.base64EncodeWebSafe(obj.join("\r\n") + "--");
};
/**
 * It creates the headers and the body of the email message
 *
 * @param workshopData an array with all the workshops and its respective form
 * @param subject the subject of the email
 * @param contactGroupName the name of the contact group we want to sen de messages
 * @returns the object with all the necesary headers for the gmail message and the html body
 */
const createMessageObj = (workshopData, subject, contactGroupName) => {
    const contactsAddresses = getContacts(contactGroupName);
    const html = createGmailHTMLMessage(workshopData);
    const messageObj = [];
    contactsAddresses.forEach(contactBatch => {
        const obj = {
            to: 'ghosterinc@gmail.com',
            bcc: contactBatch.toString(),
            fromName: "Programa Proexcelencia",
            fromEmail: "programa.proexcelencia@gmail.com",
            subject,
            htmlBody: html,
        };
        messageObj.push(obj);
    });
    return messageObj;
};
/**
 * Sends emails in batch of 100 receipients for email
 *
  * @param workshopData an array with all the workshops and its respective form
 * @param subject the subject of the email
 * @param contactGroupName the name of the contact group we want to sen de messages
 */
const sendEmails = (workshopData, subject, contactGroupName) => {
    const obj = createMessageObj(workshopData, subject, contactGroupName);
    const raws = obj.map((e) => convert_(e));
    raws.forEach(raw => {
        const message = Gmail.newMessage();
        message.raw = raw;
        Gmail.Users.Messages.send(message, 'me');
    });
};

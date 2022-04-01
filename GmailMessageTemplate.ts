// GmailMessageTemplate.ts
/**
 * This functions are used to create an HTML message 
 * We  {@link https://unlayer.com/} to create the initial html, and then separate the part in where all the data for the workshops would be to e able to render it according to how many workshops we want to send.
 * 
 * @module GmailMessageTemplate
 */


/**
 * Use it to create cols for rendering workshop data 
 * 
 * @param workshop all the workshops details
 * @param formUrl the url of the form for an specific workshop
 * @returns returns a HTML col with all the details for an specific workshop
 */
const workshopDetailsCol = (workshop: Workshop, formUrl: string) => {

    const { name, pensum, date, startHour, endHour, speaker, numberOfParticipants, kindOfWorkshop, platform, description } = workshop;
    return `
  <div id="u_column_16" class="u-col u-col-50" style="max-width: 320px;min-width: 325px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 2px solid #009640;border-left: 2px solid transparent;border-right: 2px solid #009640;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_8" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #009640; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 26px; line-height: 36.4px;"><strong><span style="line-height: 36.4px; font-size: 26px;">${name}</span></strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #080808; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Fecha: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${date}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #080808; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Horario: </span></strong><span style="font-size: 16px; line-height: 25.6px;">de ${startHour} hasta las ${endHour} </span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #080808; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Facilitador: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${speaker}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #f80000; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Modalidad: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${kindOfWorkshop}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

${kindOfWorkshop === "Presencial" ? '' : `<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #080808; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Plataforma: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${platform}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>
`}

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #080808; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Competencia: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${pensum}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #080808; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Cupos: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${numberOfParticipants}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

${description === "" ? "" : `<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #080808; line-height: 160%; text-align: left; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px;">${description}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>`}

<table id="u_content_button_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 15px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
<div class="v-text-align" align="left">
  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Open Sans',sans-serif;"><tr><td class="v-text-align" style="font-family:'Open Sans',sans-serif;" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:49px; v-text-anchor:middle; width:244px;" arcsize="30.5%" stroke="f" fillcolor="#009640"><w:anchorlock/><center style="color:#ffffff;font-family:'Open Sans',sans-serif;"><![endif]-->
    <a href=${formUrl.toString()} target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Open Sans',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #009640; border-radius: 15px;-webkit-border-radius: 15px; -moz-border-radius: 15px; width:82%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
      <span style="display:block;padding:15px 50px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">Inscribirse</span></strong></span></span>
    </a>
  <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="325" class="v-col-border" style="width: 325px;padding: 0px;border-top: 2px solid #009640;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<!--[if (mso)|(IE)]></td><![endif]-->`
}

const makeRow = (data:string)=>{
    return `<div class="u-row-container" style="padding: 0px;background-color: #ffffff">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="323" class="v-col-border" style="width: 323px;padding: 0px;border-top: 2px solid #009640;border-left: 0px solid transparent;border-right: 2px solid #009640;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  ${data}
  <!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>
  `
}

const soloWorkshopDetailsCol = (workshop: Workshop, formUrl: string) => {

    const { name, pensum, date, startHour, endHour, speaker, numberOfParticipants, kindOfWorkshop, platform, description } = workshop;

    return `<div class="u-row-container" style="padding: 0px;background-color: transparent">
<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: transparent;"><![endif]-->
    
<!--[if (mso)|(IE)]><td align="center" width="650" class="v-col-border" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
<div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #009640; line-height: 140%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 26px; line-height: 36.4px;"><strong><span style="line-height: 36.4px; font-size: 26px;">${name}</span></strong></span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #080808; line-height: 160%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Fecha: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${date}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #080808; line-height: 160%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Horario: </span></strong><span style="font-size: 16px; line-height: 25.6px;"> de ${startHour} hasta las ${endHour}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #080808; line-height: 160%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Facilitador: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${speaker}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #f80000; line-height: 160%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Modalidad: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${kindOfWorkshop}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>
${kindOfWorkshop === "Presencial" ? '' : `
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #080808; line-height: 160%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Plataforma: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${platform}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>`}

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #080808; line-height: 160%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Competencia: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${pensum}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #080808; line-height: 160%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Cupos: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${numberOfParticipants}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

${description === '' ? '' : `<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" style="color: #080808; line-height: 160%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 160%;"><strong><span style="font-size: 16px; line-height: 25.6px;">Cupos: </span></strong><span style="font-size: 16px; line-height: 25.6px;">${numberOfParticipants}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>`}
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 0px;font-family:'Open Sans',sans-serif;" align="left">
      
<div class="v-text-align" align="center">
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Open Sans',sans-serif;"><tr><td class="v-text-align" style="font-family:'Open Sans',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:49px; v-text-anchor:middle; width:364px;" arcsize="30.5%" stroke="f" fillcolor="#009640"><w:anchorlock/><center style="color:#ffffff;font-family:'Open Sans',sans-serif;"><![endif]-->
  <a href=${formUrl.toString()} target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Open Sans',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #009640; border-radius: 15px;-webkit-border-radius: 15px; -moz-border-radius: 15px; width:56%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
    <span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">Inscribirse</span></strong></span></span>
  </a>
<!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
</div>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>
</div>`
}

/**
 * Use it to create the complete HTML message to be included in the body of an email
 * 
 * @param rowData all the workshops to be rendered 
 * @returns the complete HTML messsage 
 */
const completeHTML = (rowData: string) => {
    return `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 670px) {
  .u-row {
    width: 650px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-22p38 {
    width: 145.47px !important;
  }

  .u-row .u-col-38p4 {
    width: 249.6px !important;
  }

  .u-row .u-col-39p22 {
    width: 254.93px !important;
  }

  .u-row .u-col-43p03 {
    width: 279.695px !important;
  }

  .u-row .u-col-50 {
    width: 325px !important;
  }

  .u-row .u-col-56p97 {
    width: 370.305px !important;
  }

  .u-row .u-col-100 {
    width: 650px !important;
  }

}

@media (max-width: 670px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

@media (max-width: 480px) {
  .hide-mobile {
    max-height: 0px;
    overflow: hidden;
    display: none !important;
  }

  .hide-desktop {
    display: block !important;
  }
  table.hide-desktop {
    display: table !important;
  }
}
table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_text_29 .v-text-align { text-align: center !important; } #u_content_text_16 .v-container-padding-padding { padding: 15px 10px 10px !important; } #u_content_divider_3 .v-container-padding-padding { padding: 0px 10px 10px !important; } #u_column_16 .v-col-border { border-top: 2px solid #009640 !important;border-left: 0px solid transparent !important;border-right: 0px solid transparent !important;border-bottom: 0px solid transparent !important; } #u_content_text_8 .v-text-align { text-align: center !important; } #u_content_button_1 .v-text-align { text-align: center !important; } #u_content_text_22 .v-text-align { text-align: center !important; } #u_content_button_4 .v-text-align { text-align: center !important; } #u_content_text_32 .v-container-padding-padding { padding: 10px 10px 0px 0px !important; } #u_content_text_32 .v-text-align { text-align: center !important; } #u_content_text_11 .v-text-align { text-align: center !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #feffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #feffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #feffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #009640;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #009640;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="650" class="v-col-border" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://images.unlayer.com/projects/0/1648432355227-Sin título-1.jpg" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 650px;" width="650"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #009640;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #009640;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="650" class="v-col-border" style="width: 650px;padding: 0px;border-top: 2px solid #009640;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 2px solid #009640;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_29" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 30px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #fcfcfc; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">Estimado becario, <span style="color: #fefeff; font-size: 14px; line-height: 19.6px;"><strong><span style="font-size: 14px; line-height: 19.6px;">Proexcelencia</span></strong></span> te invita a participar de la siguientes actividades de formaci&oacute;n.</p>
<p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
<p style="font-size: 14px; line-height: 140%;">Te recordamos que <strong>inscribirse&nbsp;es un compromiso</strong>, recuerda solo hacerlo en aquellos talleres que vayas a asistir</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #009640;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #009640;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="250" class="v-col-border" style="width: 250px;padding: 15px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-38p4" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 15px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="145" class="v-col-border" style="width: 145px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-22p38" style="max-width: 320px;min-width: 145px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_16" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-family: 'arial black', 'avant garde', arial; font-size: 28px; line-height: 39.2px;">Talleres</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="255" class="v-col-border" style="width: 255px;padding: 15px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-39p22" style="max-width: 320px;min-width: 255px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 15px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_divider_3" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>

${rowData}


<div class="u-row-container" style="padding: NaNpx NaNpx NaNpx NaNpx;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #009640;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: NaNpx NaNpx NaNpx NaNpx;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #009640;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="650" class="v-col-border" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_text_32" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px 25px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Luisa Cisneros</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_11" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px 10px 25px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #ffffff; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 160%; font-size: 14px;"><em><span style="font-size: 14px; line-height: 22.4px;">Asistente de Programas educativos</span></em></p>
<p style="line-height: 160%; font-size: 14px;"><em><span style="font-size: 14px; line-height: 22.4px;">Asociaci&oacute;n Venezolano Americana de Amistad (AVAA)</span></em></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="370" class="v-col-border" style="width: 370px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-56p97" style="max-width: 320px;min-width: 370px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://images.unlayer.com/projects/0/1648420136100-2.png" alt="Logo de AVAA" title="Logo de AVAA" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 350px;" width="350"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="280" class="v-col-border" style="width: 280px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-43p03" style="max-width: 320px;min-width: 280px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table class="hide-mobile" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 10px;font-family:'Open Sans',sans-serif;" align="left">
        
<div align="left">
  <div style="display: table; max-width:140px;">
  <!--[if (mso)|(IE)]><table width="140" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:140px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/avaa_org" title="Instagram" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://twitter.com/avaa_org" title="Twitter" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle/twitter.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://linkedin.com/school/avaa" title="LinkedIn" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

<table class="hide-mobile" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #1542bd; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>T:</strong> 0212 - 2357821 Ext. 114</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table class="hide-mobile" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #1542bd; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>W:</strong> <a rel="noopener" href="https://avaa.org/" target="_blank">www.avaa.org</a></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>
<!--[if !mso]><!-->
<table class="hide-desktop" style="display: none;mso-hide: all;font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:140px;">
  <!--[if (mso)|(IE)]><table width="140" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:140px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/avaa_org" title="Instagram" target="_blank">
          <img src="images/image-1.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://twitter.com/avaa_org" title="Twitter" target="_blank">
          <img src="images/image-2.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://linkedin.com/school/avaa" title="LinkedIn" target="_blank">
          <img src="images/image-3.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>
<!--<![endif]--><!--[if !mso]><!-->
<table class="hide-desktop" style="display: none;mso-hide: all;font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #1542bd; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>T:</strong> 0212 - 2357821 Ext. 114</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>
<!--<![endif]--><!--[if !mso]><!-->
<table class="hide-desktop" style="display: none;mso-hide: all;font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 0px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #1542bd; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>W:</strong> <a rel="noopener" href="https://avaa.org/" target="_blank">www.avaa.org</a></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>
<!--<![endif]-->
  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="650" class="v-col-border" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-text-align" style="color: #009640; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><strong><em>Salva un arbol... no imprimas este mail a menos que realmente sea necesario</em></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`
}

/**
 * Creates the HTML message with the data of all the workshops 
 * 
 * it creates a {@linkcode workshopDetailsCol} for every workshop that is in the array. At the end, appends all the created rows with workshops data to {@linkcode completeHTML} 
 * 
 * Think of it like using `{}.map` in React
 * 
 * @param values an array containing an object for every workshop and a form url that was created for that specific workshop 
 * @returns the complete HTML messsage to be send with all the workshops data. 
 */
const createGmailHTMLMessage = (values: WorkshopFinalData[]) => {
    let finalhtml:string[] | string = []
    let dataArr: string[] = []

    // if (values.length === 1) {
    //     const { workshop, completeFormUrl } = values[0];
    //     finalhtml = soloWorkshopDetailsCol(workshop, completeFormUrl)
    // }
    // else {
        values.forEach(v => {
            const { workshop, completeFormUrl } = v;
            finalhtml += soloWorkshopDetailsCol(workshop, completeFormUrl)
    //     })
    //     while(dataArr.length > 0){
        
    //         finalhtml.push(dataArr.splice(0, 2))
    //     }
    // }
    return completeHTML(finalhtml.toString().replaceAll(',', ''))
}
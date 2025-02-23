import { transporter } from "../config/nodemailer.js";
import "dotenv/config";
import fs from "fs";
import path from "path";

const userDetailsPath = path.join(process.cwd(), "src", "userDetails.json");
const userDetails = JSON.parse(fs.readFileSync(userDetailsPath, "utf-8"));

const mailsFilePath = path.join(process.cwd(), "src", "mails.json");
const hrEmails = JSON.parse(fs.readFileSync(mailsFilePath, "utf-8")).emails;

const templatesPath = path.join(process.cwd(), "src", "templates.json");
const templates = JSON.parse(fs.readFileSync(templatesPath, "utf-8")).templates;
const selectedTemplate = templates.backend;

const resumePath = path.join(process.cwd(), "public", "Subhraneel_Goswami.pdf");

export const sendMail = async (req, res) => {
  try {
    for (const email of hrEmails) {
      const info = await transporter.sendMail({
        from: {
          name: userDetails.name,
          address: process.env.EMAIL,
        },
        to: email,
        subject: `Application for ${userDetails.jobRole} role`,
        html: `
          <p>Dear Hiring Manager,</p>
          <p>I hope this email finds you well. My name is <strong>${
            userDetails.name
          }</strong>${selectedTemplate.body}</p>
          <ul>
            <li><strong>LinkedIn:</strong> <a href="${userDetails.linkedin}">${
          userDetails.linkedin
        }</a></li>
            <li><strong>GitHub:</strong> <a href="${userDetails.github}">${
          userDetails.github
        }</a></li>
            <li><strong>Twitter:</strong> <a href="${userDetails.twitter}">${
          userDetails.twitter
        }</a></li>
            <p><strong>PROJECTS:</strong></p>
            ${userDetails.projects
              .map(
                (project) =>
                  `<li><strong>${project.name}:</strong> <a href="${project.link}">${project.link}</a></li>`
              )
              .join("")}
          </ul>
          <p>My resume is attached for your reference. I would appreciate the opportunity to discuss how my skills align with your team’s needs.</p>
          <p>Looking forward to hearing from you.</p>
          <p>Best regards,</p>
          <p>${userDetails.name}</p>
        `,
        attachments: [
          {
            filename: "Subhraneel_Goswami.pdf",
            path: resumePath,
            contentType: "application/pdf",
          },
        ],
      });

      console.log(`Email sent to ${email}: ${info.messageId}`);
    }

    return res.status(201).json({
      message: `Emails sent successfully to ${hrEmails.length} HRs`,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: error,
    });
  }
};

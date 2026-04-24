import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const leadData = await request.json();
    const { name, email, phone, classType, pricingType, selectedModules, totalAmount, status } = leadData;

    console.log("Received lead data:", leadData);

    // Format currency
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
      }).format(amount);
    };

    // Get module names
    const getModuleNames = () => {
      if (pricingType !== "individual" || !selectedModules?.length) return null;
      const modules = {
        js: "JavaScript Fundamentals",
        node: "Node.js",
        react: "React",
        nextjs: "Next.js",
        reactnative: "React Native",
        electron: "Electron"
      };
      return selectedModules.map(id => modules[id] || id).join(", ");
    };

    const moduleNames = getModuleNames();

    // Build Slack message - SIMPLIFIED FORMAT
    let slackText = `*New Lead - Deboik Academy*\n\n`;
    slackText += `*Name:* ${name || "Not provided"}\n`;
    slackText += `*Email:* ${email || "Not provided"}\n`;
    slackText += `*Phone:* ${phone || "Not provided"}\n`;
    slackText += `*Class Type:* ${classType === "online" ? "Online" : "Offline"}\n`;
    slackText += `*Plan:* ${pricingType === "fullstack" ? "Fullstack Package" : "Individual Modules"}\n`;
    slackText += `*Amount:* ${formatCurrency(totalAmount || 0)}\n`;

    if (moduleNames) {
      slackText += `*📚 Modules:* ${moduleNames}\n`;
    }

    slackText += `\n🕐 ${new Date().toLocaleString()}\n`;
    slackText += `\n📞 Follow up: ${phone || "No phone"}`;

    // Simple Slack message format
    const slackPayload = {
      text: slackText,
      mrkdwn: true,
      // Optional: add buttons as fallback text
      attachments: [
        {
          text: `Contact: ${email}`,
          fallback: `New lead from ${name}`,
          color: "#36C5F0",
          mrkdwn_in: ["text"],
          actions: [
            {
              type: "button",
              text: "📧 Email",
              url: `mailto:${email}?subject=Complete Your Deboik Academy Enrollment&body=Hi ${name},%0D%0A%0D%0AWe noticed you started enrollment at Deboik Academy.%0D%0A%0D%0AClick here to continue: https://deboik.com/enroll`,
              style: "primary"
            },
            {
              type: "button",
              text: "WhatsApp",
              url: `callto:https://wa.me/${phone?.replace(/[^0-9]/g, '') || ''}?text=Hi ${name}%2C%20we%20noticed%20you%20started%20enrollment%20at%20Deboik%20Academy.`
            }
          ]
        }
      ]
    };

    // Get Slack webhook URL
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.error("SLACK_WEBHOOK_URL is not set");
      return NextResponse.json(
        { success: false, error: "Slack webhook not configured" },
        { status: 500 }
      );
    }

    console.log("Sending to Slack:", JSON.stringify(slackPayload, null, 2));

    // Send to Slack
    const slackResponse = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackPayload),
    });

    const slackResponseText = await slackResponse.text();
    console.log("Slack response status:", slackResponse.status);
    console.log("Slack response body:", slackResponseText);

    if (!slackResponse.ok) {
      throw new Error(`Slack returned ${slackResponse.status}: ${slackResponseText}`);
    }

    console.log("Slack notification sent successfully");

    return NextResponse.json({
      success: true,
      message: "Lead saved and sent to Slack"
    });

  } catch (error) {
    console.error("Error in Slack API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
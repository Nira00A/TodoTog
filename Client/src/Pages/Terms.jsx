import React from "react";

export default function Terms() {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex w-[1150px] mt-3 gap-6 max-h-screen overflow-y-auto max-navlg:flex-col max-navlg:w-full max-navlg:gap-3 p-3">
        {/* Table of Contents */}
        <div className="w-[300px] div-color max-h-[350px] p-4 rounded-lg max-navlg:w-full max-navlg:max-h-max">
          <div className="text-xl text4">Table of Contents</div>
          <div className="pl-2 mt-3">
            {[
              "Introduction",
              "User Accounts",
              "Use of Service",
              "Reward and Power-ups",
              "Limitation of Liability",
              "Termination of Service",
              "Intellectual Property",
              "Governing Law",
              "Changes to terms",
              "Contact Us",
            ].map((item, index) => (
              <div
                key={index}
                className="mb-2 hover:text-red-600 cursor-pointer transition duration-500 text-gray text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Services Content */}
        <div className="w-4/6 max-navlg:w-full">
          <div className="heading">Terms & Services</div>
          <div className="text-neutral-500 text-sm">
            Last updated on March 7, 2025
          </div>
          <div className="pb-10">
            {[
              {
                title: "1. Introduction",
                content:
                  "Welcome to Todo Tog! By accessing or using our website and mobile application, you agree to be bound by these Terms of Service. These Terms define the rights and responsibilities of all users who engage with our platform. Todo Tog is a task management service designed to enhance productivity through gamification, allowing users to complete tasks and earn rewards. If you do not agree with any part of these Terms, please refrain from using the Service.",
              },
              {
                title: "2. User Accounts",
                content:
                  "To use our Service, you must be at least 13 years old. If you are under the age of 18, you must obtain consent from a parent or legal guardian before registering. When creating an account, you must provide accurate and up-to-date information to ensure a seamless experience. You are solely responsible for maintaining the confidentiality of your login credentials and for any activity that occurs under your account. If you suspect unauthorized use of your account, you must notify us immediately. We reserve the right to suspend or terminate any account that violates these Terms or engages in fraudulent, abusive, or disruptive behavior.",
              },
              {
                title: "3. Use of Service",
                content:
                  "Todo Tog provides a digital task management experience that enables users to organize and track their activities efficiently. Through our platform, users can create to-do lists, set deadlines, and earn rewards upon completing tasks. While using the Service, you agree to abide by ethical and lawful conduct. You must not engage in any activity that disrupts or interferes with the proper functioning of the Service, including unauthorized access, hacking, spamming, or distributing malware. Furthermore, you are prohibited from posting misleading, false, or offensive content. We reserve the right to modify, enhance, or discontinue certain features of the Service at our discretion and without prior notice.",
              },
              {
                title: "4. Rewards and Power-ups",
                content:
                  "Todo Tog incorporates a unique gamification system that offers virtual rewards and power-ups for task completion. These rewards are solely intended to enhance the user experience and hold no real-world monetary value.",
              },
              {
                title: "5. Limitation of Liability",
                content:
                  "Your use of Todo Tog is entirely at your own risk. While we strive to provide a reliable and efficient service, we do not guarantee that the platform will always be available, error-free, or meet your specific requirements. The Service is provided on an 'as-is' basis without warranties of any kind, whether express or implied. We are not liable for any indirect, incidental, or consequential damages, including loss of data, system failures, or unauthorized access resulting from your use of the Service. Additionally, we are not responsible for the actions of third parties, such as data breaches or security incidents beyond our control.",
              },
              {
                title: "6. Termination of Service",
                content:
                  "We reserve the right to suspend or terminate access to the Service at our sole discretion, especially in cases of violations of these Terms. If your account is terminated, you will lose access to all stored tasks, rewards, and power-ups. Users may also choose to delete their accounts at any time, although certain data may be retained as required by law or for legitimate business purposes. We will not be held responsible for any inconvenience caused due to the termination of accounts.",
              },
              {
                title: "7. Intellectual Property",
                content:
                  "All elements of Todo Tog, including but not limited to trademarks, logos, software, design elements, and content, are either owned by us or used under proper licensing agreements.",
              },
              {
                title: "8. Governing Law",
                content:
                  "These Terms are governed by the laws of [your jurisdiction]. By using Todo Tog, you agree that any disputes arising out of these Terms will be resolved through arbitration.",
              },
              {
                title: "9. Changes to Terms",
                content:
                  "As we continue to evolve, we may update these Terms to reflect changes in our Service, legal obligations, or business practices. Users will be notified of significant modifications via email or in-app announcements. Your continued use of the Service after any such changes constitutes acceptance of the revised Terms. We encourage you to review these Terms periodically to stay informed of your rights and responsibilities.",
              },
              {
                title: "10. Contact Us",
                content:
                  "If you have any questions or concerns regarding these Terms, you may contact us at support@todotog.com.",
              },
            ].map((item, index) => (
              <div key={index} className="mt-3">
                <div className="text4 font-bold">{item.title}</div>
                <div className="text-gray text-sm">{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import stars from "../../assets/stars.png";
import { useHistory } from "react-router-dom";
import "./styles/learnMoreStyle.css";

export default function Terms() {
    const history = useHistory();

    return (
        <div id="blogOuter">
            <div id="blogInner">
                <div id="blogHeader">
                    <div id="logoFlexL">
                        <div id="logoIconL">
                            <img src={stars} id="logoStarsL" onClick={() => history.push("/home")}></img>
                        </div>
                        <div id="logoTextL" onClick={() => history.push("/home")}>
                            venue
                        </div>
                    </div>
                </div>
                <div id="blogPostTitle">
                    Terms and Conditions
                </div>
                <div id="blogPostContent">

                    <div className="blogSection">


                        Please read these Terms and Conditions ("Terms") carefully before accessing or using our video paywall platform ("Platform"). These Terms constitute a legal agreement between you ("User," "you," or "your") and etherplay media (“Company," "we," "us," or "our"). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Platform.
                    </div>
                    <div className="blogSubHeading">
                        1. User Obligations
                    </div>

                    <div className="blogSection">
                        1.1 Eligibility: By using the Platform, you affirm that you are at least 18 years old or have reached the age of majority in your jurisdiction. If you are using the Platform on behalf of a company or organization, you represent and warrant that you have the necessary authority to bind such entity to these Terms.
                    </div>
                    <div className="blogSection">
                        1.2 Account Creation: You may need to create an account on the Platform to access certain features and content. You agree to provide accurate and complete information during the registration process and to keep your account credentials confidential. You are responsible for all activities that occur under your account.
                    </div>
                    <div className="blogSection">
                        1.3 Compliance: You agree to comply with all applicable laws, regulations, and these Terms while using the Platform. You will not use the Platform for any unlawful, harmful, or fraudulent activities, including but not limited to unauthorized access, distribution of malware, or violation of intellectual property rights.
                    </div>
                    <div className="blogSubHeading">
                        2. Platform Usage
                    </div>
                    <div className="blogSection">
                        2.1 License: Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for personal or internal business purposes.
                    </div>
                    <div className="blogSection">
                        2.2 Content: The Platform may include videos, images, text, and other materials ("Content") that are protected by intellectual property rights. You acknowledge that the Content is owned by us or our licensors and may not be used, copied, reproduced, or distributed without our prior written consent.
                    </div>
                    <div className="blogSection">
                        2.3 Payment: Certain features or content on the Platform may require payment. You agree to pay all fees associated with your use of such features or content as specified on the Platform. Payments will be processed securely, and you agree to provide accurate and valid payment information.
                    </div>
                    <div className="blogSection">
                        2.4 Refunds: We may offer refunds or credits in certain circumstances, but this is at our sole discretion. Refunds will be issued according to our refund policy, which you can find on the Platform or by contacting our customer support.
                    </div>
                    <div className="blogSubHeading">
                        3. Intellectual Property
                    </div>
                    <div className="blogSection">
                        3.1 Ownership: Except for the Content provided by users, we retain all rights, title, and interest in the Platform, including any logos, trademarks, and copyrights associated with it. These Terms do not grant you any rights to use our intellectual property without our prior written permission.
                    </div>
                    <div className="blogSection">
                        3.2 User Content: By submitting or posting any content on the Platform, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, modify, adapt, publicly display, and create derivative works from your content solely for the purpose of operating the Platform.
                    </div>
                    <div className="blogSubHeading">
                        4. Privacy
                    </div>
                    <div className="blogSection">
                        4.1 Privacy Policy: Our Privacy Policy, available on the Platform, explains how we collect, use, and disclose your personal information. By using the Platform, you consent to the collection and processing of your personal information as described in the Privacy Policy.
                    </div>
                    <div className="blogSubHeading">
                        5. Disclaimer of Warranties
                    </div>
                    <div className="blogSection">
                        5.1 Platform "As Is": The Platform is provided on an "as is" and "as available" basis, without any warranties of any kind, whether express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or secure, or that any defects will be corrected.
                    </div>
                    <div className="blogSubHeading">
                        6. Limitation of Liability
                    </div>
                    <div className="blogSection">
                        6.1 Indirect Damages: To the fullest

                        extent permitted by applicable law, we shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of the Platform, including but not limited to loss of profits, data, or business opportunities.
                    </div>
                    <div className="blogSubHeading">
                        7. Termination
                    </div>
                    <div className="blogSection">
                        7.1 Termination: We reserve the right to suspend or terminate your access to the Platform, in whole or in part, at any time and for any reason without prior notice or liability.
                    </div>
                    <div className="blogSubHeading">
                        8. General Provisions
                    </div>
                    <div className="blogSection">
                        8.1 Entire Agreement: These Terms constitute the entire agreement between you and us regarding the subject matter hereof and supersede any prior or contemporaneous agreements, understandings, or representations.
                    </div>
                    <div className="blogSection">
                        8.2 Severability: If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
                    </div>
                    <div className="blogSection">
                        8.3 Governing Law: These Terms shall be governed by and construed in accordance with the laws of The United States of America. Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in The United States of America.

                        By using our video paywall platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                    </div>
                </div>
            </div>
        </div>
    )
}
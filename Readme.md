# AxQR - The Ultimate QR Scanner  

AxQR is a fast, reliable, and easy-to-use QR code scanning app. Designed for everyday use, AxQR empowers users to quickly access information with just a scan. Whether it’s a website, contact details, or payment data, AxQR has you covered!  

---

## 🚀 Features  

- **Fast & Accurate Scanning:** Instant recognition of QR codes and barcodes.  
- **Multi-Format Support:** Handles QR codes, barcodes, and other formats seamlessly.  
- **Scan History:** Automatically saves your scanned codes for future reference.  
- **User-Friendly Interface:** Simple and intuitive design for all users.  
- **Secure & Private:** Data is processed locally, ensuring user privacy.  

---

## 📱 How to Use  

1. Open the app and grant the necessary permissions (e.g., Camera).  
2. Point your camera at a QR code or barcode.  
3. View the scanned data instantly, with options to open links, copy text, or save details.  
4. Access previous scans through the history feature.  

---

## 🛠️ Installation  

1. Download the **AxQR** app from the Google Play Store.  
2. Install and open the app on your Android device.  
3. Start scanning QR codes effortlessly!  

---

## 🔐 Privacy  

AxQR respects your privacy. All scanned data is processed locally and never shared without your consent. For more information, read our [Privacy Policy](https://your-privacy-policy-url.com).  

---

## 💡 Roadmap  

- **Customizable Themes:** Dark mode and theme selection.  
- **Offline Scanning:** Scan and save data without internet connectivity.  
- **Enhanced Formats:** Support for advanced QR types like Wi-Fi, geo-locations, etc.  
- **Ad-Free Version:** A premium version for uninterrupted use.  

---

## 🐛 Reporting Issues  

Found a bug or have a feature request?  
- Open an issue on this repository.  
- Email us at [support@axqr.com](mailto:support@axqr.com).  

---

## 📞 Contact  

For support or inquiries, contact us at:  
- **Email:** [axspherehub@gmail.com](mailto:axspherehub@gmail.com)  

---

## 📄 License  

AxQR is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this app.  

---

## 🌟 Acknowledgments  

- Built using Android Studio.  
- Inspired by the need for fast, reliable QR scanning tools.  

---

Thank you for using **AxQR**! 🚀

# Capacitor Setup
### Capacitor is Ionic’s official app runtime that makes it easy to deploy web apps to native platforms like iOS, Android, and more. If you’ve used Cordova in the past, consider reading more about the differences here.

### If you’re still running ionic serve in the terminal, cancel it. Complete a fresh build of your Ionic project, fixing any errors that it reports:

## ionic build

### Next, create both the iOS and Android projects:

## $ ionic cap add ios
## $ ionic cap add android

### Both android and ios folders at the root of the project are created. 
### These are entirely standalone native projects that should be considered part of your Ionic app (i.e., check them into source control, edit them using their native tooling, etc. Every time you perform a build (e.g. ionic build) that updates your web directory (default: www), you'll need to copy those changes into your native projects:

## ionic cap copy

### Note: After making updates to the native portion of the code (such as adding a new plugin), use the sync command:

## ionic cap sync
